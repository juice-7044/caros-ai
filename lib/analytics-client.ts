"use client"

import { trackEvent } from "./analytics"
import { readConsent } from "./consent-client"

/** Browser wrapper: pushes consent-aware events to the existing GTM dataLayer. */
export function track(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> }
  w.dataLayer = w.dataLayer || []
  trackEvent(name, props, {
    dataLayer: w.dataLayer,
    consent: readConsent(),
    navigator: navigator as unknown as { doNotTrack?: string | null; globalPrivacyControl?: boolean },
  })
}
