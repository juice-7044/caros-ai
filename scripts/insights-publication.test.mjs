import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { isArticlePublished, isArticleVisible, isInsightsPreview } from "../lib/insights-publication.ts"

const now = new Date("2026-10-20T13:00:00Z")
const approved = { datePublished: "2026-10-20T09:00:00-04:00", visualApproved: true }

test("publication opens exactly at the timezone-qualified instant", () => {
  assert.equal(isArticlePublished(approved, new Date(now.getTime() - 1)), false)
  assert.equal(isArticlePublished(approved, now), true)
  assert.equal(isArticleVisible(approved, false, now), true)
})

test("unset, future, invalid and unapproved content stays private in production", () => {
  for (const datePublished of [null, "", "invalid", "2026-10-20", "2026-10-20T13:00:00", "2026-02-30T00:00:00Z", "2026-13-01T00:00:00Z", "2026-10-20T13:00:01Z"]) {
    const article = { datePublished, visualApproved: true }
    assert.equal(isArticlePublished(article, now), false, String(datePublished))
    assert.equal(isArticleVisible(article, false, now), false)
    assert.equal(isArticleVisible(article, true, now), true)
  }
  assert.equal(isArticlePublished({ ...approved, visualApproved: false }, now), false)
})

test("production cannot inherit the local development preview exception", () => {
  assert.equal(isInsightsPreview({ NODE_ENV: "production", VERCEL_ENV: "production" }), false)
  assert.equal(isInsightsPreview({ NODE_ENV: "production" }), false)
  assert.equal(isInsightsPreview({ NODE_ENV: "development", VERCEL_ENV: "production" }), false)
  assert.equal(isInsightsPreview({ NODE_ENV: "production", VERCEL_ENV: "preview" }), true)
  assert.equal(isInsightsPreview({ NODE_ENV: "development" }), true)
})

test("all twelve approved manuscripts retain exact source bytes and SEO fields", async () => {
  const articles = JSON.parse(await readFile(new URL("../content/insights/articles.json", import.meta.url), "utf8"))
  assert.equal(articles.length, 12)
  assert.equal(new Set(articles.map(a => a.slug)).size, 12)
  for (const vertical of ["roofing", "real-estate", "hvac", "plumbing"]) assert.equal(articles.filter(a => a.vertical === vertical).length, 3)
  for (const article of articles) {
    const source = await readFile(new URL(`../content/insights/${article.slug}.md`, import.meta.url))
    assert.equal(createHash("sha256").update(source).digest("hex"), article.sourceSha256)
    for (const key of ["title", "metaTitle", "description", "keyword", "imageAlt", "calculatorUrl"]) assert.ok(article[key], `${article.slug}: ${key}`)
    assert.equal(article.datePublished, null, "JMG-136 must set the actual launch dates")
    if (article.staged) {
      const image = await readFile(new URL(`../public${article.image}`, import.meta.url))
      assert.equal(createHash("sha256").update(image).digest("hex"), article.imageSha256)
      assert.equal(image.readUInt32BE(16), article.imageWidth)
      assert.equal(image.readUInt32BE(20), article.imageHeight)
    }
  }
})
