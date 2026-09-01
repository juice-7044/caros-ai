"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const NODES = [
  { key: "network", accent: false },
  { key: "owner", accent: false },
  { key: "caros", accent: true },
  { key: "revenue", accent: false },
] as const

export function AffiliateHero({
  eyebrow,
  title,
  body,
  cta,
  micro,
  ctaHref,
  nodeLabels,
  connector,
}: {
  eyebrow: string
  title: string
  body: string
  cta: string
  micro: string
  ctaHref: string
  nodeLabels: Record<(typeof NODES)[number]["key"], string>
  connector: string
}) {
  // Same reveal model as the homepage hero: a mount-only flag toggles Tailwind
  // transition classes. No animation library, identical timing/easing/direction.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle grid lines (matches homepage hero backdrop) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-foreground/10" style={{ top: `${16.6 * (i + 1)}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute bottom-0 top-0 w-px bg-foreground/10" style={{ left: `${10 * (i + 1)}%` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1300px] items-center gap-16 px-6 pb-24 pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12 lg:pb-32 lg:pt-48">
        {/* Left column: copy + CTA */}
        <div>
          {/* Eyebrow — homepage: duration-700 translate-y-4 */}
          <div
            className={`mb-8 transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
              <span className="h-px w-8 bg-gold/60" />
              {eyebrow}
            </span>
          </div>

          {/* Headline — homepage: duration-1000 translate-y-8 */}
          <h1
            className={`max-w-3xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-display leading-[0.95] tracking-tight transition-all duration-1000 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {title}
          </h1>

          {/* Supporting copy — homepage: delay-150 duration-1000 translate-y-6 */}
          <p
            className={`mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground transition-all delay-150 duration-1000 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:text-xl ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {body}
          </p>

          {/* CTA — homepage: delay-300 duration-700 translate-y-4 */}
          <div
            className={`mt-10 flex flex-col items-start gap-4 transition-all delay-300 duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href={ctaHref}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-muted-foreground">{micro}</p>
          </div>
        </div>

        {/* Right column: restrained relationship visual */}
        <AffiliateRelationshipVisual visible={visible} labels={nodeLabels} connector={connector} />
      </div>
    </section>
  )
}

function AffiliateRelationshipVisual({
  visible,
  labels,
  connector,
}: {
  visible: boolean
  labels: Record<(typeof NODES)[number]["key"], string>
  connector: string
}) {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mx-0" aria-hidden="true">
      <div className="relative pl-8">
        {/* Vertical connecting line that draws downward on load */}
        <span
          className={`absolute left-[10px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold/50 via-border to-border transition-transform duration-1000 ease-out motion-reduce:transition-none motion-reduce:scale-y-100 ${
            visible ? "scale-y-100" : "scale-y-0"
          }`}
        />

        <ul className="flex flex-col gap-6">
          {NODES.map((node, i) => (
            <li
              key={node.key}
              className={`relative transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + i * 180}ms` }}
            >
              {/* Node dot sitting on the line */}
              <span
                className={`absolute -left-[26px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border ${
                  node.accent ? "border-gold bg-gold" : "border-border bg-background"
                }`}
              />
              <div
                className={`rounded-xl border px-5 py-4 ${
                  node.accent
                    ? "border-gold/50 bg-gold/5 shadow-[0_0_0_1px_rgba(201,162,39,0.08)]"
                    : "border-border bg-card"
                }`}
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                    node.accent ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {labels[node.key]}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p
          className={`mt-8 max-w-[15rem] text-pretty text-sm italic leading-relaxed text-muted-foreground transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          {connector}
        </p>
      </div>
    </div>
  )
}
