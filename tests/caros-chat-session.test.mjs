import test from 'node:test'
import assert from 'node:assert/strict'
import { ChatSessionController, CAROS_CHAT_CONFIG } from '../lib/caros-chat-session.ts'

const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

test('chat is lazy and uses the supplied chat-only key and agent, without the voice version', async () => {
  const requests = []
  const c = new ChatSessionController(async (url, init) => {
    requests.push({ url, headers: init.headers, body: JSON.parse(init.body) })
    return requests.length === 1 ? reply({ chat_id: 'chat_test', chat_status: 'ongoing' }) : reply({ messages: [{ role: 'agent', content: 'How can I help?' }] })
  })
  assert.equal(requests.length, 0)
  assert.equal(CAROS_CHAT_CONFIG.publicKey, 'public_key_a6f9c3150c512387bc200')
  await c.send(' Hello ')
  assert.equal(requests[0].url, 'https://api.retellai.com/create-chat')
  assert.deepEqual(requests[0].body, { agent_id: 'agent_80a2091f28efd7e7efa26aec6d' })
  assert.equal(requests[0].headers.Authorization, `Bearer ${CAROS_CHAT_CONFIG.publicKey}`)
  assert.deepEqual(requests[1].body, { chat_id: 'chat_test', content: 'Hello' })
  assert.deepEqual(c.getSnapshot().messages.map(m => [m.role, m.content]), [['user', 'Hello'], ['agent', 'How can I help?']])
})
test('subsequent messages reuse the session; tool internals are never displayed', async () => {
  let creations = 0
  const c = new ChatSessionController(async url => {
    if (url.endsWith('/create-chat')) { creations++; return reply({ chat_id: 'chat_test' }) }
    return reply({ messages: [{ role: 'tool_call_result', content: 'PRIVATE TOOL RESULT' }, { role: 'agent', content: '<script>plain text only</script>' }] })
  })
  await c.send('One')
  await c.send('Two')
  assert.equal(creations, 1)
  assert.equal(c.getSnapshot().messages.length, 4)
  assert.ok(!c.getSnapshot().messages.some(m => m.content.includes('PRIVATE TOOL')))
})
test('double sends are blocked and reset invalidates stale responses', async () => {
  let resolve, requests = 0
  const c = new ChatSessionController(() => { requests++; return new Promise(r => { resolve = r }) })
  const pending = c.send('One')
  await c.send('Two')
  assert.equal(requests, 1)
  c.reset()
  resolve(reply({ chat_id: 'late' }))
  await pending
  assert.equal(requests, 1)
  assert.equal(c.getSnapshot().messages.length, 0)
  assert.equal(c.getSnapshot().phase, 'idle')
})
test('authorization errors are actionable; retries do not duplicate the user bubble', async () => {
  let requests = 0
  const c = new ChatSessionController(async url => {
    requests++
    if (requests === 1) return reply({ message: 'Unauthorized' }, 401)
    if (url.endsWith('/create-chat')) return reply({ chat_id: 'chat_retry' })
    return reply({ messages: [{ role: 'agent', content: 'Welcome' }] })
  })
  await c.send('Hello')
  assert.equal(c.getSnapshot().phase, 'error')
  assert.match(c.getSnapshot().error, /authorized/)
  await c.retry()
  assert.equal(c.getSnapshot().messages.filter(m => m.role === 'user').length, 1)
  assert.equal(c.getSnapshot().phase, 'ready')
})
test('blank and oversized input never creates a chat; malformed responses fail safely', async () => {
  let requests = 0
  const c = new ChatSessionController(async () => { requests++; return reply({ unexpected: true }) })
  await c.send('  ')
  await c.send('x'.repeat(2001))
  assert.equal(requests, 0)
  await c.send('Hello')
  assert.equal(c.getSnapshot().phase, 'error')
  assert.equal(c.getSnapshot().messages[0].delivery, 'failed')
})
test('ended chats expose no tool messages and require a new conversation', async () => {
  let requests = 0
  const c = new ChatSessionController(async url => {
    requests++
    return url.endsWith('/create-chat') ? reply({ chat_id: 'chat_ended' }) : reply({ messages: [{ role: 'agent', content: 'Goodbye' }, { role: 'tool_call_invocation', name: 'end_call', arguments: '{}' }] })
  })
  await c.send('Bye')
  assert.equal(c.getSnapshot().phase, 'ended')
  await c.send('Again')
  assert.equal(requests, 2)
  assert.equal(c.getSnapshot().messages.length, 2)
})
