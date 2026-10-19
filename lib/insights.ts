import "server-only"
import { readFile } from "node:fs/promises"
import path from "node:path"
import articles from "@/content/insights/articles.json"
import { isArticleVisible, isInsightsPreview } from "@/lib/insights-publication"

export const INSIGHTS_ORIGIN = "https://getcaros.com"
export const INSIGHTS_PATH = "/en/insights"
export type Insight = Omit<(typeof articles)[number], "datePublished"> & { datePublished: string | null }
export const insights: Insight[] = articles

export const verticals = {
  roofing: { label: "Roofing", heading: "From storm calls to signed roofs.", industry: "/en/industries/roofing", path: "storm-playbook", guide: "Storm Surge Playbook" },
  "real-estate": { label: "Real Estate", heading: "Stay useful from first inquiry to the next move.", industry: "/en/industries/real-estate", path: "speed-to-lead", guide: "The 5-Minute Rule" },
  hvac: { label: "HVAC", heading: "Keep the call, the agreement, and the customer.", industry: "/en/industries/hvac", path: "hvac-agreements", guide: "The Maintenance Agreement Machine" },
  plumbing: { label: "Plumbing", heading: "Give every missed ring a next step.", industry: "/en/industries/plumbing", path: "plumbing-after-hours", guide: "The After-Hours Revenue Worksheet" },
} as const

export type InsightVertical = keyof typeof verticals

export function leadMagnetUrl(vertical: InsightVertical): string {
  const url = new URL(verticals[vertical].path, "https://go.getcaros.com/")
  url.search = new URLSearchParams({
    utm_source: "getcaros",
    utm_medium: "blog",
    utm_campaign: `phase1_${vertical.replaceAll("-", "_")}`,
  }).toString()
  return url.toString()
}

export function visibleInsights(preview = isInsightsPreview(), now = new Date()): Insight[] {
  return insights.filter(article => article.staged && isArticleVisible(article, preview, now))
}

export function findInsight(slug: string, preview = isInsightsPreview()): Insight | undefined {
  return visibleInsights(preview).find(article => article.slug === slug)
}

export async function articleBody(article: Insight): Promise<string> {
  // Filenames come exclusively from the checked-in manifest, never request input.
  const source = await readFile(path.join(process.cwd(), "content/insights", `${article.slug}.md`), "utf8")
  const heading = source.indexOf("\n# ")
  if (heading < 0) throw new Error(`Missing article heading: ${article.slug}`)
  return source.slice(source.indexOf("\n", heading + 1) + 1).trim()
}

export function insightSchema(article: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${INSIGHTS_ORIGIN}${INSIGHTS_PATH}/${article.slug}#article`,
    mainEntityOfPage: `${INSIGHTS_ORIGIN}${INSIGHTS_PATH}/${article.slug}`,
    headline: article.title,
    description: article.description,
    image: `${INSIGHTS_ORIGIN}${article.image}`,
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    author: { "@type": "Organization", name: "CAROS", url: INSIGHTS_ORIGIN },
    publisher: { "@id": `${INSIGHTS_ORIGIN}/#organization` },
    articleSection: verticals[article.vertical as InsightVertical].label,
    keywords: article.keyword,
    inLanguage: "en-US",
  }
}
