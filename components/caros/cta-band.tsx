import { useTranslations } from "next-intl"
import { Reveal } from "./reveal"
import { AuditButton } from "./ui-bits"
import { Sunburst } from "./sunburst"
import { AUDIT_URL } from "@/lib/site"

export function CtaBand({
  headline,
  sub,
  ctaLabel,
  ctaHref = AUDIT_URL,
  ctaExternal = true,
}: {
  headline?: string
  sub?: string
  ctaLabel?: string
  ctaHref?: string
  ctaExternal?: boolean
}) {
  const t = useTranslations("common.cta")
  const resolvedHeadline = headline ?? t("headline")
  const resolvedSub = sub ?? t("sub")
  const resolvedCtaLabel = ctaLabel ?? t("button")

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="mx-auto flex max-w-[1000px] flex-col items-center px-6 py-28 text-center lg:py-40">
        <Reveal className="flex flex-col items-center">
          <Sunburst className="w-16 text-gold" />
          <h2 className="mt-8 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight">
            {resolvedHeadline}
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg text-ink-muted">{resolvedSub}</p>
          <AuditButton
            className="mt-10 h-16 px-10 text-lg"
            label={resolvedCtaLabel}
            href={ctaHref}
            external={ctaExternal}
          />
        </Reveal>
      </div>
    </section>
  )
}
