'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from '@/i18n/routing'
import { getLauncherLayout, shouldCollapseLauncher } from '@/lib/caros-widget-dock'
import { Mic, MicOff, Phone, PhoneOff, ArrowUpRight, MessageCircle, Minus, Volume2, X } from 'lucide-react'
import { ParticlesOrb } from '@/registry/orbe/particles-orb/particles-orb'
import { CAROS_VOICE_CONFIG, VoiceSessionController } from '@/lib/caros-voice-session'
import { ChatSessionController } from '@/lib/caros-chat-session'
import { TextChat } from './text-chat'
import styles from './chat-widget.module.css'

const GOLD = '#C9A227'
const CHAMPAGNE = '#FFF0BA'

function createController() {
  return new VoiceSessionController(async () => {
    const { RetellClient } = await import('retell-client-js-sdk')
    return new RetellClient({ key: CAROS_VOICE_CONFIG.publicKey })
  })
}

/** Owner-approved custom Retell UI. Never load the stock or GHL embeds alongside it. */
export function ChatWidget() {
  const pathname = usePathname()
  const [dockTarget, setDockTarget] = useState<HTMLElement | null>(null)
  const [launcherReady, setLauncherReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [controller] = useState(createController)
  const [chatController] = useState(() => new ChatSessionController())
  const call = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot)
  const chat = useSyncExternalStore(chatController.subscribe, chatController.getSnapshot, chatController.getServerSnapshot)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'choose' | 'voice' | 'chat'>('choose')
  const [elapsed, setElapsed] = useState(0)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const launcherHadFocusRef = useRef(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const hasOpenedRef = useRef(false)
  const panelId = useId()
  const active = call.phase === 'live'
  const connecting = call.phase === 'connecting'
  const busy = active || connecting
  const chatSending = chat.phase === 'sending'
  const layout = getLauncherLayout(!!dockTarget, scrolled)
  const compact = layout === 'floating'

  useEffect(() => {
    let observer: MutationObserver | undefined
    let target: HTMLElement | null = null
    const onScroll = () => {
      launcherHadFocusRef.current = document.activeElement === launcherRef.current
      const dockBottom = target?.getBoundingClientRect().bottom
      setScrolled(previous => dockBottom !== undefined && shouldCollapseLauncher(dockBottom, previous))
    }
    const resizeObserver = new ResizeObserver(onScroll)
    const updateDock = () => {
      target = pathname === '/' ? document.querySelector<HTMLElement>('[data-caros-chat-dock]') : null
      setDockTarget(target)
      setLauncherReady(pathname !== '/' || !!target)
      if (target) {
        observer?.disconnect()
        resizeObserver.disconnect()
        resizeObserver.observe(target.closest('section') ?? target)
      }
      onScroll()
    }
    updateDock()
    // A streamed homepage can mount its hero after the shared chrome.
    if (pathname === '/' && !document.querySelector('[data-caros-chat-dock]')) {
      observer = new MutationObserver(updateDock)
      observer.observe(document.body, { childList: true, subtree: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer?.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    if (launcherHadFocusRef.current && !open) launcherRef.current?.focus({ preventScroll: true })
    launcherHadFocusRef.current = false
  }, [layout, dockTarget, open])

  useEffect(() => () => { controller.stop(); chatController.reset() }, [controller, chatController])
  useEffect(() => {
    if (!active) { setElapsed(0); return }
    const started = Date.now()
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000)
    return () => window.clearInterval(id)
  }, [active])
  useEffect(() => {
    if (!open) {
      if (hasOpenedRef.current) launcherRef.current?.focus({ preventScroll: true })
      return
    }
    hasOpenedRef.current = true
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const status = call.phase === 'error' ? 'Connection unavailable'
    : connecting ? 'Connecting to CAROS'
    : active ? call.muted ? 'Connected · microphone muted' : 'Connected · microphone on'
    : 'Ready when you are'
  const time = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`

  const launcher = (
      <button
        ref={launcherRef}
        type="button"
        data-caros-chat-launcher
        className={`${styles.launcher} ${compact ? styles.launcherCompact : ''} ${open ? styles.launcherHidden : ''}`}
        aria-label={active ? `Return to CAROS call, ${time}` : 'Talk to us — CAROS voice or text chat'}
        title={active ? `Call in progress · ${time}` : chatSending ? 'CAROS is replying…' : 'Talk to us — voice or text chat'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className={styles.launcherOrb} aria-hidden="true">
          <ParticlesOrb state={call.orbState} size={96} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label="" />
        </span>
        <span className={styles.launcherCopy}>
          <strong>Talk to us</strong>
          <span><i className={busy ? styles.liveDot : styles.readyDot} />{active ? `Call in progress · ${time}` : connecting ? 'Connecting…' : chatSending ? 'CAROS is replying…' : 'Voice or text. Your choice.'}</span>
        </span>
        <ArrowUpRight size={17} className={styles.launcherArrow} aria-hidden="true" />
        {compact && <span className={styles.compactLabel}>Talk to us</span>}
        {compact && (busy || chatSending) && <span className={styles.compactIndicator} aria-hidden="true" />}
      </button>
  )

  return (
    <div className={styles.widget} data-caros-voice-widget data-phase={call.phase} data-mode={mode} data-layout={layout}>
      {launcherReady && (layout === 'docked' && dockTarget ? createPortal(launcher, dockTarget) : launcher)}

      {open && (
        <section id={panelId} className={styles.panel} role="dialog" aria-label="Talk to CAROS" data-testid="caros-voice-panel">
          <header className={styles.header}>
            <div className={styles.brand}><span className={styles.sunburst} aria-hidden="true">✳</span><span>CAROS<span className={styles.ai}>AI</span><small>REVENUE INFRASTRUCTURE</small></span></div>
            <button ref={closeRef} type="button" className={styles.iconButton} onClick={close} aria-label={busy ? 'Minimize call panel' : 'Close conversation panel'}>{busy ? <Minus size={18} /> : <X size={18} />}</button>
          </header>
          <div className={styles.body}>
            <div className={styles.eyebrow}><span /> A REAL CONVERSATION. A CLEARER PICTURE.</div>
            <h2>Talk to CAROS<span>.</span></h2>
            <p className={styles.intro}>Tell us where revenue gets stuck.<br />Let’s find the next move.</p>
            {mode !== 'choose' && <div className={styles.channelTabs} role="group" aria-label="Conversation channel">
              <button type="button" aria-pressed={mode === 'voice'} disabled={chatSending} onClick={() => setMode('voice')}><Phone size={14} />Voice</button>
              <button type="button" aria-pressed={mode === 'chat'} disabled={busy} onClick={() => setMode('chat')}><MessageCircle size={14} />Text chat</button>
            </div>}
            {mode === 'chat' ? <TextChat controller={chatController} /> : <>
              <div className={styles.orbStage}>
                <div className={styles.orbGuide} aria-hidden="true" />
                <ParticlesOrb state={call.orbState} size={240} speed={0.85} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label="CAROS audio visualization" />
                <span className={styles.orbCaption}>{active ? 'LIVE AUDIO' : connecting ? 'CONNECTING' : mode === 'choose' ? 'YOUR NEXT MOVE' : 'VOICE AI'}</span>
              </div>
              {mode === 'choose' ? <>
                <div className={styles.channelChoices} role="group" aria-label="Choose how to talk to CAROS">
                  <button type="button" onClick={() => setMode('voice')}><Phone size={19} /><strong>Voice</strong><span>Talk it through</span><ArrowUpRight size={14} /></button>
                  <button type="button" onClick={() => setMode('chat')}><MessageCircle size={19} /><strong>Text chat</strong><span>Type your question</span><ArrowUpRight size={14} /></button>
                </div>
                <p className={styles.note}>Choose a voice conversation or text chat with our AI assistant.</p>
              </> : <>
                <p className={styles.status} role="status" aria-live="polite"><span className={active ? styles.liveDot : styles.readyDot} />{status}{active && <time className={styles.timer} aria-hidden="true">{time}</time>}</p>
                {call.error && <p className={styles.error} role="alert">{call.error}</p>}
                {call.playbackBlocked && <button type="button" className={styles.resume} onClick={() => void controller.resumeAudio()}><Volume2 size={15} />Enable call audio</button>}
                {active ? (
                  <div className={styles.callControls}>
                    <button type="button" className={styles.mute} aria-pressed={call.muted} onClick={() => controller.toggleMute()}>{call.muted ? <MicOff size={18} /> : <Mic size={18} />}{call.muted ? 'Unmute' : 'Mute'}</button>
                    <button type="button" className={styles.end} onClick={() => controller.stop()}><PhoneOff size={18} />End call</button>
                  </div>
                ) : connecting ? (
                  <button type="button" className={styles.secondary} onClick={() => controller.stop()}><X size={16} />Cancel connection</button>
                ) : (
                  <button type="button" className={styles.start} onClick={() => void controller.start()}><Phone size={18} />{call.phase === 'error' ? 'Try again' : 'Start a conversation'}<ArrowUpRight size={18} /></button>
                )}
                <p className={styles.note}>{active ? 'You’re speaking with an AI assistant. End the call anytime to switch to text.' : 'Voice conversation with an AI assistant. Microphone access is requested only when you start.'}</p>
              </>}
            </>}
          </div>
          <footer className={styles.footer}><a href="https://getcaros.com/privacy">Privacy</a><span>Powered by Retell</span><a href="https://getcaros.com/terms">Terms</a></footer>
        </section>
      )}
    </div>
  )
}
