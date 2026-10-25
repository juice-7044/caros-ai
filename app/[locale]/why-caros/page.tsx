import { getLocale } from "next-intl/server"
import { translateSpanishData, localeHref } from "@/lib/spanish"
import catalog from "@/messages/full/specialist-pages.es.json"
import type { Metadata, ResolvingMetadata } from "next"
import { WhyCarosPage } from "@/components/caros/why-caros-page"

const englishMetadata: Metadata = {
  title: "Why CAROS",
  description: "The connected revenue operating system behind your growth.",
}

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = await getLocale()
  const metadata = translateSpanishData(englishMetadata, locale, catalog)
  const path = "/why-caros"
  const canonical = `https://getcaros.com${localeHref(path, locale)}`
  const inherited = await parent
  const title = String(metadata.title)
  const description = metadata.description ?? undefined
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical, languages: { en: `https://getcaros.com/en${path}`, es: `https://getcaros.com/es${path}` } },
    openGraph: {
      ...metadata.openGraph,
      type: "website",
      siteName: "CAROS",
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? description,
      url: canonical,
      locale: locale === "es" ? "es_419" : "en_US",
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


export default function Page() {
  return <WhyCarosPage />
}
