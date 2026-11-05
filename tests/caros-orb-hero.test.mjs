import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const messages = lang => JSON.parse(read(`messages/${lang}.json`))

test('hero restores the original AnimatedGlobe + grid backdrop, once, outside the story', () => {
  const hero = read('components/caros/home/hero.tsx')
  assert.match(hero, /import \{ AnimatedGlobe \} from "@\/components\/caros\/animated-globe"/)
  assert.equal((hero.match(/<AnimatedGlobe\b/g) ?? []).length, 1)
  assert.match(hero, /data-hero-orb/)
  assert.match(hero, /pointer-events-none/)
  assert.match(hero, /aria-hidden/)
  assert.match(hero, /data-hero-grid/)
  assert.match(hero, /HomePage\.hero/)
  // the calculator story is not nested in the orb hero
  assert.doesNotMatch(hero, /<HiringStory/)
})

test('no AnimatedGlobe in any story subsection or other home component', () => {
  for (const f of readdirSync(new URL('../components/caros/home', import.meta.url))) {
    if (f === 'hero.tsx') continue
    assert.doesNotMatch(read(`components/caros/home/${f}`), /AnimatedGlobe/, f)
  }
  const page = read('app/[locale]/page.tsx')
  assert.doesNotMatch(page, /AnimatedGlobe/)
})

test('globe stops animating offscreen and keeps the original implementation', () => {
  const g = read('components/caros/animated-globe.tsx')
  assert.match(g, /IntersectionObserver/)
  assert.match(g, /const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯"/)
  assert.match(g, /rgba\(201, 162, 39/)
  assert.match(g, /data-globe-frame|dataset\.frame/)
  assert.match(g, /ResizeObserver|addEventListener\("resize"/)
})

test('page order: Hero, then a contiguous story band, then showcase', () => {
  const page = read('app/[locale]/page.tsx')
  const order = ['<Hero', '<HiringStory', '<ProductShowcase', '<DisconnectedCost', '<StackCalculator', '<UnifiedSystem', '<ChallengePairs', '<LifecycleFlow', '<ProductExperience', '<Roi', '<CtaBand']
  const at = order.map(s => page.indexOf(s))
  assert.ok(at.every(i => i >= 0), `missing ${order.filter((s, i) => at[i] < 0)}`)
  assert.deepEqual([...at].sort((a, b) => a - b), at)
})

test('shared wide homepage container replaces 1200/6xl outer strips', () => {
  const css = read('app/globals.css')
  assert.match(css, /\.home-container\s*\{/)
  assert.match(css, /2560px/)
  const files = readdirSync(new URL('../components/caros/home', import.meta.url)).map(f => `components/caros/home/${f}`)
  files.push('components/caros/cta-band.tsx', 'app/[locale]/page.tsx')
  for (const f of files) assert.doesNotMatch(read(f), /max-w-\[1[0-3]00px\]|max-w-6xl/, f)
  const hero = read('components/caros/home/hero.tsx')
  assert.match(hero, /home-container/)
  assert.match(read('DESIGN.md'), /home-container/)
})

test('hero keeps approved narrative copy and uses a localized eyebrow', () => {
  for (const l of ['en', 'es']) {
    const m = messages(l)
    assert.ok(m.HomePage.hero.eyebrow.length > 5)
    assert.ok(m.Home.hero.title && m.Home.hero.subtitle && m.Home.hero.growthBody && m.Home.hero.productValue)
  }
  assert.equal(messages('en').Home.hero.title, 'Your Business Is Growing.')
  assert.doesNotMatch(read('components/caros/home/hero.tsx'), /Revenue First|marquee|freeAuditCta|data-caros-chat-dock/)
})
