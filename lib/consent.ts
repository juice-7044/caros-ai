export const CONSENT_VERSION = 1
export const CONSENT_COOKIE = 'caros_consent'
export const CONSENT_MAX_AGE_DAYS = 180

export type ConsentChoices = { analytics: boolean; marketing: boolean }
export type ConsentRecord = ConsentChoices & { v: number; ts: number }
export type PrivacyEnv = { globalPrivacyControl?: boolean }

/** Non-essential categories are denied until the visitor chooses. */
export function defaultConsent(_env: PrivacyEnv): ConsentChoices {
  return { analytics: false, marketing: false }
}

const record = (c: ConsentChoices, now: number): ConsentRecord => ({ v: CONSENT_VERSION, ts: now, analytics: c.analytics, marketing: c.marketing })

/** Global Privacy Control is a standing opt-out of marketing/sale/sharing: it caps marketing even on Accept all. */
const capByPrivacySignal = (c: ConsentChoices, env: PrivacyEnv): ConsentChoices => ({ analytics: c.analytics, marketing: c.marketing && env.globalPrivacyControl !== true })

export const acceptAll = (env: PrivacyEnv, now: number) => record(capByPrivacySignal({ analytics: true, marketing: true }, env), now)
export const rejectNonEssential = (now: number) => record({ analytics: false, marketing: false }, now)
export const customize = (c: ConsentChoices, env: PrivacyEnv, now: number) => record(capByPrivacySignal(c, env), now)

export const serializeRecord = (r: ConsentRecord) => JSON.stringify(r)

/** Returns null when absent, malformed or from another policy version (so the visitor is asked again). */
export function parseRecord(raw: string | null | undefined): ConsentRecord | null {
  if (!raw) return null
  try {
    const r = JSON.parse(raw)
    if (r && r.v === CONSENT_VERSION && typeof r.ts === 'number' && typeof r.analytics === 'boolean' && typeof r.marketing === 'boolean') {
      return { v: r.v, ts: r.ts, analytics: r.analytics, marketing: r.marketing }
    }
  } catch {}
  return null
}

export const needsPrompt = (r: ConsentRecord | null) => r === null

/** Google Consent Mode v2 signals. Functionality and security storage are essential. */
export function toGoogleConsent(c: ConsentChoices) {
  const ads = c.marketing ? 'granted' : 'denied'
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  }
}
