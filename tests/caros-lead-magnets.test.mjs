// CAROS lead magnets on getcaros.com (lib/lead-magnets.ts): copied from the GHL funnels, each guide has its PDF and
// cover in /public, a CAROS form address, the GHL page's own example math and wording, and a page in the sitemap.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { LEAD_MAGNETS, leadMagnet } from '../lib/lead-magnets.ts'
import { CAROS_FORMS } from '../lib/caros-leads.ts'

test('four guides, each with its PDF, cover, CAROS form and verbatim example math', () => {
  assert.deepEqual(LEAD_MAGNETS.map((m) => m.key), ['hvac', 'plumbing', 'real_estate', 'roofing'])
  for (const m of LEAD_MAGNETS) {
    assert.equal(leadMagnet(m.slug), m)
    assert.ok(existsSync(new URL(`../public${m.pdf}`, import.meta.url)), `${m.pdf} is served`)
    assert.ok(readFileSync(new URL(`../public${m.pdf}`, import.meta.url)).subarray(0, 5).toString() === '%PDF-', `${m.pdf} is a PDF`)
    assert.ok(existsSync(new URL(`../public${m.cover}`, import.meta.url)))
    assert.match(CAROS_FORMS[m.form], /^https:\/\/ask\.getcaros\.com\/api\/forms\/[A-Za-z0-9_-]{43}$/)
    assert.equal(m.inside.length, 6)
    assert.match(m.mathNote, /^Hypothetical planning math from the guide\. Not a CAROS customer result/)
    assert.ok(m.mathLine.includes(m.mathFigure), 'the headline figure is the one the example works out')
  }
  assert.equal(leadMagnet('nope'), null)
  assert.equal(new Set(LEAD_MAGNETS.map((m) => CAROS_FORMS[m.form])).size, 4, 'one CAROS form each')
})

test('the guide pages are in the sitemap and the resources page', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
  assert.match(sitemap, /LEAD_MAGNETS\.map\(\(m\) => \(\{ path: `\/free\/\$\{m\.slug\}`/)
  assert.match(readFileSync(new URL('../app/[locale]/resources/page.tsx', import.meta.url), 'utf8'), /href=\{`\/en\/free\/\$\{m\.slug\}`\}/)
})
