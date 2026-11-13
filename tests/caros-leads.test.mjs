import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CAROS_FORMS, leadBody, sendLead } from '../lib/caros-leads.ts'

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8')

test('each website form has its own CAROS form address', () => {
  const urls = Object.values(CAROS_FORMS)
  assert.equal(urls.length, 7, 'audit, affiliate, nonprofit and the four lead magnets')
  assert.equal(new Set(urls).size, 7)
  for (const u of urls) assert.match(u, /^https:\/\/ask\.getcaros\.com\/api\/forms\/[A-Za-z0-9_-]{43}$/)
})

test('the body never uses the "website" spam-trap key, drops empties and writes details as lines', () => {
  const b = leadBody({ name: ' Jo Smith ', email: 'jo@x.com', site: 'x.com', phone: '', details: { 'Known leaks': 'missed calls', Empty: '', Agreed: true } })
  assert.equal('website' in b, false)
  assert.equal(b.site, 'x.com')
  assert.equal(b.name, 'Jo Smith')
  assert.equal('phone' in b, false)
  assert.equal(b.details, 'Known leaks: missed calls\nAgreed: Yes')
})

test('long values are clipped to what CAROS accepts', () => {
  const b = leadBody({ name: 'a', email: 'a@b.co', company: 'c'.repeat(500), details: { Notes: 'n'.repeat(5000) } })
  assert.equal(b.company.length, 200)
  assert.ok(b.details.length <= 2000)
})

test('sendLead posts JSON to the form and reports CAROS problems in plain words', async () => {
  const calls = []
  const ok = await sendLead('audit', { name: 'Jo', email: 'jo@x.com' }, async (url, init) => { calls.push([url, init]); return new Response(JSON.stringify({ ok: true, thanks: 'Thanks' }), { status: 200 }) })
  assert.deepEqual(ok, { ok: true })
  assert.equal(calls[0][0], CAROS_FORMS.audit)
  assert.equal(calls[0][1].method, 'POST')
  assert.deepEqual(JSON.parse(calls[0][1].body), { name: 'Jo', email: 'jo@x.com' })
  const bad = await sendLead('audit', { name: 'Jo', email: 'nope' }, async () => new Response(JSON.stringify({ ok: false, problems: ['Please type a working email address.'] }), { status: 400 }))
  assert.deepEqual(bad, { ok: false, error: 'Please type a working email address.' })
  const down = await sendLead('audit', { name: 'Jo', email: 'jo@x.com' }, async () => { throw new Error('offline') })
  assert.equal(down.ok, false)
})

test('other website forms retain sendLead while audit uses the native contract', () => {
  const audit = source('../components/caros/audit-form.tsx')
  assert.match(audit, /await submitRevenueAudit\(data\)/)
  assert.match(source('../lib/revenue-audit-form.ts'), /fetcher\(REVENUE_AUDIT.endpoint/)
  assert.doesNotMatch(audit, /sendLead|\/api\/revenue-audit|leadconnectorhq|msgsndr/)
  for (const f of ['affiliate-application-form', 'nonprofit-consultation-form']) {
    const s = source(`../components/caros/${f}.tsx`)
    assert.match(s, /sendLead\(/)
    assert.doesNotMatch(s, /leadconnectorhq|msgsndr|\/api\/(revenue-audit|affiliate-application|nonprofit-consultation)/)
  }
  assert.match(source('../next.config.mjs'), /connect-src 'self' https:\/\/ask\.getcaros\.com/)
})
