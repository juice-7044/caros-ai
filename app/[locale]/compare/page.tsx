import type { Metadata } from "next"
import { Check, X, ArrowDown } from "lucide-react"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { ComparisonTable } from "@/components/caros/compare/comparison-table"
import { AUDIT_URL, AUDIT_HREF } from "@/lib/site"

export const metadata: Metadata = {
  title: "Compare CAROS | Revenue Operating System vs. Lead & Communication Tools",
  description:
    "How CAROS compares to LeadTruffle, CHIIRP, Hatch, Podium and Netic. Lead response is part of CAROS — revenue operations is the bigger story. An honest look at scope, not a checkbox contest.",
  alternates: { canonical: "/compare" },
}

const FLOW_STEPS = [
  "Data + customer signals",
  "Revenue intelligence",
  "Prioritization",
  "Automated action or human action",
  "Measurable revenue outcome",
]

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
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
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32 lg:pt-48">
          <Eyebrow>Compare CAROS</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] font-display leading-[0.98] tracking-tight">
            Revenue technology should do more than respond. It should{" "}
            <span className="font-serif font-normal italic text-gold-gradient">
              know what deserves attention next.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            There are excellent platforms helping home-service businesses answer calls, respond to leads and automate
            follow-up. CAROS goes further by connecting those activities to a broader revenue operating system built
            around visibility, action and human judgment.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <AuditButton label="Get My Free Revenue Audit" href={AUDIT_URL} external />
            <AuditButton label="Book a Demo" href={AUDIT_HREF} variant="outline-light" />
          </div>
        </div>
      </section>

      {/* Intro credibility + legend + matrix */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <p className="max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Some of the platforms below are excellent at specific parts of the revenue lifecycle. We think that is a
              good thing. This comparison is about scope, not pretending every product solves the same problem.
            </p>
          </Reveal>

          {/* Legend */}
          <Reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-muted/40 p-6 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-sm text-foreground">clearly offered as a core capability</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground/45">
                <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="text-sm text-foreground">not currently positioned as a core capability</span>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <ComparisonTable />
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
              Features and product offerings change. This comparison reflects publicly advertised core capabilities and
              is intended to show each platform&apos;s primary scope rather than every possible configuration,
              integration or add-on. Tap any capability marked with an info icon for a short explanation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The difference — revenue flow */}
      <section className="border-t border-ink-border bg-ink text-ink-foreground">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <Eyebrow tone="gold">The CAROS Difference</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              The difference is what happens{" "}
              <span className="font-serif font-normal italic text-gold-gradient">after the data appears.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              Many tools can collect information, trigger messages or automate individual parts of the customer journey.
              CAROS is built around another question: what does the business need to do next to protect or create
              revenue?
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col items-center">
            {FLOW_STEPS.map((step, i) => (
              <Reveal key={step} className="flex w-full flex-col items-center">
                <div
                  className={
                    i === FLOW_STEPS.length - 1
                      ? "w-full max-w-xl rounded-xl border border-gold bg-gold/10 px-6 py-5 text-center text-base font-semibold text-ink-foreground sm:text-lg"
                      : "w-full max-w-xl rounded-xl border border-ink-border bg-ink-foreground/[0.04] px-6 py-5 text-center text-base font-semibold text-ink-foreground sm:text-lg"
                  }
                >
                  {step}
                </div>
                {i < FLOW_STEPS.length - 1 ? (
                  <ArrowDown className="my-3 h-6 w-6 text-gold" aria-hidden="true" />
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Human differentiation */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <Eyebrow>Automation + Judgment</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              Automation where it makes sense.{" "}
              <span className="font-serif font-normal italic text-gold-gradient">Humans where they matter.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                CAROS does not assume every customer interaction, exception or revenue decision should be handed to AI.
                Predictable workflows can be automated, while people handle relationships, judgment calls, escalations
                and the complex situations that actually decide whether revenue is won or lost.
              </p>
              <p>
                That includes a client-branded human answering option — real people representing your business, backed
                by CAROS workflows and technology — so the experience stays personal where it counts.
              </p>
              <p className="border-l-2 border-gold pl-5 font-serif text-xl italic leading-snug text-gold-gradient">
                Technology should increase human capacity, not force every business into an AI-only customer experience.
              </p>
            </div>
          </Reveal>

          {/* Existing systems callout */}
          <Reveal className="mt-14">
            <div className="rounded-2xl border border-border bg-muted/40 p-8 lg:p-10">
              <h3 className="text-balance text-2xl font-bold tracking-tight">
                Already using ServiceTitan, Jobber or Housecall Pro?
              </h3>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                Good. Those systems can remain part of your operation. See how CAROS works with the tools you already
                use.
              </p>
              <div className="mt-8">
                <AuditButton label="Read the Existing Tools FAQ" href="/faq" variant="outline-light" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border bg-muted/50">
        <div className="mx-auto w-full max-w-[900px] px-6 py-24 text-center lg:py-32">
          <Reveal className="flex flex-col items-center">
            <h2 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              Find out where your revenue is{" "}
              <span className="font-serif font-normal italic text-gold-gradient">actually getting stuck.</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Start with the complimentary CAROS Revenue Audit and see the opportunities before deciding whether you
              need another system.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <AuditButton label="Get My Free Revenue Audit" href={AUDIT_URL} external />
              <AuditButton label="Book a Demo" href={AUDIT_HREF} variant="outline-light" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
