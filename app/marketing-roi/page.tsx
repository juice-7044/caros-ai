import type { Metadata } from "next"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { AttributionTable } from "@/components/caros/attribution-table"
import { RoiCalculator } from "@/components/caros/roi-calculator"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "Marketing ROI",
  description:
    "Stop guessing which marketing works. CAROS ties every lead source to booked revenue, so you can see real ROAS by channel and cut what's losing money.",
}

const problems = [
  {
    stat: "1 in 3",
    label: "marketing dollars",
    body: "wasted on average because owners can't tell which channels actually book jobs.",
  },
  {
    stat: "62%",
    label: "of local businesses",
    body: "can't name their best-performing lead source with confidence.",
  },
  {
    stat: "0",
    label: "spreadsheets",
    body: "needed once every call, form, and campaign is tracked to booked revenue automatically.",
  },
]

export default function MarketingRoiPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing ROI"
        title={`"Half my marketing works.`}
        serifTitle={`I just don't know which half."`}
        subtitle="CAROS ends the guessing. Every lead is tied to its source and followed all the way to booked revenue — so you know exactly what to spend more on, and what to cut."
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.label} delay={i * 80} className="border-t-2 border-gold pt-6">
                <p className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">{p.stat}</p>
                <p className="mt-2 font-serif text-lg italic text-muted-foreground">{p.label}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>Attribution, In Plain English</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              Know where your revenue comes from. Know what every marketing dollar produced.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              CAROS connects calls, forms, texts, campaigns and booked jobs back to the marketing that generated them,
              so you can see what you&apos;re spending, what&apos;s producing revenue and what&apos;s wasting money. Not
              clicks. Not impressions — booked jobs and real revenue, tied to the source that produced them.
            </p>
          </Reveal>
          <div className="mt-12">
            <AttributionTable />
          </div>
          <Reveal className="mt-8">
            <p className="font-serif text-xl italic text-foreground">
              The $750 local sponsorship quietly outperformed a $3,000 ad budget. Without attribution, it&apos;s the
              first thing you&apos;d cut.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-ink-foreground lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>Revenue At Risk Calculator</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight text-ink-foreground">
              How much is leaking out right now?
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              Adjust the numbers to match your business. This is revenue walking out the door before anyone follows up.
            </p>
          </Reveal>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </div>
      </section>

      <CtaBand headline="See your real numbers in a Revenue Audit." />
    </>
  )
}
