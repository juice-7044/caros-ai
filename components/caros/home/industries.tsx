import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { INDUSTRIES } from "@/lib/site"

export function Industries() {
  // Duplicate the list so the marquee loops seamlessly.
  const rowA = [...INDUSTRIES, ...INDUSTRIES]
  const rowB = [...INDUSTRIES.slice().reverse(), ...INDUSTRIES.slice().reverse()]

  return (
    <section className="relative overflow-hidden bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Who It&apos;s For</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            Built for{" "}
            <span className="font-serif font-normal italic text-gold-gradient">local service businesses.</span>
          </h2>
        </Reveal>
      </div>

      {/* Scrolling logo strips (full-bleed) */}
      <div className="relative mt-16 space-y-4">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex overflow-hidden">
          <div className="marquee-slow flex shrink-0 gap-4 pr-4">
            {rowA.map((industry, i) => (
              <IndustryChip key={`a-${i}`} label={industry} />
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden">
          <div className="marquee-slow flex shrink-0 gap-4 pr-4" style={{ animationDuration: "48s" }}>
            {rowB.map((industry, i) => (
              <IndustryChip key={`b-${i}`} label={industry} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] px-6 lg:px-12">
        <Reveal delay={100}>
          <p className="max-w-2xl text-muted-foreground">
            Own another type of business? CAROS selectively works with most referral-based small businesses.{" "}
            <span className="font-medium text-foreground">Contact us to see if you&apos;re a fit.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function IndustryChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 rounded-full border border-border bg-card px-7 py-4 text-lg font-semibold text-foreground/80">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {label}
    </span>
  )
}
