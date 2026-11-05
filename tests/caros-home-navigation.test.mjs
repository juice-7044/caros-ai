import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('hero CTAs: demo link goes to demo.getcaros.com, secondary scrolls to the capabilities section', async () => {
  const { DEMO_URL, CAPABILITIES_ID } = await import('../lib/home-nav.ts')
  assert.equal(DEMO_URL, 'https://demo.getcaros.com')
  assert.equal(CAPABILITIES_ID, 'unified-capabilities')
  const hero = read('components/caros/home/hero.tsx')
  assert.match(hero, /href=\{DEMO_URL\}/)
  assert.match(hero, /href=\{`#\$\{CAPABILITIES_ID\}`\}/)
  assert.match(read('components/caros/home/unified-system.tsx'), /id=\{CAPABILITIES_ID\}/)
})

test('homepage follows the nine-section sequence', () => {
  const page = read('app/[locale]/page.tsx')
  const order = ['<Hero', '<UnifiedSystem', '<DisconnectedCost', '<StackCalculator', '<ChallengePairs', '<LifecycleFlow', '<ProductExperience', '<Roi', '<CtaBand']
  const at = order.map(s => page.indexOf(s))
  assert.ok(at.every(i => i >= 0), `missing: ${order.filter((s, i) => at[i] < 0)}`)
  assert.deepEqual([...at].sort((a, b) => a - b), at)
})

test('product screenshot is only referenced behind an existence check; no other dashboard image is used', () => {
  const s = read('components/caros/home/product-showcase.tsx')
  assert.match(s, /caros-command-center\.png/)
  assert.match(s, /existsSync/)
  assert.doesNotMatch(s, /ask-caros|design\/demo|placeholder/)
})
