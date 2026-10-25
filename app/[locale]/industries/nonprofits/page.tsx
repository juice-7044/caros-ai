import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { spanishTranslator } from "@/lib/spanish"
import spanish from "@/messages/full/shared.es.json"
import { notFound } from "next/navigation"
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
import { Eyebrow } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { NonprofitConsultationForm } from "@/components/caros/nonprofit-consultation-form"

const SITE_URL = "https://getcaros.com"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const industry = getLocalizedIndustry("nonprofits", locale)
  if (!industry) return {}
  const path = `/${locale}/industries/nonprofits`
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    alternates: { canonical: path, languages: { en: "/en/industries/nonprofits", es: "/es/industries/nonprofits" } },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
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

export default async function NonprofitsPage() {
  const locale = await getLocale()
  const tr = spanishTranslator(locale, spanish)
  const industry = getLocalizedIndustry("nonprofits", locale)
  if (!industry) notFound()

  const path = `/${locale}/industries/${industry.slug}`
  const url = `${SITE_URL}${path}`

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "es" ? `CAROS para ${industry.name}` : `CAROS for ${industry.name}`,
    serviceType: locale === "es" ? "Sistema operativo de ingresos para organizaciones sin fines de lucro" : "Revenue operating system for nonprofit organizations",
    description: industry.metaDescription,
    url,
    provider: { "@type": "Organization", name: "CAROS", url: SITE_URL },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", name: locale === "es" ? "Organizaciones sin fines de lucro" : "Nonprofit organizations" },
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
      { "@type": "ListItem", position: 1, name: tr("Home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: tr("Industries"), item: `${SITE_URL}/${locale}/industries` },
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

      {/* Sales-led pricing — nonprofits: no self-service pricing, consultation only */}
      <section id="nonprofit-consultation" className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>{tr("Pricing")}</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-tight">
              {tr("Solutions Built Around Your Mission and Your Organization.")}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {tr("Every nonprofit operates differently. Connect with our team to explore the right CAROS configuration and a pricing structure tailored to your organization's operational needs.")}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {tr("Nonprofit pricing is arranged through a consultation with our sales team — there is no self-service pricing for nonprofit organizations.")}</p>
          </Reveal>
          <Reveal className="mt-12">
            <NonprofitConsultationForm />
          </Reveal>
        </div>
      </section>

      <FaqSection industry={industry} />
      <CtaBand headline={industry.ctaHeadline} sub={industry.ctaSub} />
    </div>
  )
}
