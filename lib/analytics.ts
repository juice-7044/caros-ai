export type AnalyticsEnv = {
  dataLayer?: Array<Record<string, unknown>>
  navigator?: { doNotTrack?: string | null; globalPrivacyControl?: boolean }
}

/** Metadata keys that may leave the browser. Anything else (names, emails, salaries, totals) is dropped. */
const ALLOWED_KEYS = new Set(['cta', 'location', 'field', 'action', 'section', 'depth', 'expanded', 'item', 'locale', 'kind'])
const MAX_STRING = 64

function clean(props: Record<string, unknown>) {
  const out: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!ALLOWED_KEYS.has(key)) continue
    if (typeof value === 'string') out[key] = value.slice(0, MAX_STRING)
    else if (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))) out[key] = value
  }
  return out
}

/** No consent banner exists on the site, so honour the browser-level opt-outs. */
export function trackingAllowed(env: AnalyticsEnv) {
  const nav = env.navigator
  return !(nav?.doNotTrack === '1' || nav?.globalPrivacyControl === true)
}

export function trackEvent(name: string, props: Record<string, unknown>, env: AnalyticsEnv) {
  if (!trackingAllowed(env)) return
  env.dataLayer?.push({ event: `caros_${name}`, ...clean(props) })
}

const MILESTONES = [25, 50, 75, 100]

/** Returns milestones newly reached at `percent` and records them in `seen`. */
export function newScrollMilestones(percent: number, seen: Set<number>) {
  if (!Number.isFinite(percent)) return []
  const fresh = MILESTONES.filter((m) => percent >= m && !seen.has(m))
  fresh.forEach((m) => seen.add(m))
  return fresh
}
