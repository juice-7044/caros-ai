import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const source = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const messages = lang => JSON.parse(source(`messages/${lang}.json`))

test('approved core positioning and broader audience are present in both languages', () => {
  assert.equal(messages('en').pages.industries.subtitle, 'CAROS is built for businesses and organizations where timely communication, consistent follow-up, and strong relationships drive growth.')
  assert.match(messages('es').pages.industries.subtitle, /empresas y organizaciones/)
  assert.match(messages('en').HomePage.industries.headline, /relationships that drive growth/)
  assert.match(messages('es').HomePage.industries.fitBody, /organización/)
  for (const lang of ['en','es']) {
    const d = messages(lang)
    assert.equal(d.pages.diagnostic.questions.length, 8)
    assert.equal(d.pages.industries.fitCards.length, 3)
    assert.ok(d.Metadata.description && d.pages.compare.body && d.PricingPositioning.coreDescription)
    assert.doesNotMatch(d.pages.industries.subtitle, /home.service|servicios domésticos/i)
    assert.ok(d.AffiliatesPage.fit.items.industryNetworks)
  }
})

test('general metadata and pages no longer define CAROS as a home-service product', () => {
  for (const p of ['app/layout.tsx','app/[locale]/industries/page.tsx','app/[locale]/diagnostic/page.tsx','app/[locale]/compare/page.tsx','components/caros/diagnostic/sections.tsx']) {
    assert.doesNotMatch(source(p), /for home-service|for service businesses|designed for home-service|Most home-service owners/i, p)
  }
  assert.match(source('app/[locale]/layout.tsx'), /generateMetadata/)
  assert.match(source('app/[locale]/layout.tsx'), /getTranslations/)
  assert.match(source('app/layout.tsx'), /relationship-driven businesses and organizations/)
  assert.doesNotMatch(source('app/[locale]/industries/page.tsx'), /CAROS fits\.|for your trade/)
})

test('social metadata retains branding and share images when localized', async () => {
  const { positioningSocialMetadata } = await import('../lib/positioning-metadata.ts')
  for (const lang of ['en', 'es']) {
    const description = messages(lang).Metadata.description
    const social = positioningSocialMetadata(description, lang)
    assert.equal(social.openGraph.description, description)
    assert.equal(social.twitter.description, description)
    assert.equal(social.openGraph.locale, lang === 'es' ? 'es_419' : 'en_US')
    assert.equal(social.openGraph.images[0].url, '/caros-logo.png')
    assert.equal(social.twitter.images[0], '/caros-logo.png')
  }
})

test('dedicated industry messages, pricing and consent integrations remain available', () => {
  assert.match(source('lib/industries.ts'), /CAROS for Home Services/)
  assert.match(source('lib/industries.ts'), /CAROS for HVAC Contractors/)
  assert.match(source('app/[locale]/pricing/page.tsx'), /\$997\/month/)
  assert.match(source('app/[locale]/pricing/page.tsx'), /There is no self-service pricing for nonprofit organizations/)
  assert.match(source('app/api/revenue-audit/route.ts'), /services\.leadconnectorhq\.com/)
})
