"use client"

import { useId } from "react"

/** Labelled numeric input. Value stays a string so empty input is representable and sanitized downstream. */
export function NumberField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  tone = "light",
}: {
  label: string
  hint?: string
  value: string
  onChange: (next: string) => void
  prefix?: string
  suffix?: string
  step?: number
  tone?: "light" | "dark"
}) {
  const id = useId()
  const dark = tone === "dark"
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-semibold ${dark ? "text-ink-foreground/90" : "text-foreground"}`}>
        {label}
      </label>
      <div className={`mt-2 flex items-center rounded-lg border px-4 focus-within:border-gold ${dark ? "border-ink-border bg-ink" : "border-border bg-background"}`}>
        {prefix ? <span className={dark ? "mr-1 text-ink-muted" : "mr-1 text-muted-foreground"}>{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`h-12 w-full bg-transparent text-lg font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${dark ? "text-ink-foreground" : "text-foreground"}`}
        />
        {suffix ? <span className={dark ? "ml-1 text-ink-muted" : "ml-1 text-muted-foreground"}>{suffix}</span> : null}
      </div>
      {hint ? <p id={`${id}-hint`} className={`mt-1 text-xs ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>{hint}</p> : null}
    </div>
  )
}
