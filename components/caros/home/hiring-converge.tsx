"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import type { StoryMode } from "@/lib/hiring-story"

/**
 * Tokens (five roles or ten functions) -> lines converge -> CAROS wordmark -> one dashboard.
 * The drawn state is the default; the animation (globals.css) only exists under prefers-reduced-motion: no-preference,
 * starts when the visual enters the viewport and restarts when the mode (and so the token set) changes.
 */
export function HiringConverge({ mode, tokens }: { mode: StoryMode; tokens: ReactNode[] }) {
  const t = useTranslations("Home.story")
  const wrap = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const n = tokens.length

  useEffect(() => {
    const node = wrap.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const x = (i: number) => ((i + 0.5) / n) * 100

  return (
    <div ref={wrap} data-story="converge" role="img" aria-label={t("convergeLabel")} className="mx-auto mt-5 max-w-3xl">
      <div key={mode} className="converge" data-play={seen ? "true" : "false"}>
        <ul className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {tokens.map((icon, i) => (
            <li key={i} className="flex justify-center">
              <span data-converge-token style={{ ["--i" as string]: i }} className="converge-token flex size-7 items-center justify-center rounded-full border border-gold/60 bg-card text-gold sm:size-9">
                {icon}
              </span>
            </li>
          ))}
        </ul>
        <svg viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden className="block h-12 w-full text-gold">
          {tokens.map((_, i) => (
            <path
              key={i}
              data-converge-line
              className="converge-line"
              style={{ ["--i" as string]: i }}
              d={`M ${x(i)} 0 C ${x(i)} 26, 50 22, 50 48`}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="flex flex-col items-center">
          <span data-converge-wordmark className="converge-wordmark rounded-full bg-gold px-6 py-1.5 text-lg font-extrabold tracking-[0.2em] text-gold-foreground">CAROS</span>
          <span aria-hidden className="h-3 w-px bg-gold/70" />
          <div data-converge-dashboard className="converge-dashboard w-full max-w-md rounded-xl border border-gold/60 bg-card px-4 py-3">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{t("convergeDashboard")}</p>
            <div className="mt-2 flex gap-1">
              {tokens.map((_, i) => (
                <span key={i} className="converge-seg h-1.5 flex-1 rounded-full bg-gold/70" style={{ ["--i" as string]: i }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
