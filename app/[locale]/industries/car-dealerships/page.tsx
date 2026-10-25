import { getLocale } from "next-intl/server"
import { translateSpanishData, localeHref } from "@/lib/spanish"
import catalog from "@/messages/full/specialist-pages.es.json"
import type { Metadata, ResolvingMetadata } from "next"
import { DealershipPage } from "@/components/caros/dealership-page"

const SITE_URL = "https://getcaros.com"

const englishMetadata: Metadata = {
  title: "CAROS for Car Dealerships | More Leads. More Test Drives. More Cars Sold.",
  description: "CAROS helps independent, used-car, franchise, and multi-location dealerships capture buyer interest, book test drives, follow up faster, and grow revenue.",
  keywords: ["car dealership lead follow up", "dealership test drive scheduling", "automotive revenue operations", "car dealer CRM automation"],
  alternates: { canonical: `${SITE_URL}/industries/car-dealerships` },
  openGraph: { title: "CAROS for Car Dealerships", description: "Turn more buyer interest into conversations, test drives, sales opportunities, and long-term customer relationships.", url: `${SITE_URL}/industries/car-dealerships`, type: "website" },
}

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = await getLocale()
  const metadata = translateSpanishData(englishMetadata, locale, catalog)
  const path = "/industries/car-dealerships"
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


export default function CarDealershipsPage() {
  return <DealershipPage />
}
