import { useTranslations } from "next-intl"
import { HiringStory } from "./hiring-story"

/** Headline, then the calculator immediately; the rest of the story lives in HiringStory. */
export function Hero() {
  const h = useTranslations("Home.hero")

  return (
    <section data-story="root" className="hero-gradient relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
        <h1 data-story="headline" className="max-w-4xl text-balance text-[clamp(1.9rem,4.2vw,3.5rem)] font-display leading-[1] tracking-tight">
          {h("title")}{" "}
          <span className="font-serif font-normal italic text-gold-gradient">{h("subtitle")}</span>
        </h1>
        <HiringStory />
      </div>
    </section>
  )
}
