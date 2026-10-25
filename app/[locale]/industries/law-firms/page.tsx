import { getLocale } from "next-intl/server"
import { spanishTranslator, translateSpanishData, localeHref } from "@/lib/spanish"
import catalog from "@/messages/full/specialist-pages.es.json"
import type { Metadata, ResolvingMetadata } from "next"
import { LawFirmHero } from "@/components/caros/law-firms/hero"
import {
  RevenueProblem,
  RevenueLeaks,
  RevenueJourney,
  Intake,
  EstatePlanning,
  RevenueIntelligence,
  ClientExperience,
  OperatingSystem,
  Ethics,
  Faq,
  FAQ_ITEMS,
} from "@/components/caros/law-firms/sections"
import { CtaBand } from "@/components/caros/cta-band"

const SITE_URL = "https://getcaros.com"
const PAGE_PATH = "/industries/law-firms"
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

const PAGE_TITLE = "CAROS for Law Firms & Estate Planning Practices"
const PAGE_DESCRIPTION =
  "CAROS helps law firms and estate-planning practices move the right prospective clients from inquiry through intake, consultation, and engagement — with consistent intake, timely follow-up, and clear visibility into which sources and practice areas generate revenue."

const englishMetadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "law firm client intake software",
    "legal intake system",
    "estate planning client intake",
    "trusts and estates practice growth",
    "law firm revenue operations",
    "prospective client intake",
    "consultation scheduling for law firms",
    "law firm follow-up automation",
    "referral source tracking law firm",
    "law firm marketing ROI",
    "client development for attorneys",
    "estate planning follow-up",
    "law firm lead management",
    "managing partner revenue visibility",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    siteName: "CAROS",
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = await getLocale()
  const metadata = translateSpanishData(englishMetadata, locale, catalog)
  const path = "/industries/law-firms"
  const canonical = `https://getcaros.com${localeHref(path, locale)}`
  const inherited = await parent
  const title = String(metadata.title)
  const description = metadata.description ?? undefined
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical, languages: { en: `https://getcaros.com/en${path}`, es: `https://getcaros.com/es${path}` } },
    openGraph: {
      ...metadata.openGraph,
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? description,
      url: canonical,
      locale: locale === "es" ? "es_US" : "en_US",
      images: inherited.openGraph?.images,
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      title: metadata.twitter?.title ?? title,
      description: metadata.twitter?.description ?? description,
      images: inherited.twitter?.images ?? inherited.openGraph?.images,
    },
  }
}


const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CAROS for Law Firms & Estate Planning",
  serviceType: "Client acquisition and revenue operations system for law firms",
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  provider: {
    "@type": "Organization",
    name: "CAROS",
    url: SITE_URL,
  },
  areaServed: "US",
  audience: {
    "@type": "Audience",
    audienceType:
      "Estate planning attorneys, trusts and estates practices, small and midsized law firms, managing partners, and firm administrators",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
    { "@type": "ListItem", position: 3, name: "Law Firms & Estate Planning", item: PAGE_URL },
  ],
}

export default async function LawFirmsPage() {
  const locale = await getLocale()
  const tr = spanishTranslator(locale, catalog)
  const localize = <T,>(value: T): T => translateSpanishData(value, locale, catalog)
  const localizedService = { ...localize(serviceSchema), url: `${SITE_URL}${localeHref(PAGE_PATH, locale)}`, inLanguage: locale }
  const localizedBreadcrumb = localize(breadcrumbSchema)
  localizedBreadcrumb.itemListElement = localizedBreadcrumb.itemListElement.map(item => ({ ...item, item: `${SITE_URL}${localeHref(item.item, locale)}` }))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedService) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localize(faqSchema)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedBreadcrumb) }}
      />

      <LawFirmHero />
      <RevenueProblem />
      <RevenueLeaks />
      <RevenueJourney />
      <Intake />
      <EstatePlanning />
      <RevenueIntelligence />
      <ClientExperience />
      <OperatingSystem />
      <Ethics />
      <Faq />
      <CtaBand
        headline={tr("See where your firm is losing revenue.")}
        sub={tr("A CAROS Revenue Audit shows you exactly where prospective clients slip between inquiry and engagement — and what it would take to keep them.")}
      />
    </>
  )
}
