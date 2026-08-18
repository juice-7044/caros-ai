"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
// Reveal is used for the left column; the terminal manages its own reveal.

const flow = [
  { label: "Lead", detail: "google_ads / [your-industry]" },
  { label: "CAROS Responds", detail: "human operator + auto-SMS < 60s" },
  { label: "Conversation", detail: "qualified, need + address captured" },
  { label: "Appointment", detail: "booked Tue 9:00a" },
  { label: "Estimate Follow-Up", detail: "3 nudges, e-sign sent" },
  { label: "Job Closes", detail: "$4,200 approved" },
  { label: "Customer Nurtured", detail: "post-job check-in sequence" },
  { label: "Review Requested", detail: "5★ Google review" },
  { label: "Customer Reactivated", detail: "gutter add-on, 4 mo later" },
  { label: "Revenue Attributed", detail: "→ google_ads / [your-industry]" },
]

export function MoneyJourney() {
  const [visibleCount, setVisibleCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          flow.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), i * 260)
          })
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <Reveal>
          <Eyebrow>Follow Your Dollar</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            From first click to repeat customer,{" "}
            <span className="font-serif font-normal italic text-gold-gradient">
              see and manage the entire revenue journey.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            CAROS connects the money you put in to the revenue that comes out — and every step in between, tracked
            back to the source that started it.
          </p>
        </Reveal>

        {/* Terminal window */}
        <div ref={ref} className="overflow-hidden rounded-xl border border-ink-border bg-[#0d0d0f]">
          <div className="flex items-center justify-between border-b border-ink-border px-5 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-ink-foreground/20" />
              <span className="h-3 w-3 rounded-full bg-ink-foreground/20" />
              <span className="h-3 w-3 rounded-full bg-ink-foreground/20" />
            </div>
            <span className="font-mono text-xs text-ink-muted">revenue-journey.log</span>
          </div>
          <div className="min-h-[430px] p-6 font-mono text-sm">
            {flow.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-baseline gap-3 py-1.5 leading-relaxed transition-all duration-300 ${
                  i < visibleCount ? "translate-x-0 opacity-100" : "translate-x-[-6px] opacity-0"
                }`}
              >
                <span className="select-none text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold text-ink-foreground">{step.label}</span>
                <span className="text-ink-muted">— {step.detail}</span>
              </div>
            ))}
            <div className="mt-4 flex items-center gap-2 border-t border-ink-border pt-4 text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span>attribution closed — full loop tracked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
