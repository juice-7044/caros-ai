import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('hero CTAs: demo link goes to demo.getcaros.com, secondary scrolls to the capabilities section', async () => {
  const { DEMO_URL, CAPABILITIES_ID } = await import('../lib/home-nav.ts')
  assert.equal(DEMO_URL, 'https://demo.getcaros.com')
  assert.equal(CAPABILITIES_ID, 'unified-capabilities')
  // Moved from hero.tsx to hiring-story.tsx: the CTAs now follow the value reveal (hiring story correction).
  const story = read('components/caros/home/hiring-story.tsx')
  assert.match(story, /href=\{DEMO_URL\}/)
  assert.match(story, /href=\{`#\$\{CAPABILITIES_ID\}`\}/)
  assert.match(read('components/caros/home/unified-system.tsx'), /id=\{CAPABILITIES_ID\}/)
})

test('homepage follows the section sequence (story, screenshot, software comparison, stack calculator, capabilities, ...)', () => {
  const page = read('app/[locale]/page.tsx')
  const order = ['<Hero', '<ProductShowcase', '<DisconnectedCost', '<StackCalculator', '<UnifiedSystem', '<ChallengePairs', '<LifecycleFlow', '<ProductExperience', '<Roi', '<CtaBand']
  const at = order.map(s => page.indexOf(s))
  assert.ok(at.every(i => i >= 0), `missing: ${order.filter((s, i) => at[i] < 0)}`)
  assert.deepEqual([...at].sort((a, b) => a - b), at)
})

test('product showcase uses the supplied real screenshot via next/image with accessible, percent-positioned hotspots', async () => {
  const { readFileSync, statSync } = await import('node:fs')
  const s = read('components/caros/home/product-showcase.tsx')
  assert.match(s, /from "next\/image"/)
  assert.match(s, /SCREENSHOT_PATH/)
  assert.match(read('lib/home-nav.ts'), /caros-command-center\.png/)
  assert.match(s, /aria-label=\{t\(`hotspots\./)
  assert.match(s, /aria-pressed/)
  assert.match(s, /track\("showcase_interaction"/)
  assert.match(s, /prefers-reduced-motion|caros-hotspot/)
  assert.doesNotMatch(s, /ask-caros|design\/demo|placeholder/)
  const png = readFileSync(new URL('../public/caros-command-center.png', import.meta.url))
  assert.equal(png.readUInt32BE(16), 2798)
  assert.equal(png.readUInt32BE(20), 1718)
  assert.ok(statSync(new URL('../public/caros-command-center.png', import.meta.url)).size < 500_000)
  for (const lang of ['en', 'es']) {
    const sc = JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), 'utf8')).Home.showcase
    assert.match(sc.caption, lang === 'en' ? /demo workspace with simulated data/ : /datos simulados/)
    assert.equal(Object.keys(sc.hotspots).length, 6)
  }
})
