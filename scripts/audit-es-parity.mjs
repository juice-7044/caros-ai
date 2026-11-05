// node scripts/audit-es-parity.mjs <baseUrl> <routesJson> <out>: lists visible strings (>=3 words) and attributes identical in en and es.
import { readFileSync, writeFileSync } from 'node:fs'
const [base, routesFile, out] = process.argv.slice(2)
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')
const routes = [...new Set(JSON.parse(readFileSync(routesFile, 'utf8')).results.map(r => r.route))]
const browser = await chromium.launch()
const grab = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.waitForLoadState('networkidle').catch(() => {})
  return page.evaluate(() => {
    const lines = document.body.innerText.split('\n').map(s => s.trim()).filter(Boolean)
    const attrs = [...document.querySelectorAll('[placeholder],[aria-label],[alt],[title]')].flatMap(e => ['placeholder', 'aria-label', 'alt', 'title'].map(a => e.getAttribute(a)).filter(Boolean))
    return { lines, attrs, title: document.title, desc: document.querySelector('meta[name=description]')?.content }
  })
}
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const report = []
for (const route of routes) {
  const r = route === '/' ? '' : route
  const en = await grab(page, `${base}/en${r}`), es = await grab(page, `${base}/es${r}`)
  const enSet = new Set([...en.lines, ...en.attrs])
  const same = [...new Set([...es.lines, ...es.attrs])].filter(s => s.split(/\s+/).length >= 3 && enSet.has(s))
  if (en.title === es.title) same.push(`[title] ${es.title}`)
  if (en.desc === es.desc) same.push(`[description] ${es.desc}`)
  report.push({ route, identical: same })
}
await browser.close()
writeFileSync(out, JSON.stringify(report, null, 1))
console.log('routes', report.length, 'routes with identical strings', report.filter(r => r.identical.length).length, 'total strings', report.reduce((a, r) => a + r.identical.length, 0))
for (const r of report.filter(r => r.identical.length).slice(0, 40)) console.log(r.route, JSON.stringify(r.identical.slice(0, 4)))
