import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { RoiCalculator } from "@/components/caros/roi-calculator"
import { DIAGNOSTIC_HREF } from "@/lib/site"

export function Roi() {
  const t = useTranslations("HomePage.roi")

  return (
    <section id="roi-calculator" className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-50" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            {t("headlinePrefix")} {" "}
            <span className="font-serif font-normal italic text-gold-gradient">{t("headlineAccent")}</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <RoiCalculator />
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-12 max-w-3xl text-pretty text-lg leading-relaxed text-ink-muted">
            {t("body")}
          </p>
          <Link
            href={DIAGNOSTIC_HREF}
            className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-gold underline-offset-4 hover:underline"
          >
            {t("calculateLoss")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
