import Link from "next/link"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"
import { Sunburst } from "@/components/caros/sunburst"
import { EMAIL, EMAIL_HREF } from "@/lib/site"

/* ---------------- Hero ---------------- */

export function DiagnosticHero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/10"
            style={{ top: `${16.6 * (i + 1)}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute bottom-0 top-0 w-px bg-foreground/10"
            style={{ left: `${10 * (i + 1)}%` }}
          />
        ))}
      </div>
      {/* Soft gold glow instead of the globe */}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full radial-glow opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-28 pt-40 lg:px-12 lg:pb-36 lg:pt-52">
        <Eyebrow>Free Revenue Diagnostic</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-display leading-[0.95] tracking-tight">
          You might be losing money in places{" "}
          <span className="font-serif font-normal italic text-gold-gradient">you can&apos;t see.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
          Most home-service owners we speak with can&apos;t answer the questions on this page. If that&apos;s you, your
          marketing is flying blind — and your revenue is leaking.
        </p>
        <div className="mt-10">
          <AuditButton label="Book Your Free Revenue Audit" className="h-16 px-10 text-lg" />
          <p className="mt-4 text-sm text-muted-foreground">Takes 30 minutes. No obligation. No sales pitch.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Reality Check ---------------- */

const REALITY_ROWS = [
  { audit: "Missed calls", find: "15–40% of inbound calls go unanswered during business hours" },
  { audit: "Speed to lead", find: "Average response time: 2–4 hours (research says 5 minutes changes everything)" },
  { audit: "Estimate follow-up", find: "30–60% of sent estimates receive zero follow-up" },
  { audit: "Revenue attribution", find: "\u201CI think Google is working\u201D — but no data connecting spend to invoiced revenue" },
  { audit: "Past customers", find: "Hundreds of previous customers in a database, zero reactivation" },
]

export function RealityCheck() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Reality Check</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            Here is what we usually find{" "}
            <span className="font-serif font-normal italic text-gold-gradient">in the first 30 days.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-14 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-1 border-b border-border bg-muted/60 px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:grid-cols-[1fr_2fr] sm:px-8">
            <span>What We Audit</span>
            <span className="hidden sm:block">What We Usually Find</span>
          </div>
          {REALITY_ROWS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-border px-6 py-6 last:border-b-0 sm:grid-cols-[1fr_2fr] sm:items-center sm:gap-8 sm:px-8"
            >
              <span className="text-lg font-bold tracking-tight text-foreground">{row.audit}</span>
              <span className="text-pretty leading-relaxed text-muted-foreground">{row.find}</span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="flex items-center gap-5 rounded-2xl border border-gold/40 bg-gold/5 p-8 lg:p-10">
            <Sunburst className="hidden w-12 shrink-0 text-gold sm:block" />
            <p className="text-balance text-xl font-bold leading-tight tracking-tight lg:text-2xl">
              The average CAROS client has{" "}
              <span className="text-gold-gradient">$22,000+ in identifiable revenue leaks</span> before we even launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- What CAROS Is ---------------- */

const CAPABILITIES = [
  {
    n: "01",
    title: "Capture",
    body: "Every lead from every channel. Phone, web, text, social, QR. Nothing hits the void.",
  },
  {
    n: "02",
    title: "Convert",
    body: "Inquiries become appointments, estimates, and booked jobs — with follow-up that never sleeps.",
  },
  {
    n: "03",
    title: "Retain",
    body: "Reviews, referrals, reactivation, repeat service. Your cheapest customer is one you already paid to acquire.",
  },
  {
    n: "04",
    title: "See",
    body: "Connect every marketing dollar to invoiced revenue. Know what works. Stop paying for what doesn't.",
  },
]

export function WhatCarosIs() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Solution</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            Not a CRM. Not an answering service.{" "}
            <span className="font-serif font-normal italic text-gold-gradient">Not another app to learn.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            CAROS is a Revenue Operating System. We give you the people, systems, automation, and intelligence to:
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={i * 80} className="bg-card p-8 lg:p-10">
              <span className="font-mono text-sm text-gold">{c.n}</span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-14 max-w-3xl text-balance text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
            We build it. We connect it. We help run it.{" "}
            <span className="text-gold">You run your business.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Audit Process ---------------- */

const STEPS = [
  {
    n: "01",
    tag: "Book",
    body: "Schedule your 30-minute Revenue Audit. Bring your numbers, your questions, or just your frustration.",
  },
  {
    n: "02",
    tag: "Diagnose",
    body: "We review your lead sources, response times, follow-up cadence, and revenue visibility. We find the leaks.",
  },
  {
    n: "03",
    tag: "Decide",
    body: "You get a clear report. No obligation. If CAROS is the right fit, we build your system in 3 days.",
  },
]

export function AuditProcess() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Process</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            Three steps. One clear picture of{" "}
            <span className="font-serif font-normal italic text-gold-gradient">where your revenue is leaking.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="rounded-2xl border-t-2 border-t-gold bg-card p-8 lg:p-10">
              <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
              <h3 className="mt-4 text-xl font-bold uppercase tracking-[0.12em]">{s.tag}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-14 font-mono text-sm uppercase tracking-[0.16em] text-muted-foreground">
            One meeting. Your core CAROS system live within days, not weeks. Zero apps for you to learn.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Pricing Transparency ---------------- */

export function PricingTransparency() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            No surprises. <span className="font-serif font-normal italic text-gold-gradient">No hidden fees.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <p className="eyebrow text-muted-foreground">CAROS Monthly</p>
            <p className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] font-display leading-none">
              <span className="text-gold-gradient">$997</span>
              <span className="text-2xl text-muted-foreground">/month</span>
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              One revenue operating system built around your business.
            </p>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <p className="eyebrow text-muted-foreground">Implementation</p>
            <p className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] font-display leading-none">
              <span className="text-gold-gradient">$2,500</span>
              <span className="text-2xl text-muted-foreground"> one-time</span>
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Strategy, configuration, workflows, integrations, pipelines, automation, reporting, and launch.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10">
          <ul className="grid gap-3 text-lg font-medium text-foreground sm:grid-cols-3">
            <li className="rounded-xl border border-border bg-muted/40 px-5 py-4">No percentage of your revenue.</li>
            <li className="rounded-xl border border-border bg-muted/40 px-5 py-4">No long implementation project.</li>
            <li className="rounded-xl border border-border bg-muted/40 px-5 py-4">
              No pile of disconnected software to figure out yourself.
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Final CTA ---------------- */

export function DiagnosticFinalCta() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-70" />
      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-6 py-28 text-center lg:py-40">
        <Reveal className="flex flex-col items-center">
          <Sunburst className="w-16 text-gold" />
          <h2 className="mt-8 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[0.95] tracking-tight">
            Let&apos;s find out where your{" "}
            <span className="font-serif font-normal italic text-gold-gradient">revenue is leaking.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Book your free Revenue Audit. It takes 30 minutes. You&apos;ll know exactly where your business is bleeding
            money — and what to do about it.
          </p>
          <AuditButton label="Book Your Free Revenue Audit" className="mt-10 h-16 px-10 text-lg" />
          <p className="mt-5 text-sm text-muted-foreground">
            Or email us at{" "}
            <Link href={EMAIL_HREF} className="font-semibold text-foreground underline-offset-4 hover:underline">
              {EMAIL}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
