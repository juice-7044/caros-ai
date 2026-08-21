import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { PricingCard } from "@/components/caros/pricing-card"
import { INSIGHTS_URL, INSIGHTS_LABEL } from "@/lib/site"

export function PricingPreview() {
  const t = useTranslations("HomePage.pricingPreview")

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
            CAROS — <span className="font-serif font-normal italic">$997/month.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <PricingCard ctaLabel={INSIGHTS_LABEL} ctaHref={INSIGHTS_URL} ctaExternal />
        </Reveal>
      </div>
    </section>
  )
}
