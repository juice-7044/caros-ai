import { useTranslations } from "next-intl"
import { HiringStory } from "./hiring-story"

/** Growth -> rising demands -> staffing costs -> unified CAROS value, in one continuous story. */
export function Hero() {
  const h = useTranslations("Home.hero")

  return (
    <section data-story="root" className="hero-gradient relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
        <h1 data-story="headline" className="max-w-4xl text-balance text-[clamp(1.9rem,4.2vw,3.5rem)] font-display leading-[1] tracking-tight">
          {h("title")}{" "}
          <span className="font-serif font-normal italic text-gold-gradient">{h("subtitle")}</span>
        </h1>
        <p data-story="growth" className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{h("growthBody")}</p>
        <p data-story="product-value" className="mt-3 max-w-2xl border-l-2 border-gold pl-4 text-sm font-medium leading-relaxed text-foreground sm:text-base">{h("productValue")}</p>
        <div data-story="demands" className="mt-7 max-w-2xl border-t border-border/70 pt-5">
          <p className="text-base font-semibold leading-relaxed sm:text-lg">{h("traditional")}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h("traditionalBody")}</p>
        </div>
        <HiringStory />
      </div>
    </section>
  )
}
