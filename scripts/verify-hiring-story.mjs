// node scripts/verify-hiring-story.mjs <baseUrl> <outDir>
// Real-browser checks for the hiring story: DOM order, shared 5/10 state, function expansion, convergence animation,
// reduced motion, overflow/overlap/clipping, contact launcher, consent banner. Needs PLAYWRIGHT_CORE / CHROMIUM_PATH like capture-home.mjs.
import { mkdirSync, writeFileSync } from 'node:fs'
const [base = 'http://localhost:3101', out = 'docs/screenshots'] = process.argv.slice(2)
const pw = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')
const chromium = pw.chromium ?? pw.default.chromium
mkdirSync(out, { recursive: true })
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const consent = { name: 'caros_consent', value: encodeURIComponent(JSON.stringify({ v: 1, ts: 1, analytics: false, marketing: false })), url: base }
const results = []
const chk = (name, pass, detail = '') => { results.push({ name, pass: !!pass, detail }); if (!pass) console.log('FAIL', name, detail) }
const norm = x => x.replace(/\s/g, ' ')
const fmt = (n, locale) => norm(n.toLocaleString(locale === 'es' ? 'es-419' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }))
const S = k => `[data-story="${k}"]`

async function open(locale, width, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: width >= 1440 ? 900 : 800 }, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' })
  if (!opts.firstVisit) await ctx.addCookies([consent])
  const page = await ctx.newPage()
  await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
  return page
}
const top = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + window.scrollY : null }, sel)

