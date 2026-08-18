import type { MetadataRoute } from "next"
import { INDUSTRY_SLUGS } from "@/lib/industries"

const SITE_URL = "https://getcaros.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const industryRoutes = [
    ...INDUSTRY_SLUGS.map((slug) => ({
      path: `/industries/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/industries/law-firms", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/whats-included", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/marketing-roi", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
    ...industryRoutes,
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/diagnostic", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/revenue-audit", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
