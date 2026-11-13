// Run against a LOCAL server only; every native form request is intercepted.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { mkdirSync } from 'node:fs'
import { REVENUE_AUDIT as contract } from '../lib/revenue-audit-form.ts'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.AUDIT_TEST_URL || 'http://localhost:3101'
const screenshots = process.env.AUDIT_SCREENSHOTS || tmpdir()
mkdirSync(screenshots, { recursive: true })
assert.match(base, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/)
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) })
let scenarios = 0
try {
  for (const locale of ['en','es']) {
    for (const mode of ['unchecked','checked','http','rejected','network']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
      const requests = []
      await page.route('https://ask.getcaros.com/api/forms/**', async route => {
        requests.push({ url: route.request().url(), method: route.request().method(), body: route.request().postDataJSON() })
        if (mode === 'network') return route.abort('failed')
        await route.fulfill({ status: mode === 'http' ? 500 : 200, contentType: 'application/json', body: JSON.stringify({ ok: mode !== 'rejected' && mode !== 'http' }) })
      })
      await page.goto(`${base}/${locale}/revenue-audit`)
      const form = page.locator(`#${contract.formId}`)
      await form.waitFor()
      await page.getByRole('button', { name: /Reject non-essential|Rechazar no esenciales/i }).click()
      assert.deepEqual(await form.locator('[name]').evaluateAll(els => els.map(e => e.name)), [...contract.fields.map(f=>f.name), 'website'])
      assert.deepEqual(await form.locator('[required]').evaluateAll(els=>els.map(e=>e.name)), ['email'])
      const sms = form.locator('[name=sms_consent]')
      assert.equal(await sms.isChecked(), false)
      assert.equal(await sms.getAttribute('required'), null)
      assert.equal(await sms.getAttribute('value'), contract.checkboxValue)
      const label = form.locator('label[for=audit-sms_consent]')
      assert.equal(await label.textContent(), contract.wording)
      assert.equal(await label.getAttribute('lang'), 'en')
      assert.deepEqual(await label.locator('a').evaluateAll(els=>els.map(e=>e.getAttribute('href'))), [`/${locale}/privacy`,`/${locale}/terms`])
      const trap = form.locator('[name=website]')
      assert.equal(await trap.getAttribute('tabindex'), '-1')
      assert.equal(await trap.getAttribute('autocomplete'), 'off')
      assert.equal(await trap.locator('..').locator('..').getAttribute('aria-hidden'), 'true')
      await form.locator('button[type=submit]').click()
      assert.equal(requests.length, 0, 'native email validation prevents a request')
      const validation = await form.locator('[name=email]').evaluate(e=>e.validationMessage)
      assert.equal(validation, locale === 'es' ? 'Completa este campo.' : 'Please complete this field.')
      await form.locator('[name=email]').fill('mock-audit@example.invalid')
      if (locale === 'es') assert.equal(await form.locator('label[for=audit-name]').textContent(), 'Nombre')
      const filled = mode === 'unchecked' ? {} : { name:'Mock / Prueba', phone:'+15555550100', company:'Test organization', site:'https://example.invalid', industry:'Prueba / test', consent:'Correo / email only', details:'Synthetic browser test\nNo live delivery' }
      for (const [key,value] of Object.entries(filled)) await form.locator(`[name=${key}]`).fill(value)
      if (mode !== 'unchecked') await sms.check()
      const before = page.url()
      await form.locator('button[type=submit]').click()
      if (['http','rejected','network'].includes(mode)) {
        await form.getByRole('alert').waitFor()
        assert.equal(await form.locator('[name=email]').inputValue(), 'mock-audit@example.invalid')
        assert.equal(await sms.isChecked(), true)
        assert.equal(await form.locator('[name=details]').inputValue(), filled.details)
        assert.equal(await page.locator('[data-audit-success]').count(), 0)
      } else await page.locator('[data-audit-success]').waitFor()
      assert.equal(page.url(), before)
      assert.equal(requests.length, 1)
      assert.equal(requests[0].url, contract.endpoint)
      assert.equal(requests[0].method, 'POST')
      const expected = Object.fromEntries(contract.fields.filter(f=>f.name!=='sms_consent').map(f=>[f.name,f.name==='email'?'mock-audit@example.invalid':'']))
      expected.website = ''
      Object.assign(expected, filled)
      if (mode!=='unchecked') expected.sms_consent = contract.checkboxValue
      assert.deepEqual(requests[0].body, expected)
      scenarios++
      await page.close()
    }
    for (const width of [390,1440]) {
      const page = await browser.newPage({ viewport:{width,height:1000} })
      await page.route('https://ask.getcaros.com/api/forms/**', route=>route.abort())
      await page.goto(`${base}/${locale}/revenue-audit`)
      const form = page.locator(`#${contract.formId}`)
      await form.waitFor()
      await page.getByRole('button', { name: /Reject non-essential|Rechazar no esenciales/i }).click()
      await page.setViewportSize({ width, height: 2200 })
      await form.scrollIntoViewIfNeeded()
      await page.evaluate(() => { const el = document.querySelector('#caros-form-hprr2ydo'); window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 120) })
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth), false)
      await page.screenshot({ path: `${screenshots}/native-audit-${locale}-${width}.png`, fullPage: true })
      await form.screenshot({path:`${screenshots}/native-audit-form-${locale}-${width}.png`})
      await page.close()
    }
  }
  console.log(`PASS: ${scenarios} mocked browser submissions, EN/ES 390/1440 layouts; no live submissions`)
} finally { await browser.close() }
