// node scripts/capture-home.mjs <baseUrl> <outDir>: responsive screenshots + interaction/analytics checks on the homepage.
import { writeFileSync, mkdirSync } from 'node:fs'
const [base = 'http://localhost:3101', out = 'docs/screenshots'] = process.argv.slice(2)
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')
mkdirSync(out, { recursive: true })
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const report = { widths: [], checks: [] }
// Analytics now requires consent: run with analytics granted (marketing denied) unless a check says otherwise.
const consentCookie = { name: 'caros_consent', value: encodeURIComponent(JSON.stringify({ v: 1, ts: 1, analytics: true, marketing: false })), url: base }
async function newPage(opts, withConsent = true) {
  const ctx = await browser.newContext(opts)
  if (withConsent) await ctx.addCookies([consentCookie])
  return ctx.newPage()
}
for (const locale of ['en', 'es']) {
  for (const width of [360, 390, 768, 1440]) {
    const page = await newPage({ viewport: { width, height: width >= 1440 ? 900 : 800 } })
    await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    const aboveFold = await page.evaluate(() => {
      const vh = window.innerHeight
      const vis = s => { const e = [...document.querySelectorAll('h1,p,a')].find(x => x.textContent.includes(s)); return e ? e.getBoundingClientRect().top < vh : false }
      return { hiringHeadline: vis('5'), cta: [...document.querySelectorAll('a')].some(a => a.href.startsWith('https://demo.getcaros.com') && a.getBoundingClientRect().top < vh) }
    })
    await page.screenshot({ path: `${out}/home-${locale}-${width}-fold.png` })
    const first = await newPage({ viewport: { width, height: width >= 1440 ? 900 : 800 } }, false)
    await first.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
    await first.waitForSelector('[data-caros-consent]')
    await first.screenshot({ path: `${out}/home-${locale}-${width}-fold-consent.png` })
    await first.close()
    // Scroll through so Reveal (IntersectionObserver) sections are visible in the full-page capture.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180)) } window.scrollTo(0, 0) })
    await page.waitForTimeout(600)
    await page.screenshot({ path: `${out}/home-${locale}-${width}-full.png`, fullPage: true })
    report.widths.push({ locale, width, horizontalOverflowPx: overflow, aboveFold })
    await page.close()
  }
}

// Interaction + analytics checks (English desktop).
const page = await newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`${base}/en`, { waitUntil: 'networkidle' })
const text = sel => page.locator(sel).first().innerText()
const chk = (name, pass, detail) => report.checks.push({ name, pass: !!pass, detail })
const hiring = page.locator('text=Illustrative annual hiring cost').locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]')
chk('hiring default 5 x $50,000 = $250,000', (await hiring.innerText()).includes('$250,000'))
await hiring.getByRole('button', { name: '10 employees' }).click()
chk('hiring preset 10 = $500,000', (await hiring.innerText()).includes('$500,000'))
await hiring.getByLabel('Average salary (per employee)').fill('60000')
chk('hiring 10 x $60,000 = $600,000', (await hiring.innerText()).includes('$600,000'))
await hiring.getByLabel('Employees', { exact: true }).fill('')
chk('hiring empty employees = $0 (no NaN)', (await hiring.innerText()).includes('$0') && !(await hiring.innerText()).includes('NaN'))
chk('hiring exclusions note visible', (await hiring.innerText()).includes('benefits, payroll taxes, recruiting, onboarding'))

const stack = page.locator('#stack-calculator')
await stack.scrollIntoViewIfNeeded()
const st = await stack.innerText()
chk('stack default combined = $25,200', st.includes('$25,200') && st.includes('$9,600') && st.includes('$15,600'))
await stack.getByLabel('Separate platforms / logins').fill('40')
chk('platform count does not change total', (await stack.innerText()).includes('$25,200'))
await stack.getByLabel('Employees using these systems').fill('10')
chk('doubling employees doubles time cost once ($31,200)', (await stack.innerText()).includes('$31,200'))

