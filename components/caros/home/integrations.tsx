import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

export function Integrations() {
  const t = useTranslations("HomePage.integrations")
  const existingTools = t.raw("existingTools") as string[]

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            You Don&apos;t Need Another{" "}
            <span className="font-serif font-normal italic text-gold-gradient">Disconnected Tool.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Your business may already run on software you know and like. CAROS is designed to connect with and enhance
            compatible tools in your existing ecosystem, not force unnecessary replacements.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Keep the tools that work. CAROS helps fill the gaps, connect the customer journey, add human and automation
            support where needed, and bring revenue intelligence together in one operating system.
          </p>
        </Reveal>

        {/* Flow: existing tools -> CAROS -> one revenue view */}
        <Reveal delay={120} className="mt-14">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* Existing tools */}
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Your Existing Tools
              </p>
              <ul className="flex flex-wrap gap-2">
                {existingTools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-gold lg:rotate-0" />

            {/* CAROS */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
              <span className="font-display text-2xl tracking-tight text-foreground lg:text-3xl">CAROS</span>
              <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Revenue Operating System
              </span>
            </div>

            <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-gold lg:rotate-0" />

            {/* One revenue view */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-border bg-ink p-8 text-center text-ink-foreground">
              <span className="font-display text-2xl tracking-tight lg:text-3xl">One Revenue View</span>
              <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                Everything in one place
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
            Works with compatible tools in your existing stack.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
