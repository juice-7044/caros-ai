"use client"

import catalog from "@/messages/full/forms-legal.es.json"
import { useSpanish } from "@/lib/use-spanish"
import { localeHref } from "@/lib/spanish"
import { useRef, useState, type FormEvent } from "react"
import { track } from "@/lib/analytics-client"
import Link from "next/link"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { REVENUE_AUDIT, submitRevenueAudit } from "@/lib/revenue-audit-form"
import { Sunburst } from "./sunburst"

const fieldClass = "w-full rounded-lg border border-ink-border bg-ink px-4 py-3.5 text-ink-foreground outline-none transition-colors focus:border-gold"
const errorMessage = "We could not send your request. Please try again. Your information is still here."

export function AuditForm() {
  const { tr, locale, es } = useSpanish(catalog)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const started = useRef(false)
  const pending = useRef(false)

  function markStarted() {
    if (started.current) return
    started.current = true
    track("audit_start", { location: "revenue_audit_form" })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending.current) return
    pending.current = true
    setSubmitting(true)
    setError(false)
    // Native FormData semantics: unchecked SMS is absent, not false, "on" or empty.
    const data = new FormData(event.currentTarget)
    try {
      await submitRevenueAudit(data)
      track("audit_complete", { location: "revenue_audit_form" })
      setSubmitted(true)
    } catch {
      // Leave all values in place and never imply success on a failed request.
      setError(true)
    } finally {
      pending.current = false
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div data-audit-success role="status" className="flex flex-col items-center rounded-2xl border border-ink-border bg-ink p-10 text-center lg:p-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold"><Check className="h-8 w-8" aria-hidden="true" /></span>
      <h2 className="mt-8 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink-foreground">{tr("Thanks! We got it and someone from CAROS will be in touch.")}</h2>
      <Sunburst className="mt-10 w-14 text-gold" />
    </div>
  )

  const [wordingBeforePrivacy] = REVENUE_AUDIT.wording.split("Privacy Policy")
  return (
    <form id={REVENUE_AUDIT.formId} method="post" action={REVENUE_AUDIT.endpoint}
      onSubmit={handleSubmit} onFocusCapture={markStarted}
      onInvalid={(event) => {
        const field = event.target as HTMLInputElement
        field.setCustomValidity(tr(field.validity.typeMismatch ? "Please enter a valid email address." : "Please complete this field."))
      }}
      onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")}
      aria-busy={submitting} className="rounded-2xl border border-ink-border bg-ink/60 p-6 sm:p-8 lg:p-12">
      <div className="grid gap-6 sm:grid-cols-2">
        {REVENUE_AUDIT.fields.filter(field => field.type !== "checkbox").map(field => {
          const id = `audit-${field.name}`
          return <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : undefined}>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-foreground/90">{tr(field.name === "consent" ? "Contact preference" : field.label)}{field.name === "email" ? " *" : ""}</label>
            {field.type === "textarea" ? <textarea id={id} name={field.name} rows={4} className={fieldClass} /> :
              <input id={id} name={field.name} type={field.type} required={field.name === "email"} className={fieldClass} aria-describedby={field.name === "consent" ? "audit-contact-help" : undefined} />}
            {field.name === "consent" && <p id="audit-contact-help" className="mt-2 text-xs leading-relaxed text-ink-muted">{tr("Contact preferences only; this does not authorize SMS.")}</p>}
          </div>
        })}
      </div>
      <div className="mt-6 flex items-start gap-3">
        <input id="audit-sms_consent" name="sms_consent" type="checkbox" value={REVENUE_AUDIT.checkboxValue}
          aria-describedby={es ? "audit-sms-language" : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-ink-border bg-ink accent-gold outline-none focus-visible:ring-2 focus-visible:ring-gold" />
        <label lang="en" htmlFor="audit-sms_consent" className="cursor-pointer text-xs leading-relaxed text-ink-muted">{wordingBeforePrivacy}<Link href={localeHref("/privacy", locale)} className="font-medium text-gold underline underline-offset-4">Privacy Policy</Link>{" and "}<Link href={localeHref("/terms", locale)} className="font-medium text-gold underline underline-offset-4">Terms &amp; Conditions</Link>.</label>
      </div>
      {es && <p id="audit-sms-language" lang="es" className="mt-3 text-xs leading-relaxed text-ink-muted">El consentimiento para SMS se muestra en inglés con el texto aprobado.</p>}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button type="submit" disabled={submitting} className="group mt-8 inline-flex min-h-16 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-lg font-semibold text-gold-foreground transition-all hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-70">
        {submitting ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />{tr("Submitting...")}</> : <>{tr("Request My Revenue Audit")}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></>}
      </button>
      {error ? <p role="alert" className="mt-4 text-center text-sm font-medium text-red-400">{tr(errorMessage)}</p> :
        <p className="mt-4 text-center text-sm text-ink-muted">{tr("No cost. No obligation. Just a clear picture of where your revenue is going.")}</p>}
    </form>
  )
}