const LOCALES = (process.env.LOCALES ?? 'en,es').split(',')
const WIDTHS = (process.env.WIDTHS ?? '360,390,768,1440').split(',').map(Number)
for (const locale of LOCALES) {
  for (const width of WIDTHS) {
    const tag = `${locale}@${width}`
    const page = await open(locale, width)
    // 1. DOM / visual order
    const order = ['headline', 'growth', 'product-value', 'demands', 'cost-question', 'calculator', 'positions', 'reveal', 'cta', 'showcase', 'software'].map(k => [k, S(k)])
    order.push(['stack', '#stack-calculator'], ['capabilities', '#unified-capabilities'])
    const tops = []
    for (const [k, sel] of order) tops.push([k, await top(page, sel)])
    chk(`${tag} all story blocks exist`, tops.every(([, t]) => t !== null), JSON.stringify(tops))
    chk(`${tag} story blocks are in strict vertical order`, tops.every(([, t], i) => i === 0 || t > tops[i - 1][1]), JSON.stringify(tops))
    const preCalc = await page.evaluate(() => {
      const calc = document.querySelector('[data-story="calculator"]').getBoundingClientRect().top + scrollY
      return [...document.querySelectorAll('main a, main button')].filter(e => !e.closest('[data-story="calculator"]') && e.getBoundingClientRect().top + scrollY < calc).map(e => e.tagName + ':' + e.textContent.trim().slice(0, 40))
    })
    chk(`${tag} growth introduction precedes cost without distracting links or buttons`, preCalc.length === 0, JSON.stringify(preCalc))
    const valueBox = await page.locator(S('product-value')).boundingBox()
    chk(`${tag} CAROS value statement is above the fold`, valueBox.y + valueBox.height < (width >= 1440 ? 900 : 800))
    const demoLinks = await page.evaluate(() => [...document.querySelectorAll('a[href^="https://demo.getcaros.com"]')].filter(a => !a.closest('header, nav')).map(a => ({ y: a.getBoundingClientRect().top + scrollY, inStory: !!a.closest('[data-story="cta"]') })))
    const revealTop = tops.find(([k]) => k === 'reveal')[1]
    chk(`${tag} primary demo CTA exists after the value reveal and before the screenshot`, demoLinks.some(l => l.inStory && l.y > revealTop) && demoLinks.filter(l => l.y < revealTop).length === 0, JSON.stringify(demoLinks))
    chk(`${tag} secondary CTA after reveal`, (await page.locator(`${S('cta')} a:not([href^="https"])`).count()) >= 1)
    chk(`${tag} no free-resources link or chat dock in hero`, (await page.locator('[data-caros-chat-dock]').count()) === 0 && (await page.locator('main a[href$="/resources"]').count()) === 0)
    chk(`${tag} exactly one command-center screenshot`, (await page.locator('img[src*="caros-command-center"]').count()) === 1)
    if (width >= 1440) { const b = await page.locator(`${S('showcase')} img`).boundingBox(); chk(`${tag} showcase is full width (>=1100px)`, b.width >= 1100, String(b.width)) }
    else { const b = await page.locator(`${S('showcase')} img`).boundingBox(); chk(`${tag} showcase spans the viewport width`, b.width >= width - 56, String(b.width)) }
    // 2. shared state
    const count = page.locator(`${S('calculator')} input`).nth(0)
    const salary = page.locator(`${S('calculator')} input`).nth(1)
    const result = page.locator(S('result'))
    const toggles = page.locator(`${S('toggle')} button`)
    const state = async () => ({ count: await count.inputValue(), result: norm(await result.innerText()), roles: await page.locator(S('role')).count(), fns: await page.locator(S('function')).count(), mode: await page.locator('[data-story-mode]').first().getAttribute('data-story-mode'), pressed: await toggles.evaluateAll(b => b.map(x => x.getAttribute('aria-pressed'))) })
    let s = await state()
    chk(`${tag} default is 5 / $250,000 / five roles`, s.count === '5' && s.result.includes(fmt(250000, locale)) && s.roles === 5 && s.fns === 0 && s.mode === 'five' && s.pressed[0] === 'true', JSON.stringify(s))
    await toggles.nth(1).click()
    s = await state()
    chk(`${tag} toggle 10 syncs input, $500,000, ten functions, aria-pressed`, s.count === '10' && s.result.includes(fmt(500000, locale)) && s.roles === 0 && s.fns === 10 && s.mode === 'ten' && s.pressed[1] === 'true', JSON.stringify(s))
    await salary.fill('60000')
    s = await state()
    chk(`${tag} salary edit updates the result`, s.result.includes(fmt(600000, locale)), s.result)
    await count.fill('7')
    s = await state()
    chk(`${tag} custom 7 shows the five-role view with a custom note`, s.mode === 'five' && s.roles === 5 && s.result.includes(fmt(420000, locale)) && (await page.locator(S('custom-note')).count()) === 1 && s.pressed.every(p => p === 'false'), JSON.stringify(s))
    await count.fill('12')
    s = await state()
    chk(`${tag} custom 12 shows the ten-function view with a custom note`, s.mode === 'ten' && s.fns === 10 && (await page.locator(S('custom-note')).count()) === 1 && s.result.includes(fmt(720000, locale)), JSON.stringify(s))
    await count.fill('')
    s = await state()
    chk(`${tag} empty headcount: $0, no NaN, five-role view`, s.result.includes(fmt(0, locale)) && !s.result.includes('NaN') && s.mode === 'five', JSON.stringify(s))
    await toggles.nth(1).click(); await toggles.nth(0).click()
    s = await state()
    chk(`${tag} toggle back to 5 restores five roles`, s.count === '5' && s.roles === 5 && s.fns === 0 && s.result.includes(fmt(300000, locale)), JSON.stringify(s))
    chk(`${tag} five roles show all five titles and descriptions`, (await page.locator(`${S('role')} h3, ${S('role')} [data-role-title]`).count()) === 5 && (await page.locator(S('role')).evaluateAll(r => r.every(x => x.innerText.trim().length > 40))))
    // 3. ten functions: each expands with tap and keyboard
    await toggles.nth(1).click()
    const fbtns = page.locator(`${S('function')} button`)
    let allOpen = true
    for (let i = 0; i < 10; i++) {
      await fbtns.nth(i).click()
      const ok = (await fbtns.nth(i).getAttribute('aria-expanded')) === 'true' && await page.locator(`#${await fbtns.nth(i).getAttribute('aria-controls')}`).isVisible()
      allOpen = allOpen && ok
    }
    chk(`${tag} all ten functions expand on click and show a description`, allOpen)
    await fbtns.nth(0).focus(); await page.keyboard.press('Enter')
    chk(`${tag} Enter toggles a function closed`, (await fbtns.nth(0).getAttribute('aria-expanded')) === 'false')
    await fbtns.nth(0).focus(); await page.keyboard.press('Space')
    chk(`${tag} Space toggles a function open`, (await fbtns.nth(0).getAttribute('aria-expanded')) === 'true')
    // 4. overflow, overlap, clipping inside the story
    const layout = await page.evaluate(() => {
      const root = document.querySelector('[data-story="root"]')
      const rects = [...root.querySelectorAll('button, a, input')].filter(e => e.offsetParent !== null).map(e => ({ t: e.tagName + ':' + (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 24), r: e.getBoundingClientRect() }))
      const overlaps = []
      for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) { const a = rects[i].r, b = rects[j].r; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) overlaps.push(rects[i].t + ' x ' + rects[j].t) }
      const clipped = [...root.querySelectorAll('h1,h2,h3,p,button,a,span')].filter(e => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== 'inline' && getComputedStyle(e).overflow !== 'visible').map(e => e.textContent.trim().slice(0, 30))
      const offscreen = [...root.querySelectorAll('h1,h2,h3,p,button,a,input')].filter(e => e.offsetParent !== null && (e.getBoundingClientRect().right > innerWidth + 1 || e.getBoundingClientRect().left < -1)).map(e => e.textContent.trim().slice(0, 30))
      return { overlaps, clipped, offscreen, overflow: document.documentElement.scrollWidth - innerWidth }
    })
    chk(`${tag} no horizontal overflow, overlap, clipping or off-screen content`, layout.overflow <= 0 && !layout.overlaps.length && !layout.clipped.length && !layout.offscreen.length, JSON.stringify(layout))
    // 5. convergence animation (normal motion)
    await toggles.nth(0).click()
    await page.locator(S('converge')).scrollIntoViewIfNeeded(); await page.waitForTimeout(150)
    const anim = await page.evaluate(() => ({ n: document.querySelector('[data-story="converge"]').getAnimations({ subtree: true }).length, lines: document.querySelectorAll('[data-story="converge"] [data-converge-line]').length, tokens: document.querySelectorAll('[data-story="converge"] [data-converge-token]').length, wordmark: !!document.querySelector('[data-story="converge"] [data-converge-wordmark]'), dash: !!document.querySelector('[data-story="converge"] [data-converge-dashboard]') }))
    chk(`${tag} convergence plays on entering view: 5 tokens, 5 lines, wordmark, dashboard, running animations`, anim.n > 0 && anim.lines === 5 && anim.tokens === 5 && anim.wordmark && anim.dash, JSON.stringify(anim))
    const before = await page.locator(S('converge')).boundingBox()
    await toggles.nth(1).click(); await page.waitForTimeout(100)
    const a10 = await page.evaluate(() => ({ n: document.querySelector('[data-story="converge"]').getAnimations({ subtree: true }).length, lines: document.querySelectorAll('[data-story="converge"] [data-converge-line]').length }))
    const after = await page.locator(S('converge')).boundingBox()
    chk(`${tag} mode change replays animation with 10 lines and no layout shift of the visual`, a10.n > 0 && a10.lines === 10 && Math.abs(before.height - after.height) < 1, JSON.stringify({ a10, before: before.height, after: after.height }))
    // line geometry: each line starts at its token and ends at the wordmark
    await page.evaluate(() => Promise.all(document.querySelector('[data-story="converge"]').getAnimations({ subtree: true }).map(a => a.finished)))
    const geo = await page.evaluate(() => { const c = document.querySelector('[data-story="converge"]'); const w = c.querySelector('[data-converge-wordmark]').getBoundingClientRect(); const ls = [...c.querySelectorAll('[data-converge-line]')].map(l => l.getBoundingClientRect()); return { wordmarkTop: w.top, bottoms: ls.map(l => Math.round(l.bottom)), maxEnd: Math.max(...ls.map(l => l.bottom)), spread: Math.max(...ls.map(l => l.right)) - Math.min(...ls.map(l => l.left)) } })
    chk(`${tag} lines span the row of tokens and end at the wordmark`, geo.spread > width * 0.4 && Math.abs(geo.maxEnd - geo.wordmarkTop) < 4, JSON.stringify(geo))
    await toggles.nth(0).click()
    await page.close()
  }
}
async function storyClip(page) {
  return page.evaluate(() => { const r = document.querySelector('[data-story="root"]'); const sw = document.querySelector('[data-story="showcase"]'); const a = r.getBoundingClientRect(); const b = sw.getBoundingClientRect(); return { x: 0, y: a.top + scrollY, width: innerWidth, height: b.bottom - a.top } })
}
// Fresh-state screenshots (five-role default, then the ten-function view with every function open) of hero -> screenshot.
for (const locale of LOCALES) for (const width of WIDTHS) {
  const page = await open(locale, width)
  const shot = async name => {
    await page.locator(S('converge')).scrollIntoViewIfNeeded(); await page.waitForTimeout(3200)
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(200)
    await page.screenshot({ path: `${out}/hiring-story-${locale}-${width}${name}.png`, fullPage: true, clip: await storyClip(page) })
  }
  await shot('')
  await page.locator(`${S('toggle')} button`).nth(1).click()
  const btns = page.locator(`${S('function')} button`)
  for (let i = 0; i < 10; i++) await btns.nth(i).click()
  await shot('-ten')
  await page.close()
}

