import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

const mattersWhen = [
  { label: "Leads", detail: "matter when they become customers." },
  { label: "Marketing", detail: "matters when it produces revenue." },
  { label: "Follow-up", detail: "matters when opportunities stop slipping away." },
  { label: "Customer service", detail: "matters when customers stay, return, and refer." },
]

const lifecycle = [
  "Marketing",
  "Leads",
  "Calls",
  "Bookings",
  "Estimates",
  "Jobs",
  "Customers",
  "Repeat Business",
]

export function RevenueFirst() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Revenue First</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            CAROS Starts With{" "}
            <span className="font-serif font-normal italic text-gold-gradient">Revenue.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            CAROS doesn&apos;t start with leads. We start with revenue, then connect everything that creates it.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {mattersWhen.map((item) => (
              <li key={item.label} className="bg-card p-6 lg:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  <span className="font-semibold text-gold">{item.label}</span>{" "}
                  <span className="text-muted-foreground">{item.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-balance text-2xl font-semibold leading-snug lg:text-3xl">
            CAROS connects the entire customer lifecycle around{" "}
            <span className="text-gold">measurable revenue.</span>
          </p>
        </Reveal>

        {/* Revenue lifecycle visual */}
        <Reveal
          delay={160}
          className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground"
        >
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              The Revenue Lifecycle
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              End to end
            </span>
          </div>

          <div className="p-6 lg:p-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
              {lifecycle.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold">
                    {step}
                  </span>
                  {i < lifecycle.length - 1 ? (
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-gold lg:rotate-0" />
                  ) : null}
                </div>
              ))}
            </div>

            {/* REVENUE bar */}
            <div className="mt-8 flex items-center justify-center rounded-xl border border-gold/40 bg-gold/15 py-6">
              <span className="font-display text-2xl uppercase tracking-[0.2em] text-gold lg:text-3xl">Revenue</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            CAROS tracks and improves the entire revenue lifecycle, from the first marketing dollar to the customer who
            comes back again.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
