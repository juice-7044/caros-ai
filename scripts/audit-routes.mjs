// Rendered route audit: node scripts/audit-routes.mjs <baseUrl> <outJson>
// Requires playwright-core (set PLAYWRIGHT_CORE to its path if not installed locally).
import { writeFileSync } from 'node:fs'
const [base = 'http://localhost:3100', out = 'audit.json'] = process.argv.slice(2)
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core')

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const fromSitemap = [...sitemap.matchAll(/<loc>https:\/\/getcaros\.com\/en([^<]*)<\/loc>/g)].map(m => m[1] || '/')
const extra = ['/faq', '/compare', '/resources', '/why-caros', '/affiliates', '/industries/nonprofits', '/thank-you']
const routes = [...new Set(['/', ...fromSitemap, ...extra])]

const ES_WORDS = new Set('el la los las de del y en para con que su sus un una por es se no al lo como más tu tus te nos su o a'.split(' '))
const EN_WORDS = new Set('the and your you with for to of is are that this we our it in on at be from by can will not or as an have has more all'.split(' '))
function looksEnglish(s) {
  const w = s.toLowerCase().match(/[a-záéíóúñü']+/g) ?? []
  if (w.length < 4) return false
  const en = w.filter(x => EN_WORDS.has(x)).length, es = w.filter(x => ES_WORDS.has(x)).length
  return en >= 2 && en > es * 1.5
}

const browser = await chromium.launch()
const results = []
for (const locale of ['en', 'es']) {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    const url = `${base}/${locale}${route === '/' ? '' : route}`
    const res = await page.goto(url, { waitUntil: 'networkidle' }).catch(e => ({ status: () => 0, err: String(e) }))
    const data = await page.evaluate(() => {
      const meta = n => document.querySelector(`meta[name="${n}"],meta[property="${n}"]`)?.content ?? null
      const blocks = []
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      let n
      while ((n = walker.nextNode())) {
        const p = n.parentElement
        if (!p || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.tagName)) continue
        const t = n.textContent.replace(/\s+/g, ' ').trim()
        if (t) blocks.push(t)
      }
      const attrs = [...document.querySelectorAll('[placeholder],[aria-label],[alt],[title]')]
        .flatMap(e => ['placeholder', 'aria-label', 'alt', 'title'].map(a => e.getAttribute(a)).filter(Boolean))
      // innerText only counts text a visitor can actually see (closed <details> and hidden nodes are excluded).
      const words = t => t.split(/\s+/).filter(Boolean).length
      const live = [...document.body.querySelectorAll('header,footer,nav')]
      const chromeWords = live.reduce((a, e) => a + words(e.innerText), 0)
      return {
        innerWords: words(document.body.innerText), contentWords: words(document.body.innerText) - chromeWords,
        htmlLang: document.documentElement.lang,
        title: document.title, description: meta('description'), ogTitle: meta('og:title'), ogDescription: meta('og:description'),
        canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
        hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l => `${l.hreflang}=${l.href}`),
        h1: document.querySelector('h1')?.textContent.trim() ?? null,
        blocks, attrs,
        localeLinks: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => h.startsWith('/') && !/^\/(en|es)(\/|$)/.test(h) && !/^\/(api|_next|caros|icon|robots|sitemap)/.test(h) && !/\.\w+$/.test(h)),
      }
    })
    const words = data.blocks.join(' ').split(/\s+/).filter(Boolean).length
    const leaks = locale === 'es' ? [...new Set([...data.blocks, ...data.attrs, data.title, data.description, data.ogTitle, data.ogDescription].filter(s => s && looksEnglish(s)))] : []
    results.push({ locale, route, status: res.status(), htmlLang: data.htmlLang, title: data.title, description: data.description, ogTitle: data.ogTitle, canonical: data.canonical, hreflang: data.hreflang, h1: data.h1, visibleWords: words, innerWords: data.innerWords, contentWords: data.contentWords, blockCount: data.blocks.length, leaks, unlocalizedLinks: [...new Set(data.localeLinks)] })
    await page.close()
  }
}
await browser.close()
const summary = {
  routesPerLocale: routes.length, pages: results.length,
  nonOk: results.filter(r => r.status !== 200).map(r => `${r.locale}${r.route}:${r.status}`),
  wordsEn: results.filter(r => r.locale === 'en').reduce((a, r) => a + r.visibleWords, 0),
  wordsEs: results.filter(r => r.locale === 'es').reduce((a, r) => a + r.visibleWords, 0),
  innerWordsEn: results.filter(r => r.locale === 'en').reduce((a, r) => a + r.innerWords, 0),
  innerWordsEs: results.filter(r => r.locale === 'es').reduce((a, r) => a + r.innerWords, 0),
  homeInnerWordsEn: results.find(r => r.locale === 'en' && r.route === '/')?.innerWords,
  homeContentWordsEn: results.find(r => r.locale === 'en' && r.route === '/')?.contentWords,
  homeInnerWordsEs: results.find(r => r.locale === 'es' && r.route === '/')?.innerWords,
  homeContentWordsEs: results.find(r => r.locale === 'es' && r.route === '/')?.contentWords,
  homeWordsEn: results.find(r => r.locale === 'en' && r.route === '/')?.visibleWords,
  homeWordsEs: results.find(r => r.locale === 'es' && r.route === '/')?.visibleWords,
  esPagesWithEnglishLeaks: results.filter(r => r.locale === 'es' && r.leaks.length).length,
  esLeakStrings: results.filter(r => r.locale === 'es').reduce((a, r) => a + r.leaks.length, 0),
}
writeFileSync(out, JSON.stringify({ summary, results }, null, 1))
console.log(JSON.stringify(summary, null, 1))