// Reduced motion: fully static, lines drawn, no running animations, still readable.
for (const locale of ['en', 'es']) {
  const page = await open(locale, 390, { reduced: true })
  await page.locator(S('converge')).scrollIntoViewIfNeeded(); await page.waitForTimeout(400)
  const r = await page.evaluate(() => ({ n: document.querySelector('[data-story="converge"]').getAnimations({ subtree: true }).length, drawn: [...document.querySelectorAll('[data-converge-line]')].every(l => { const cs = getComputedStyle(l); return cs.opacity !== '0' && (cs.strokeDashoffset === '0px' || cs.strokeDashoffset === '0') }), tokensVisible: [...document.querySelectorAll('[data-converge-token]')].every(t => getComputedStyle(t).opacity !== '0') }))
  chk(`${locale} reduced motion: no running animations, lines fully drawn, tokens visible`, r.n === 0 && r.drawn && r.tokensVisible, JSON.stringify(r))
  await page.close()
}

// First visit: consent banner shows, nothing in the story is hidden permanently; floating contact launcher reachable.
for (const width of [360, 390, 768, 1440]) {
  const page = await open('en', width, { firstVisit: true })
  await page.waitForSelector('[data-caros-consent]')
  chk(`first visit @${width}: consent banner shown`, await page.locator('[data-caros-consent]').isVisible())
  await page.screenshot({ path: `${out}/hiring-story-en-${width}-consent.png` })
  await page.evaluate(() => scrollTo(0, 600)); await page.waitForTimeout(600)
  const l = page.locator('[data-caros-chat-launcher]')
  chk(`first visit @${width}: floating contact launcher present, in viewport and not covered by a story control`, await l.count() === 1 && await l.evaluate(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom <= innerHeight + 1 && r.right <= innerWidth + 1 && getComputedStyle(e).position !== 'static' }))
  await page.close()
}
const page = await open('en', 1440)
await page.waitForTimeout(500)
const l = page.locator('[data-caros-chat-launcher]')
chk('returning visitor: contact launcher floats at top of page (no hero dock needed)', await l.count() === 1 && await l.isVisible())
await l.click()
chk('contact launcher opens the chat panel', await page.locator('[data-testid="caros-voice-panel"]').isVisible())
await browser.close()
writeFileSync(`${out}/hiring-story-checks.json`, JSON.stringify(results, null, 1))
const failed = results.filter(r => !r.pass)
console.log(`hiring story checks: ${results.length - failed.length}/${results.length} pass`)
if (failed.length) { console.log(JSON.stringify(failed, null, 1)); process.exit(1) }
