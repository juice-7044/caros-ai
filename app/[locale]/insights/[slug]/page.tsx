import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { articleBody, findInsight, insightSchema, INSIGHTS_ORIGIN, INSIGHTS_PATH, leadMagnetUrl, verticals, type InsightVertical } from "@/lib/insights"
import { isArticlePublished, isInsightsPreview } from "@/lib/insights-publication"

export const dynamic = "force-dynamic"
type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const article = locale === "en" ? findInsight(slug) : undefined
  if (!article) notFound()
  const canonical = `${INSIGHTS_ORIGIN}${INSIGHTS_PATH}/${article.slug}`
  return {
    title: { absolute: article.metaTitle.endsWith("| CAROS") ? article.metaTitle : `${article.metaTitle} | CAROS` },
    description: article.description,
    keywords: [article.keyword],
    alternates: { canonical },
    openGraph: {
      type: "article", title: article.title, description: article.description, url: canonical,
      ...(article.datePublished ? { publishedTime: article.datePublished } : {}),
      images: [{ url: article.image, width: article.imageWidth, height: article.imageHeight, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
    ...(isInsightsPreview() ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
  }
}

export default async function InsightPage({ params }: Props) {
  const { locale, slug } = await params
  const article = locale === "en" ? findInsight(slug) : undefined
  if (!article) notFound()
  const body = await articleBody(article)
  const vertical = verticals[article.vertical as InsightVertical]
  return (
    <article>
      <header className="insights-article-header insights-container">
        <Link href={INSIGHTS_PATH} className="insights-back">← All insights</Link>
        {isInsightsPreview() && !isArticlePublished(article) && <p className="insights-preview">Editorial preview · {article.visualApproved ? "publication date pending" : "visual approval pending"}</p>}
        <p className="insights-eyebrow">{vertical.label} · CAROS Insights</p>
        <h1>{article.title}</h1>
        <p className="insights-deck">{article.excerpt}</p>
        <p className="insights-byline">By CAROS <span aria-hidden="true">·</span> {article.datePublished ? <time dateTime={article.datePublished}>{new Date(article.datePublished).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" })}</time> : "Not yet published"}</p>
      </header>
      <figure className="insights-container insights-featured">
        <Image src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} priority sizes="(min-width: 1200px) 1120px, 100vw" />
        <figcaption>{article.imageCaption}</figcaption>
      </figure>
      <div className="insights-article-body">
        <Markdown remarkPlugins={[remarkGfm]} skipHtml components={{
          a: ({ href, children }) => <a href={href?.startsWith(`${INSIGHTS_ORIGIN}/`) ? href.slice(INSIGHTS_ORIGIN.length) : href}>{children}</a>,
          table: ({ children }) => <div className="insights-table-scroll" tabIndex={0} role="region" aria-label="Article table"><table>{children}</table></div>,
        }}>{body}</Markdown>
        <aside className="insights-related" aria-label="Related resources">
          <h2>Put the process to work.</h2>
          <p>Explore <Link href={vertical.industry}>CAROS for {vertical.label}</Link> and use the <a href={article.calculatorUrl}>{article.calculatorLabel}</a> with your own numbers.</p>
        </aside>
      </div>
      <section className="insights-guide">
        <div className="insights-container">
          <p className="insights-eyebrow">Your next step</p>
          <h2>{vertical.guide}</h2>
          <p>{article.ctaDescription}</p>
          <a className="insights-button" href={leadMagnetUrl(article.vertical as InsightVertical)}>Get the free guide <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(insightSchema(article)).replace(/</g, "\\u003c") }} />
    </article>
  )
}
