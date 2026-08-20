import type { Metadata } from "next"
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

export const metadata: Metadata = {
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

export default function LawFirmsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
        headline="See where your firm is losing revenue."
        sub="A CAROS Revenue Audit shows you exactly where prospective clients slip between inquiry and engagement — and what it would take to keep them."
      />
    </>
  )
}
