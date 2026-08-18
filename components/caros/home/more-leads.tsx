import { ArrowRight, X } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { INSIGHTS_URL } from "@/lib/site"

const gaps = [
  "Calls go unanswered",
  "Leads wait too long for a response",
  "Estimates never get followed up",
  "Past customers disappear into a database",
  "Marketing produces jobs nobody can properly attribute",
  "Customers who could buy again are never contacted",
]

export function MoreLeads() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Real Problem</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            More Leads Aren&apos;t{" "}
            <span className="font-serif font-normal italic text-gold-gradient">Always the Answer.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            A business can generate plenty of leads and still lose revenue.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border sm:grid-cols-2">
            {gaps.map((gap) => (
              <li key={gap} className="flex items-center gap-3 bg-ink p-6">
                <X className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-base text-ink-foreground/90">{gap}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-muted">
            CAROS looks across the entire operation to find those gaps and help the business capture more of the
            revenue already within reach.
          </p>
          <p className="mt-8 max-w-3xl text-balance font-serif text-2xl italic leading-snug text-ink-foreground lg:text-3xl">
            Before you spend another dollar generating demand, know what your business is doing with the demand it
            already has.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">Do More With Less</p>
            <p className="mt-4 text-balance text-2xl font-display leading-[1.05] tracking-tight text-ink-foreground lg:text-3xl">
              Grow your revenue without growing your payroll.
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
              CAROS handles the repetitive, around-the-clock work — capturing leads, answering fast, following up on
              estimates, and reactivating past customers — so your existing team does more without burning out. You add
              staff because real growth demands it, not to patch the gaps in a leaky operation.
            </p>
            <p className="mt-5 max-w-3xl text-balance font-serif text-xl italic leading-snug text-ink-foreground lg:text-2xl">
              Scale at the right time — not too early, not too late.
            </p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <a
            href={INSIGHTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
          >
            Free Business Insights
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
