import catalog from "@/messages/full/forms-legal.es.json"
import { getLocale } from "next-intl/server"
import { translateSpanishData } from "@/lib/spanish"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return translateSpanishData({
  title: "You're In — Your CAROS Revenue System Starts Here",
  description: "Your CAROS purchase is confirmed. Here's what happens next.",
  robots: { index: false, follow: true },
}, locale, catalog)
}

export default async function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
