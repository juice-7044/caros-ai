import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ArrowRight, CheckCircle2, Handshake, ShieldCheck } from "lucide-react"
import { AffiliateApplicationForm } from "@/components/caros/affiliate-application-form"
import { PageHero } from "@/components/caros/ui-bits"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AffiliatesPage")
  return { title: t("meta.title"), description: t("meta.description") }
}

export default async function AffiliatesPage() {
  const t = await getTranslations("AffiliatesPage")
  const benefits = [t("benefits.one"), t("benefits.two"), t("benefits.three")]
  return <main>
    <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} serifTitle={t("hero.serifTitle")} subtitle={t("hero.subtitle")} />
    <section className="bg-background py-20 lg:py-28"><div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
      <div className="flex flex-col gap-8"><div><p className="eyebrow">{t("intro.eyebrow")}</p><h2 className="mt-5 text-balance text-4xl font-extrabold tracking-tight">{t("intro.title")}</h2><p className="mt-5 leading-7 text-muted-foreground">{t("intro.body")}</p></div>
        <div className="flex flex-col gap-5">{benefits.map((benefit) => <div key={benefit} className="flex items-start gap-3"><CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" /><p className="leading-6 text-foreground">{benefit}</p></div>)}</div>
        <div className="grid gap-4 sm:grid-cols-3">{[[Handshake, "partnership"], [ShieldCheck, "trust"], [ArrowRight, "next"]].map(([Icon, key]) => <div key={String(key)} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4"><Icon className="size-5 text-gold" /><p className="text-sm font-bold">{t(`proof.${key}`)}</p></div>)}</div>
      </div><AffiliateApplicationForm />
    </div></section>
  </main>
}
