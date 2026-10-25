import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
test('custom CAROS widget replaces the stock Retell embed, rather than layering over it', () => {
  const source = readFileSync(new URL('components/caros/chat-widget.tsx', root), 'utf8')
  assert.match(source, /ParticlesOrb/, 'The supplied particle orb must be mounted')
  assert.doesNotMatch(source, /retell-widget-v2\.js/, 'Stock widget must not run alongside the custom UI')
  assert.doesNotMatch(source, /getUserMedia|useAudioLevel/, 'Do not open a second microphone stream for decoration')
})
test('open-panel orb is enlarged and the launcher has distinct Talk to us wording', () => {
  const source = readFileSync(new URL('components/caros/chat-widget.tsx', root), 'utf8')
  assert.match(source, /size=\{240\}/, 'Opened orb should be larger than the original 168px')
  assert.match(source, /<strong>(?:Talk to us|\{tr\("Talk to us"\)\})<\/strong>/)
  assert.doesNotMatch(source, /<strong>Talk to CAROS<\/strong>/)
})

test('visitors can choose voice or website text chat without reintroducing a stock embed', () => {
  const source = readFileSync(new URL('components/caros/chat-widget.tsx', root), 'utf8')
  assert.match(source, /Text chat/)
  assert.match(source, /ChatSessionController/)
  assert.doesNotMatch(source, /retell-widget-v2\.js|SMS/)
})

test('CAROS launcher collapses into a circle, respects reduced motion and fits small screens', () => {
  const css = readFileSync(new URL('components/caros/chat-widget.module.css', root), 'utf8')
  assert.match(css, /\.launcherCompact \{[^}]*border-radius: 50%/)
  assert.doesNotMatch(css, /4in/)
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /max-height:/)
  assert.match(css, /safe-area-inset/)
})
