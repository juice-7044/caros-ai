import { Reveal } from "@/components/caros/reveal"
import { useTranslations } from "next-intl"
import { Eyebrow } from "@/components/caros/ui-bits"
import { HowItWorksSteps } from "@/components/caros/how-it-works-steps"

export function Process() {
  const t = useTranslations("HomePage.process")

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
            {t("headline")}
          </h2>
        </Reveal>

        <div className="mt-16">
          <HowItWorksSteps variant="light" />
        </div>

        <Reveal delay={100}>
          <p className="mt-16 inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-lg font-semibold">
            <span className="h-2 w-2 rounded-full bg-gold" />
            {t("badge")}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("setup")}
          </p>
          <p className="mt-8 max-w-2xl border-l-2 border-gold/50 pl-4 text-base leading-relaxed text-foreground/80">
            {t("existingTools")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
