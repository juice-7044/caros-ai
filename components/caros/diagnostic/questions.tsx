"use client"

import { useSpanish } from "@/lib/use-spanish"
import catalog from "@/messages/full/product-pages.es.json"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"
import { cn } from "@/lib/utils"


type Answer = "yes" | "no" | "unsure"

// A "leak" is counted when the owner can't confidently answer (No / Not sure).
const LEAK_ANSWERS: Answer[] = ["no", "unsure"]

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
]

export function DiagnosticQuestions() {
  const { tr, localize } = useSpanish(catalog)

  const t = useTranslations("pages.diagnostic")
  const questions = t.raw("questions") as string[]
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const { answered, leaks } = useMemo(() => {
    const entries = Object.values(answers)
    const leaks = entries.filter((a) => LEAK_ANSWERS.includes(a)).length
    return { answered: entries.length, leaks }
  }, [answers])

  const result = useMemo(() => {
    if (answered === 0) return null
    if (leaks <= 2)
      return {
        tone: "calm" as const,
        text: tr("You're doing better than most. But there's always a leak somewhere."),
      }
    if (leaks <= 5)
      return {
        tone: "warn" as const,
        text: tr("You're in the danger zone. Most owners we audit find $15K–$40K in monthly revenue at risk."),
      }
    return {
      tone: "alarm" as const,
      text: tr("Your revenue is leaking badly. Let's find out exactly where."),
    }
  }, [answered, leaks, tr])

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>{tr("The Diagnostic")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            {t("questionTitle")}{" "}
            <span className="font-serif font-normal italic text-gold-gradient">{t("questionTitleAccent")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {tr("Answer honestly. Every “no” or “not sure” is a place your revenue could be slipping through.")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {questions.map((q, i) => {
            const current = answers[i]
            const isLeak = current ? LEAK_ANSWERS.includes(current) : false
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border border-l-4 border-border bg-card p-6 transition-colors duration-300",
                  current ? (isLeak ? "border-l-danger" : "border-l-gold") : "border-l-danger/70",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty text-lg font-semibold leading-snug text-foreground">{q}</p>
                </div>
                <div className="mt-6 flex gap-2" role="group" aria-label={tr("Answer for question {number}", { number: i + 1 })}>
                  {localize(OPTIONS).map((opt) => {
                    const selected = current === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setAnswers((prev) => ({ ...prev, [i]: opt.value }))}
                        className={cn(
                          "flex-1 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200",
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                        )}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dynamic result box */}
        <div
          className={cn(
            "mt-10 overflow-hidden rounded-2xl border p-8 transition-all duration-500 lg:p-10",
            result ? "opacity-100" : "opacity-70",
            result?.tone === "alarm"
              ? "border-danger/40 bg-danger/5"
              : result?.tone === "warn"
                ? "border-gold/50 bg-gold/5"
                : "border-border bg-muted/50",
          )}
          aria-live="polite"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-muted-foreground">
                {answered === 0
                  ? tr("Your result appears here")
                  : tr(leaks === 1 ? "{leaks} potential leak · {answered}/8 answered" : "{leaks} potential leaks · {answered}/8 answered", { leaks, answered })}
              </p>
              <p className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                {result ? result.text : tr("Start answering above to see where your revenue may be leaking.")}
              </p>
            </div>
            <AuditButton className="shrink-0" label={tr("Book Your Free Revenue Audit")} />
          </div>
        </div>
      </div>
    </section>
  )
}
