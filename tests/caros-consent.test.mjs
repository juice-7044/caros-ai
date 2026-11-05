import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  CONSENT_VERSION, defaultConsent, acceptAll, rejectNonEssential, customize,
  serializeRecord, parseRecord, toGoogleConsent, needsPrompt,
} from '../lib/consent.ts'

const src = path => readFileSync(new URL(path, import.meta.url), 'utf8')

test('default state denies analytics and marketing and needs a prompt', () => {
  assert.deepEqual(defaultConsent({}), { analytics: false, marketing: false })
  assert.equal(needsPrompt(null), true)
})

test('accept all grants analytics and marketing', () => {
  assert.deepEqual(acceptAll({}, 1000), { v: CONSENT_VERSION, ts: 1000, analytics: true, marketing: true })
})

test('reject non-essential denies both, with the same shape and recorded choice as accept', () => {
  const r = rejectNonEssential(2000)
  assert.deepEqual(r, { v: CONSENT_VERSION, ts: 2000, analytics: false, marketing: false })
  assert.equal(needsPrompt(r), false)
})

test('customize records exactly the toggles chosen', () => {
  assert.deepEqual(customize({ analytics: true, marketing: false }, {}, 3), { v: CONSENT_VERSION, ts: 3, analytics: true, marketing: false })
  assert.deepEqual(customize({ analytics: false, marketing: true }, {}, 3).marketing, true)
})

test('Global Privacy Control denies marketing by default and cannot be overridden by accept all', () => {
  const gpc = { globalPrivacyControl: true }
  assert.deepEqual(defaultConsent(gpc), { analytics: false, marketing: false })
  const a = acceptAll(gpc, 5)
  assert.equal(a.marketing, false)
  assert.equal(a.analytics, true)
  assert.equal(customize({ analytics: true, marketing: true }, gpc, 5).marketing, false)
})

test('record persists and round-trips; wrong version, junk or missing data means no choice', () => {
  const rec = acceptAll({}, 42)
  assert.deepEqual(parseRecord(serializeRecord(rec)), rec)
  assert.equal(needsPrompt(parseRecord(serializeRecord(rec))), false)
  assert.equal(parseRecord(serializeRecord({ ...rec, v: CONSENT_VERSION + 1 })), null)
  assert.equal(parseRecord('not json'), null)
  assert.equal(parseRecord(undefined), null)
  assert.equal(parseRecord(JSON.stringify({ v: CONSENT_VERSION, ts: 1, analytics: 'yes', marketing: true })), null)
})

test('Google Consent Mode v2 mapping', () => {
  assert.deepEqual(toGoogleConsent(rejectNonEssential(1)), {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
    functionality_storage: 'granted', security_storage: 'granted',
  })
  assert.deepEqual(toGoogleConsent(acceptAll({}, 1)), {
    ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted',
    functionality_storage: 'granted', security_storage: 'granted',
  })
  const split = toGoogleConsent({ v: CONSENT_VERSION, ts: 1, analytics: true, marketing: false })
  assert.equal(split.analytics_storage, 'granted')
  assert.equal(split.ad_storage, 'denied')
})

test('our analytics helper requires analytics consent, in addition to DNT/GPC', async () => {
  const { trackEvent } = await import('../lib/analytics.ts')
  const none = { dataLayer: [], navigator: {} }
  trackEvent('demo_click', { location: 'hero' }, none)
  assert.deepEqual(none.dataLayer, [], 'no consent record -> nothing sent')
  const denied = { dataLayer: [], navigator: {}, consent: { analytics: false, marketing: true } }
  trackEvent('demo_click', { location: 'hero' }, denied)
  assert.deepEqual(denied.dataLayer, [])
  const ok = { dataLayer: [], navigator: {}, consent: { analytics: true, marketing: false } }
  trackEvent('demo_click', { location: 'hero' }, ok)
  assert.equal(ok.dataLayer.length, 1)
  const dnt = { dataLayer: [], navigator: { doNotTrack: '1' }, consent: { analytics: true, marketing: true } }
  trackEvent('demo_click', { location: 'hero' }, dnt)
  assert.deepEqual(dnt.dataLayer, [])
})

test('layout: consent default is set before GTM and gtag load; Meta Pixel is not initialised unconditionally', () => {
  const layout = src('../app/layout.tsx')
  const def = layout.indexOf("'consent','default'")
  assert.ok(def > -1, "consent default present")
  assert.ok(def < layout.indexOf('id="google-tag-manager"'), 'consent default precedes GTM')
  assert.ok(def < layout.indexOf('googletagmanager.com/gtag/js'), 'consent default precedes gtag')
  for (const k of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage', 'functionality_storage', 'security_storage', 'wait_for_update']) {
    assert.match(layout, new RegExp(k))
  }
  assert.doesNotMatch(layout, /fbq\(\s*['"]init/, 'no unconditional fbq init')
  assert.doesNotMatch(layout, /connect\.facebook\.net/, 'pixel script only loads via the consent-gated loader')
  assert.doesNotMatch(layout, /facebook\.com\/tr\?/, 'noscript pixel removed (cannot honor consent)')
  assert.doesNotMatch(layout, /googletagmanager\.com\/ns\.html/, 'GTM noscript iframe removed (cannot honor consent)')
  assert.match(src('../components/caros/route-chrome.tsx'), /ConsentBanner/)
})

test('meta pixel loader only runs after marketing consent', () => {
  const loader = src('../lib/consent-client.ts')
  assert.match(loader, /fbq\('consent', 'revoke'\)|fbq\("consent", "revoke"\)/)
  assert.match(loader, /marketing/)
  assert.match(loader, /1646397766883866/)
})

test('footer has a persistent Cookie settings control', () => {
  assert.match(src('../components/caros/site-footer.tsx'), /CookieSettingsButton/)
})
