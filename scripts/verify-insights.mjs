// Run after pnpm build. Each short-lived server is cleaned up in finally.
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { readFile } from "node:fs/promises"

const articles = JSON.parse(await readFile(new URL("../content/insights/articles.json", import.meta.url), "utf8"))
const origin = "http://127.0.0.1:3184"
const next = new URL("../node_modules/next/dist/bin/next", import.meta.url).pathname

async function verify(environment) {
  const server = spawn(process.execPath, [next, "start", "--hostname", "127.0.0.1", "--port", "3184"], {
    env: { ...process.env, NODE_ENV: "production", VERCEL_ENV: environment }, stdio: ["ignore", "pipe", "pipe"],
  })
  let logs = ""
  server.stdout.on("data", chunk => { logs += chunk })
  server.stderr.on("data", chunk => { logs += chunk })
  try {
    let ready = false
    for (let i = 0; i < 100; i++) {
      if (server.exitCode !== null) throw new Error(logs)
      try { if ((await fetch(`${origin}/en/insights`)).status === 200) { ready = true; break } } catch {}
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    assert.ok(ready, logs)
    const preview = environment === "preview"
    const index = await (await fetch(`${origin}/en/insights`)).text()
    const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text()
    assert.ok(sitemap.includes("https://getcaros.com/en/insights</loc>"))
    for (const article of articles) {
      assert.equal(index.includes(`/en/insights/${article.slug}`), preview && article.staged)
      assert.equal(sitemap.includes(`/en/insights/${article.slug}`), false)
      const response = await fetch(`${origin}/en/insights/${article.slug}`)
      assert.equal(response.status, preview && article.staged ? 200 : 404, `${environment}: ${article.slug}`)
      if (preview && article.staged) {
        const html = await response.text()
        assert.ok(html.includes('content="noindex, nofollow"'))
        assert.ok(html.includes(`href="https://getcaros.com/en/insights/${article.slug}"`))
        assert.ok(html.includes(article.image))
        assert.ok(html.includes("utm_source=getcaros"))
        assert.ok(html.includes("utm_medium=blog"))
        assert.ok(html.includes(`utm_campaign=phase1_${article.vertical.replaceAll("-", "_")}`))
        const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]))
        const schema = schemas.find(s => s["@type"] === "BlogPosting")
        assert.ok(schema)
        assert.equal(schema.headline, article.title)
        assert.equal("datePublished" in schema, false)
        assert.ok(html.includes(`<h2>`), "Article body renders as headings and prose")
        assert.ok(!html.includes("Meta title:"), "Publishing metadata isn't in the body")
        const image = await fetch(`${origin}${article.image}`)
        assert.equal(image.status, 200)
      }
    }
    assert.equal((await fetch(`${origin}/es/insights`)).status, 404)
    assert.equal((await fetch(`${origin}/es/insights/${articles[0].slug}`)).status, 404)
    if (!preview) assert.equal((await fetch(`${origin}/en/insights/${articles[0].slug}?preview=true`)).status, 404)
    const resources = await (await fetch(`${origin}/en/resources`)).text()
    assert.ok(resources.includes('href="/en/insights"'))
    assert.ok(!resources.includes('href="/en/en/insights"'))
    console.log(`${environment}: index, ${articles.length} article routes, images, metadata, schema, CTA UTMs, sitemap, locale and query-bypass checks passed`)
  } finally {
    server.kill("SIGTERM")
    await once(server, "exit")
  }
}

await verify("production")
await verify("preview")
