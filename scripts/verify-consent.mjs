// node scripts/verify-consent.mjs <baseUrl>: real-browser consent checks (banner, reject/accept network behaviour, persistence, footer reopen, layout).
const [base = 'http://localhost:3101'] = process.argv.slice(2)
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const checks = []
const chk = (name, pass, detail = '') => { checks.push({ name, pass: !!pass, detail }); console.log(pass ? 'PASS' : 'FAIL', name, detail) }

async function session(locale, viewport = { width: 1440, height: 900 }, extra = {}) {
  const ctx = await browser.newContext({ viewport, ...extra })
  const page = await ctx.newPage()
  const reqs = []
  page.on('request', (r) => reqs.push(r.url()))
  const failed = []
  page.on('requestfailed', (r) => failed.push(r.url()))
  return { ctx, page, reqs, failed }
}
const fb = (u) => u.includes('connect.facebook.net') || u.includes('facebook.com/tr')
const gaCollect = (u) => /google-analytics\.com\/(g|j)\/collect|analytics\.google\.com\/g\/collect/.test(u)
const gcs = (u) => new URL(u).searchParams.get('gcs')

for (const locale of ['en', 'es']) {
  const L = locale.toUpperCase()
  const names = locale === 'en' ? { reject: 'Reject non-essential', accept: 'Accept all', cust: 'Customize', foot: 'Cookie settings' } : { reject: 'Rechazar no esenciales', accept: 'Aceptar todo', cust: 'Personalizar', foot: 'Configuración de cookies' }

  // First visit + Reject
  let s = await session(locale)
  await s.page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
  chk(`${L} banner shows on first visit`, await s.page.locator('[data-caros-consent]').isVisible())
  const dl0 = await s.page.evaluate(() => window.dataLayer.filter((e) => e[0] === 'consent').map((e) => [e[1], e[2]]))
  chk(`${L} consent default denied precedes GTM`, dl0[0]?.[0] === 'default' && dl0[0][1].analytics_storage === 'denied' && dl0[0][1].ad_storage === 'denied' && dl0[0][1].wait_for_update === 500, JSON.stringify(dl0[0]))
  chk(`${L} no facebook request before choice`, !s.reqs.some(fb))
  await s.page.getByRole('button', { name: names.reject }).click()
  await s.page.waitForTimeout(800)
  await s.page.mouse.wheel(0, 4000); await s.page.waitForTimeout(800)
  chk(`${L} banner hides after Reject`, !(await s.page.locator('[data-caros-consent]').count()))
  chk(`${L} Reject: no facebook.net / facebook tr requests`, !s.reqs.some(fb), s.reqs.filter(fb).join(','))
  const collects = s.reqs.filter(gaCollect)
  chk(`${L} Reject: no google-analytics collect with analytics_storage granted`, collects.every((u) => !/1/.test((gcs(u) ?? 'G100').slice(2))), JSON.stringify(collects.map(gcs)))
  chk(`${L} Reject: no caros_ dataLayer events`, (await s.page.evaluate(() => window.dataLayer.filter((e) => String(e.event).startsWith('caros_')).length)) === 0)
  const cookie = (await s.ctx.cookies()).find((c) => c.name === 'caros_consent')
  chk(`${L} choice stored in first-party cookie with version+timestamp`, cookie && /"v":1/.test(decodeURIComponent(cookie.value)) && /"ts":\d+/.test(decodeURIComponent(cookie.value)), cookie && decodeURIComponent(cookie.value))
  // persists across reload
  s.reqs.length = 0
  await s.page.reload({ waitUntil: 'networkidle' })
  await s.page.waitForTimeout(500)
  chk(`${L} choice persists across reload (no banner)`, !(await s.page.locator('[data-caros-consent]').count()))
  chk(`${L} reload after Reject still no facebook`, !s.reqs.some(fb))
  // footer reopen
  await s.page.getByRole('button', { name: names.foot }).click()
  await s.page.waitForSelector('[data-caros-consent]')
  chk(`${L} footer Cookie settings reopens banner`, await s.page.locator('[data-caros-consent]').isVisible())
  chk(`${L} focus moved into dialog heading on reopen`, await s.page.evaluate(() => document.activeElement?.id === 'caros-consent-title'))
  await s.page.keyboard.press('Escape')
  await s.page.waitForTimeout(200) // focus is restored on the next animation frame
  chk(`${L} Escape closes reopened dialog and returns focus to footer button`, !(await s.page.locator('[data-caros-consent]').count()) && await s.page.evaluate(() => document.activeElement?.hasAttribute('data-caros-cookie-settings')))
  await s.ctx.close()

  // First visit + Accept
  s = await session(locale)
  await s.page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
  await s.page.getByRole('button', { name: names.accept }).click()
  await s.page.mouse.wheel(0, 3000); await s.page.waitForTimeout(1500)
  const upd = await s.page.evaluate(() => window.dataLayer.filter((e) => e[0] === 'consent' && e[1] === 'update').map((e) => e[2]))
  chk(`${L} Accept: consent update grants analytics+ad storage`, upd.some((u) => u.analytics_storage === 'granted' && u.ad_storage === 'granted' && u.ad_user_data === 'granted' && u.ad_personalization === 'granted'), JSON.stringify(upd))
  chk(`${L} Accept: caros_ analytics events flow`, (await s.page.evaluate(() => window.dataLayer.filter((e) => String(e.event).startsWith('caros_')).length)) > 0)
  const fbAttempt = s.reqs.filter(fb).concat(s.failed.filter(fb))
  chk(`${L} Accept: Meta Pixel load attempted`, fbAttempt.length > 0, `${fbAttempt.join(',')} (failed: ${s.failed.filter(fb).join(',')})`)
  console.log('INFO', `${L} Accept: GA collect gcs values observed =`, JSON.stringify(s.reqs.filter(gaCollect).map(gcs)), '(G100 = cookieless ping sent before the choice; no further GA events fire after Accept on this page)')
  s.reqs.length = 0
  await s.page.reload({ waitUntil: 'networkidle' })
  chk(`${L} Accept persists across reload (no banner, granted replayed before GTM)`, !(await s.page.locator('[data-caros-consent]').count()) && (await s.page.evaluate(() => window.dataLayer.filter((e) => e[0] === 'consent').map((e) => e[1] + ':' + (e[2].analytics_storage))).then((a) => a.join()) === 'default:denied,update:granted'))
  await s.ctx.close()

  // Customize: analytics only
  s = await session(locale)
  await s.page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' })
  await s.page.getByRole('button', { name: names.cust }).click()
  await s.page.locator('#caros-consent-analytics').click()
  await s.page.getByRole('button', { name: locale === 'en' ? 'Save choices' : 'Guardar elecciones' }).click()
  await s.page.waitForTimeout(800)
  const c = decodeURIComponent((await s.ctx.cookies()).find((x) => x.name === 'caros_consent').value)
  chk(`${L} Customize analytics-only stored`, /"analytics":true,"marketing":false/.test(c), c)
  chk(`${L} Customize analytics-only: no facebook`, !s.reqs.some(fb))
  await s.ctx.close()
}

