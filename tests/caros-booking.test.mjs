import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { BOOKING_URL, CHECKIN_URL, DISCOVERY_URL, KICKOFF_URL, bookingUrlFor } from '../lib/site.ts'

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8')

test('booking goes to the CAROS Cal.com, never the GHL widget', () => {
  assert.equal(BOOKING_URL, 'https://cal.com/caros-xpisne/revenue-audit')
  assert.equal(DISCOVERY_URL, 'https://cal.com/caros-xpisne/discovery-call')
  assert.equal(KICKOFF_URL, 'https://cal.com/caros-xpisne/caros-kickoff-call')
  assert.equal(CHECKIN_URL, 'https://cal.com/caros-xpisne/client-check-in')
  for (const f of ['../lib/site.ts', '../lib/industries.ts', '../lib/industries-es.ts', '../components/caros/audit-form.tsx', '../components/caros/dealership-page.tsx', '../next.config.mjs']) {
    assert.doesNotMatch(source(f), /links\.getcaros\.com|widget\/booking|leadconnectorhq|msgsndr/, f)
  }
})

test('booking helper preserves prefill but native audit never redirects or claims a booking', () => {
  const u = new URL(bookingUrlFor({ name: ' Jo Smith ', email: 'jo@x.com' }))
  assert.equal(u.origin + u.pathname, BOOKING_URL)
  assert.equal(u.searchParams.get('name'), 'Jo Smith')
  assert.equal(u.searchParams.get('email'), 'jo@x.com')
  assert.equal(bookingUrlFor({}), BOOKING_URL)
  const form = source('../components/caros/audit-form.tsx')
  assert.doesNotMatch(form, /window\.location|bookingUrlFor|Review is booked/)
  assert.match(form, /Thanks! We got it and someone from CAROS will be in touch\./)
})

test('demo buttons go to the Discovery Call', () => {
  assert.match(source('../components/caros/dealership-page.tsx'), /href=\{DISCOVERY_URL\}/)
  assert.match(source('../lib/industries.ts'), /secondaryLabel: "Book a Demo", secondaryHref: "https:\/\/cal\.com\/caros-xpisne\/discovery-call"/)
})
