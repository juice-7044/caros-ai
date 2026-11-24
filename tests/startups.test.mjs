import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
for (const locale of ["en", "es"])
  test(`${locale}: complete founder content, bounded claims and localized entry points`, () => {
    const catalog = JSON.parse(read(`messages/${locale}.json`));
    const c = catalog.Startups;
    assert.ok(c, "startup catalog missing");
    for (const [key, n] of Object.entries({
      stages: 3,
      problems: 6,
      journey: 6,
      scenarios: 3,
      questions: 5,
      faq: 5,
      tags: 5,
    }))
      assert.equal(c[key].length, n, key);
    const text = JSON.stringify(c);
    assert.doesNotMatch(
      text,
      /—|booked jobs|technicians|average job value|\$|\d+%|SOC 2|HIPAA|guaranteed/i,
    );
    assert.match(
      c.scenarioNote,
      locale === "en" ? /[Ii]llustrative/ : /[Ii]lustrativos/,
    );
    assert.match(
      c.reportingNote,
      locale === "en" ? /attribution/ : /atribución/,
    );
    if (locale === "en") {
      assert.equal(
        `${c.heroTitle} ${c.heroAccent}`,
        "Build Your Startup. Keep Your Revenue Operations Moving.",
      );
      assert.equal(
        c.scenarioEnd,
        "What if you had CAROS? You’d already be able to do this and more, for one flat monthly fee.",
      );
    }
    for (const p of ["shared", "industry-ui", "home-general"])
      assert.equal(
        JSON.parse(read(`messages/full/${p}.es.json`))["Startups & Founders"],
        "Startups y fundadores",
      );
    assert.match(
      catalog.pages.industries.subtitle,
      locale === "en"
        ? /early-stage startups.*established businesses/
        : /startups.*empresas establecidas/,
    );
  });
test("homepage audience registry and metadata preserve startup locale and destinations", () => {
  assert.match(
    read("components/caros/site-nav.tsx"),
    /ind.href === "\/industries\/startups" && "min-h-11/,
  );
  assert.match(read("lib/site.ts"), /"Startups & Founders"/);
  assert.match(read("app/[locale]/page.tsx"), /<Industries/);
  const page = read("app/[locale]/industries/startups/page.tsx");
  assert.match(page, /canonical: `\/\$\{locale\}\/industries\/startups`/);
  assert.match(
    page,
    /url: `https:\/\/getcaros.com\/\$\{locale\}\/industries\/startups`/,
  );
  assert.match(page, /href=\{DEMO_URL\}/);
  assert.match(page, /href=\{AUDIT_HREF\}/);
});
test("dedicated startups route is registered independently of trade calculators", () => {
  assert.ok(
    existsSync(
      new URL("../app/[locale]/industries/startups/page.tsx", import.meta.url),
    ),
    "dedicated startup route missing",
  );
  assert.match(
    read("lib/industries.ts"),
    /name: "Startups & Founders", href: "\/industries\/startups"/,
  );
  assert.equal(
    (read("app/sitemap.ts").match(/path: "\/industries\/startups"/g) || [])
      .length,
    1,
  );
});
