import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { INSIGHTS_ORIGIN, INSIGHTS_PATH, verticals, visibleInsights, type InsightVertical } from "@/lib/insights"
import { isArticlePublished, isInsightsPreview } from "@/lib/insights-publication"

// Evaluate the calendar at request time, including after a future date passes.
export const dynamic = "force-dynamic"

export function generateMetadata(): Metadata {
  const preview = isInsightsPreview()
  return {
    title: "Insights",
    description: "Practical guides to answer more leads, follow up on estimates, and build repeat revenue for your service business.",
    alternates: { canonical: `${INSIGHTS_ORIGIN}${INSIGHTS_PATH}` },
    openGraph: { title: "CAROS Insights", url: `${INSIGHTS_ORIGIN}${INSIGHTS_PATH}` },
    ...(preview ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
  }
}

export default function InsightsPage() {
  const preview = isInsightsPreview()
  const articles = visibleInsights(preview)
  return (
    <>
      <header className="insights-hero">
        <div className="insights-container">
          <p className="insights-eyebrow">Revenue first</p>
          <h1>Insights for the work<br />behind the revenue.</h1>
          <p>Answer the lead. Follow up on the estimate. Give your next customer a reason to come back.</p>
          <nav aria-label="Browse insights by industry" className="insights-topics">
            {Object.entries(verticals).map(([key, vertical]) => <a key={key} href={`#${key}`}>{vertical.label}</a>)}
          </nav>
        </div>
      </header>
      <div className="insights-container insights-index">
        {preview && <p className="insights-preview" role="status">Editorial preview. Unscheduled articles stay off the public site.</p>}
        {Object.entries(verticals).map(([key, vertical]) => {
          const group = articles.filter(article => article.vertical === key)
          return (
            <section id={key} key={key} className="insights-group" aria-labelledby={`${key}-title`}>
              <div className="insights-section-heading"><p className="insights-eyebrow">{vertical.label}</p><h2 id={`${key}-title`}>{vertical.heading}</h2></div>
              {group.length ? <div className="insights-grid">
                {group.map(article => <article className="insights-card" key={article.slug}>
                  <Link href={`${INSIGHTS_PATH}/${article.slug}`} className="insights-card-link">
                    <Image src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
                    <div className="insights-card-body">
                      <div className="insights-card-meta"><span>{verticals[article.vertical as InsightVertical].label}</span>{article.datePublished ? <time dateTime={article.datePublished}>{new Date(article.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" })}</time> : <span>Not yet published</span>}</div>
                      {preview && !isArticlePublished(article) && <p className="insights-draft">{article.visualApproved ? "Draft · date pending" : "Draft · visual approval pending"}</p>}
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <span className="insights-read">Read article <span aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                </article>)}
              </div> : <p className="insights-empty">New {vertical.label.toLowerCase()} insights are on the way.</p>}
            </section>
          )
        })}
      </div>
    </>
  )
}
