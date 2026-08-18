import type { Metadata } from "next"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { PillarsGrid } from "@/components/caros/pillars-grid"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "What's Included",
  description:
    "Everything inside CAROS: lead capture, CRM, human answering, follow-up automation, reviews and referrals, attribution, and business intelligence — one connected system.",
}

const replaces = [
  "Your CRM",
  "Your call answering service",
  "Your review software",
  "Your scheduling tool",
  "Your email & SMS platform",
  "Your lead tracking spreadsheet",
  "Your follow-up sticky notes",
  "Your reporting dashboards",
]

export default function WhatsIncludedPage() {
  return (
    <>
      <PageHero
        eyebrow="What's Included"
        title="Six tools, one notebook, and a prayer —"
        serifTitle="replaced by one system."
        subtitle="CAROS connects customer acquisition, revenue operations, customer success, business intelligence, and the compatible tools you already use into one revenue operating system built around your business."
      />

      <section className="bg-ink py-24 text-ink-foreground lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>The Five Pillars</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight text-ink-foreground">
              Everything that turns a lead into repeat revenue.
            </h2>
          </Reveal>
          <div className="mt-16">
            <PillarsGrid variant="dark" showItems />
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Eyebrow>What It Replaces</Eyebrow>
              <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-tight">
                One login instead of a drawer full of them.
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Most owners don&apos;t have a software problem. They have a disconnection problem — six tools that
                don&apos;t talk to each other, and the gaps between them are where revenue leaks.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {replaces.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-foreground/90"
                  >
                    <span className="font-serif text-lg italic text-gold line-through decoration-gold/50">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand headline="See exactly what your CAROS would include." />
    </>
  )
}
