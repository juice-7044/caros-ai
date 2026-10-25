import test from 'node:test'
import assert from 'node:assert/strict'
import { VoiceSessionController, audioLevel, CAROS_VOICE_CONFIG } from '../lib/caros-voice-session.ts'

function harness(factoryOverride) {
  let options, ends = 0, disconnects = 0, muted = false, now = 1000
  const session = { ready: Promise.resolve(), end: async () => { ends++ }, disconnect: () => { disconnects++ }, mute: () => { muted = true }, unmute: () => { muted = false }, startAudioPlayback: async () => {} }
  const factory = factoryOverride || (async () => ({ createWebCall: o => { options = o; return session } }))
  const controller = new VoiceSessionController(factory, () => now)
  return { controller, session, options: () => options, ends: () => ends, disconnects: () => disconnects, muted: () => muted, advance: ms => { now += ms } }
}
test('does not auto-start; explicit start uses the exact public agent/version without transcripts', async () => {
  const h = harness()
  assert.equal(h.options(), undefined)
  assert.equal(h.controller.getSnapshot().phase, 'idle')
  await h.controller.start()
  assert.equal(h.options().agent_id, 'agent_b1913c7cc373ca7b77384368dc')
  assert.equal(h.options().agent_version, 9)
  assert.equal(h.options().transcript, false)
  assert.equal(h.options().audio.emitRawAudioSamples, true)
  assert.equal(CAROS_VOICE_CONFIG.publicKey, 'public_key_39a99c32f015ae9b68999')
})
test('duplicate start is blocked and real status/audio callbacks drive the orb', async () => {
  const h = harness()
  await h.controller.start()
  const first = h.options()
  await h.controller.start()
  assert.equal(h.options(), first)
  first.hooks.onStatus('live')
  assert.equal(h.controller.getSnapshot().phase, 'live')
  assert.equal(h.controller.levelRef.current, 0)
  first.hooks.onAudio(new Float32Array(32).fill(.2))
  assert.ok(h.controller.levelRef.current > 0)
  assert.equal(h.controller.getSnapshot().orbState, 'speaking')
  h.advance(500)
  first.hooks.onAudio(new Float32Array(32))
  assert.equal(h.controller.getSnapshot().orbState, 'listening')
})
test('mute and unmute use the same SDK session; ending disconnects and ignores stale hooks', async () => {
  const h = harness()
  await h.controller.start()
  const hooks = h.options().hooks
  hooks.onStatus('live')
  h.controller.toggleMute()
  assert.equal(h.muted(), true)
  assert.equal(h.controller.getSnapshot().muted, true)
  h.controller.toggleMute()
  assert.equal(h.muted(), false)
  h.controller.stop()
  assert.equal(h.disconnects(), 1)
  assert.equal(h.controller.getSnapshot().phase, 'idle')
  assert.equal(h.controller.levelRef.current, -1)
  hooks.onStatus('live')
  hooks.onAudio(new Float32Array([1]))
  assert.equal(h.controller.getSnapshot().phase, 'idle')
  assert.equal(h.controller.levelRef.current, -1)
})
test('permission denial is actionable, releases the session, and survives a late end event', async () => {
  const h = harness()
  await h.controller.start()
  const hooks = h.options().hooks
  hooks.onError(new DOMException('Permission denied', 'NotAllowedError'))
  hooks.onEnd({})
  assert.equal(h.controller.getSnapshot().phase, 'error')
  assert.match(h.controller.getSnapshot().error, /microphone/i)
  assert.equal(h.disconnects(), 1)
})
test('cancelling while the SDK is loading prevents creation of a late call', async () => {
  let resolve, created = false
  const factory = () => new Promise(r => { resolve = r })
  const h = harness(factory)
  const pending = h.controller.start()
  h.controller.stop()
  resolve({ createWebCall: () => { created = true; return h.session } })
  await pending
  assert.equal(created, false)
  assert.equal(h.controller.getSnapshot().phase, 'idle')
})
test('audio level is finite, bounded and calculated from incoming samples only', () => {
  assert.equal(audioLevel(new Float32Array()), 0)
  assert.equal(audioLevel(new Float32Array([NaN, Infinity])), 0)
  assert.equal(audioLevel(new Float32Array([0, 0])), 0)
  assert.ok(audioLevel(new Float32Array([.1, -.1])) > 0)
  assert.equal(audioLevel(new Float32Array([2, -2])), 1)
})

for (const staleRejects of [false, true]) {
  test(`stale playback recovery ${staleRejects ? 'rejection' : 'success'} cannot alter a later call`, async () => {
    let resolveOld, rejectOld, options, created = 0, firstPlayback = 0
    const pendingOld = new Promise((resolve, reject) => { resolveOld = resolve; rejectOld = reject })
    const blockedB = !staleRejects
    const controller = new VoiceSessionController(async () => ({ createWebCall: o => {
      options = o
      created++
      const isFirst = created === 1
      return {
        ready: Promise.resolve(), disconnect() {}, mute() {}, unmute() {},
        startAudioPlayback: () => {
          if (isFirst) return ++firstPlayback === 1 ? Promise.resolve() : pendingOld
          return blockedB ? Promise.reject(new Error('Autoplay blocked')) : Promise.resolve()
        },
      }
    } }))
    await controller.start()
    options.hooks.onStatus('live')
    const oldRecovery = controller.resumeAudio()
    controller.stop()
    await controller.start()
    options.hooks.onStatus('live')
    assert.equal(controller.getSnapshot().playbackBlocked, blockedB)
    if (staleRejects) rejectOld(new Error('Old playback failed'))
    else resolveOld()
    await oldRecovery
    assert.equal(controller.getSnapshot().playbackBlocked, blockedB)
    assert.equal(controller.getSnapshot().phase, 'live')
    controller.stop()
  })
}
