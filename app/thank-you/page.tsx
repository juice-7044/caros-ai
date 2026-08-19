"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, ChevronRight, Copy, Mail, Phone, ShieldCheck } from "lucide-react"

const IMPLEMENTATION_FEE = 2500
const MONTHLY_SUBSCRIPTION = 997

const timeline = [
  ["01", "Payment confirmed", "Your CAROS Revenue System setup is secured."],
  ["02", "We review your business", "Our team prepares around your market, team, and goals."],
  ["03", "You meet your onboarding lead", "We connect the dots and map the fastest path to revenue."],
  ["04", "Your system goes live", "Your operating system starts turning attention into booked revenue."],
]

function purchaseEvent(value: number) {
  return {
    event: "purchase",
    ecommerce: {
      transaction_id: `caros-${Date.now()}`,
      value,
      currency: "USD",
      items: [{ item_name: "CAROS Revenue System", price: value, quantity: 1 }],
    },
  }
}

function ThankYouContent() {
  const params = useSearchParams()
  const [copied, setCopied] = useState(false)
  const name = params.get("name")?.trim() || "there"
  const plan = params.get("plan")?.trim() || "CAROS Revenue System"
  const kickoff = params.get("kickoff")?.trim() || "Your onboarding lead will reach out shortly"
  const referral = params.get("referral")?.trim()
  const amount = IMPLEMENTATION_FEE + MONTHLY_SUBSCRIPTION

  useEffect(() => {
    const key = "caros-purchase-tracked"
    if (sessionStorage.getItem(key)) return

    const event = purchaseEvent(amount)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)

    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", { value: amount, currency: "USD" })
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-REPLACE_WITH_CONVERSION_ID/REPLACE_WITH_LABEL",
        value: amount,
        currency: "USD",
        transaction_id: event.ecommerce.transaction_id,
      })
    }

    sessionStorage.setItem(key, "1")
  }, [amount])

  async function copyReferral() {
    if (!referral) return
    await navigator.clipboard.writeText(referral)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="min-h-screen bg-ink text-ink-foreground">
      <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
        <header className="flex items-center justify-between">
          <a href="/" aria-label="CAROS home" className="font-display text-xl tracking-[0.2em] text-gold">
            CAROS
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Revenue system secured</span>
        </header>

        <section className="pt-20 sm:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Payment confirmed
          </div>
          <h1 className="mt-7 text-balance font-display text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            You&apos;re in, <span className="font-serif font-normal italic text-gold">{name}.</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-ink-muted sm:text-xl">
            Your CAROS Revenue System is secured. Now we turn the attention you&apos;re already earning into a system that captures, books, and grows revenue.
          </p>
          <p className="mt-5 text-sm leading-6 text-ink-muted">{kickoff}</p>
        </section>

        <section className="mt-16 border-y border-ink-border py-8 sm:mt-20" aria-label="What happens next">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-[-0.03em]">What happens next</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">01 — 04</span>
          </div>
          <ol className="space-y-0">
            {timeline.map(([number, title, description], index) => (
              <li key={number} className="relative flex gap-5 pb-8 last:pb-0">
                {index < timeline.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-ink-border" aria-hidden="true" />}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold bg-ink font-mono text-[10px] text-gold">{number}</span>
                <div>
                  <h3 className="font-semibold text-ink-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border border-ink-border bg-[#111113] p-6 sm:p-8" aria-label="Purchase summary">
          <div className="flex items-start justify-between gap-6 border-b border-ink-border pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Receipt summary</p>
              <h2 className="mt-3 text-xl font-semibold">{plan}</h2>
            </div>
            <Check className="h-6 w-6 shrink-0 text-gold" />
          </div>
          <dl className="grid gap-5 pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-muted">Implementation fee</dt>
              <dd className="mt-1 font-semibold">${IMPLEMENTATION_FEE.toLocaleString("en-US")} USD</dd>
              <p className="mt-1 text-xs text-ink-muted">One-time</p>
            </div>
            <div>
              <dt className="text-ink-muted">Monthly subscription</dt>
              <dd className="mt-1 font-semibold">${MONTHLY_SUBSCRIPTION.toLocaleString("en-US")} USD</dd>
              <p className="mt-1 text-xs text-ink-muted">Billed monthly</p>
            </div>
            <div>
              <dt className="text-ink-muted">Status</dt>
              <dd className="mt-1 font-semibold text-gold">Confirmed</dd>
            </div>
          </dl>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href="mailto:inquiries@getcarosai.com" className="group rounded-xl border border-ink-border p-5 transition-colors hover:border-gold/60">
            <Mail className="h-5 w-5 text-gold" />
            <p className="mt-4 text-sm font-semibold">Questions before kickoff?</p>
            <p className="mt-1 text-sm text-ink-muted">inquiries@getcarosai.com</p>
          </a>
          <a href="tel:+1-800-000-0000" className="group rounded-xl border border-ink-border p-5 transition-colors hover:border-gold/60">
            <Phone className="h-5 w-5 text-gold" />
            <p className="mt-4 text-sm font-semibold">Need to reach us?</p>
            <p className="mt-1 text-sm text-ink-muted">Call your CAROS team</p>
          </a>
        </section>

        {referral && (
          <section className="mt-10 flex items-center justify-between gap-5 rounded-xl border border-gold/30 bg-gold/5 p-5">
            <div><p className="font-semibold">Know another business that needs this?</p><p className="mt-1 text-sm text-ink-muted">Share your referral link with them.</p></div>
            <button type="button" onClick={copyReferral} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground hover:brightness-110"><Copy className="h-4 w-4" />{copied ? "Copied" : "Copy link"}</button>
          </section>
        )}

        <div className="mt-14 border-t border-ink-border pt-8 text-center">
          <p className="text-sm leading-6 text-ink-muted">You made a revenue decision. We&apos;ll help make it compound.</p>
          <a href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">Back to CAROS <ChevronRight className="h-4 w-4" /></a>
        </div>
        <footer className="mt-20 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">© 2026 CAROS</footer>
      </main>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <ThankYouContent />
    </Suspense>
  )
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}
