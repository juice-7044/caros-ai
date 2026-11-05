import { useTranslations } from "next-intl"
import { AnimatedGlobe } from "@/components/caros/animated-globe"

/**
 * Entrance hero: growth headline, concise CAROS definition and the original ASCII globe + grid backdrop.
 * The traditional-hiring transition and calculator live in the story band directly below (see StoryBand).
 */
export function Hero() {
  const h = useTranslations("Home.hero")
  const eyebrow = useTranslations("HomePage.hero")("eyebrow")

  return (
    <section data-story="hero" className="hero-gradient relative flex min-h-[min(100svh,56rem)] flex-col justify-center overflow-hidden">
      {/* Rotating ASCII globe: muted behind the copy on small screens, a full right-hand sphere from lg up. */}
      <div
        data-hero-orb
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-40 sm:-right-16 sm:h-[560px] sm:w-[560px] lg:right-[1vw] lg:h-[min(48vw,860px)] lg:w-[min(48vw,860px)] lg:opacity-70"
      >
        <AnimatedGlobe />
      </div>

      {/* Subtle grid lines */}
      <div data-hero-grid aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-foreground/10" style={{ top: `${12.5 * (i + 1)}%` }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute bottom-0 top-0 w-px bg-foreground/10" style={{ left: `${8.33 * (i + 1)}%` }} />
        ))}
      </div>

      <div className="home-container relative z-10 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-16 lg:pt-32">
        <span className="mb-6 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
          <span className="h-px w-8 bg-gold/60" aria-hidden />
          {eyebrow}
        </span>
        <h1 data-story="headline" className="max-w-[18ch] text-balance font-display text-[clamp(2.5rem,7.2vw,3.75rem)] lg:text-[clamp(3.5rem,5vw,6.5rem)] leading-[0.95] tracking-tight lg:max-w-[min(62%,1500px)]">
          {h("title")}{" "}
          <span className="font-serif font-normal italic text-gold-gradient">{h("subtitle")}</span>
        </h1>
        <p data-story="growth" className="mt-6 max-w-[34rem] text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-[40rem] lg:text-xl">{h("growthBody")}</p>
        <p data-story="product-value" className="mt-5 max-w-[34rem] border-l-2 border-gold pl-4 text-sm font-medium leading-relaxed text-foreground sm:text-base lg:max-w-[40rem] lg:text-lg">{h("productValue")}</p>
      </div>
    </section>
  )
}

/** Traditional-hiring transition that opens the connected cost story; rendered directly under the hero. */
export function StoryTransition() {
  const h = useTranslations("Home.hero")
  return (
    <div data-story="demands" className="max-w-3xl border-t border-border/70 pt-6">
      <p className="text-xl font-semibold leading-snug sm:text-2xl">{h("traditional")}</p>
      <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-muted-foreground">{h("traditionalBody")}</p>
    </div>
  )
}
