import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const messages = lang => JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), 'utf8'))

test('home copy has the brief structure in both languages', () => {
  for (const lang of ['en', 'es']) {
    const h = messages(lang).Home
    assert.equal(h.unified.capabilities.length, 9)
    assert.equal(h.challenges.items.length, 8)
    assert.equal(h.lifecycle.steps.length, 6)
    assert.equal(h.disconnected.tiles.length, 10)
    assert.equal(h.disconnected.problems.length, 8)
    assert.equal(h.disconnected.benefits.length, 8)
    assert.deepEqual(h.unified.capabilities.map(c => c.id), messages('en').Home.unified.capabilities.map(c => c.id))
  }
})

test('privacy statement and brand tagline are exact and localized', () => {
  assert.equal(messages('en').Home.final.privacy, "We do not sell customer or business data or use one customer's proprietary information to train another customer's system.")
  assert.equal(messages('es').Home.final.privacy, 'No vendemos datos de clientes ni de empresas, ni usamos la información propietaria de un cliente para entrenar el sistema de otro.')
  assert.equal(messages('en').Home.final.tagline, 'CAROS. We do the most, so you can do more with less.')
  assert.equal(messages('es').Home.final.tagline, 'CAROS. Hacemos lo más, para que puedas hacer más con menos.')
  assert.equal(messages('en').footer.tagline, messages('en').Home.final.tagline)
  assert.equal(messages('es').footer.tagline, messages('es').Home.final.tagline)
})

test('capability copy carries the capability claims confirmed by the product owner (2026-11-05)', () => {
  // Deliberate expectation change: earlier code-evidence pass narrowed these; Ann (product owner) confirmed the brief wording.
  for (const lang of ['en', 'es']) {
    const caps = messages(lang).Home.unified.capabilities
    const byId = id => caps.find(c => c.id === id)
    const text = JSON.stringify(caps)
    assert.match(byId('reputation').detail, /Google, Yelp, Facebook/)
    assert.doesNotMatch(text, /not yet available|not included|aún no|no está disponible|no incluye/i)
    assert.ok(caps.every(c => c.status === 'live'), 'no capability is tagged partial/expanding')
    assert.doesNotMatch(text, /\b(all|every) (platform|channel)\b|guarantee|eliminate/i)
  }
  const en = messages('en').Home.unified.capabilities
  assert.match(en.find(c => c.id === 'reactivation').detail, /email and SMS/)
  assert.match(en.find(c => c.id === 'workflows').detail, /workflow builder/i)
  assert.match(en.find(c => c.id === 'service').detail, /ticketing/i)
  assert.match(en.find(c => c.id === 'reputation').detail, /website reviews/)
  assert.ok(messages('en').Home.challenges.items.some(i => i.solution === 'Create intelligent, personalized reengagement workflows.'))
})

test('calculator copy states exclusions, estimates and no guaranteed savings', () => {
  const en = messages('en').Home
  assert.match(en.hiring.exclusions, /benefits, payroll taxes, recruiting, onboarding, and other employment expenses/)
  assert.match(en.stack.annualTimeNote, /estimate, not audited savings/i)
  assert.match(en.stack.disclaimer, /Not a savings or ROI figure/)
})

test('spanish home copy is translated, not an English copy', () => {
  const walk = (a, b, path, out) => {
    if (typeof a === 'string') { if (a === b && a.length > 12) out.push(path) }
    else for (const k of Object.keys(a)) walk(a[k], b[k], `${path}.${k}`, out)
    return out
  }
  assert.deepEqual(walk(messages('en').Home, messages('es').Home, 'Home', []), [])
})
