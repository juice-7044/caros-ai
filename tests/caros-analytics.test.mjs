import test from 'node:test'
import assert from 'node:assert/strict'
import { trackEvent } from '../lib/analytics.ts'

const env = (extra = {}) => ({ dataLayer: [], navigator: {}, consent: { analytics: true }, ...extra })

test('trackEvent pushes a namespaced event to dataLayer', () => {
  const e = env()
  trackEvent('hero_cta_click', { cta: 'see_caros_in_action', location: 'hero' }, e)
  assert.deepEqual(e.dataLayer, [{ event: 'caros_hero_cta_click', cta: 'see_caros_in_action', location: 'hero' }])
})

test('trackEvent drops personal and financial values, keeps only allowlisted primitive metadata', () => {
  const e = env()
  trackEvent('employee_calc_interaction', {
    field: 'salary', location: 'hero', email: 'a@b.com', phone: '555', name: 'Ann',
    salary: 50000, employees: 5, annual: 250000, expanded: true, nested: { x: 1 },
    action: 'x'.repeat(200),
  }, e)
  const pushed = e.dataLayer[0]
  assert.deepEqual(Object.keys(pushed).sort(), ['action', 'event', 'expanded', 'field', 'location'])
  assert.equal(pushed.action.length, 64)
})

test('trackEvent sends nothing when Do Not Track or Global Privacy Control is on', () => {
  for (const navigator of [{ doNotTrack: '1' }, { globalPrivacyControl: true }]) {
    const e = env({ navigator })
    trackEvent('demo_click', { location: 'hero' }, e)
    assert.deepEqual(e.dataLayer, [])
  }
})

test('scroll depth reports each milestone once as the page is scrolled', async () => {
  const { newScrollMilestones } = await import('../lib/analytics.ts')
  const seen = new Set()
  assert.deepEqual(newScrollMilestones(10, seen), [])
  assert.deepEqual(newScrollMilestones(60, seen), [25, 50])
  assert.deepEqual(newScrollMilestones(60, seen), [])
  assert.deepEqual(newScrollMilestones(100, seen), [75, 100])
  assert.deepEqual(newScrollMilestones(NaN, new Set()), [])
})

test('revenue audit form reports start and completion without altering its payload', async () => {
  const { readFileSync } = await import('node:fs')
  const form = readFileSync(new URL('../components/caros/audit-form.tsx', import.meta.url), 'utf8')
  assert.match(form, /track\("audit_start"/)
  assert.match(form, /track\("audit_complete"/)
  // completion is reported only after a successful response
  assert.ok(form.indexOf('track("audit_complete"') > form.indexOf('if (!res.ok)'))
  assert.match(form, /smsConsent: formData\.get\("consent"\) === "on"/)
  assert.doesNotMatch(form, /track\([^)]*(email|phone|firstName)/)
})
