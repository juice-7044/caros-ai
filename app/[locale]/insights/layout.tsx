import { Inter, Playfair_Display } from "next/font/google"
import { notFound } from "next/navigation"
import "./insights.css"

const inter = Inter({ subsets: ["latin"], variable: "--insights-body" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700", variable: "--insights-heading" })

export default async function InsightsLayout({ children, params }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Phase 1 contains approved English copy only; don't serve it as Spanish.
  if (locale !== "en") notFound()
  return <div className={`insights-shell ${inter.variable} ${playfair.variable}`} lang="en">{children}</div>
}
