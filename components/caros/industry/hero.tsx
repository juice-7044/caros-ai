"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AUDIT_URL, AUDIT_URL_LABEL, INSIGHTS_URL, INSIGHTS_LABEL, AUDIT_HREF, AUDIT_LABEL } from "@/lib/site"
import type { IndustryContent } from "@/lib/industries"

export function IndustryHero({ industry }: { industry: IndustryContent }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(true), [])

  return (
    <section className={`industry-hero hero-gradient relative overflow-hidden theme-${industry.visualTheme ?? "default"}`}>
      <div className="industry-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-28 lg:px-12 lg:pb-28 lg:pt-36">
        <div
          className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="eyebrow text-gold">{industry.heroEyebrow}</span>
        </div>

        <h1
          className={`mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {industry.heroTitle}{" "}
          <span className="font-serif font-normal italic text-gold-gradient">{industry.heroTitleSerif}</span>
        </h1>

        <p
          className={`mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 lg:text-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {industry.heroSub}
        </p>

        <div
          className={`mt-10 flex flex-col gap-4 transition-all delay-300 duration-700 sm:flex-row sm:flex-wrap sm:items-center ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gold px-7 text-base font-semibold text-gold-foreground transition-all duration-300 hover:brightness-110"
          >
            {AUDIT_URL_LABEL}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={INSIGHTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 text-base font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {INSIGHTS_LABEL}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={AUDIT_HREF}
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 text-base font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {AUDIT_LABEL}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Trust row */}
        <div
          className={`mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-all delay-500 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {industry.trustRow.map((item, i, arr) => (
            <span key={item} className="flex items-center gap-x-3">
              {item}
              {i < arr.length - 1 ? <span className="text-gold/60">·</span> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
