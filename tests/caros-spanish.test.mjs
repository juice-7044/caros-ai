import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { spanishTranslator, translateSpanishData, localeHref } from '../lib/spanish.ts'

test('spanish translator falls back to English and interpolates tokens', () => {
  const tr = spanishTranslator('es', { 'Call {time}': 'Llamada {time}' })
  assert.equal(tr('Call {time}', { time: '1:02' }), 'Llamada 1:02')
  assert.equal(spanishTranslator('en', { Hi: 'Hola' })('Hi'), 'Hi')
})

test('data translation changes values only, never keys or slugs', () => {
  const out = translateSpanishData({ slug: 'roofing', Pricing: 'Pricing' }, 'es', { Pricing: 'Precios' })
  assert.deepEqual(out, { slug: 'roofing', Pricing: 'Precios' })
})

test('localeHref keeps visitors in their language for same-site pages only', () => {
  assert.equal(localeHref('/revenue-audit', 'es'), '/es/revenue-audit')
  assert.equal(localeHref('https://getcaros.com/en/revenue-audit?x=1#f', 'es'), '/es/revenue-audit?x=1#f')
  assert.equal(localeHref('/api/revenue-audit', 'es'), '/api/revenue-audit')
  assert.equal(localeHref('/caros-logo.png', 'es'), '/caros-logo.png')
  assert.equal(localeHref('https://calendar.example.com/x', 'es'), 'https://calendar.example.com/x')
})

test('spanish industry module has every english industry with identical slugs', () => {
  const en = readFileSync(new URL('../lib/industries.ts', import.meta.url), 'utf8')
  const es = readFileSync(new URL('../lib/industries-es.ts', import.meta.url), 'utf8')
  const slugs = s => [...s.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map(m => m[1])
  assert.deepEqual(slugs(es), slugs(en))
  assert.equal((es.match(/^const \w+ = make\(/gm) || []).length, 26)
  assert.doesNotMatch(es, /import \{ PRODUCT_TAGLINE \}/)
  assert.match(es, /const PRODUCT_TAGLINE = "IA donde/)
})

test('locale-aware Link components never receive localeHref (double /es/es prefix)', () => {
  const root = new URL('../', import.meta.url)
  const files = ['app/[locale]/compare/page.tsx', 'app/[locale]/faq/page.tsx', 'components/caros/why-caros-page.tsx']
  for (const f of files) {
    const s = readFileSync(new URL(f.replace('[','%5B').replace(']','%5D'), root), 'utf8')
    assert.doesNotMatch(s, /AuditButton[^>]*href=\{localeHref/, f)
  }
})

test('locale layout emits self canonical and en/es alternates', () => {
  const s = readFileSync(new URL('../app/%5Blocale%5D/layout.tsx', import.meta.url), 'utf8')
  assert.match(s, /canonical: `\/\$\{locale\}\$\{rest\}`/)
  assert.match(s, /es: `\/es\$\{rest\}`/)
  const root = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(root, /canonical: "\/"/)
})

test('spanish catalogs are valid, non-empty, and not copies of the English source', () => {
  const dir = new URL('../messages/full/', import.meta.url)
  for (const file of readdirSync(dir).filter(f => f.endsWith('.es.json'))) {
    const catalog = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
    const entries = Object.entries(catalog)
    assert.ok(entries.length > 0, file)
    const copies = entries.filter(([k, v]) => k === v && /[a-z]{4,} [a-z]{4,}/i.test(k))
    assert.ok(copies.length <= entries.length * 0.02, `${file} has untranslated copies: ${copies.slice(0, 5).map(c => c[0])}`)
  }
})

test('spanish audit consent keeps STOP/HELP, optional checkbox and policy links', () => {
  const catalog = JSON.parse(readFileSync(new URL('../messages/full/forms-legal.es.json', import.meta.url), 'utf8'))
  const consent = Object.values(catalog).filter(v => /mensajes de texto|STOP/i.test(v)).join(' ')
  assert.match(consent, /mensajes de texto/i)
  assert.match(consent, /STOP/)
  assert.ok(consent, 'spanish consent text exists')
  assert.match(consent, /HELP/)
  assert.match(consent, /no (es|constituye) (una )?condici[oó]n/i)
  const form = readFileSync(new URL('../components/caros/audit-form.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(form, /required[^\n]*consent|consent[^\n]*required(?!=\{false\})/i)
})
