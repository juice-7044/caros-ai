import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { INDUSTRY_SLUGS } from "@/lib/industries"
import { getLocalizedIndustry } from "@/lib/localized-industry"
import { IndustryHero } from "@/components/caros/industry/hero"
import {
  ProblemSection,
  LeaksSection,
  JourneySection,
  CaptureSection,
  SignatureSection,
  IntelligenceSection,
  ExperienceSection,
  PillarsSection,
  ScalingSection,
  FaqSection,
} from "@/components/caros/industry/sections"
import { CtaBand } from "@/components/caros/cta-band"

const SITE_URL = "https://getcaros.com"

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((trade) => ({ trade }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string; locale: string }>
}): Promise<Metadata> {
  const { trade, locale } = await params
  const industry = getLocalizedIndustry(trade, locale)
  if (!industry) return {}
  const path = `/${locale}/industries/${industry.slug}`
  const url = `${SITE_URL}${path}`
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    alternates: { canonical: path, languages: { en: `/en/industries/${industry.slug}`, es: `/es/industries/${industry.slug}` } },
    openGraph: {
      type: "website",
      url,
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ trade: string; locale: string }> }) {
  const { trade, locale } = await params
  const industry = getLocalizedIndustry(trade, locale)
  if (!industry) notFound()

  const path = `/${locale}/industries/${industry.slug}`
  const url = `${SITE_URL}${path}`

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "es" ? `CAROS para ${industry.name}` : `CAROS for ${industry.name}`,
    serviceType: locale === "es" ? `Sistema operativo de ingresos para ${industry.name.toLowerCase()}` : `Revenue operating system for ${industry.name.toLowerCase()} businesses`,
    description: industry.metaDescription,
    url,
    provider: { "@type": "Organization", name: "CAROS", url: SITE_URL },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", name: locale === "es" ? industry.name : `${industry.name} businesses` },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Sectores" : "Industries", item: `${SITE_URL}/${locale}/industries` },
      { "@type": "ListItem", position: 3, name: industry.name, item: url },
    ],
  }

  return (
    <div data-industry-theme={industry.visualTheme ?? "default"} className="industry-theme-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <IndustryHero industry={industry} />
      <ProblemSection industry={industry} />
      <LeaksSection industry={industry} />
      <JourneySection industry={industry} />
      <CaptureSection industry={industry} />
      <SignatureSection industry={industry} />
      <IntelligenceSection industry={industry} />
      <ExperienceSection industry={industry} />
      <PillarsSection industry={industry} />
      <ScalingSection industry={industry} />
      <FaqSection industry={industry} />
      <CtaBand headline={industry.ctaHeadline} sub={industry.ctaSub} />
    </div>
  )
}
