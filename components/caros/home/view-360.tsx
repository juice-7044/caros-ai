import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

const metrics = [
  { value: "47", label: "Leads" },
  { value: "31", label: "Appointments" },
  { value: "22", label: "Booked Jobs" },
  { value: "$38,450", label: "Revenue" },
  { value: "$7,200", label: "Google Ads" },
  { value: "5.3x", label: "Marketing ROI", highlight: true },
]

export function View360() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-60" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Business Intelligence</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            Know where{" "}
            <span className="font-serif font-normal italic text-gold-gradient">every dollar comes from.</span>
          </h2>
        </Reveal>

        {/* Mock dashboard */}
        <Reveal delay={60} className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink/60">
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              Illustrative CAROS Dashboard
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Example data
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-ink-border md:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="bg-ink p-8 lg:p-10">
                <p
                  className={`text-[clamp(2rem,4vw,3.25rem)] font-display leading-none ${
                    m.highlight ? "text-gold-gradient" : "text-ink-foreground"
                  }`}
                >
                  {m.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.12em] text-ink-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted/70">
            Example data shown for demonstration purposes.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-12 max-w-2xl text-balance text-2xl font-semibold leading-snug text-ink-foreground lg:text-3xl">
            Know where your revenue comes from. Know what every marketing dollar produced.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            CAROS connects calls, forms, texts, campaigns and booked jobs back to the marketing that generated them, so
            you can see what you&apos;re spending, what&apos;s producing revenue and what&apos;s wasting money.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
