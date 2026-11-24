import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const source = (p) => fs.readFileSync(new URL('../'+p, import.meta.url), 'utf8')
test('pricing route supplies SSR terms and lazy accessible exploration independent of price', () => {
  const page=source('app/[locale]/pricing/page.tsx')
  assert.match(page,/PricingStudio/)
  assert.match(page,/PricingTerms/)
  assert.match(page,/alternates/)
  const ui=source('components/caros/pricing-studio.tsx')
  assert.match(ui,/ssr: false/)
  assert.match(ui,/aria-pressed/)
  assert.match(ui,/prefers-reduced-motion/)
  assert.match(ui,/saveData/)
  assert.match(ui,/IntersectionObserver/)
  assert.doesNotMatch(ui,/setConfiguration\(capability/)
})
test('published configuration amounts and immutable feature lists have one source', async () => {
  assert.ok(fs.existsSync(new URL('../lib/pricing.ts', import.meta.url)), 'pricing SSOT must exist')
  const { PRICING } = await import('../lib/pricing.ts')
  assert.deepEqual(Object.values(PRICING).map(p => [p.implementation,p.monthly]), [[2500,997],[7499,2999],[5997,3997],[6997,4997],[null,null],[null,null]])
  assert.ok(Object.isFrozen(PRICING)); assert.equal(PRICING.core.features.length,6); assert.equal(PRICING.medical.features.length,9)
  for (const p of Object.values(PRICING)) { assert.ok(Object.isFrozen(p)); assert.ok(Object.isFrozen(p.features)) }
  assert.equal(PRICING.finance10.starting,true); assert.equal(PRICING.nonprofit.selfService,false)
})

test('exact original features and long commercial qualifications are preserved', async () => {
 const baseline=JSON.parse(source('tests/fixtures/pricing-baseline.json'))
 const {PRICING}=await import('../lib/pricing.ts')
 assert.deepEqual([...PRICING.core.features],baseline.standardFeatures)
 assert.deepEqual([...PRICING.medical.features],baseline.medicalFeatures)
 assert.deepEqual([...PRICING.finance10.features].slice(0,-1),baseline.financeFeatures)
 const retained=source('components/caros/pricing-terms.tsx')
 for(const term of baseline.terms) assert.ok(retained.includes(term),term)
 const en=JSON.parse(source('messages/pricing3d/en.json')), es=JSON.parse(source('messages/pricing3d/es.json'))
 assert.deepEqual(Object.keys(en).sort(),Object.keys(es).sort())
 for(const key of Object.keys(en)) assert.ok(es[key] && (es[key]!==en[key] || ['core','medical'].includes(key)),key)
})
