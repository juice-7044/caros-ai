"use client"

import { useMemo, useState } from "react"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"
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
  step,
}: {
  label: string
  prefix?: string
  suffix?: string
  value: number
  onChange: (n: number) => void
  step?: number
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="mt-3 flex items-center rounded-lg border border-border bg-background px-4 focus-within:border-gold">
        {prefix ? <span className="mr-1 text-lg text-muted-foreground">{prefix}</span> : null}
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number.parseFloat(e.target.value))}
          className="h-14 w-full bg-transparent text-2xl font-bold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? <span className="ml-1 text-lg text-muted-foreground">{suffix}</span> : null}
      </div>
    </label>
  )
}

export function BreakEvenCalculator({ className }: { className?: string }) {
  const [jobValue, setJobValue] = useState(12000)
  const [missedCalls, setMissedCalls] = useState(18)
  const [closeRate, setCloseRate] = useState(30)

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
        "grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-sm lg:grid-cols-2 lg:p-12",
        className,
      )}
    >
      <div className="space-y-6">
        <Field label="Average Job Value" prefix="$" value={jobValue} onChange={setJobValue} step={500} />
        <Field label="Missed Calls per Month" value={missedCalls} onChange={setMissedCalls} step={1} />
        <Field label="Close Rate" suffix="%" value={closeRate} onChange={setCloseRate} step={1} />
      </div>

      <div className="flex flex-col justify-between gap-8 rounded-xl bg-muted/60 p-6 lg:p-8">
        <div>
          <p className="eyebrow text-muted-foreground">Estimated revenue currently at risk</p>
          <p className="mt-3 text-[clamp(2.5rem,6vw,4rem)] font-display leading-none text-gold-gradient">
            {currency(atRisk)}
            <span className="text-2xl text-muted-foreground">/mo</span>
          </p>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-lg leading-relaxed text-foreground">
            Jobs CAROS needs to help you recover to cover its $997/month cost:{" "}
            <span className="font-bold text-gold">
              {jobsToCover} {jobsToCover === 1 ? "job" : "jobs"}
            </span>
            .
          </p>
          <AuditButton className="mt-6 w-full" label="See What CAROS Can Do For You" />
        </div>
      </div>
    </div>
  )
}
