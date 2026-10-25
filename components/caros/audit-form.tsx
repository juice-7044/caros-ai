"use client"

import catalog from "@/messages/full/forms-legal.es.json"
import { useSpanish } from "@/lib/use-spanish"
import { localeHref } from "@/lib/spanish"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { INDUSTRIES, BOOKING_URL } from "@/lib/site"
import { Sunburst } from "./sunburst"
import { cn } from "@/lib/utils"

const fieldClass =
  "h-13 w-full rounded-lg border border-ink-border bg-ink px-4 py-3.5 text-ink-foreground placeholder:text-ink-muted/60 outline-none transition-colors focus:border-gold"

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink-foreground/90">
      {children}
    </label>
  )
}

export function AuditForm() {
  const { tr, locale, es } = useSpanish(catalog)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      businessName: String(formData.get("business") ?? ""),
      industry: String(formData.get("industry") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      averageJobValue: String(formData.get("revenue") ?? ""),
      knownLeaks: String(formData.get("notes") ?? ""),
      smsConsent: formData.get("consent") === "on",
    }

    try {
      const res = await fetch("/api/revenue-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        console.error("[v0] Revenue audit submission failed:", res.status, data)
        const message =
          data?.error || data?.ghlResponse || tr("Something went wrong. Please try again or call us directly.")
        setError(!es && typeof message === "string" ? message : tr("Something went wrong. Please try again or call us directly."))
        setSubmitting(false)
        return
      }

      setSubmitted(true)
      // Redirect to the booking calendar to schedule the audit
      window.location.href = BOOKING_URL
    } catch (err) {
      console.error("[v0] Revenue audit network error:", err)
      setError(tr("Something went wrong. Please try again or call us directly."))
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-ink-border bg-ink p-10 text-center lg:p-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Check className="h-8 w-8" />
        </span>
        <h2 className="mt-8 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-tight tracking-tight text-ink-foreground"> {tr("Your Revenue Audit Review is booked.")} </h2>
        <p className="mt-4 max-w-md text-pretty leading-relaxed text-ink-muted"> {tr("Taking you to our calendar to pick a time. If it doesn't open automatically,")}{" "}
          <a href={BOOKING_URL} className="font-semibold text-gold underline-offset-4 hover:underline"> {tr("click here to book your review")} </a>
          .
        </p>
        <Sunburst className="mt-10 w-14 text-gold" />
      </div>
    )
  }

  return (
    <form onInvalid={(event) => { if (!es) return; const field = event.target as HTMLInputElement; field.setCustomValidity(tr(field.validity.typeMismatch ? (field.type === "email" ? "Please enter a valid email address." : "Please enter a valid URL.") : field.type === "checkbox" ? "Please check this box to continue." : field.tagName === "SELECT" ? "Please select an option." : "Please complete this field.")) }} onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")} onSubmit={handleSubmit} className="rounded-2xl border border-ink-border bg-ink/60 p-8 lg:p-12">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">{tr("First name")}</Label>
          <input id="firstName" name="firstName" required className={fieldClass} placeholder="Jordan" />
        </div>
        <div>
          <Label htmlFor="lastName">{tr("Last name")}</Label>
          <input id="lastName" name="lastName" required className={fieldClass} placeholder="Rivera" />
        </div>
        <div>
          <Label htmlFor="business">{tr("Business name")}</Label>
          <input id="business" name="business" required className={fieldClass} placeholder={tr("Rivera Roofing Co.")} />
        </div>
        <div>
          <Label htmlFor="industry">{tr("Industry")}</Label>
          <select id="industry" name="industry" required defaultValue="" className={cn(fieldClass, "appearance-none")}>
            <option value="" disabled> {tr("Select your trade")} </option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {tr(industry)}
              </option>
            ))}
            <option value="Other">{tr("Other")}</option>
          </select>
        </div>
        <div>
          <Label htmlFor="email">{tr("Email")}</Label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@business.com" />
        </div>
        <div>
          <Label htmlFor="phone">{tr("Phone")}</Label>
          <input id="phone" name="phone" type="tel" required className={fieldClass} placeholder="(555) 123-4567" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="revenue">{tr("Roughly, what does an average job bring in?")}</Label>
          <select id="revenue" name="revenue" defaultValue="" className={cn(fieldClass, "appearance-none")}>
            <option value="" disabled> {tr("Select a range")} </option>
            <option value="Under $500">{tr("Under $500")}</option>
            <option>$500 – $2,000</option>
            <option>$2,000 – $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000+</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">{tr("What's leaking that you already know about?")}</Label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={cn(fieldClass, "h-auto resize-none")}
            placeholder={tr("Missed calls after hours, no follow-up on estimates, no idea which ads work...")}
          />
        </div>
      </div>

      <label htmlFor="consent" className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-ink-border bg-ink accent-gold outline-none focus-visible:ring-2 focus-visible:ring-gold"
        />
        <span className="text-xs leading-relaxed text-ink-muted"> {tr("I consent to receive non-marketing text messages from CAROSAI")}{"  "}{tr("about my Revenue Audit inquiry, appointment confirmations, appointment reminders, and audit follow-up at the phone number provided. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase. See our")}{" "}
          <Link href={localeHref("https://getcaros.com/privacy", locale)} className="font-medium text-gold underline-offset-4 hover:underline"> {tr("Privacy Policy")} </Link>{" "} {tr("and")}{" "}
          <Link href={localeHref("https://getcaros.com/terms", locale)} className="font-medium text-gold underline-offset-4 hover:underline"> {tr("Terms & Conditions")} </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="group mt-8 inline-flex h-16 w-full items-center justify-center gap-2 rounded-full bg-gold px-8 text-lg font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> {tr("Submitting...")} </>
        ) : (
          <> {tr("Book My Revenue Audit Review")} <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
      {error ? (
        <p role="alert" className="mt-4 text-center text-sm font-medium text-red-400">
          {tr(error)}
        </p>
      ) : (
        <p className="mt-4 text-center text-sm text-ink-muted"> {tr("No cost. No obligation. Just a clear picture of where your revenue is going.")} </p>
      )}
    </form>
  )
}
