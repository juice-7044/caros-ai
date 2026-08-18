import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { INSIGHTS_URL } from "@/lib/site"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { DiagnosticQuestions } from "@/components/caros/diagnostic/questions"
import { BreakEvenCalculator } from "@/components/caros/diagnostic/break-even"
import {
  DiagnosticHero,
  RealityCheck,
  WhatCarosIs,
  AuditProcess,
  PricingTransparency,
  DiagnosticFinalCta,
} from "@/components/caros/diagnostic/sections"

export const metadata: Metadata = {
  title: "The Revenue Leak Diagnostic",
  description:
    "A 2-minute self-diagnostic for home-service owners. Find out where your revenue is leaking — missed calls, slow lead response, un-followed estimates, and untracked marketing ROI — then book a free Revenue Audit.",
}

export default function DiagnosticPage() {
  return (
    <>
      <DiagnosticHero />
      <DiagnosticQuestions />
      <RealityCheck />

      {/* Section 4 — Break-even math */}
      <section className="bg-background py-28 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal className="max-w-3xl">
            <Eyebrow>The Break-Even Math</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
              You don&apos;t need to transform your business{" "}
              <span className="font-serif font-normal italic text-gold-gradient">for CAROS to pay for itself.</span>
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-14">
            <BreakEvenCalculator />
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <div className="rounded-2xl border border-gold/40 bg-gold/5 p-8 lg:p-10">
              <p className="text-balance text-xl font-bold leading-tight tracking-tight lg:text-2xl">
                If your average roofing job is $12,000, the question isn&apos;t &ldquo;Do I want to spend $997?&rdquo;
                It&apos;s <span className="text-gold-gradient">&ldquo;How many $12,000 jobs am I currently losing?&rdquo;</span>
              </p>
            </div>
          </Reveal>

          {/* Final step — complete business case CTA */}
          <Reveal delay={160} className="mt-10">
            <div className="flex flex-col items-start gap-8 rounded-2xl bg-ink px-8 py-12 text-ink-foreground lg:flex-row lg:items-center lg:justify-between lg:px-14">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">The Final Step</p>
                <h3 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-display leading-[1.02] tracking-tight">
                  Want a complete business case with{" "}
                  <span className="font-serif font-normal italic text-gold-gradient">your actual numbers?</span>
                </h3>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
                  See exactly how much revenue your business is leaking. In 60 seconds.
                </p>
              </div>
              <a
                href={INSIGHTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
              >
                Free Business Insights
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <WhatCarosIs />
      <AuditProcess />
      <PricingTransparency />
      <DiagnosticFinalCta />
    </>
  )
}
