export const CAROS_CHAT_CONFIG = {
  publicKey: 'public_key_a6f9c3150c512387bc200',
  agentId: 'agent_80a2091f28efd7e7efa26aec6d',
} as const

export type ChatMessage = {
  id: number
  role: 'agent' | 'user'
  content: string
  delivery?: 'sending' | 'sent' | 'failed'
}
export type ChatSnapshot = {
  phase: 'idle' | 'sending' | 'ready' | 'error' | 'ended'
  messages: readonly ChatMessage[]
  error: string | null
}
const INITIAL: ChatSnapshot = { phase: 'idle', messages: [], error: null }
const API = 'https://api.retellai.com'
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

class ChatRequestError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status }
}
function explain(error: unknown) {
  if (error instanceof ChatRequestError && [401, 403].includes(error.status)) {
    return 'Text chat was not authorized. Please try again or use the website contact details.'
  }
  if (error instanceof ChatRequestError && error.status === 429) return 'Text chat is busy. Please wait a moment and retry.'
  if (error instanceof ChatRequestError && /already ended/i.test(error.message)) return 'This conversation has ended. Start a new chat to continue.'
  return 'We could not confirm a reply. Check your connection and retry. Retrying may resend your last message.'
}

/** Website text chat, not phone messaging. No requests occur before a visitor sends. */
export class ChatSessionController {
  private snapshot: ChatSnapshot = INITIAL
  private listeners = new Set<() => void>()
  private request: typeof fetch
  private chatId: string | null = null
  private generation = 0
  private abort: AbortController | null = null
  private nextId = 0
  private retryMessage: { id: number; content: string } | null = null

  constructor(request: typeof fetch = (...args) => fetch(...args)) { this.request = request }
  getSnapshot = () => this.snapshot
  getServerSnapshot = () => INITIAL
  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }
  private update(next: Partial<ChatSnapshot>) {
    this.snapshot = { ...this.snapshot, ...next }
    this.listeners.forEach(listener => listener())
  }
  private async post(path: string, body: Record<string, unknown>, signal: AbortSignal): Promise<Record<string, unknown>> {
    const response = await this.request(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CAROS_CHAT_CONFIG.publicKey}` },
      body: JSON.stringify(body),
      signal,
    })
    const data: unknown = await response.json()
    if (!response.ok) throw new ChatRequestError(response.status, record(data) && typeof data.message === 'string' ? data.message : 'Chat request failed')
    if (!record(data)) throw new Error('Invalid chat response')
    return data
  }

  async send(input: string, retryId?: number) {
    const content = input.trim()
    if (!content || content.length > 2000 || this.snapshot.phase === 'sending' || this.snapshot.phase === 'ended') return
    const id = retryId ?? ++this.nextId
    const generation = ++this.generation
    const abort = new AbortController()
    this.abort = abort
    const current = () => generation === this.generation
    const messages: ChatMessage[] = retryId === undefined
      ? [...this.snapshot.messages, { id, role: 'user', content, delivery: 'sending' }]
      : this.snapshot.messages.map(m => m.id === id ? { ...m, delivery: 'sending' } : m)
    this.retryMessage = null
    this.update({ phase: 'sending', messages, error: null })
    const timeout = setTimeout(() => abort.abort(), 90000)
    try {
      if (!this.chatId) {
        // Chat agent version is deliberately omitted: the owner did not supply one.
        // Never reuse the separate voice agent's version 9 for this chat agent.
        const created = await this.post('/create-chat', { agent_id: CAROS_CHAT_CONFIG.agentId }, abort.signal)
        if (!current()) return
        if (typeof created.chat_id !== 'string' || !created.chat_id) throw new Error('Missing chat id')
        this.chatId = created.chat_id
      }
      const result = await this.post('/create-chat-completion', { chat_id: this.chatId, content }, abort.signal)
      if (!current()) return
      if (!Array.isArray(result.messages)) throw new Error('Missing response messages')
      // Only agent-visible text is rendered. Tool arguments/results never reach the UI.
      const answers: ChatMessage[] = result.messages.filter(m => record(m) && m.role === 'agent' && typeof m.content === 'string' && m.content.trim()).map(m => ({ id: ++this.nextId, role: 'agent', content: (m as Record<string, string>).content }))
      const ended = result.messages.some(m => record(m) && m.role === 'tool_call_invocation' && m.name === 'end_call')
      this.update({
        phase: ended ? 'ended' : 'ready',
        messages: [...this.snapshot.messages.map(m => m.id === id ? { ...m, delivery: 'sent' as const } : m), ...answers],
        error: null,
      })
    } catch (error) {
      if (!current()) return
      this.retryMessage = { id, content }
      const ended = error instanceof ChatRequestError && /already ended/i.test(error.message)
      this.update({ phase: ended ? 'ended' : 'error', error: explain(error), messages: this.snapshot.messages.map(m => m.id === id ? { ...m, delivery: 'failed' as const } : m) })
    } finally {
      clearTimeout(timeout)
      if (current()) this.abort = null
    }
  }

  async retry() {
    const message = this.retryMessage
    if (message) await this.send(message.content, message.id)
  }

  cancel() {
    if (this.snapshot.phase !== 'sending') return
    this.generation++
    this.abort?.abort()
    this.abort = null
    const pending = this.snapshot.messages.findLast(m => m.delivery === 'sending')
    this.retryMessage = pending ? { id: pending.id, content: pending.content } : null
    this.update({ phase: 'error', error: 'Stopped waiting for a reply. The message may already have reached CAROS. You can retry or start a new chat.', messages: this.snapshot.messages.map(m => m.delivery === 'sending' ? { ...m, delivery: 'failed' as const } : m) })
  }

  reset() {
    this.generation++
    this.abort?.abort()
    this.abort = null
    this.chatId = null
    this.retryMessage = null
    this.update(INITIAL)
  }
}
