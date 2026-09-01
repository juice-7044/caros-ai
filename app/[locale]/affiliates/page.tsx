import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { AffiliateApplicationForm } from "@/components/caros/affiliate-application-form"
import { AffiliateHero } from "@/components/caros/affiliate-hero"

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations("AffiliatesPage"); return { title: t("meta.title"), description: t("meta.description") } }

export default async function AffiliatesPage() {
  const t = await getTranslations("AffiliatesPage")
  const steps = ["apply", "approved", "refer"] as const
  const fit = ["consultants", "marketers", "agencies", "b2b", "coaches", "leaders", "creators", "clients", "homeServices"] as const
  return <main>
    <AffiliateHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />
    <section className="bg-background py-20"><div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6"><a href="#affiliate-application" className="w-fit rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">{t("hero.cta")}</a><p className="text-sm text-muted-foreground">{t("hero.micro")}</p></div></section>
    <section className="bg-card py-20"><div className="mx-auto max-w-[1100px] px-6"><p className="eyebrow">{t("process.eyebrow")}</p><h2 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold tracking-tight">{t("process.title")}</h2><p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{t("process.body")}</p><div className="mt-12 grid gap-6 md:grid-cols-3">{steps.map((step, i) => <article key={step} className="rounded-2xl border border-border bg-background p-6"><span className="font-mono text-gold">0{i + 1}</span><h3 className="mt-5 text-xl font-extrabold">{t(`process.steps.${step}.title`)}</h3><p className="mt-3 leading-6 text-muted-foreground">{t(`process.steps.${step}.body`)}</p></article>)}</div></div></section>
    <section className="bg-background py-20"><div className="mx-auto max-w-[1100px] px-6"><p className="eyebrow">{t("fit.eyebrow")}</p><h2 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold tracking-tight">{t("fit.title")}</h2><p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{t("fit.body")}</p><ul className="mt-10 grid gap-4 sm:grid-cols-2">{fit.map((item) => <li key={item} className="rounded-xl border border-border bg-card p-4">{t(`fit.items.${item}`)}</li>)}</ul><p className="mt-10 max-w-3xl text-lg font-semibold leading-7">{t("fit.final")}</p></div></section>
    <section className="bg-card py-20"><div className="mx-auto max-w-[900px] px-6"><p className="eyebrow">{t("form.eyebrow")}</p><h2 className="mt-5 text-4xl font-extrabold">{t("form.title")}</h2><div className="mt-10"><AffiliateApplicationForm /></div></div></section>
  </main>
}
