"use client"

import { useMemo, useState } from "react"
import { AuditButton } from "./ui-bits"
import { AUDIT_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const MONTHLY_COST = 997

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function Field({
  label,
  prefix,
  suffix,
  value,
  onChange,
  min,
  step,
}: {
  label: string
  prefix?: string
  suffix?: string
  value: number
  onChange: (n: number) => void
  min?: number
  step?: number
}) {
  return (
    <label className="block">
      <span className="eyebrow text-ink-muted">{label}</span>
      <div className="mt-3 flex items-center rounded-lg border border-ink-border bg-ink px-4 focus-within:border-gold">
        {prefix ? <span className="mr-1 text-lg text-ink-muted">{prefix}</span> : null}
        <input
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number.parseFloat(e.target.value))}
          className="h-14 w-full bg-transparent text-2xl font-bold text-ink-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? <span className="ml-1 text-lg text-ink-muted">{suffix}</span> : null}
      </div>
    </label>
  )
}

export function RoiCalculator({ className }: { className?: string }) {
  const [jobValue, setJobValue] = useState(3200)
  const [missedCalls, setMissedCalls] = useState(24)
  const [closeRate, setCloseRate] = useState(35)

  const { atRisk, jobsToCover } = useMemo(() => {
    const jv = jobValue || 0
    const mc = missedCalls || 0
    const cr = (closeRate || 0) / 100
    const atRisk = jv * mc * cr
    const jobsToCover = jv > 0 ? Math.max(1, Math.ceil(MONTHLY_COST / jv)) : 0
    return { atRisk, jobsToCover }
  }, [jobValue, missedCalls, closeRate])

  return (
    <div
      className={cn(
        "grid gap-10 rounded-2xl border border-ink-border bg-ink/60 p-8 lg:grid-cols-2 lg:p-12",
        className,
      )}
    >
      <div className="space-y-6">
        <Field label="Average Job Value" prefix="$" value={jobValue} onChange={setJobValue} min={0} step={100} />
        <Field label="Missed Calls / Month" value={missedCalls} onChange={setMissedCalls} min={0} step={1} />
        <Field label="Close Rate" suffix="%" value={closeRate} onChange={setCloseRate} min={0} step={1} />
      </div>

      <div className="flex flex-col justify-between gap-8 rounded-xl bg-ink-foreground/[0.03] p-6 lg:p-8">
        <div>
          <p className="eyebrow text-ink-muted">Estimated revenue currently at risk</p>
          <p className="mt-3 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none text-gold-gradient">
            {currency(atRisk)}
            <span className="text-2xl text-ink-muted">/mo</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Based on your missed calls and close rate — revenue walking out the door before anyone follows up.
          </p>
        </div>

        <div className="border-t border-ink-border pt-6">
          <p className="text-lg leading-relaxed text-ink-foreground">
            CAROS pays for itself by helping recover just{" "}
            <span className="font-bold text-gold">
              {jobsToCover} {jobsToCover === 1 ? "job" : "jobs"}
            </span>{" "}
            per month.
          </p>
          <AuditButton className="mt-6 w-full" label="See Your Revenue Audit" href={AUDIT_URL} external />
        </div>
      </div>
    </div>
  )
}
