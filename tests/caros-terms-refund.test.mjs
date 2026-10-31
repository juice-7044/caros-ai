import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Spec: CAROS's Terms must state a strict no-refund policy in both English and
// Spanish, without a discretionary/breach carve-out, without claiming the
// website overrides an executed MSA, and without asserting chargebacks cannot
// happen. Section numbers (18) and their anchors must not change.
const refundClauses = [
  'All payments made to CAROS are final and non-refundable. This applies to implementation fees, subscription fees, and fees for any other paid services. CAROS does not offer refunds, credits, or prorated adjustments for a partial billing period, unused services, cancellation, or any other reason, and all payments are non-refundable regardless of whether the service has been used.',
  'Where CAROS and a client have entered into a separate Master Services Agreement or Service Order, the payment, billing, and refund terms of that executed agreement govern for that client. This section states CAROS\'s general policy for payments made through or in connection with the Website and CAROS services.',
  'This section does not limit any right that cannot be waived or excluded under applicable law.',
]

const read = p => readFileSync(new URL(p, import.meta.url), 'utf8')

test('terms page states the no-refund policy in the Services and Platform section', () => {
  const page = read('../app/%5Blocale%5D/terms/page.tsx')
  assert.match(page, /LegalSection n=\{10\} id="services"/)
  assert.match(page, /"Payments and Refunds"/)
  for (const clause of refundClauses) {
    assert.ok(page.includes(clause), `missing clause: ${clause.slice(0, 60)}…`)
  }
  // No invented satisfaction guarantee, discretionary or breach-based carve-out.
  assert.doesNotMatch(page, /satisfaction guarantee|money-back|money back/i)
  assert.doesNotMatch(page, /refund[^.]{0,80}(our (sole )?discretion|at our discretion)/i)
  assert.doesNotMatch(page, /in the event (of|that) CAROS (breach|fails to perform)/i)
})

test('terms keeps its 18 numbered sections and anchors unchanged', () => {
  const page = read('../app/%5Blocale%5D/terms/page.tsx')
  const tocIds = [...page.matchAll(/\{ id: "([a-z-]+)", title: "(\d+)\./g)].map(m => `${m[2]}:${m[1]}`)
  assert.equal(tocIds.length, 18)
  assert.deepEqual(tocIds, [
    '1:agreement', '2:changes', '3:access', '4:ip', '5:acceptable-use',
    '6:contributions', '7:enforcement', '8:reliance', '9:links', '10:services',
    '11:warranties', '12:liability', '13:indemnification', '14:governing-law',
    '15:dispute', '16:waiver', '17:entire-agreement', '18:contact',
  ])
})

test('spanish catalog translates every refund clause and the subheading', () => {
  const catalog = JSON.parse(read('../messages/full/forms-legal.es.json'))
  const heading = catalog['Payments and Refunds']
  assert.ok(heading, 'spanish subheading missing')
  assert.match(heading, /Pagos/i)
  for (const clause of refundClauses) {
    const es = catalog[clause]
    assert.ok(es, `missing spanish translation for: ${clause.slice(0, 60)}…`)
    assert.notEqual(es, clause, 'spanish value must not be a copy of the English source')
    assert.ok(es.length >= clause.length * 0.7, 'spanish value looks like a summary, not a full clause')
  }
  // The core no-refund sentence must use Spanish refund wording, not English.
  assert.match(catalog[refundClauses[0]], /reembolsables|no se reembols/i)
  assert.match(catalog[refundClauses[1]], /reembols/i)
  // The two qualification sentences must survive in Spanish.
  assert.match(catalog[refundClauses[2]], /ley aplicable/i)
  assert.match(catalog[refundClauses[1]], /Contrato Marco de Servicios/i)
})
