import { useTranslations } from "next-intl"
import { ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

export function ChallengePairs() {
  const t = useTranslations("Home.challenges")
  const items = t.raw("items") as { problem: string; solution: string }[]
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-display leading-[1] tracking-tight">{t("title")}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {items.map((it) => (
            <li key={it.problem} className="flex items-start gap-4 border-t border-border py-5">
              <Check className="mt-1 size-5 shrink-0 text-gold" strokeWidth={2} aria-hidden />
              <div>
                <p className="font-semibold">{it.problem}</p>
                <p className="mt-1 flex items-start gap-2 text-muted-foreground"><ArrowRight className="mt-1 size-4 shrink-0" aria-hidden />{it.solution}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
