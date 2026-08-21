import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/caros/reveal"
import { DIAGNOSTIC_HREF } from "@/lib/site"

export function Pivot() {
  const t = useTranslations("HomePage.pivot")
  const cards = t.raw("cards") as { flow: string[]; note: string }[]

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
            {t("headline")}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="flex flex-col rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex flex-1 flex-col gap-3">
                {card.flow.map((step, j) => {
                  const isFail = j === card.flow.length - 1
                  return (
                    <div key={j} className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${isFail ? "bg-danger" : "bg-muted-foreground/40"}`}
                      />
                      <span className={`text-lg font-semibold ${isFail ? "text-danger" : "text-foreground/70"}`}>
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="mt-8 border-t border-border pt-5 text-sm font-bold uppercase tracking-[0.12em] text-danger">
                {card.note}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-16 max-w-3xl text-balance text-2xl font-bold leading-tight tracking-tight lg:text-3xl">
            Sometimes your marketing isn&apos;t broken. What happens{" "}
            <span className="text-gold">after the lead arrives</span> is.
          </p>
          <Link
            href={DIAGNOSTIC_HREF}
            className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-gold underline-offset-4 hover:underline"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
