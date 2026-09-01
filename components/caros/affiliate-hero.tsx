"use client"

import { useEffect, useState } from "react"

export function AffiliateHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-foreground/10" style={{ top: `${16.6 * (i + 1)}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute bottom-0 top-0 w-px bg-foreground/10" style={{ left: `${10 * (i + 1)}%` }} />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32 lg:pt-48">
        <div className="mb-8">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
          </span>
        </div>
        <h1 className={`max-w-4xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-display leading-[0.95] tracking-tight transition-all duration-1000 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {title}
        </h1>
        <p className={`mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground transition-all delay-150 duration-1000 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:text-xl ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {body}
        </p>
      </div>
    </section>
  )
}
