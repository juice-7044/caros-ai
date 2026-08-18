import type { Metadata } from "next"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { PricingCard } from "@/components/caros/pricing-card"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent CAROS pricing: $997/month plus a one-time $2,500 implementation. No revenue share, no long build, no disconnected software to figure out yourself.",
}

const faqs = [
  {
    q: "Why a one-time implementation fee?",
    a: "Because CAROS is built around your business, not handed to you as a blank login. The $2,500 covers strategy, configuration, workflows, integrations, pipelines, automation, reporting, communication setup, testing, and launch.",
  },
  {
    q: "Do you take a percentage of my revenue?",
    a: "Never. Your growth is yours. You pay one flat monthly rate — not a cut of every job CAROS helps you book.",
  },
  {
    q: "How fast does it pay for itself?",
    a: "For most owners, recovering a single missed job a month more than covers the cost. Attribution then shows you where to reinvest for the next one.",
  },
  {
    q: "What if I already use some tools?",
    a: "We integrate what's worth keeping and replace what's holding you back. The goal is one connected system, not another app in the pile.",
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One flat rate for your entire"
        serifTitle="revenue operating system."
        subtitle="No revenue share. No year-long build. No pile of disconnected software to wire together yourself. Just one system, one price."
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <PricingCard />
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>Questions, Answered</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-tight">
              What owners ask before they start.
            </h2>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60} className="py-8">
                <h3 className="font-serif text-2xl italic text-foreground">{faq.q}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline="Start with a Revenue Audit — not a contract." />
    </>
  )
}
