import { useTranslations } from "next-intl"
import { ArrowRight, Bot, CalendarCheck, Headset, Mail, MessageSquare, Phone, Share2, Star, Users, Workflow, X, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { STACK_CALC_ID } from "@/lib/home-nav"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

// Same ten functions, same order as messages Home.disconnected.tiles
const TILE_ICONS: LucideIcon[] = [Bot, Phone, Users, Mail, MessageSquare, Share2, CalendarCheck, Headset, Star, Workflow]

/** Left: ten separate tiles under a tangle of dashed lines. Right: the same ten tiles feeding one hub. Diagrams, not product screens. */
function Diagram({ labels, hub, connected, ariaLabel }: { labels: string[]; hub: string; connected: boolean; ariaLabel: string }) {
  const tangle = [[8, 92], [28, 70], [52, 12], [72, 88], [92, 30], [14, 40], [38, 90], [60, 20], [84, 60], [46, 50]]
  return (
    <div role="img" aria-label={ariaLabel} className="relative mt-4">
      {connected ? null : (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-0 size-full text-ink-muted">
          {tangle.map(([x1, x2], i) => (
            <path key={i} d={`M${x1} 5 C ${x1 + 40} 40, ${x2 - 40} 60, ${x2} 95`} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      )}
      <ul className="relative grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-5">
        {labels.map((label, i) => {
          const Icon = TILE_ICONS[i]
          return (
            <li key={label} className="flex flex-col items-stretch">
              <span className={`flex min-h-14 items-center gap-2 rounded-lg border bg-ink px-2.5 py-2 text-xs leading-tight text-ink-foreground ${connected ? "border-ink-border" : "border-dashed border-ink-muted/60"} ${!connected && i % 2 ? "translate-y-1.5 -rotate-1" : ""}`}>
                <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                {label}
              </span>
              {connected ? <span className="mx-auto h-4 w-px bg-gold/70" aria-hidden /> : null}
            </li>
          )
        })}
      </ul>
      {connected ? <div className="mt-0 rounded-xl bg-gold py-3 text-center text-lg font-extrabold text-gold-foreground">{hub}</div> : null}
    </div>
  )
}

export function DisconnectedCost() {
  const t = useTranslations("Home.disconnected")
  const tiles = t.raw("tiles") as string[]
  const problems = t.raw("problems") as string[]
  const benefits = t.raw("benefits") as string[]
  const questions = t.raw("questions") as string[]

  return (
    <section data-story="software" className="bg-ink py-14 text-ink-foreground lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1] tracking-tight">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("body")}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {questions.map((q) => (
              <li key={q} className="rounded-full border border-ink-border px-4 py-1.5 text-sm text-ink-foreground">{q}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-ink-border p-6 text-ink-muted">
            <p className="font-semibold text-ink-foreground">{t("leftTitle")}</p>
            <Diagram labels={tiles} hub="" connected={false} ariaLabel={t("diagramLabelLeft")} />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm"><X className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold/50 bg-gold/[0.04] p-6 text-ink-muted">
            <p className="font-semibold text-ink-foreground">{t("rightTitle")}</p>
            <Diagram labels={tiles} hub={t("hub")} connected ariaLabel={t("diagramLabelRight")} />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />{b}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-8 max-w-3xl border-l-2 border-gold pl-5">
          <p className="text-lg leading-relaxed text-ink-foreground">{t("valueReveal")}</p>
          <p className="mt-3 font-serif text-xl italic text-gold">{t("economic")}</p>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-ink-muted">{t("caveat")}</p>
        <a href={`#${STACK_CALC_ID}`} className="group mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground hover:bg-gold/90">
          {t("cta")}
          <ArrowRight className="h-4 w-4 rotate-90" />
        </a>
      </div>
    </section>
  )
}
