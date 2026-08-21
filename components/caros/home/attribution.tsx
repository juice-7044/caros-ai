import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { AttributionTable } from "@/components/caros/attribution-table"

export function Attribution() {
  const t = useTranslations("HomePage.attribution")

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-4xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            {t("headline")}
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <AttributionTable />
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-14 text-balance text-3xl font-extrabold tracking-tight lg:text-4xl">
            {t("question")}
          </p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
