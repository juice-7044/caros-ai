import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { PillarsGrid } from "@/components/caros/pillars-grid"

export function EnterCaros() {
  const t = useTranslations("HomePage.enterCaros")

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            {t("headline")}
          </h2>
          <p className="mt-6 text-lg text-ink-muted">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-16">
          <PillarsGrid variant="dark" />
        </div>
      </div>
    </section>
  )
}
