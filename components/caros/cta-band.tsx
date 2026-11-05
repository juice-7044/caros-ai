import { useTranslations } from "next-intl"
import { Reveal } from "./reveal"
import { AuditButton } from "./ui-bits"
import { Sunburst } from "./sunburst"
import { AUDIT_URL } from "@/lib/site"
import { TrackedLink } from "./home/tracked-link"
import { ArrowRight } from "lucide-react"

export function CtaBand({
  headline,
  sub,
  ctaLabel,
  ctaHref = AUDIT_URL,
  ctaExternal = true,
  trackDemo,
  children,
}: {
  headline?: string
  sub?: string
  ctaLabel?: string
  ctaHref?: string
  ctaExternal?: boolean
  /** Records a demo_click (click only; arrival on the demo is not observed). */
  trackDemo?: string
  children?: React.ReactNode
}) {
  const t = useTranslations("common.cta")
  const resolvedHeadline = headline ?? t("headline")
  const resolvedSub = sub ?? t("sub")
  const resolvedCtaLabel = ctaLabel ?? t("button")

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="home-container flex flex-col items-center py-28 text-center lg:py-40">
        <Reveal className="flex flex-col items-center">
          <Sunburst className="w-16 text-gold" />
          <h2 className="mt-8 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight">
            {resolvedHeadline}
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg text-ink-muted">{resolvedSub}</p>
          {trackDemo ? (
            <TrackedLink
              href={ctaHref}
              external
              events={[["demo_click", { location: trackDemo }]]}
              className="group mt-10 inline-flex h-16 items-center justify-center gap-2 rounded-full bg-gold px-10 text-lg font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
            >
              {resolvedCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </TrackedLink>
          ) : (
            <AuditButton
              className="mt-10 h-16 px-10 text-lg"
              label={resolvedCtaLabel}
              href={ctaHref}
              external={ctaExternal}
            />
          )}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
