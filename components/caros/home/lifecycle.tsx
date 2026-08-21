import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

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
  const t = useTranslations("HomePage.lifecycle")
  const primaryPath = t.raw("primaryPath") as string[]
  const secondaryPath = t.raw("secondaryPath") as string[]

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-4xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            {t("headline")}
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-8 max-w-3xl">
          <p className="text-balance text-2xl font-semibold leading-snug lg:text-3xl">
            {t("subheadline")}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        {/* Dashboard-style flow panel */}
        <Reveal delay={120} className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground">
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              {t("dashboardLabel")}
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              {t("exampleFlow")}
            </span>
          </div>
          <div className="space-y-10 p-6 lg:p-10">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">{t("primaryLabel")}</p>
              <FlowPath steps={primaryPath} tone="primary" />
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">{t("recoveryLabel")}</p>
              <FlowPath steps={secondaryPath} tone="secondary" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 font-serif text-2xl italic text-foreground lg:text-3xl">
            {t("closing")}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
            {t("exampleNote")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
