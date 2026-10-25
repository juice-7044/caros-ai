import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const layout = readFileSync(new URL('../app/%5Blocale%5D/thank-you/layout.tsx', import.meta.url), 'utf8')

test('thank-you affiliate lead tracking runs for English and Spanish only', () => {
  assert.match(layout, /AFFILIATE_TRACKING_LOCALES = new Set\(\["en", "es"\]\)/)
  assert.match(layout, /AFFILIATE_TRACKING_LOCALES\.has\(locale\) && \(\s*<Script id="caros-affiliate-lead"/)
  assert.doesNotMatch(layout, /locale === "ja"/)
})

test('affiliate lead script still reads email/uid and calls trackLead', () => {
  assert.match(layout, /params\.get\("email"\)/)
  assert.match(layout, /params\.get\("uid"\)/)
  assert.match(layout, /affiliateManager\.trackLead\(\{ email: email, uid: uid \}\)/)
})
