import type { WebCallOptions, WebCallSession } from 'retell-client-js-sdk'
import type { OrbState } from '@/registry/lib/orb-state'

export const CAROS_VOICE_CONFIG = {
  publicKey: 'public_key_39a99c32f015ae9b68999',
  agentId: 'agent_b1913c7cc373ca7b77384368dc',
  agentVersion: 9,
} as const

type Session = Pick<WebCallSession, 'ready' | 'disconnect' | 'mute' | 'unmute' | 'startAudioPlayback'>
type Client = { createWebCall: (options: WebCallOptions) => Session }
export type VoiceSnapshot = {
  phase: 'idle' | 'connecting' | 'live' | 'error'
  orbState: OrbState
  muted: boolean
  error: string | null
  playbackBlocked: boolean
}

const INITIAL: VoiceSnapshot = { phase: 'idle', orbState: 'idle', muted: false, error: null, playbackBlocked: false }

/** Measured incoming audio, not microphone capture or simulated speech activity. */
export function audioLevel(samples: Float32Array): number {
  let sum = 0
  for (const value of samples) {
    if (Number.isFinite(value)) sum += value * value
  }
  const rms = samples.length ? Math.sqrt(sum / samples.length) : 0
  return Math.min(1, Math.max(0, (rms - 0.006) * 5))
}

function friendlyError(error: unknown): string {
  const name = error instanceof Error ? error.name : ''
  const message = error instanceof Error ? error.message : String(error)
  if (/NotAllowed|SecurityError/.test(name) || /permission|denied/i.test(message)) {
    return 'Microphone access is blocked. Allow your microphone in browser settings, then try again.'
  }
  if (/NotFound|NotReadable/.test(name) || /microphone|audio input/i.test(message)) {
    return 'We could not access your microphone. Check that it is connected and not in use, then try again.'
  }
  if (/401|403|unauthori|api key|public key|domain|recaptcha/i.test(message)) {
    return 'Voice connection was not authorized. Please try again or contact CAROS using the website contact details.'
  }
  return 'We could not connect to CAROS. Check your connection and try again.'
}

/** A single call owner; no DOM-observed state or second microphone stream. */
export class VoiceSessionController {
  readonly levelRef = { current: -1 }
  private snapshot: VoiceSnapshot = INITIAL
  private listeners = new Set<() => void>()
  private session: Session | null = null
  private generation = 0
  private lastAudioAt = -Infinity
  private createClient: () => Promise<Client>
  private now: () => number

  constructor(createClient: () => Promise<Client>, now = () => Date.now()) {
    this.createClient = createClient
    this.now = now
  }

  getSnapshot = () => this.snapshot
  getServerSnapshot = () => INITIAL
  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  private update(next: Partial<VoiceSnapshot>) {
    if (Object.entries(next).every(([key, value]) => this.snapshot[key as keyof VoiceSnapshot] === value)) return
    this.snapshot = { ...this.snapshot, ...next }
    this.listeners.forEach(listener => listener())
  }

  async start() {
    if (this.snapshot.phase === 'connecting' || this.snapshot.phase === 'live') return
    const generation = ++this.generation
    this.levelRef.current = 0
    this.lastAudioAt = -Infinity
    this.update({ phase: 'connecting', orbState: 'connecting', error: null, muted: false, playbackBlocked: false })
    const current = () => generation === this.generation
    const fail = (error: unknown) => {
      if (!current()) return
      this.release()
      this.update({ phase: 'error', orbState: 'error', error: friendlyError(error), muted: false, playbackBlocked: false })
    }
    try {
      const client = await this.createClient()
      if (!current()) return
      const session = client.createWebCall({
        agent_id: CAROS_VOICE_CONFIG.agentId,
        agent_version: CAROS_VOICE_CONFIG.agentVersion,
        transcript: false,
        audio: { emitRawAudioSamples: true },
        hooks: {
          onStatus: status => {
            if (!current()) return
            if (status === 'live') this.update({ phase: 'live', orbState: 'listening' })
          },
          onAudio: samples => {
            if (!current() || this.snapshot.phase !== 'live') return
            const level = audioLevel(samples)
            this.levelRef.current = level
            if (level > 0.035) this.lastAudioAt = this.now()
            // An audio-activity estimate, not an exact speaking or turn-taking event.
            const audioActive = this.now() - this.lastAudioAt < 280
            this.update({ orbState: audioActive ? 'speaking' : this.snapshot.muted ? 'disabled' : 'listening' })
          },
          onError: fail,
          onEnd: () => { if (current()) this.stop() },
        },
      })
      if (!current()) { session.disconnect(); return }
      this.session = session
      await session.ready
      if (!current()) return
      try { await session.startAudioPlayback() }
      catch { if (current()) this.update({ playbackBlocked: true }) }
    } catch (error) { fail(error) }
  }

  toggleMute() {
    if (!this.session || this.snapshot.phase !== 'live') return
    const muted = !this.snapshot.muted
    if (muted) this.session.mute()
    else this.session.unmute()
    this.update({ muted, orbState: muted ? 'disabled' : 'listening' })
  }

  async resumeAudio() {
    try {
      await this.session?.startAudioPlayback()
      this.update({ playbackBlocked: false })
    } catch { this.update({ playbackBlocked: true }) }
  }

  private release() {
    this.generation += 1
    const session = this.session
    this.session = null
    this.levelRef.current = -1
    // For an SDK web call, disconnecting ends the call and releases media immediately.
    session?.disconnect()
  }

  stop() {
    this.release()
    this.update(INITIAL)
  }
}