const cap = page.locator('#unified-capabilities')
await cap.locator('details').first().locator('summary').click()
chk('capability expands', await cap.locator('details').first().evaluate(d => d.open))
chk('nine capability cards', (await cap.locator('details').count()) === 9)
const shot = cap.locator('img[alt^="CAROS Command Center demo workspace"], img[alt^="Espacio de trabajo de demostración"]')
await shot.first().scrollIntoViewIfNeeded(); await page.waitForTimeout(500)
chk('showcase image loaded (naturalWidth>0)', await shot.first().evaluate(i => i.complete && i.naturalWidth > 0))
chk('six hotspot buttons with aria-labels', (await cap.locator('[role=group] button[aria-label]').count()) === 6)
await cap.locator('[role=group] button').nth(1).click()
chk('hotspot open shows detail and fires showcase_interaction hotspot', (await cap.locator('[aria-live=polite]').innerText()).includes('New deals') && await page.evaluate(() => window.dataLayer.some(e => e.event === 'caros_showcase_interaction' && e.action === 'hotspot' && e.item === 'deals')))
await page.locator('a', { hasText: 'Explore What CAROS Can Do' }).first().click()
await page.waitForTimeout(500)
chk('secondary CTA scrolls to capabilities', await page.evaluate(() => location.hash === '#unified-capabilities'))
await page.mouse.wheel(0, 20000); await page.waitForTimeout(400)
const events = await page.evaluate(() => window.dataLayer.filter(e => String(e.event).startsWith('caros_')))
const names = [...new Set(events.map(e => e.event))]
chk('events fired', ['caros_home_engagement', 'caros_scroll_depth', 'caros_employee_calc_interaction', 'caros_stack_calc_interaction', 'caros_showcase_interaction', 'caros_hero_cta_click'].every(n => names.includes(n)), names.join(','))
chk('no event payload has pii/financial keys', events.every(e => Object.keys(e).every(k => k.startsWith('gtm.') || ['event', 'cta', 'location', 'field', 'action', 'section', 'depth', 'expanded', 'item', 'locale', 'kind'].includes(k))))
chk('scroll depths reached', [25, 50, 75, 100].every(d => events.some(e => e.event === 'caros_scroll_depth' && e.depth === d)), JSON.stringify(events.filter(e => e.event === 'caros_scroll_depth').map(e => e.depth)))
await page.close()

// Do-Not-Track: no events.
const dnt = await newPage({ viewport: { width: 1440, height: 900 }, extraHTTPHeaders: { DNT: '1' } })
await dnt.addInitScript(() => Object.defineProperty(navigator, 'doNotTrack', { get: () => '1' }))
await dnt.goto(`${base}/en`, { waitUntil: 'networkidle' })
await dnt.mouse.wheel(0, 3000); await dnt.waitForTimeout(300)
chk('DNT=1 emits no caros_ events', (await dnt.evaluate(() => (window.dataLayer || []).filter(e => String(e.event).startsWith('caros_')).length)) === 0)

// Reduced motion: lifecycle animation off.
const rm = await newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
await rm.goto(`${base}/en`, { waitUntil: 'networkidle' })
chk('reduced motion disables lifecycle animation', (await rm.locator('.lifecycle-step').first().evaluate(e => getComputedStyle(e).animationName)) === 'none')
const nm = await newPage({ viewport: { width: 1440, height: 900 } })
await nm.goto(`${base}/en`, { waitUntil: 'networkidle' })
chk('normal motion animates lifecycle', (await nm.locator('.lifecycle-step').first().evaluate(e => getComputedStyle(e).animationName)) === 'lifecycle-glow')
await browser.close()
writeFileSync(`${out}/home-checks.json`, JSON.stringify(report, null, 1))
console.log(JSON.stringify(report.checks.filter(c => !c.pass), null, 1), '\nfailed:', report.checks.filter(c => !c.pass).length, 'of', report.checks.length)
console.log(JSON.stringify(report.widths))
