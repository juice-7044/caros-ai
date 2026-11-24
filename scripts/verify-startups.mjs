import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/Users/anns-macbook/.npm/_npx/e41f203b7505f1fb/node_modules/playwright",
);
const base = process.env.BASE_URL || "http://localhost:3101";
const out =
  process.env.EVIDENCE_DIR ||
  "/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/startups-evidence";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ reducedMotion: "reduce" });
const results = [];
try {
  for (const locale of ["en", "es"])
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const path = `/${locale}/industries/startups`;
      assert.equal((await page.goto(base + path)).status(), 200);
      await page.waitForTimeout(900);
      const banner = page.locator("[data-caros-consent]");
      if (await banner.isVisible()) {
        await page.screenshot({
          path: `${out}/consent-initial-${locale}-${width}.png`,
        });
        await banner.getByRole("button", { name: /Reject|Rechazar/i }).click();
      }
      for (const [key, n] of Object.entries({
        stages: 3,
        problems: 6,
        journey: 6,
        scenarios: 3,
        questions: 5,
        faq: 5,
      }))
        assert.equal(
          await page.locator(`[data-startup="${key}"] > *`).count(),
          n,
        );
      const seo = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        title: document.title,
        description: document.querySelector('meta[name="description"]').content,
        canonical: document.querySelector('link[rel="canonical"]').href,
        alternate: [...document.querySelectorAll("link[hreflang]")].map((e) => [
          e.hreflang,
          e.href,
        ]),
        og: [...document.querySelectorAll('meta[property^="og:"]')].map((e) => [
          e.getAttribute("property"),
          e.content,
        ]),
        twitter: [...document.querySelectorAll('meta[name^="twitter:"]')].map(
          (e) => [e.name, e.content],
        ),
        overflow: document.documentElement.scrollWidth > innerWidth,
        broken: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.src),
      }));
      assert.equal(seo.lang, locale);
      const og = Object.fromEntries(seo.og), twitter = Object.fromEntries(seo.twitter);
      assert.equal(og['og:title'], seo.title);
      assert.equal(twitter['twitter:title'], seo.title);
      assert.equal(og['og:description'], seo.description);
      assert.equal(twitter['twitter:description'], seo.description);
      assert.equal(og['og:locale'], locale === 'es' ? 'es_419' : 'en_US');
      assert.equal(seo.alternate.length, 3);
      const schema = await page.locator('main script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(n => JSON.parse(n.textContent)['@graph'] || []));
      const faq = schema.find(s => s['@type'] === 'FAQPage');
      assert.equal(faq.mainEntity.length, 5);
      const visibleFaq = await page.locator('[data-startup="faq"] details').allTextContents();
      faq.mainEntity.forEach((q,i) => {assert.ok(visibleFaq[i].includes(q.name)); assert.ok(visibleFaq[i].includes(q.acceptedAnswer.text));});
      assert.ok(schema.some(s=>s['@type']==='Service' && s.url==='https://getcaros.com'+path));
      assert.equal(seo.overflow, false);
      assert.deepEqual(seo.broken, []);
      assert.equal(seo.canonical, "https://getcaros.com" + path);
      assert.ok(
        seo.alternate.some(
          ([l, u]) =>
            l === "es" && u === "https://getcaros.com/es/industries/startups",
        ),
      );
      assert.ok(
        seo.og.some(
          ([k, v]) => k === "og:url" && v === "https://getcaros.com" + path,
        ),
      );
      assert.ok(
        seo.og.some(
          ([k, v]) => k === "og:image" && v.endsWith("/caros-logo.png"),
        ),
      );
      assert.ok(
        seo.twitter.some(
          ([k, v]) => k === "twitter:image" && v.endsWith("/caros-logo.png"),
        ),
      );
      const primary = page
        .locator("main section")
        .first()
        .locator('a[href="https://demo.getcaros.com"]');
      assert.equal(await primary.count(), 1);
      if(width === 390) assert.ok(await primary.evaluate(e => { const b=e.getBoundingClientRect();const hit=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return hit===e||e.contains(hit); }), 'hero primary CTA must not be covered by floating chat');
      const secondary = page
        .locator("main section")
        .first()
        .locator(`a[href="/${locale}/revenue-audit"]`);
      assert.equal(await secondary.count(), 1);
      if(width === 390) assert.ok(await secondary.evaluate(e => { const b=e.getBoundingClientRect();const hit=document.elementFromPoint(b.x+b.width/2,b.y+b.height/2);return hit===e||e.contains(hit); }), 'hero secondary CTA must not be covered by floating chat');
      for (const link of [primary, secondary]) {
        const box = await link.boundingBox();
        assert.ok(box.height >= 44);
        await link.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        assert.ok(
          await link.evaluate(
            (e) =>
              document.activeElement === e &&
              getComputedStyle(e).outlineStyle !== "none",
          ),
        );
      }
      for (const d of await page.locator("main details").all()) {
        await d.locator("summary").click();
        assert.ok((await d.getAttribute("open")) !== null);
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(250);
      await page.screenshot({
        path: `${out}/startups-${locale}-${width}-full.png`,
        fullPage: true,
      });
      results.push({ locale, width, seo });
    }
  const consent = page.locator("[data-caros-consent]");
  if (await consent.isVisible())
    await consent.getByRole("button", { name: /Reject|Rechazar/i }).click();
  const interactions = [];
  for (const locale of ["en", "es"]) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/${locale}`);
      await page.waitForTimeout(600);
      assert.ok(
        await page
          .locator("main")
          .getByText(
            locale === "en" ? "Startups & Founders" : "Startups y fundadores",
            { exact: true },
          )
          .count(),
      );
      if (width < 1024)
        await page.locator("header button[aria-expanded]").last().click();
      else
        await page
          .locator(`header nav a[href="/${locale}/industries"]`)
          .first()
          .hover();
      const nav = page
        .locator(`header a[href="/${locale}/industries/startups"]:visible`)
        .first();
      assert.ok((await nav.boundingBox()).height >= 44);
      await nav.click();
      await page.waitForURL(`**/${locale}/industries/startups`);
      await page.screenshot({
        path: `${out}/nav-arrival-${locale}-${width}.png`,
      });
      if (width < 1024) {
        await page.locator("header button[aria-expanded]").last().click();
        await page
          .locator(
            `header a[href="/${locale === "en" ? "es" : "en"}/industries/startups"]`,
          )
          .last()
          .click();
      } else {
        await page.locator('header button[aria-haspopup="listbox"]').click();
        await page
          .getByRole("option")
          .filter({ hasText: locale === "en" ? "Español" : "English" })
          .click();
      }
      await page.waitForURL(
        `**/${locale === "en" ? "es" : "en"}/industries/startups`,
      );
      interactions.push({
        locale,
        width,
        nav: true,
        languageSwitch: page.url(),
      });
    }
    await page.goto(`${base}/${locale}/industries`);
    const directory = page.locator(
      `main a[href="/${locale}/industries/startups"]`,
    );
    assert.equal(await directory.count(), 1);
    await directory.click();
    await page.waitForURL(`**/${locale}/industries/startups`);
  }
  const xml = await (await page.request.get(base + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  for (const locale of ["en", "es"])
    assert.equal(
      urls.filter(
        (u) => u === `https://getcaros.com/${locale}/industries/startups`,
      ).length,
      1,
    );
  const crawl = [];
  for (const url of urls) {
    const path = new URL(url).pathname;
    const response = await page.request.get(base + path);
    const html = await response.text();
    crawl.push({
      path,
      status: response.status(),
      canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
      title: html.match(/<title>(.*?)<\/title>/)?.[1],
      missingMessages: /MISSING_MESSAGE|INVALID_MESSAGE/.test(html),
    });
  }
  writeFileSync(`${out}/route-crawl.json`, JSON.stringify(crawl, null, 2));
  assert.equal(crawl.length, urls.length);
  assert.ok(crawl.every((r) => r.status === 200 && !r.missingMessages));
  writeFileSync(
    `${out}/interactions.json`,
    JSON.stringify(
      {
        interactions,
        sitemapCount: urls.length,
        sitemapUnique: new Set(urls).size,
      },
      null,
      2,
    ),
  );
  writeFileSync(`${out}/rendered.json`, JSON.stringify(results, null, 2));
  console.log(
    JSON.stringify({ screens: results.length, out, results }, null, 2),
  );
} finally {
  await browser.close();
}
