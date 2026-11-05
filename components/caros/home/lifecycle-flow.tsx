import { useTranslations } from "next-intl"
import { ArrowRight, Bot, Hand, Zap, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

const MODE_ICON: Record<string, LucideIcon> = { ai: Bot, human: Hand, auto: Zap }

/** Six-step loop. The highlight cycles with CSS only and stops under prefers-reduced-motion (see .lifecycle-step in globals.css). */
export function LifecycleFlow() {
  const t = useTranslations("Home.lifecycle")
  const steps = t.raw("steps") as { name: string; functions: string; mode: "ai" | "human" | "auto" }[]
  const modes = t.raw("modes") as Record<string, string>

  return (
    <section className="bg-ink py-20 text-ink-foreground lg:py-28">
      <div className="mx-auto home-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1] tracking-tight">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("body")}</p>
        </Reveal>

        <ol aria-label={t("diagramLabel")} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = MODE_ICON[s.mode]
            return (
              <li key={s.name} className="lifecycle-step relative rounded-xl border border-ink-border p-5" style={{ ["--i" as string]: i }}>
                {i < steps.length - 1 ? <ArrowRight className="absolute -right-[17px] top-1/2 z-10 hidden size-4 -translate-y-1/2 text-gold lg:block" aria-hidden /> : null}
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-lg font-bold uppercase tracking-wide">{s.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{s.functions}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-muted"><Icon className="size-3.5 text-gold" aria-hidden />{modes[s.mode]}</p>
              </li>
            )
          })}
        </ol>
        <p className="mt-8 max-w-2xl text-sm text-ink-muted">{t("footnote")}</p>
      </div>
    </section>
  )
}
