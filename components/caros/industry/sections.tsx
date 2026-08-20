import { Check, X, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { PRODUCT_TAGLINE } from "@/lib/site"
import type { IndustryContent } from "@/lib/industries"

/* Section 1 — The revenue problem */
export function ProblemSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The Revenue Problem</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              {industry.problemTitle}{" "}
              <span className="font-serif font-normal italic text-gold-gradient">{industry.problemTitleSerif}</span>
            </h2>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {industry.problemIntro}
            </p>
          </div>

          <div className="industry-story-grid flex flex-col justify-center gap-3">
            {industry.mattersWhen.map((m, index) => (
              <article key={m.label} className="industry-story-card rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Case file {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{m.label}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{m.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <Reveal className="mt-16">
          <p className="max-w-3xl text-balance font-serif text-2xl italic leading-snug text-foreground lg:text-3xl">
            {industry.problemClose.text}{" "}
            <span className="text-gold-gradient">{industry.problemClose.gold}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* Section 2 — Revenue leaks */
export function LeaksSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <Eyebrow tone="danger">Where Revenue Leaks</Eyebrow>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-ink-muted">{industry.leaksIntro}</p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border sm:grid-cols-2">
          {industry.leaks.map((leak) => (
            <div key={leak} className="flex items-start gap-4 bg-ink p-6">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
              <p className="leading-relaxed text-ink-muted">{leak}</p>
            </div>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="max-w-3xl text-balance text-xl leading-relaxed text-ink-foreground">{industry.leaksClose}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* Section 3 — The revenue journey */
export function JourneySection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>The Revenue Journey</Eyebrow>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{industry.journeyIntro}</p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          {industry.journey.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold">
                {step}
              </span>
              {i < industry.journey.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-gold-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Outcome</span>
          <span className="font-semibold">{industry.journeyEndLabel}</span>
        </div>
      </div>
    </section>
  )
}

/* Generic capability / point section used for "built" product sections */
function CapabilityGrid({ capabilities }: { capabilities: { title: string; body: string }[] }) {
  return (
    <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
      {capabilities.map((c) => (
        <div key={c.title} className="bg-card p-8">
          <h3 className="text-lg font-bold tracking-tight">{c.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

/* Section 4 — Capture (built) */
export function CaptureSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>Customer Acquisition</Eyebrow>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
            {industry.captureTitle}{" "}
            <span className="font-serif font-normal italic text-gold-gradient">{industry.captureTitleSerif}</span>
          </h2>
          <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">{industry.captureIntro}</p>
        </div>
        <CapabilityGrid capabilities={industry.captureCapabilities} />
      </div>
    </section>
  )
}

/* Section 5 — Signature recurring-revenue theme (bespoke) */
export function SignatureSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>{industry.signatureEyebrow}</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              {industry.signatureTitle}{" "}
              <span className="font-serif font-normal italic text-gold-gradient">{industry.signatureTitleSerif}</span>
            </h2>
            <div className="mt-8 space-y-5">
              {industry.signatureBody.map((p) => (
                <p key={p} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{industry.signatureListLabel}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {industry.signatureUseCases.map((u) => (
                <li key={u} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section 6 — Revenue intelligence dashboard */
export function IntelligenceSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>Revenue Intelligence</Eyebrow>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
            Know exactly where your revenue{" "}
            <span className="font-serif font-normal italic text-gold-gradient">comes from.</span>
          </h2>
        </div>

        {/* Metrics dashboard */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-3">
          {industry.metrics.map((m) => (
            <div key={m.label} className={`bg-ink p-8 ${m.highlight ? "relative" : ""}`}>
              <p
                className={`font-serif text-4xl italic ${m.highlight ? "text-gold-gradient" : "text-ink-foreground"}`}
              >
                {m.value}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Revenue Recovered by CAROS</p>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">{industry.recoveredText}</p>
        </div>

        {/* Questions answered */}
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Questions CAROS answers for you
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border sm:grid-cols-2">
            {industry.questions.map((q) => (
              <div key={q} className="flex items-start gap-3 bg-ink p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-ink-foreground">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section 7 — Customer experience (built) */
export function ExperienceSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Customer Experience</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              {industry.experienceTitle}{" "}
              <span className="font-serif font-normal italic text-gold-gradient">
                {industry.experienceTitleSerif}
              </span>
            </h2>
            <div className="mt-8 space-y-5">
              {industry.experienceIntro.map((p) => (
                <p key={p} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ul className="flex flex-col justify-center gap-4">
            {industry.experiencePoints.map((p) => (
              <li key={p} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* Section 8 — Operating system pillars */
export function PillarsSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow>One Connected System</Eyebrow>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
            Everything working together, built{" "}
            <span className="font-serif font-normal italic text-gold-gradient">around your business.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {industry.pillars.map((pillar) => (
            <div key={pillar.label} className="rounded-2xl border border-border bg-card p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{pillar.label}</p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{pillar.question}</h3>
              <ul className="mt-5 space-y-3">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Section 9 — Scaling with less (carries the brand tagline) */
export function ScalingSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1000px] px-6 py-24 text-center lg:py-32">
        <Reveal className="flex flex-col items-center">
          <Eyebrow tone="gold">Scale Without the Chaos</Eyebrow>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
            {industry.scalingTitle}{" "}
            <span className="font-serif font-normal italic text-gold-gradient">{industry.scalingTitleSerif}</span>
          </h2>
          <div className="mt-8 space-y-5">
            {industry.scalingBody.map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-balance font-serif text-2xl italic leading-snug text-gold-gradient">
            {PRODUCT_TAGLINE}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* Section 10 — FAQ */
export function FaqSection({ industry }: { industry: IndustryContent }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[900px] px-6 py-24 lg:px-12 lg:py-32">
        <Eyebrow>Common Questions</Eyebrow>
        <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
          {industry.name} questions, answered{" "}
          <span className="font-serif font-normal italic text-gold-gradient">plainly.</span>
        </h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {industry.faq.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
