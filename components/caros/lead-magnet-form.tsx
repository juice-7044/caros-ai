"use client"

import { useRef, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { sendLead } from "@/lib/caros-leads"
import { track } from "@/lib/analytics-client"
import { LEAD_MAGNET_TRADES, type LeadMagnet } from "@/lib/lead-magnets"

// The lead-magnet sign-up (the GHL form's own fields and consent wording). It posts straight to CAROS from the visitor's
// browser (lib/caros-leads.ts), then opens the thank-you page with the instant download. Texts are never sent without
// the matching box ticked; the guide and a few short follow-up emails come from CAROS, each with a stop link.
const fieldClass =
  "h-12 w-full rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold"

export const SMS_CONSENT =
  "By checking this box, I consent to receive non-marketing text messages from CAROS about my guide request and Free Business Audit scheduling. Message frequency varies, message & data rates may apply. Text HELP for assistance, reply STOP to opt out."
export const MARKETING_CONSENT =
  "By checking this box, I consent to receive marketing and promotional messages, including revenue tips, offers and product updates, from CAROS at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out."

export function LeadMagnetForm({ magnet, locale, thanksHref }: { magnet: LeadMagnet; locale: string; thanksHref: string }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const started = useRef(false)
  const markStarted = () => {
    if (started.current) return
    started.current = true
    track("lead_magnet_start", { location: magnet.key })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) ?? "").trim()
    const when = new Date().toISOString()
    const sms = data.get("sms") === "on"
    const marketing = data.get("marketing") === "on"
    const sent = await sendLead(magnet.form, {
      name: get("firstName"),
      email: get("email"),
      phone: get("phone"),
      industry: get("trade"),
      consent: sms ? `Agreed to non-marketing texts on the getcaros.com ${magnet.trade} guide form (${when}): "${SMS_CONSENT}"` : "No text-message consent",
      details: {
        "Marketing texts": marketing ? `Agreed (${when}): "${MARKETING_CONSENT}"` : "No",
        Guide: magnet.formTitle.replace(/^Get the free /, ""),
        Page: `getcaros.com/${locale}/free/${magnet.slug}`,
        Language: locale,
      },
    })
    if (!sent.ok) {
      setError(sent.error)
      setSubmitting(false)
      return
    }
    track("lead_magnet_complete", { location: magnet.key })
    router.push(thanksHref)
  }

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-foreground">{magnet.formTitle}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{magnet.formNote}</p>
      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="lm-first" className="mb-2 block text-sm font-semibold">First Name *</label>
          <input id="lm-first" name="firstName" required maxLength={120} autoComplete="given-name" placeholder="Enter your first name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="lm-phone" className="mb-2 block text-sm font-semibold">Phone (optional)</label>
          <input id="lm-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+1 (555) 000-0000" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="lm-trade" className="mb-2 block text-sm font-semibold">Your trade *</label>
          <select id="lm-trade" name="trade" required defaultValue={magnet.trade} className={fieldClass}>
            {LEAD_MAGNET_TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lm-email" className="mb-2 block text-sm font-semibold">Email *</label>
          <input id="lm-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="your@email.com" className={fieldClass} />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input name="sms" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
          <span>{SMS_CONSENT}</span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input name="marketing" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
          <span>{MARKETING_CONSENT}</span>
        </label>
      </div>
      {error && <p role="alert" className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      <button type="submit" disabled={submitting} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-60">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send me the guide
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        We&apos;ll email you the guide and a few short follow-ups. Stop them any time with one click.{" "}
        <a href={`/${locale}/privacy`} className="underline underline-offset-2">Privacy Policy</a> | <a href={`/${locale}/terms`} className="underline underline-offset-2">Terms of Service</a>
      </p>
    </form>
  )
}
