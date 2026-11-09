import type { MetadataRoute } from "next"
import { INDUSTRY_SLUGS } from "@/lib/industries"
import { LEAD_MAGNETS } from "@/lib/lead-magnets"

const SITE_URL = "https://getcaros.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const industryRoutes = [
    ...INDUSTRY_SLUGS.map((slug) => ({
      path: `/industries/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/industries/law-firms", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/industries/car-dealerships", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/whats-included", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/marketing-roi", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
    ...industryRoutes,
    { path: "/why-caros", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/compare", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.6, changeFrequency: "monthly" as const },
    ...LEAD_MAGNETS.map((m) => ({ path: `/free/${m.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/affiliates", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/diagnostic", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/revenue-audit", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  const lastModified = new Date()

  return routes.flatMap((route) => (["en", "es"] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages: {
      en: `${SITE_URL}/en${route.path === "/" ? "" : route.path}`,
      es: `${SITE_URL}/es${route.path === "/" ? "" : route.path}`,
    } },
  })))
}
