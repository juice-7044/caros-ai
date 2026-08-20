import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { IndustriesGrid } from "@/components/caros/industries-grid"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "Industries",
  description:
    "CAROS is built for home-service and local businesses — roofing, HVAC, plumbing, electrical, cleaning, landscaping and more — where a missed call is a missed job.",
}

const fits = [
  {
    title: "High-value jobs",
    body: "When a single booked job is worth hundreds or thousands, one recovered lead pays for the whole system.",
  },
  {
    title: "Phone-driven demand",
    body: "Your customers still call. If that call goes unanswered, the job goes to whoever picks up next.",
  },
  {
    title: "Repeatable service",
    body: "Seasonal maintenance, repeat visits, and referrals mean one good customer is worth many jobs over time.",
  },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for the businesses where"
        serifTitle="a missed call is a missed job."
        subtitle="CAROS was designed for home-service and local businesses — the ones that live and die by the phone, the follow-up, and the reputation they earn on every job."
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>Who It's For</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              If you run one of these, revenue is leaking somewhere right now.
            </h2>
          </Reveal>
          <div className="mt-16">
            <IndustriesGrid variant="light" />
          </div>
          <Reveal className="mt-10">
            <p className="font-serif text-xl italic text-muted-foreground">
              Don&apos;t see yours? If you sell high-value services locally and depend on calls, CAROS fits.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <Link
              href="/industries/law-firms"
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold sm:flex-row sm:items-center sm:justify-between lg:p-10"
            >
              <div>
                <span className="eyebrow text-gold">Dedicated Solution</span>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
                  CAROS for Law Firms &amp; Estate Planning
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  A tailored approach for estate-planning and trusts-and-estates practices — from prospective-client
                  intake through engagement and long-term relationships.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-gold">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>Why It Fits</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              Three things these businesses have in common.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {fits.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="rounded-2xl border border-border bg-card p-8">
                <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline="See what CAROS looks like for your trade." />
    </>
  )
}
