import {
  CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS, parseRecord, serializeRecord, toGoogleConsent,
  type ConsentChoices, type ConsentRecord, type PrivacyEnv,
} from "./consent"

export const CONSENT_CHANGED_EVENT = "caros:consent-changed"
export const OPEN_CONSENT_EVENT = "caros:open-consent"
const META_PIXEL_ID = "1646397766883866"

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
type ConsentWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; fbq?: Fbq; _fbq?: Fbq }

export function readConsent(): ConsentRecord | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
  if (!match) return null
  try { return parseRecord(decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1))) } catch { return null }
}

export function privacyEnv(): PrivacyEnv {
  if (typeof navigator === "undefined") return {}
  return { globalPrivacyControl: (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true }
}

function writeConsent(record: ConsentRecord) {
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(serializeRecord(record))}; Max-Age=${CONSENT_MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`
}

/** Loads the Meta Pixel. Called only once marketing consent is granted; never at page load. */
export function loadMetaPixel() {
  const w = window as ConsentWindow
  if (w.fbq?.loaded) { w.fbq("consent", "grant"); return }
  if (!w.fbq) {
    const n: Fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue!.push(args) }
    w.fbq = n
    if (!w._fbq) w._fbq = n
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = []
    const s = document.createElement("script")
    s.async = true
    s.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(s)
  }
  w.fbq!("consent", "revoke")
  w.fbq!("init", META_PIXEL_ID)
  w.fbq!("consent", "grant")
  w.fbq!("track", "PageView")
}

/** Pushes Consent Mode v2 state to Google tags and starts/stops the Meta Pixel to match. */
export function applyConsent(choices: ConsentChoices) {
  const w = window as ConsentWindow
  w.dataLayer = w.dataLayer || []
  const gtag = w.gtag ?? function () { w.dataLayer!.push(arguments) }
  gtag("consent", "update", toGoogleConsent(choices))
  if (choices.marketing) loadMetaPixel()
  else if (w.fbq?.loaded) w.fbq("consent", "revoke")
}

export function saveConsent(record: ConsentRecord) {
  writeConsent(record)
  applyConsent(record)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }))
}

export const openConsentSettings = () => window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))
