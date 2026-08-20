import type { Metadata } from "next"
import {useTranslations} from "next-intl"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { PricingCard } from "@/components/caros/pricing-card"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent CAROS pricing: $997/month plus a one-time $2,500 implementation. No revenue share, no long build, no disconnected software to figure out yourself.",
}

const faqKeys = ["implementation", "revenueShare", "payback", "existingTools"] as const


export default function PricingPage() {
  const t = useTranslations("pages.pricing")

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        serifTitle={t("serifTitle")}
        subtitle={t("subtitle")}
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <PricingCard />
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>{t("questions")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-tight">
              {t("questionsTitle")}
            </h2>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {faqKeys.map((key, i) => (
              <Reveal key={key} delay={i * 60} className="py-8">
                <h3 className="font-serif text-2xl italic text-foreground">{t(`faq.${key}.q`)}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{t(`faq.${key}.a`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline={t("cta")} />
    </>
  )
}
