// Website forms post straight to CAROS (Ann, 8 Nov 2026: "move everything off GHL"). Each address below is a CAROS
// site form in the CAROS account (ask.getcaros.com /api/forms/{key}): the key is public by design (it is the form's
// address, like any embedded form), names exactly one form, and the form applies its own tags and writes every field
// into a note on the contact. The post is made from the visitor's browser, so CAROS's per-address hourly limit counts
// each visitor separately (a server-side relay would share one address for everyone). A submission is never marketing
// consent on its own; an explicit SMS opt-in is recorded word for word in `consent`.
export const CAROS_FORMS = {
  audit: "https://ask.getcaros.com/api/forms/STXwJ6GJRXmSPQMOKgOwJsUlEC80c0J_nmQhpRR2yDo",
  affiliate: "https://ask.getcaros.com/api/forms/pK8nEKA1SAKvOSxu5-VYbjiJFthG5UPMnd-iFy4xBb8",
  nonprofit: "https://ask.getcaros.com/api/forms/Gu-PQsaxRDuQLv2sMMdZVyXgKqeuzU8BsvL-IgwTzw4",
} as const
export type CarosForm = keyof typeof CAROS_FORMS

export type CarosLead = {
  name: string
  email: string
  phone?: string
  company?: string
  site?: string
  industry?: string
  consent?: string
  // Everything else the person typed, as "Label: value" lines in the contact's note.
  details?: Record<string, string | boolean | undefined | null>
}

const TEXT_MAX = 200
const DETAILS_MAX = 2000
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max)

// The body CAROS expects. Never a field named "website": that is CAROS's hidden spam trap.
export function leadBody(lead: CarosLead): Record<string, string> {
  const details = Object.entries(lead.details ?? {})
    .map(([label, value]) => [label, typeof value === "boolean" ? (value ? "Yes" : "No") : clip(value, DETAILS_MAX)] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")
  const body: Record<string, string> = {
    name: clip(lead.name, 120),
    email: clip(lead.email, 254),
    phone: clip(lead.phone, 40),
    company: clip(lead.company, TEXT_MAX),
    site: clip(lead.site, TEXT_MAX),
    industry: clip(lead.industry, TEXT_MAX),
    consent: clip(lead.consent, TEXT_MAX),
    details: details.slice(0, DETAILS_MAX),
  }
  for (const key of Object.keys(body)) if (!body[key]) delete body[key]
  return body
}

export type SendResult = { ok: true } | { ok: false; error: string }

// Posts the lead to CAROS. The answer is CAROS's own plain-language reason when it refuses (for example a mistyped
// email), else a generic retry message; it never throws.
export async function sendLead(form: CarosForm, lead: CarosLead, fetchImpl: typeof fetch = fetch): Promise<SendResult> {
  try {
    const res = await fetchImpl(CAROS_FORMS[form], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadBody(lead)),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; problems?: unknown; reason?: unknown }
    if (res.ok && data.ok) return { ok: true }
    const problems = Array.isArray(data.problems) ? data.problems.filter((p): p is string => typeof p === "string") : []
    return { ok: false, error: problems.join(" ") || (typeof data.reason === "string" && data.reason) || "Something went wrong. Please try again." }
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}
