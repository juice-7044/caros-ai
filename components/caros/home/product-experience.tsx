import { useTranslations } from "next-intl"
import { ArrowRight, MonitorPlay, Plug } from "lucide-react"
import { DEMO_URL } from "@/lib/home-nav"
import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"
import { TrackedLink } from "./tracked-link"

export function ProductExperience() {
  const t = useTranslations("Home.experience")
  const tools = useTranslations("HomePage.integrations").raw("existingTools") as string[]
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-display leading-[1] tracking-tight">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("body")}</p>
        </Reveal>
        <Reveal delay={80} className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <MonitorPlay className="size-6 text-gold" strokeWidth={1.75} aria-hidden />
            <p className="mt-4 text-xl font-display">{t("demoTitle")}</p>
            <p className="mt-2 text-muted-foreground">{t("demoBody")}</p>
            <TrackedLink
              href={DEMO_URL}
              external
              events={[["demo_click", { location: "experience" }]]}
              className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-gold-foreground hover:bg-gold/90"
            >
              {t("demoCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </TrackedLink>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <Plug className="size-6 text-gold" strokeWidth={1.75} aria-hidden />
            <p className="mt-4 text-xl font-display">{t("integrationsTitle")}</p>
            <p className="mt-2 text-muted-foreground">{t("integrationsBody")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground/80">{tool}</li>
              ))}
            </ul>
            <Link href="/industries" className="mt-5 inline-flex items-center gap-1 font-semibold text-gold underline-offset-4 hover:underline">
              {t("industriesCta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