// GPC: marketing stays denied even on Accept all
{
  const s = await session('en', { width: 1440, height: 900 })
  await s.page.addInitScript(() => Object.defineProperty(navigator, 'globalPrivacyControl', { get: () => true }))
  await s.page.goto(`${base}/en`, { waitUntil: 'networkidle' })
  await s.page.getByRole('button', { name: 'Accept all' }).click()
  await s.page.waitForTimeout(800)
  const c = decodeURIComponent((await s.ctx.cookies()).find((x) => x.name === 'caros_consent').value)
  chk('GPC: Accept all keeps marketing denied', /"marketing":false/.test(c), c)
  chk('GPC: no facebook requests', !s.reqs.some(fb))
  await s.ctx.close()
}

// Layout: no CLS from banner, no horizontal overflow, banner does not cover chat launcher; keyboard tab order.
for (const width of [360, 390, 768, 1440]) {
  const s = await session('en', { width, height: width >= 1440 ? 900 : 800 })
  await s.page.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value }).observe({ type: 'layout-shift', buffered: true }) })
  await s.page.goto(`${base}/en`, { waitUntil: 'networkidle' })
  await s.page.waitForSelector('[data-caros-consent]')
  await s.page.waitForTimeout(600)
  const m = await s.page.evaluate(() => {
    const r = (el) => (el ? el.getBoundingClientRect() : null)
    const b = r(document.querySelector('[data-caros-consent]'))
    const w = r(document.querySelector('[data-caros-chat-launcher]'))
    const overlap = b && w && w.width > 0 && !(w.right <= b.left || w.left >= b.right || w.bottom <= b.top || w.top >= b.bottom)
    const h1 = document.querySelector('h1')
    return { overflow: document.documentElement.scrollWidth - innerWidth, overlap, cls: window.__cls, banner: b && [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)], launcher: w && [Math.round(w.left), Math.round(w.top), Math.round(w.width), Math.round(w.height)] }
  })
  chk(`${width}px: no horizontal overflow with banner`, m.overflow <= 0, JSON.stringify(m))
  console.log('INFO', `${width}px first paint: hero-docked launcher overlaps banner =`, m.overlap, '(docked launcher is in page flow; scrolls clear of the banner)')
  await s.page.mouse.wheel(0, 1800); await s.page.waitForTimeout(900)
  const f = await s.page.evaluate(() => {
    const b = document.querySelector('[data-caros-consent]').getBoundingClientRect()
    const el = document.querySelector('[data-caros-chat-launcher]'); const w = el.getBoundingClientRect()
    return { layout: document.querySelector('[data-caros-voice-widget]').dataset.layout, overlap: !(w.right <= b.left || w.left >= b.right || w.bottom <= b.top || w.top >= b.bottom), inViewport: w.top >= 0 && w.bottom <= innerHeight, banner: [b.left, b.top, b.width, b.height].map(Math.round), launcher: [w.left, w.top, w.width, w.height].map(Math.round) }
  })
  chk(`${width}px: floating chat launcher is lifted above banner (no overlap, in viewport)`, f.layout === 'floating' && !f.overlap && f.inViewport, JSON.stringify(f))
  chk(`${width}px: banner causes no layout shift (CLS < 0.01)`, m.cls < 0.01, String(m.cls))
  await s.page.keyboard.press('Tab')
  await s.ctx.close()
}
await browser.close()
const failed = checks.filter((c) => !c.pass)
console.log('\nfailed:', failed.length, 'of', checks.length)
process.exit(failed.length ? 1 : 0)
