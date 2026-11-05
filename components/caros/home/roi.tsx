import { Link } from "@/i18n/navigation"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { RoiCalculator } from "@/components/caros/roi-calculator"
import { DIAGNOSTIC_HREF } from "@/lib/site"

export function Roi() {
  const t = useTranslations("Home.opportunity")

  return (
    <section id="roi-calculator" className="relative overflow-hidden bg-ink py-20 text-ink-foreground lg:py-28">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-50" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1] tracking-tight">{t("title")}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <details className="group rounded-2xl border border-ink-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-lg font-semibold">{t("toggle")}</span>
                <span className="block text-sm text-ink-muted">{t("toggleHint")}</span>
              </span>
              <ChevronDown className="size-5 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              <RoiCalculator />
            </div>
          </details>
        </Reveal>

        <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/revenue-audit" className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-gold-foreground hover:bg-gold/90">
            {t("auditCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href={DIAGNOSTIC_HREF} className="group inline-flex items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline">
            {t("moreTools")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
