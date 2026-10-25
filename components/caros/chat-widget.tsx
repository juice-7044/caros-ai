'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useSpanish } from '@/lib/use-spanish'
import { localeHref } from '@/lib/spanish'
import spanish from '@/messages/full/shared.es.json'
import { usePathname } from '@/i18n/routing'
import { getLauncherLayout, isFooterBarInView, shouldCollapseLauncher } from '@/lib/caros-widget-dock'
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
  const { tr, locale } = useSpanish(spanish)
  const pathname = usePathname()
  const [dockTarget, setDockTarget] = useState<HTMLElement | null>(null)
  const [launcherReady, setLauncherReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
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
      const footerBar = document.querySelector<HTMLElement>('[data-caros-footer-bar]')
      setFooterInView(isFooterBarInView(footerBar ? footerBar.getBoundingClientRect().top : null, window.innerHeight))
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
  const status = call.phase === 'error' ? tr("Connection unavailable")
    : connecting ? tr("Connecting to CAROS")
    : active ? call.muted ? tr("Connected · microphone muted") : tr("Connected · microphone on")
    : tr("Ready when you are")
  const time = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`

  const launcher = (
      <button
        ref={launcherRef}
        type="button"
        data-caros-chat-launcher
        className={`${styles.launcher} ${compact ? styles.launcherCompact : ''} ${open ? styles.launcherHidden : ''}`}
        aria-label={active ? tr('Return to CAROS call, {time}', { time }) : tr("Talk to us — CAROS voice or text chat")}
        title={active ? tr('Call in progress · {time}', { time }) : chatSending ? tr("CAROS is replying…") : tr("Talk to us — voice or text chat")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className={styles.launcherOrb} aria-hidden="true">
          <ParticlesOrb state={call.orbState} size={96} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label="" />
        </span>
        <span className={styles.launcherCopy}>
          <strong>{tr("Talk to us")}</strong>
          <span><i className={busy ? styles.liveDot : styles.readyDot} />{active ? tr('Call in progress · {time}', { time }) : connecting ? tr("Connecting…") : chatSending ? tr("CAROS is replying…") : tr("Voice or text. Your choice.")}</span>
        </span>
        <ArrowUpRight size={17} className={styles.launcherArrow} aria-hidden="true" />
        {compact && <span className={styles.compactLabel}>{tr("Talk to us")}</span>}
        {compact && (busy || chatSending) && <span className={styles.compactIndicator} aria-hidden="true" />}
      </button>
  )

  return (
    <div className={styles.widget} data-caros-voice-widget data-phase={call.phase} data-mode={mode} data-layout={layout} data-footer-in-view={footerInView ? 'true' : undefined}>
      {launcherReady && (layout === 'docked' && dockTarget ? createPortal(launcher, dockTarget) : launcher)}

      {open && (
        <section id={panelId} className={styles.panel} role="dialog" aria-label={tr("Talk to CAROS")} data-testid="caros-voice-panel">
          <header className={styles.header}>
            <div className={styles.brand}><span className={styles.sunburst} aria-hidden="true">✳</span><span>CAROS<span className={styles.ai}>AI</span><small>{tr("REVENUE INFRASTRUCTURE")}</small></span></div>
            <button ref={closeRef} type="button" className={styles.iconButton} onClick={close} aria-label={busy ? tr("Minimize call panel") : tr("Close conversation panel")}>{busy ? <Minus size={18} /> : <X size={18} />}</button>
          </header>
          <div className={styles.body}>
            <div className={styles.eyebrow}><span /> {tr("A REAL CONVERSATION. A CLEARER PICTURE.")}</div>
            <h2>{tr("Talk to CAROS")}<span>.</span></h2>
            <p className={styles.intro}>{tr("Tell us where revenue gets stuck.")}<br />{tr("Let’s find the next move.")}</p>
            {mode !== 'choose' && <div className={styles.channelTabs} role="group" aria-label={tr("Conversation channel")}>
              <button type="button" aria-pressed={mode === 'voice'} disabled={chatSending} onClick={() => setMode('voice')}><Phone size={14} />{tr("Voice")}</button>
              <button type="button" aria-pressed={mode === 'chat'} disabled={busy} onClick={() => setMode('chat')}><MessageCircle size={14} />{tr("Text chat")}</button>
            </div>}
            {mode === 'chat' ? <TextChat controller={chatController} /> : <>
              <div className={styles.orbStage}>
                <div className={styles.orbGuide} aria-hidden="true" />
                <ParticlesOrb state={call.orbState} size={240} speed={0.85} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label={tr("CAROS audio visualization")} />
                <span className={styles.orbCaption}>{active ? tr("LIVE AUDIO") : connecting ? tr("CONNECTING") : mode === 'choose' ? tr("YOUR NEXT MOVE") : tr("VOICE AI")}</span>
              </div>
              {mode === 'choose' ? <>
                <div className={styles.channelChoices} role="group" aria-label={tr("Choose how to talk to CAROS")}>
                  <button type="button" onClick={() => setMode('voice')}><Phone size={19} /><strong>{tr("Voice")}</strong><span>{tr("Talk it through")}</span><ArrowUpRight size={14} /></button>
                  <button type="button" onClick={() => setMode('chat')}><MessageCircle size={19} /><strong>{tr("Text chat")}</strong><span>{tr("Type your question")}</span><ArrowUpRight size={14} /></button>
                </div>
                <p className={styles.note}>{tr("Choose a voice conversation or text chat with our AI assistant.")}</p>
              </> : <>
                <p className={styles.status} role="status" aria-live="polite"><span className={active ? styles.liveDot : styles.readyDot} />{status}{active && <time className={styles.timer} aria-hidden="true">{time}</time>}</p>
                {call.error && <p className={styles.error} role="alert">{tr(call.error)}</p>}
                {call.playbackBlocked && <button type="button" className={styles.resume} onClick={() => void controller.resumeAudio()}><Volume2 size={15} />{tr("Enable call audio")}</button>}
                {active ? (
                  <div className={styles.callControls}>
                    <button type="button" className={styles.mute} aria-pressed={call.muted} onClick={() => controller.toggleMute()}>{call.muted ? <MicOff size={18} /> : <Mic size={18} />}{call.muted ? tr("Unmute") : tr("Mute")}</button>
                    <button type="button" className={styles.end} onClick={() => controller.stop()}><PhoneOff size={18} />{tr("End call")}</button>
                  </div>
                ) : connecting ? (
                  <button type="button" className={styles.secondary} onClick={() => controller.stop()}><X size={16} />{tr("Cancel connection")}</button>
                ) : (
                  <button type="button" className={styles.start} onClick={() => void controller.start()}><Phone size={18} />{call.phase === 'error' ? tr("Try again") : tr("Start a conversation")}<ArrowUpRight size={18} /></button>
                )}
                <p className={styles.note}>{active ? tr("You’re speaking with an AI assistant. End the call anytime to switch to text.") : tr("Voice conversation with an AI assistant. Microphone access is requested only when you start.")}</p>
              </>}
            </>}
          </div>
          <footer className={styles.footer}><a href={localeHref('/privacy', locale)}>{tr("Privacy")}</a><span>{tr("Powered by Retell")}</span><a href={localeHref('/terms', locale)}>{tr("Terms")}</a></footer>
        </section>
      )}
    </div>
  )
}
