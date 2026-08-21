"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AUDIT_HREF, AUDIT_LABEL, INSIGHTS_URL, INSIGHTS_LABEL, PRODUCT_TAGLINE } from "@/lib/site"
import { AnimatedGlobe } from "@/components/caros/animated-globe"

export function Hero() {
  const t = useTranslations("HomePage.hero")
  const stats = t.raw("stats") as { value: string; label: string; tag: string }[]
  const categories = t.raw("categories") as string[]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="hero-gradient relative flex min-h-screen flex-col justify-center overflow-hidden">
      {/* Rotating ASCII globe */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-40 lg:h-[820px] lg:w-[820px]">
        <AnimatedGlobe />
      </div>

      {/* Subtle grid lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%` }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute bottom-0 top-0 w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-12 lg:py-40">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
            <span className="h-px w-8 bg-gold/60" />
            {t("eyebrow")}
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`mb-8 max-w-4xl text-balance text-[clamp(2.75rem,9vw,7rem)] font-display leading-[0.92] tracking-tight transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {t("title")} {" "}
          <span className="font-serif font-normal italic text-gold-gradient">{t("titleAccent")}</span>
        </h1>

        {/* Core brand tagline */}
        <p
          className={`mb-10 flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-gold pl-5 font-serif text-xl italic leading-snug text-foreground text-balance transition-all delay-150 duration-1000 lg:text-2xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {PRODUCT_TAGLINE.split(". ")
            .filter(Boolean)
            .map((part, i, arr) => (
              <span key={part}>
                {part.replace(/\.$/, "")}
                {i < arr.length - 1 ? <span className="text-gold-gradient">.</span> : "."}
              </span>
            ))}
        </p>

        {/* Sub + tagline + CTAs */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
          <div
            className={`transition-all delay-200 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {t("description")}
            </p>
          </div>

          <div
            className={`flex flex-col items-start gap-4 transition-all delay-300 duration-700 lg:items-end lg:justify-end ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row lg:items-end lg:justify-end">
              <a
                href={INSIGHTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
              >
                {t("insightsCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={AUDIT_HREF}
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
              >
                {t("auditCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground lg:text-right">
              {t("auditNote")}
            </p>
            <p className="text-sm text-muted-foreground lg:text-right">
              {t("notReady")} 
              <a
                href="https://free-revenue-audit.getcarosai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-semibold text-gold underline-offset-4 hover:underline"
              >
                {t("freeAuditCta")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Category descriptor */}
      <div
        className={`relative z-10 border-t border-foreground/10 transition-all delay-500 duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-2 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:px-12">
          {categories.map((item, i, arr) => (
            <span key={item} className="flex items-center gap-x-3">
              {item}
              {i < arr.length - 1 ? <span className="text-gold/60">·</span> : null}
            </span>
          ))}
        </div>
      </div>

      {/* Stats marquee */}
      <div
        className={`relative z-10 border-t border-foreground/10 transition-all delay-500 duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="px-6 pt-4 lg:px-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            {t("exampleNote")}
          </span>
        </div>
        <div className="flex gap-16 overflow-hidden whitespace-nowrap py-6">
          <div className="marquee flex shrink-0 gap-16 pl-16">
            {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="text-3xl font-display lg:text-4xl">{stat.value}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider">{stat.tag}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
