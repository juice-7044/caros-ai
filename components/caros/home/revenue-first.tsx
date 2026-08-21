import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

export function RevenueFirst() {
  const t = useTranslations("HomePage.revenueFirst")

  const mattersWhen = Array.from({ length: 4 }, (_, index) => ({
    label: t(`mattersWhen.${index}.label`),
    detail: t(`mattersWhen.${index}.detail`),
  }))

  const lifecycle = Array.from({ length: 8 }, (_, index) => t(`lifecycle.${index}`))

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            {t("titlePrefix")} {" "}
            <span className="font-serif font-normal italic text-gold-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {mattersWhen.map((item) => (
              <li key={item.label} className="bg-card p-6 lg:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  <span className="font-semibold text-gold">{item.label}</span>{" "}
                  <span className="text-muted-foreground">{item.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-balance text-2xl font-semibold leading-snug lg:text-3xl">
            {t("lifecycleStatement")} <span className="text-gold">{t("lifecycleAccent")}</span>
          </p>
        </Reveal>

        <Reveal
          delay={160}
          className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground"
        >
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{t("lifecycleLabel")}</span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              {t("endToEnd")}
            </span>
          </div>

          <div className="p-6 lg:p-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
              {lifecycle.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold">
                    {step}
                  </span>
                  {i < lifecycle.length - 1 ? (
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-gold lg:rotate-0" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center rounded-xl border border-gold/40 bg-gold/15 py-6">
              <span className="font-display text-2xl uppercase tracking-[0.2em] text-gold lg:text-3xl">{t("revenue")}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t("supportingText")}</p>
        </Reveal>
      </div>
    </section>
  )
}


