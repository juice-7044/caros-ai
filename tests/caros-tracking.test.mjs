import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8')
test('GHL external website tracking is removed and form APIs are preserved', () => {
  const layout = source('../app/layout.tsx')
  assert.doesNotMatch(layout, /external-tracking\.js|data-tracking-id|tk_12d930143d64417686edf3bdbf78f595/)
  assert.match(source('../app/api/revenue-audit/route.ts'), /services\.leadconnectorhq\.com\/contacts\//)
})

test('affiliate tracking is removed from the site (owner decision 2026-11-05)', () => {
  assert.doesNotMatch(source('../app/layout.tsx'), /caros-affiliate-manager|affiliateManager|am\.js/)
  assert.doesNotMatch(source('../app/%5Blocale%5D/thank-you/layout.tsx'), /affiliateManager|caros-affiliate-lead/)
  for (const f of ['../messages/en.json', '../messages/es.json', '../messages/full/forms-legal.es.json', '../app/%5Blocale%5D/privacy/page.tsx']) {
    assert.doesNotMatch(source(f), /affiliate attribution|atribución de afiliados/i, f)
  }
})

test('CSP allows the consent-gated Meta Pixel to load and report', () => {
  const config = source('../next.config.mjs')
  assert.match(config, /script-src[^"]*https:\/\/connect\.facebook\.net/)
  assert.match(config, /connect-src[^"]*https:\/\/www\.facebook\.com/)
})
