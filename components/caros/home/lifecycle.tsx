import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

const primaryPath = ["Lead", "Estimate", "Job", "Review", "Repeat Service", "Referral"]
const secondaryPath = ["Closed Lost / Abandoned Estimate", "Nurture", "Reactivation"]

function FlowPath({
  steps,
  tone,
}: {
  steps: string[]
  tone: "primary" | "secondary"
}) {
  const chip =
    tone === "primary"
      ? "border-gold/40 bg-gold/10 text-ink-foreground"
      : "border-ink-border bg-ink text-ink-muted"
  const arrow = tone === "primary" ? "text-gold" : "text-ink-muted/60"
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${chip}`}>{step}</span>
          {i < steps.length - 1 ? <ArrowRight className={`h-4 w-4 shrink-0 ${arrow}`} /> : null}
        </div>
      ))}
    </div>
  )
}

export function Lifecycle() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-4xl">
          <Eyebrow>The Full Revenue Lifecycle</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            Turn your marketing spend into customers.{" "}
            <span className="font-serif font-normal italic text-gold-gradient">
              Turn your customer database into an asset.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-8 max-w-3xl">
          <p className="text-balance text-2xl font-semibold leading-snug lg:text-3xl">
            Every lead stays in play. Every customer stays connected.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            CAROS keeps closed-lost opportunities, old estimates, past customers and dormant accounts working inside
            your revenue system. Automated follow-up, reactivation, service reminders, memberships, reviews and referral
            campaigns create new opportunities from relationships you&apos;ve already paid to acquire.
          </p>
        </Reveal>

        {/* Dashboard-style flow panel */}
        <Reveal delay={120} className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground">
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              Illustrative CAROS Dashboard · Customer Lifecycle
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Example flow
            </span>
          </div>
          <div className="space-y-10 p-6 lg:p-10">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">Primary path</p>
              <FlowPath steps={primaryPath} tone="primary" />
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">Recovery path</p>
              <FlowPath steps={secondaryPath} tone="secondary" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 font-serif text-2xl italic text-foreground lg:text-3xl">
            Your database shouldn&apos;t become a digital graveyard.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
            Example data shown for demonstration purposes.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
