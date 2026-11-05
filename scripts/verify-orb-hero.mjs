// node scripts/verify-orb-hero.mjs <baseUrl> <outDir>
// Real-browser checks for the restored orb hero and wide homepage container (EN/ES). Needs PLAYWRIGHT_CORE / CHROMIUM_PATH.
import { mkdirSync, writeFileSync } from 'node:fs'
const [base = 'http://localhost:3101', out = '/tmp/orb-shots'] = process.argv.slice(2)
const pw = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')
const chromium = pw.chromium ?? pw.default.chromium
mkdirSync(out, { recursive: true })
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const consent = { name: 'caros_consent', value: encodeURIComponent(JSON.stringify({ v: 1, ts: 1, analytics: false, marketing: false })), url: base }
const results = []
const chk = (name, pass, detail = '') => { results.push({ name, pass: !!pass, detail }); if (!pass) console.log('FAIL', name, detail) }
const LOCALES = (process.env.LOCALES ?? 'en,es').split(',')
const SIZES = (process.env.SIZES ?? '360x800,390x844,768x1024,1440x900,1920x1080,2560x1300').split(',').map(s => s.split('x').map(Number))
const widths = []

for (const locale of LOCALES) for (const [w, h] of SIZES) {
  const tag = `${locale}@${w}`
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  await ctx.addCookies([consent])
  const page = await ctx.newPage()
  await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  // orb: exactly one, painted on first paint, animating, in the hero only
  chk(`${tag} exactly one orb canvas, inside the hero`, (await page.locator('[data-story="root"] canvas').count()) === 1 && (await page.locator('[data-story="hero"] [data-hero-orb] canvas').count()) === 1)
  const orb = await page.evaluate(() => {
    const c = document.querySelector('[data-hero-orb] canvas'); const r = c.getBoundingClientRect(); const ctx = c.getContext('2d')
    const d = ctx.getImageData(0, 0, c.width, c.height).data; let ink = 0; for (let i = 3; i < d.length; i += 4 * 7) if (d[i] > 20) ink++
    const wrap = c.parentElement.getBoundingClientRect()
    return { ink, frame: +c.dataset.frame, wrap: { l: wrap.left, r: wrap.right, t: wrap.top, b: wrap.bottom }, pe: getComputedStyle(c.parentElement).pointerEvents, aria: c.parentElement.getAttribute('aria-hidden'), over: document.documentElement.scrollWidth - innerWidth }
  })
  chk(`${tag} orb painted visible particles on first paint`, orb.ink > 150, JSON.stringify(orb))
  chk(`${tag} orb is decorative: aria-hidden, no pointer events, no horizontal overflow`, orb.aria === 'true' && orb.pe === 'none' && orb.over <= 0, JSON.stringify(orb))
  const f2 = await page.evaluate(async () => { const c = document.querySelector('[data-hero-orb] canvas'); const a = +c.dataset.frame; await new Promise(r => setTimeout(r, 500)); return { a, b: +c.dataset.frame } })
  chk(`${tag} orb animates in normal motion (frame counter advances)`, f2.b > f2.a + 5, JSON.stringify(f2))
  // pauses offscreen
  await page.evaluate(() => scrollTo(0, document.querySelector('[data-story="hero"]').getBoundingClientRect().bottom + scrollY + 1500)); await page.waitForTimeout(400)
  const off = await page.evaluate(async () => { const c = document.querySelector('[data-hero-orb] canvas'); const a = +c.dataset.frame; await new Promise(r => setTimeout(r, 500)); return { a, b: +c.dataset.frame } })
  chk(`${tag} orb stops drawing once scrolled out of view`, off.b - off.a <= 1, JSON.stringify(off))
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400)
  const back = await page.evaluate(async () => { const c = document.querySelector('[data-hero-orb] canvas'); const a = +c.dataset.frame; await new Promise(r => setTimeout(r, 400)); return { a, b: +c.dataset.frame } })
  chk(`${tag} orb resumes when back on screen`, back.b > back.a + 5, JSON.stringify(back))
  // hero composition
  const hero = await page.evaluate(() => {
    const q = s => document.querySelector(s).getBoundingClientRect(); const h1 = q('h1'); const fs = parseFloat(getComputedStyle(document.querySelector('h1')).fontSize)
    const orbR = q('[data-hero-orb]'); const pv = q('[data-story="product-value"]'); const gr = q('[data-story="growth"]')
    return { h1fs: fs, h1: { l: h1.left, r: h1.right, b: h1.bottom }, pvBottom: pv.bottom, growthBottom: gr.bottom, orbLeft: orbR.left, orbRight: orbR.right, vh: innerHeight, vw: innerWidth, eyebrow: document.querySelector('[data-story="hero"] span.font-mono').textContent.trim(), gold: !!document.querySelector('h1 .text-gold-gradient') }
  })
  chk(`${tag} headline hierarchy: display H1 with gold italic phrase, localized eyebrow`, hero.gold && hero.eyebrow.length > 10 && hero.h1fs >= (w >= 1440 ? 64 : w >= 768 ? 40 : 34), JSON.stringify(hero))
  chk(`${tag} CAROS product statement is above the fold`, hero.pvBottom <= hero.vh, JSON.stringify(hero))
  chk(`${tag} orb stays within the viewport horizontally on large screens (art on the right)`, w < 1024 || (hero.orbRight <= hero.vw + 0.03 * hero.vw && hero.orbLeft > hero.vw * 0.35), JSON.stringify(hero))
  if (w >= 1024) chk(`${tag} H1 text does not run under most of the orb (H1 right edge < 62% of viewport)`, hero.h1.r < hero.vw * 0.62, JSON.stringify(hero))
  // container widths
  const cw = await page.evaluate(() => { const cs = ['[data-story="hero"] .home-container', '[data-story="band"] .home-container', '[data-story="showcase"] .home-container', '[data-story="software"] .home-container', '#stack-calculator .home-container', '#unified-capabilities .home-container'].map(s => { const e = document.querySelector(s); if (!e) return [s, null]; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return [s, Math.round(r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))] }); return cs })
  widths.push({ tag, vw: w, content: cw })
  const ratio = k => cw.filter(([, v]) => v).map(([, v]) => v / w)
  chk(`${tag} homepage sections exist in the shared container`, cw.every(([, v]) => v), JSON.stringify(cw))
  if (w >= 1920) chk(`${tag} content uses 86-94% of viewport`, ratio().every(r => r >= 0.86 && r <= 0.94), JSON.stringify(cw))
  if (w >= 1440 && w < 1920) chk(`${tag} content well beyond the old 1200px strip`, cw.every(([, v]) => v >= 1250), JSON.stringify(cw))
  if (w <= 768) chk(`${tag} narrow screens keep sensible gutters`, cw.every(([, v]) => v >= w - 100 && v <= w - 30), JSON.stringify(cw))
  // prose line-length bound
  const prose = await page.evaluate(() => Math.max(...[...document.querySelectorAll('[data-story="growth"], [data-story="product-value"], [data-story="demands"] p + p')].map(e => e.getBoundingClientRect().width)))
  chk(`${tag} prose keeps a bounded line length (<= 760px)`, prose <= 760, String(prose))
  chk(`${tag} showcase image scales with the wide container`, (await page.locator('[data-story="showcase"] img').boundingBox()).width >= Math.min(w - 90, w * 0.85), '')
  // story selectors, order and CTAs unchanged
  const order = await page.evaluate(() => ['[data-story="headline"]', '[data-story="growth"]', '[data-story="product-value"]', '[data-story="demands"]', '[data-story="cost-question"]', '[data-story="calculator"]', '[data-story="positions"]', '[data-story="reveal"]', '[data-story="cta"]', '[data-story="showcase"]', '[data-story="software"]', '#stack-calculator', '#unified-capabilities'].map(s => document.querySelector(s)?.getBoundingClientRect().top + scrollY))
  chk(`${tag} narrative order preserved`, order.every((t, i) => Number.isFinite(t) && (i === 0 || t > order[i - 1] || (i === 5 && t >= order[4] - 2))), JSON.stringify(order))
  chk(`${tag} both story CTAs present after the reveal`, (await page.locator('[data-story="cta"] a').count()) === 2)
  chk(`${tag} calculator not nested in the orb hero`, (await page.locator('[data-story="hero"] [data-story="calculator"]').count()) === 0 && (await page.locator('[data-story="hero"] canvas').count()) === 1)
  // 5/10 sync still works
  await page.locator('[data-story="toggle"] button').nth(1).click()
  chk(`${tag} 10 toggle syncs input and functions`, (await page.locator('[data-story="calculator"] input').nth(0).inputValue()) === '10' && (await page.locator('[data-story="function"]').count()) === 10)
  await page.locator('[data-story="toggle"] button').nth(0).click()
  // hotspots
  const hs = page.locator('[data-story="showcase"] [role=group] button'); chk(`${tag} six hotspots`, (await hs.count()) === 6)
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300)
  await page.screenshot({ path: `${out}/orb-${locale}-${w}-fold.png` })
  if (w === 390 || w === 1440 || w === 1920 || w === 2560) await page.screenshot({ path: `${out}/orb-${locale}-${w}-full.png`, fullPage: true })
  await ctx.close()
}
// reduced motion: static orb, painted, no frame advance
for (const locale of LOCALES) for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); await ctx.addCookies([consent])
  const page = await ctx.newPage(); await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' }); await page.waitForTimeout(600)
  const r = await page.evaluate(async () => { const c = document.querySelector('[data-hero-orb] canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let ink = 0; for (let i = 3; i < d.length; i += 28) if (d[i] > 20) ink++; const a = +c.dataset.frame; await new Promise(r => setTimeout(r, 500)); return { ink, a, b: +c.dataset.frame } })
  chk(`${locale}@${w} reduced motion: static orb painted once, no animation loop`, r.ink > 150 && r.a === 1 && r.b === 1, JSON.stringify(r))
  await page.screenshot({ path: `${out}/orb-${locale}-${w}-reduced.png` }); await ctx.close()
}
// first-visit consent banner coexists with chat launcher and hero
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage()
  await page.goto(`${base}/en`, { waitUntil: 'networkidle' }); await page.waitForSelector('[data-caros-consent]')
  chk(`en@${w} consent banner visible on first visit and no overflow`, (await page.locator('[data-caros-consent]').isVisible()) && (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0)
  chk(`en@${w} floating chat launcher present`, (await page.getByText(/Talk to us/i).count()) > 0)
  await page.screenshot({ path: `${out}/orb-en-${w}-consent.png` }); await ctx.close()
}
await browser.close()
const failed = results.filter(r => !r.pass)
writeFileSync(`${out}/orb-checks.json`, JSON.stringify({ widths, results }, null, 1))
console.log(`orb hero checks: ${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
