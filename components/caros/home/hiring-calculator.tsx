"use client"

import { useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { hiringCost } from "@/lib/home-calculators"
import { track } from "@/lib/analytics-client"
import { NumberField } from "./number-field"

export function formatUsd(n: number, locale: string) {
  return n.toLocaleString(locale === "es" ? "es-419" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

export function HiringCalculator() {
  const t = useTranslations("Home.hiring")
  const locale = useLocale()
  const [employees, setEmployees] = useState("5")
  const [salary, setSalary] = useState("50000")
  const reported = useRef(new Set<string>())
  const { annual } = hiringCost({ employees, salary })

  // Only the field name is reported, never the values typed in.
  const interacted = (field: string) => {
    if (reported.current.has(field)) return
    reported.current.add(field)
    track("employee_calc_interaction", { field, location: "hero" })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("title")}</p>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <NumberField label={t("employees")} value={employees} onChange={(v) => { interacted("employees"); setEmployees(v) }} />
        <NumberField label={t("salary")} prefix="$" value={salary} step={1000} onChange={(v) => { interacted("salary"); setSalary(v) }} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={t("presets")}>
        {[5, 10].map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => { interacted("preset"); setEmployees(String(count)) }}
            aria-pressed={employees === String(count)}
            className="h-10 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold/10"
          >
            {t("preset", { count })}
          </button>
        ))}
      </div>
      <div className="mt-6 border-t border-border pt-5" aria-live="polite">
        <p className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-none text-gold-gradient">
          {formatUsd(annual, locale)}
          <span className="ml-2 text-base font-medium text-muted-foreground">{t("perYear")}</span>
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t("exclusions")}</p>
      </div>
    </div>
  )
}
