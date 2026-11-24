import type { Metadata } from "next"
import { spanishTranslator } from "@/lib/spanish"
import { positioningSocialMetadata } from "@/lib/positioning-metadata"
import catalog from "@/messages/full/product-pages.es.json"
import en from "@/messages/pricing3d/en.json"
import es from "@/messages/pricing3d/es.json"
import { PricingStudio } from "@/components/caros/pricing-studio"
import { PricingTerms } from "@/components/caros/pricing-terms"
import "./pricing-studio.css"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const tr = spanishTranslator(locale, catalog)
  const title = tr("Pricing")
  const description = tr("Clear CAROS pricing for standard, medical, and finance revenue operations configurations.")
  const social = positioningSocialMetadata(description, locale, title)
  return { title, description, ...social,
    alternates: { canonical: `https://getcaros.com/${locale}/pricing`, languages: { en: "https://getcaros.com/en/pricing", es: "https://getcaros.com/es/pricing", "x-default": "https://getcaros.com/en/pricing" } },
    openGraph: { ...social.openGraph, url: `https://getcaros.com/${locale}/pricing` },
  }
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = locale === "es" ? es : en
  return <div className="pricing-page">
    <PricingStudio locale={locale} />
    <section className="pricing-commercial"><div className="pricing-container"><p>{t.termsBody}</p><details id="pricing-commercial-terms"><summary>{t.terms}</summary><PricingTerms /></details></div></section>
  </div>
}
