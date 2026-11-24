import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Rocket, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/caros/ui-bits";
import { Reveal } from "@/components/caros/reveal";
import { CtaBand } from "@/components/caros/cta-band";
import { DEMO_URL } from "@/lib/home-nav";
import { AUDIT_HREF } from "@/lib/site";
import { positioningSocialMetadata } from "@/lib/positioning-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Startups" });
  const title = t("metaTitle"),
    description = t("metaDescription");
  const social = positioningSocialMetadata(
    description,
    locale,
    `${title} | CAROS`,
  );
  return {
    title,
    description,
    ...social,
    alternates: {
      canonical: `/${locale}/industries/startups`,
      languages: {
        en: "/en/industries/startups",
        es: "/es/industries/startups",
        "x-default": "/en/industries/startups",
      },
    },
    openGraph: {
      ...social.openGraph,
      url: `https://getcaros.com/${locale}/industries/startups`,
    },
  };
}

type Card = { title: string; body: string; line?: string };
export default async function StartupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Startups" });
  const stages = t.raw("stages") as Card[],
    problems = t.raw("problems") as Card[],
    journey = t.raw("journey") as Card[],
    scenarios = t.raw("scenarios") as Card[],
    faq = t.raw("faq") as Card[];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.title,
          acceptedAnswer: { "@type": "Answer", text: f.body },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [t("home"), t("industries"), t("audience")].map(
          (name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            item: `https://getcaros.com/${locale}${["", "/industries", "/industries/startups"][i]}`,
          }),
        ),
      },
      {
        "@type": "Service",
        name: t("metaTitle"),
        description: t("metaDescription"),
        url: `https://getcaros.com/${locale}/industries/startups`,
        provider: {
          "@type": "Organization",
          name: "CAROS",
          url: "https://getcaros.com",
        },
      },
    ],
  };
  const ctas = (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-gold-foreground hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {t("demo")}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
      <Link
        href={AUDIT_HREF}
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-current px-7 py-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {t("review")}
      </Link>
    </div>
  );
  return (
    <>
      {/* Trusted catalog data only, escaped to prevent closing a script element. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero-gradient pb-20 pt-24 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>
              <Rocket className="h-4 w-4" aria-hidden="true" />
              {t("audience")}
            </Eyebrow>
            <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(2rem,5.5vw,4.75rem)] leading-[1.02] tracking-tight">
              {t("heroTitle")}{" "}
              <span className="font-serif font-normal italic text-gold-gradient">
                {t("heroAccent")}
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-normal lg:text-lg lg:leading-relaxed text-muted-foreground">
              {t("heroBody")}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(t.raw("tags") as string[]).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-4 py-2 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {ctas}
          </Reveal>
        </div>
      </section>
      <Section title={t("stagesTitle")}>
        <div data-startup="stages" className="grid gap-6 md:grid-cols-3">
          {stages.map((card) => (
            <Reveal
              key={card.title}
              className="rounded-2xl border border-border p-7"
            >
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="mt-4 font-serif text-2xl italic">{card.line}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section title={t("problemsTitle")} dark>
        <div data-startup="problems" className="grid gap-x-12 md:grid-cols-2">
          {problems.map((card) => (
            <Reveal
              key={card.title}
              className="border-t border-ink-border py-7"
            >
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section title={t("journeyTitle")}>
        <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground">
          {t("journeyNote")}
        </p>
        <ol
          data-startup="journey"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {journey.map((card, i) => (
            <li key={card.title} className="border-l-2 border-gold pl-5">
              <span className="font-mono text-sm text-gold">
                {String(i + 1).padStart(2, "0")} →
              </span>
              <h3 className="mt-2 text-lg font-bold">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title={t("scenariosTitle")} dark>
        <p className="mb-8 max-w-3xl text-ink-muted">{t("scenarioNote")}</p>
        <div data-startup="scenarios" className="grid gap-8 md:grid-cols-3">
          {scenarios.map((card) => (
            <Reveal key={card.title} className="border-t border-gold/50 pt-6">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">{card.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 max-w-3xl font-serif text-3xl italic text-gold">
          {t("scenarioEnd")}
        </p>
      </Section>
      <Section title={t("reportingTitle")}>
        <ul data-startup="questions" className="space-y-4">
          {(t.raw("questions") as string[]).map((q) => (
            <li
              key={q}
              className="flex gap-3 border-b border-border pb-4 text-lg font-semibold"
            >
              <ArrowRight
                className="mt-1 h-5 w-5 shrink-0 text-gold"
                aria-hidden="true"
              />
              {q}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-muted-foreground">
          {t("reportingNote")}
        </p>
      </Section>
      <Section title={t("faqTitle")}>
        <div data-startup="faq" className="max-w-4xl">
          {faq.map((f) => (
            <details key={f.title} className="border-b border-border py-5">
              <summary className="min-h-11 cursor-pointer py-2 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-gold">
                {f.title}
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand
        headline={t("closingTitle")}
        sub={t("closingBody")}
        ctaLabel={t("demo")}
        ctaHref={DEMO_URL}
        ctaExternal
      >
        <Link
          href={AUDIT_HREF}
          className="mt-5 inline-flex min-h-14 items-center justify-center rounded-full border border-ink-foreground/30 px-7 py-4 font-semibold focus-visible:outline-2 focus-visible:outline-gold"
        >
          {t("review")}
        </Link>
      </CtaBand>
    </>
  );
}
function Section({
  title,
  dark = false,
  children,
}: {
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`py-20 lg:py-28 ${dark ? "bg-ink text-ink-foreground" : "bg-background"}`}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal>
          <h2 className="mb-10 max-w-4xl text-balance font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-tight">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
