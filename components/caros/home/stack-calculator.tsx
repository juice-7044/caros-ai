"use client"

import { useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { stackCost } from "@/lib/home-calculators"
import { STACK_CALC_ID } from "@/lib/home-nav"
import { track } from "@/lib/analytics-client"
import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { NumberField } from "./number-field"
import { formatUsd } from "./hiring-calculator"

type Fields = { subscriptions: string; avgMonthly: string; platforms: string; employees: string; hours: string; hourly: string }

export function StackCalculator() {
  const t = useTranslations("Home.stack")
  const locale = useLocale()
  const [f, setF] = useState<Fields>({ subscriptions: "10", avgMonthly: "80", platforms: "8", employees: "5", hours: "2", hourly: "30" })
  const reported = useRef(new Set<string>())
  const r = stackCost({ subscriptions: f.subscriptions, avgMonthly: f.avgMonthly, platforms: f.platforms, employees: f.employees, weeklySwitchHoursPerEmployee: f.hours, hourlyCost: f.hourly })
  const set = (key: keyof Fields) => (value: string) => {
    if (!reported.current.has(key)) {
      reported.current.add(key)
      track("stack_calc_interaction", { field: key, location: "stack_calculator" })
    }
    setF((prev) => ({ ...prev, [key]: value }))
  }
  const pct = (n: number) => `${Math.round(n * 100)}%`

  return (
    <section id={STACK_CALC_ID} className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="mx-auto home-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-display leading-[1] tracking-tight">{t("title")}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-10 grid gap-8 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div className="grid grid-cols-2 gap-4 content-start">
            <NumberField label={t("subscriptions")} value={f.subscriptions} onChange={set("subscriptions")} />
            <NumberField label={t("avgMonthly")} prefix="$" value={f.avgMonthly} onChange={set("avgMonthly")} />
            <NumberField label={t("platforms")} hint={t("platformsHint")} value={f.platforms} onChange={set("platforms")} />
            <NumberField label={t("employees")} value={f.employees} onChange={set("employees")} />
            <NumberField label={t("hours")} value={f.hours} step={0.5} onChange={set("hours")} />
            <NumberField label={t("hourly")} prefix="$" value={f.hourly} onChange={set("hourly")} />
          </div>

          <div className="flex flex-col gap-5" aria-live="polite">
            <p className="text-xl font-display leading-tight">{t("resultTitle")}</p>
            <dl className="space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <div><dt className="font-semibold">{t("annualSoftware")}</dt><dd className="text-xs text-muted-foreground">{t("annualSoftwareNote")}</dd></div>
                <span className="text-lg font-bold">{formatUsd(r.annualSoftware, locale)}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <div><dt className="font-semibold">{t("annualTime")}</dt><dd className="text-xs text-muted-foreground">{t("annualTimeNote")}</dd></div>
                <span className="text-lg font-bold">{formatUsd(r.annualTime, locale)}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                <dt className="font-semibold">{t("combined")}</dt>
                <dd className="text-3xl font-extrabold text-gold-gradient">{formatUsd(r.combined, locale)}</dd>
              </div>
            </dl>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("breakdown")}</p>
              <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-border" role="img" aria-label={`${t("software")} ${pct(r.softwareShare)}, ${t("time")} ${pct(r.timeShare)}`}>
                <span className="bg-gold" style={{ width: pct(r.softwareShare) }} />
                <span className="bg-foreground/60" style={{ width: pct(r.timeShare) }} />
              </div>
              <p className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{t("software")} {pct(r.softwareShare)}</span><span>{t("time")} {pct(r.timeShare)}</span></p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("supporting")}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
            <Link href="/revenue-audit" className="group inline-flex h-12 w-fit items-center gap-2 rounded-full bg-gold px-6 font-semibold text-gold-foreground hover:bg-gold/90">
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
