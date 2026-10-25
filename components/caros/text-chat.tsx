'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { MessageCircle, RotateCcw, Send, Square } from 'lucide-react'
import { ChatSessionController } from '@/lib/caros-chat-session'
import styles from './chat-widget.module.css'

export function TextChat({ controller }: { controller: ChatSessionController }) {
  const chat = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const sending = chat.phase === 'sending'
  const ended = chat.phase === 'ended'

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [chat.messages.length, chat.phase])

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    if (!draft.trim() || sending || ended) return
    void controller.send(draft)
    setDraft('')
  }

  return (
    <div className={styles.textChat} data-testid="caros-text-chat">
      <div className={styles.chatToolbar}>
        <span><MessageCircle size={13} aria-hidden="true" />Text chat · AI assistant</span>
        <button type="button" className={styles.newChat} onClick={() => { controller.reset(); setDraft(''); inputRef.current?.focus() }} disabled={!chat.messages.length} aria-label="Start a new text conversation"><RotateCcw size={12} />New chat</button>
      </div>
      <div ref={logRef} className={styles.chatLog} role="log" aria-label="Conversation history" aria-live="polite" aria-relevant="additions text" tabIndex={0}>
        {!chat.messages.length && <div className={styles.chatEmpty}><MessageCircle size={25} aria-hidden="true" /><h3>Prefer to type?</h3><p>Ask about CAROS, your revenue challenges,<br />or where to focus next.</p><small>Your conversation starts when you send.</small></div>}
        {chat.messages.map(message => (
          <div key={message.id} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.agentMessage}`} data-delivery={message.delivery}>
            <span className={styles.messageAuthor}>{message.role === 'agent' ? 'CAROS AI' : 'You'}</span>
            <p>{message.content}</p>
            {message.delivery === 'failed' && <small>Reply not confirmed</small>}
          </div>
        ))}
        {sending && <p className={styles.replyStatus}>CAROS is replying…</p>}
        {ended && <p className={styles.replyStatus}>This conversation has ended. Start a new chat to continue.</p>}
      </div>
      {chat.error && <div className={styles.chatError} role="alert"><p>{chat.error}</p>{chat.phase === 'error' && <button type="button" className={styles.newChat} onClick={() => void controller.retry()}>Retry message</button>}</div>}
      <form onSubmit={submit} className={styles.chatComposer}>
        <label className={styles.srOnly} htmlFor="caros-chat-message">Your message to CAROS</label>
        <textarea
          ref={inputRef}
          id="caros-chat-message"
          aria-label="Your message to CAROS"
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) submit(event)
          }}
          placeholder={ended ? 'Start a new chat to continue' : 'Type your message…'}
          maxLength={2000}
          rows={2}
          disabled={ended}
        />
        {sending ? <button type="button" className={styles.sendMessage} onClick={() => controller.cancel()} aria-label="Stop waiting for a reply"><Square size={16} /></button>
          : <button type="submit" className={styles.sendMessage} disabled={!draft.trim() || ended} aria-label="Send message"><Send size={17} /></button>}
      </form>
      <p className={styles.chatNote}>No microphone needed. Refreshing clears this chat view.</p>
    </div>
  )
}
