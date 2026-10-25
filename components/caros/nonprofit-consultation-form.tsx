"use client"

import catalog from "@/messages/full/forms-legal.es.json"
import { useSpanish } from "@/lib/use-spanish"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
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

export function NonprofitConsultationForm() {
  const { tr, es } = useSpanish(catalog)
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
      firstName: String(formData.get("contactName") ?? "").trim().split(/\s+/)[0] || "",
      lastName: String(formData.get("contactName") ?? "").trim().split(/\s+/).slice(1).join(" "),
      businessName: String(formData.get("organizationName") ?? ""),
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? ""),
      organizationType: String(formData.get("organizationType") ?? ""),
      challenges: String(formData.get("challenges") ?? ""),
      requestedCapabilities: String(formData.get("capabilities") ?? ""),
      contactPreference: String(formData.get("contactPreference") ?? ""),
      source: "nonprofit-consultation",
    }

    try {
      const res = await fetch("/api/nonprofit-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const message =
          data?.error || tr("Something went wrong. Please try again or email us directly at inquiries@getcarosai.com.")
        setError(!es && typeof message === "string" ? message : tr("Something went wrong. Please try again."))
        setSubmitting(false)
        return
      }

      setSubmitted(true)
    } catch (err) {
      console.error("[nonprofit-consultation] network error:", err)
      setError(tr("Something went wrong. Please try again or email us directly at inquiries@getcarosai.com."))
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-ink-border bg-ink p-10 text-center lg:p-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Check className="h-8 w-8" />
        </span>
        <h2 className="mt-8 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-tight tracking-tight text-ink-foreground"> {tr("Thank you — your request is in.")} </h2>
        <p className="mt-4 max-w-md text-pretty leading-relaxed text-ink-muted"> {tr("A member of the CAROS team will reach out to learn about your organization and explore the right configuration and pricing structure for you.")} </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-ink-border bg-ink p-6 lg:p-12">
      <div className="flex items-center gap-4">
        <Sunburst className="h-8 w-8 shrink-0 text-gold" />
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-ink-foreground"> {tr("Talk to the CAROS team")} </h3>
          <p className="mt-1 text-sm text-ink-muted"> {tr("Tell us about your organization and we'll be in touch within one business day.")} </p>
        </div>
      </div>

      <form onInvalid={(event) => { if (!es) return; const field = event.target as HTMLInputElement; field.setCustomValidity(tr(field.validity.typeMismatch ? (field.type === "email" ? "Please enter a valid email address." : "Please enter a valid URL.") : field.type === "checkbox" ? "Please check this box to continue." : field.tagName === "SELECT" ? "Please select an option." : "Please complete this field.")) }} onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")} onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="npc-org-name">{tr("Organization name *")}</Label>
          <input id="npc-org-name" name="organizationName" required className={fieldClass} placeholder={tr("Your organization")} />
        </div>
        <div>
          <Label htmlFor="npc-contact-name">{tr("Contact name *")}</Label>
          <input id="npc-contact-name" name="contactName" required className={fieldClass} placeholder={tr("Your name")} />
        </div>
        <div>
          <Label htmlFor="npc-email">{tr("Business email *")}</Label>
          <input id="npc-email" name="email" type="email" required className={fieldClass} placeholder="you@yourorg.org" />
        </div>
        <div>
          <Label htmlFor="npc-website">{tr("Website (optional)")}</Label>
          <input id="npc-website" name="website" type="url" className={fieldClass} placeholder="https://" />
        </div>
        <div>
          <Label htmlFor="npc-org-type">{tr("Organization type *")}</Label>
          <select id="npc-org-type" name="organizationType" required className={cn(fieldClass, "appearance-none")} defaultValue="">
            <option value="" disabled> {tr("Select one")} </option>
            <option value="Nonprofit / Charity">{tr("Nonprofit / Charity")}</option>
            <option value="Foundation">{tr("Foundation")}</option>
            <option value="Community Organization">{tr("Community Organization")}</option>
            <option value="Advocacy Group">{tr("Advocacy Group")}</option>
            <option value="Educational Nonprofit">{tr("Educational Nonprofit")}</option>
            <option value="Workforce Development">{tr("Workforce Development")}</option>
            <option value="Religious / Faith-Based Organization">{tr("Religious / Faith-Based Organization")}</option>
            <option value="Other Mission-Driven Organization">{tr("Other Mission-Driven Organization")}</option>
          </select>
        </div>
        <div>
          <Label htmlFor="npc-contact-pref">{tr("Contact preference *")}</Label>
          <select id="npc-contact-pref" name="contactPreference" required className={cn(fieldClass, "appearance-none")} defaultValue="">
            <option value="" disabled> {tr("Select one")} </option>
            <option value="Email">{tr("Email")}</option>
            <option value="Phone call">{tr("Phone call")}</option>
            <option value="Text message">{tr("Text message")}</option>
            <option value="Video call">{tr("Video call")}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="npc-challenges">{tr("Primary operational challenges *")}</Label>
          <textarea
            id="npc-challenges"
            name="challenges"
            required
            rows={3}
            className={cn(fieldClass, "h-auto resize-none")}
            placeholder={tr("e.g. volunteer coordination, donor follow-up, program enrollment, reporting...")}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="npc-capabilities">{tr("Requested capabilities")}</Label>
          <textarea
            id="npc-capabilities"
            name="capabilities"
            rows={3}
            className={cn(fieldClass, "h-auto resize-none")}
            placeholder={tr("What would you like CAROS to handle? (optional)")}
          />
        </div>

        {error ? (
          <p role="alert" className="sm:col-span-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {tr(error)}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
        >
          {submitting ? tr("Sending...") : tr("Request a Consultation")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  )
}
