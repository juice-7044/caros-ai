import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { CAPABILITIES_ID, DEMO_URL } from "@/lib/home-nav"
import { HiringCalculator } from "./hiring-calculator"
import { TrackedLink } from "./tracked-link"

export function Hero() {
  const h = useTranslations("Home.hero")
  const t = useTranslations("HomePage.hero")

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1300px] gap-10 px-6 pb-14 pt-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-16 lg:pt-32">
        <div>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-gold/60" />
            {h("eyebrow")}
          </span>
          <h1 className="mt-5 text-balance text-[clamp(2.1rem,4.6vw,4rem)] font-display leading-[0.98] tracking-tight">
            {h("title")}{" "}
            <span className="font-serif font-normal italic text-gold-gradient">{h("subtitle")}</span>
          </h1>
          <p className="mt-6 font-serif text-xl italic leading-snug text-foreground text-balance lg:text-2xl">
            {h("transition")}
          </p>
          <p className="mt-4 inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            {h("systemChip")}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">{h("value")}</p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
            <TrackedLink
              href={DEMO_URL}
              external
              events={[["hero_cta_click", { cta: "see_caros_in_action", location: "hero" }], ["demo_click", { location: "hero" }]]}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
            >
              {h("primaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </TrackedLink>
            <TrackedLink
              href={`#${CAPABILITIES_ID}`}
              events={[["hero_cta_click", { cta: "explore_capabilities", location: "hero" }]]}
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
            >
              {h("secondaryCta")}
              <ArrowRight className="h-4 w-4 rotate-90" />
            </TrackedLink>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("notReady")}{" "}
            <Link href="/resources" className="font-semibold text-gold underline-offset-4 hover:underline">
              {t("freeAuditCta")}
            </Link>
          </p>
          {/* Reserve space when the same launcher becomes a floating circle on scroll. */}
          <div data-caros-chat-dock className="mt-3 min-h-[76px] w-[262px] max-w-full" />
        </div>
        <HiringCalculator />
      </div>
    </section>
  )
}
