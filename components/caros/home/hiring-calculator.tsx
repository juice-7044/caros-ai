"use client"

import { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { hiringCost } from "@/lib/home-calculators"
import { MODE_COUNT, type StoryMode } from "@/lib/hiring-story"
import { track } from "@/lib/analytics-client"
import { NumberField } from "./number-field"

export function formatUsd(n: number, locale: string) {
  return n.toLocaleString(locale === "es" ? "es-419" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

/** Controlled: the parent owns headcount and salary so the story below always matches what is shown here. */
export function HiringCalculator({
  employees,
  salary,
  mode,
  onEmployees,
  onSalary,
  onMode,
}: {
  employees: string
  salary: string
  mode: StoryMode
  onEmployees: (v: string) => void
  onSalary: (v: string) => void
  onMode: (m: StoryMode) => void
}) {
  const t = useTranslations("Home.hiring")
  const s = useTranslations("Home.story")
  const locale = useLocale()
  const reported = useRef(new Set<string>())
  const { annual } = hiringCost({ employees, salary })

  // Only the field name is reported, never the values typed in.
  const interacted = (field: string) => {
    if (reported.current.has(field)) return
    reported.current.add(field)
    track("employee_calc_interaction", { field, location: "hero" })
  }

  return (
    <div data-story="calculator" className="mt-5 grid gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm md:grid-cols-[1.1fr_1fr] md:items-center md:gap-8 lg:p-7">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("title")}</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <NumberField label={t("employees")} value={employees} onChange={(v) => { interacted("employees"); onEmployees(v) }} />
          <NumberField label={t("salary")} prefix="$" value={salary} step={1000} onChange={(v) => { interacted("salary"); onSalary(v) }} />
        </div>
        <div data-story="toggle" className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label={s("toggleLabel")}>
          {(["five", "ten"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { interacted("preset"); onMode(m) }}
              aria-pressed={mode === m && employees === String(MODE_COUNT[m])}
              className="h-11 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold/10"
            >
              {t("preset", { count: MODE_COUNT[m] })}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div data-story="result" aria-live="polite">
          <p className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-none text-gold-gradient">
            {formatUsd(annual, locale)}
            <span className="ml-2 text-base font-medium text-muted-foreground">{t("perYear")}</span>
          </p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t("exclusions")}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s("salaryDisclaimer")}</p>
      </div>
    </div>
  )
}
