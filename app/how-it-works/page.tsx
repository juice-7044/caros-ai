import type { Metadata } from "next"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { HowItWorksSteps } from "@/components/caros/how-it-works-steps"
import { PillarsGrid } from "@/components/caros/pillars-grid"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "CAROS is built around your business in four moves: we audit your revenue process, build your system, launch it with you, and keep optimizing it every week.",
}

const flow = [
  {
    q: "Where are my customers coming from?",
    a: "Every call, form, chat, QR scan, and ad click is captured and tagged to its source — so you finally know what's working.",
  },
  {
    q: "What happens after they find me?",
    a: "Leads get answered, followed up, and booked automatically. Nothing sits in a voicemail box or an unread inbox.",
  },
  {
    q: "What happens after I finish the job?",
    a: "Reviews, referrals, and reactivation run on their own — turning one job into the next three.",
  },
  {
    q: "Is any of this making me money?",
    a: "Marketing spend is tied to booked revenue, so every dollar has a clear answer next to it.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="One system, built around"
        serifTitle="how you already work."
        subtitle="CAROS isn't software you have to learn. It's a revenue operating system we design, build, and run around your business — so revenue stops leaking and you can trace what happens from marketing spend to booked revenue."
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>The Four Questions</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              Every business owner asks the same four questions. CAROS answers all of them.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-2">
            {flow.map((item, i) => (
              <Reveal key={item.q} delay={i * 60} className="bg-card p-8 lg:p-10">
                <p className="font-serif text-2xl italic text-foreground">{`"${item.q}"`}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>The Process</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              From first call to fully running — in four moves.
            </h2>
          </Reveal>
          <div className="mt-16">
            <HowItWorksSteps variant="light" />
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-ink-foreground lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>The Five Pillars</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight text-ink-foreground">
              Underneath it all, five connected systems working as one.
            </h2>
          </Reveal>
          <div className="mt-16">
            <PillarsGrid variant="dark" showItems />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
