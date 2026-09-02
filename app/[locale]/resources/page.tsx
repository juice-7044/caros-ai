import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ArrowRight, BookOpen, Calculator, Gauge, Sparkles } from "lucide-react"
import { Link } from "@/i18n/routing"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { AUDIT_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Free Resources | CAROS",
  description: "Free tools and insights to help you find more revenue, understand marketing ROI, and close gaps in your revenue process.",
}

export default async function ResourcesPage() {
  const t = await getTranslations("ResourcesPage")
  const resources = [
    { title: t("cards.insights.title"), body: t("cards.insights.body"), cta: t("cards.insights.cta"), href: "https://free-revenue-insights.getcarosai.com", icon: BookOpen, external: true },
    { title: t("cards.marketingRoi.title"), body: t("cards.marketingRoi.body"), cta: t("cards.marketingRoi.cta"), href: "/marketing-roi", icon: Calculator },
    { title: t("cards.audit.title"), body: t("cards.audit.body"), cta: t("cards.audit.cta"), href: AUDIT_URL, icon: Gauge, external: true, gold: true },
    { title: t("cards.revenueLeakage.title"), body: t("cards.revenueLeakage.body"), cta: t("cards.revenueLeakage.cta"), href: "https://revenue-leakage-calculator.getcaros.com", icon: Calculator, external: true },
    { title: t("cards.workflowCost.title"), body: t("cards.workflowCost.body"), cta: t("cards.workflowCost.cta"), href: "https://tools-workflow-cost.getcaros.com", icon: Gauge, external: true },
    { title: t("cards.revenueReadiness.title"), body: t("cards.revenueReadiness.body"), cta: t("cards.revenueReadiness.cta"), href: "https://revenue-readiness.getcaros.com", icon: Gauge, external: true },
    { title: t("cards.coming.title"), body: t("cards.coming.body"), cta: t("comingSoon"), href: "#", icon: Sparkles, soon: true },
  ]
  return (
    <main>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} serifTitle={t("hero.serifTitle")} subtitle={t("hero.subtitle")} />
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal><Eyebrow>{t("section.eyebrow")}</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">{t("section.title")}</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {resources.map((resource, i) => { const Icon = resource.icon; const className = `group flex h-full flex-col border p-7 transition-all duration-300 ${resource.gold ? "border-gold bg-gold/5" : "border-border bg-card hover:border-gold"}`; const content = <><div className="flex items-start justify-between"><Icon className="size-7 text-gold" aria-hidden="true" />{resource.soon && <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold">{t("comingSoon")}</span>}</div><h3 className="mt-10 text-2xl font-bold tracking-tight">{resource.title}</h3><p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{resource.body}</p><span className={`mt-8 inline-flex items-center gap-2 font-semibold ${resource.gold ? "text-gold" : "text-foreground"}`}>{resource.cta}{!resource.soon && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}</span></>; return <Reveal key={resource.title} delay={i * 70}>{resource.soon ? <div className={className}>{content}</div> : resource.external ? <a className={className} href={resource.href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link className={className} href={resource.href}>{content}</Link>}</Reveal> })}
          </div>
        </div>
      </section>
    </main>
  )
}
