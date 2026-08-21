import { Reveal } from "@/components/caros/reveal"
import { useTranslations } from "next-intl"
import { Eyebrow } from "@/components/caros/ui-bits"

export function Leaks() {
  const t = useTranslations("HomePage.leaks")
  const spend = t.raw("spend") as { label: string; value: string }[]
  const questions = t.raw("questions") as string[]

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal>
          <Eyebrow tone="danger">{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
            {t("headline")} {" "}
            <span className="font-serif font-normal italic text-danger">you can&apos;t see.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <p className="text-4xl font-extrabold tracking-tight">$7,500</p>
            <p className="mt-1 text-sm text-muted-foreground">spent on marketing last month</p>
            <ul className="mt-8 space-y-3">
              {spend.map((row) => (
                <li key={row.label} className="flex items-center justify-between border-b border-border/70 pb-3 last:border-0">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold tabular-nums">{row.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="flex flex-col justify-center rounded-2xl border border-border bg-foreground p-8 text-background lg:p-10">
            <p className="text-[clamp(3rem,8vw,5rem)] font-extrabold leading-none">86</p>
            <p className="mt-2 text-lg text-background/70">leads generated</p>
            <p className="mt-8 text-background/60">
              That&apos;s the number every dashboard shows you. It&apos;s also where most owners stop knowing anything at
              all.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {questions.map((q, i) => (
            <Reveal key={q} delay={i * 90}>
              <p className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground/85 lg:text-3xl">
                {q}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-20 max-w-4xl text-balance text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
            If you can&apos;t answer those questions, you don&apos;t actually know how your marketing is performing.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
