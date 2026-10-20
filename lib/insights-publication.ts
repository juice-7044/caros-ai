/** Fail closed: only an explicit hosting preview or local dev can show drafts. */
export function isInsightsPreview(env = process.env): boolean {
  return env.VERCEL_ENV === "preview" ||
    (env.NODE_ENV === "development" && !env.VERCEL_ENV)
}

export type Publication = {
  datePublished: string | null
  visualApproved: boolean
}

/** Dates must include a timezone so the calendar has one unambiguous instant. */
export function isArticlePublished(article: Publication, now = new Date()): boolean {
  if (!article.visualApproved || !article.datePublished) return false
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(article.datePublished)) return false
  const calendarDay = new Date(`${article.datePublished.slice(0, 10)}T00:00:00Z`)
  if (!Number.isFinite(calendarDay.getTime()) || calendarDay.toISOString().slice(0, 10) !== article.datePublished.slice(0, 10)) return false
  const timestamp = Date.parse(article.datePublished)
  return Number.isFinite(timestamp) && timestamp <= now.getTime()
}

export function isArticleVisible(article: Publication, preview: boolean, now = new Date()): boolean {
  return preview || isArticlePublished(article, now)
}
