'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Mic, MicOff, Phone, PhoneOff, ArrowUpRight, Minus, Volume2, X } from 'lucide-react'
import { ParticlesOrb } from '@/registry/orbe/particles-orb/particles-orb'
import { CAROS_VOICE_CONFIG, VoiceSessionController } from '@/lib/caros-voice-session'
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
  const [controller] = useState(createController)
  const call = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getServerSnapshot)
  const [open, setOpen] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const hasOpenedRef = useRef(false)
  const panelId = useId()
  const active = call.phase === 'live'
  const connecting = call.phase === 'connecting'
  const busy = active || connecting

  useEffect(() => () => controller.stop(), [controller])
  useEffect(() => {
    if (!active) { setElapsed(0); return }
    const started = Date.now()
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000)
    return () => window.clearInterval(id)
  }, [active])
  useEffect(() => {
    if (!open) {
      if (hasOpenedRef.current) launcherRef.current?.focus()
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

  return (
    <div className={styles.widget} data-caros-voice-widget data-phase={call.phase}>
      <button
        ref={launcherRef}
        type="button"
        className={`${styles.launcher} ${open ? styles.launcherHidden : ''}`}
        aria-label={active ? `Return to CAROS call, ${time}` : 'Talk to us — CAROS voice assistant'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className={styles.launcherOrb} aria-hidden="true">
          <ParticlesOrb state={call.orbState} size={96} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label="" />
        </span>
        <span className={styles.launcherCopy}>
          <strong>Talk to us</strong>
          <span><i className={busy ? styles.liveDot : styles.readyDot} />{active ? `Call in progress · ${time}` : connecting ? 'Connecting…' : 'Your next stage starts here'}</span>
        </span>
        <ArrowUpRight size={17} className={styles.launcherArrow} aria-hidden="true" />
      </button>

      {open && (
        <section id={panelId} className={styles.panel} role="dialog" aria-label="Talk to CAROS" data-testid="caros-voice-panel">
          <header className={styles.header}>
            <div className={styles.brand}><span className={styles.sunburst} aria-hidden="true">✳</span><span>CAROS<span className={styles.ai}>AI</span><small>REVENUE INFRASTRUCTURE</small></span></div>
            <button ref={closeRef} type="button" className={styles.iconButton} onClick={close} aria-label={busy ? 'Minimize call panel' : 'Close voice panel'}>{busy ? <Minus size={18} /> : <X size={18} />}</button>
          </header>
          <div className={styles.body}>
            <div className={styles.eyebrow}><span /> A REAL CONVERSATION. A CLEARER PICTURE.</div>
            <h2>Talk to CAROS<span>.</span></h2>
            <p className={styles.intro}>Tell us where revenue gets stuck.<br />Let’s find the next move.</p>
            <div className={styles.orbStage}>
              <div className={styles.orbGuide} aria-hidden="true" />
              <ParticlesOrb state={call.orbState} size={240} speed={0.85} colorFrom={GOLD} colorTo={CHAMPAGNE} levelRef={controller.levelRef} label="CAROS audio visualization" />
              <span className={styles.orbCaption}>{active ? 'LIVE AUDIO' : connecting ? 'CONNECTING' : 'VOICE AI'}</span>
            </div>
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
            <p className={styles.note}>{active ? 'You’re speaking with an AI assistant. End the call anytime.' : 'Voice conversation with an AI assistant. Microphone access is requested only when you start.'}</p>
          </div>
          <footer className={styles.footer}><a href="https://getcaros.com/privacy">Privacy</a><span>Powered by Retell</span><a href="https://getcaros.com/terms">Terms</a></footer>
        </section>
      )}
    </div>
  )
}
