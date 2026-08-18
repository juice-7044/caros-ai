"use client"

import { useMemo, useState } from "react"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"
import { cn } from "@/lib/utils"

const QUESTIONS = [
  "Which marketing source produced your highest-value jobs this month?",
  "How many leads called and never got an answer last week?",
  "How many estimates were sent but never followed up?",
  "How much revenue is sitting in 'pending' because a part is on order and nobody checked?",
  "How many past customers have you paid Google to find again?",
  "What is your average response time to a new lead?",
  "Do you know your true marketing ROI by source — spend to invoiced revenue?",
  "How many jobs closed this month without an attached paid invoice?",
]

type Answer = "yes" | "no" | "unsure"

// A "leak" is counted when the owner can't confidently answer (No / Not sure).
const LEAK_ANSWERS: Answer[] = ["no", "unsure"]

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
]

export function DiagnosticQuestions() {
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
        text: "You're doing better than most. But there's always a leak somewhere.",
      }
    if (leaks <= 5)
      return {
        tone: "warn" as const,
        text: "You're in the danger zone. Most owners we audit find $15K–$40K in monthly revenue at risk.",
      }
    return {
      tone: "alarm" as const,
      text: "Your revenue is leaking badly. Let's find out exactly where.",
    }
  }, [answered, leaks])

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>The Diagnostic</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-[1] tracking-tight">
            Can you answer these questions{" "}
            <span className="font-serif font-normal italic text-gold-gradient">about your business?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Answer honestly. Every &ldquo;no&rdquo; or &ldquo;not sure&rdquo; is a place your revenue could be
            slipping through.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {QUESTIONS.map((q, i) => {
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
                <div className="mt-6 flex gap-2" role="group" aria-label={`Answer for question ${i + 1}`}>
                  {OPTIONS.map((opt) => {
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
                  ? "Your result appears here"
                  : `${leaks} potential ${leaks === 1 ? "leak" : "leaks"} · ${answered}/8 answered`}
              </p>
              <p className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
                {result ? result.text : "Start answering above to see where your revenue may be leaking."}
              </p>
            </div>
            <AuditButton className="shrink-0" label="Book Your Free Revenue Audit" />
          </div>
        </div>
      </div>
    </section>
  )
}
