import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Eyebrow } from "@/components/caros/ui-bits"
import { LeadMagnetForm } from "@/components/caros/lead-magnet-form"
import { LEAD_MAGNETS, leadMagnet } from "@/lib/lead-magnets"

// A CAROS lead magnet (lib/lead-magnets.ts), moved from GHL: the landing page with its sign-up form.
type Params = { params: Promise<{ guide: string; locale: string }> }

export function generateStaticParams() {
  return LEAD_MAGNETS.map((m) => ({ guide: m.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { guide, locale } = await params
  const m = leadMagnet(guide)
  if (!m) return {}
  const title = m.formTitle.replace(/^Get the free /, "")
  return {
    title: `${title} (free ${m.trade} guide)`,
    description: m.intro,
    alternates: { canonical: `https://getcaros.com/${locale}/free/${m.slug}` },
    openGraph: { title, description: m.intro, images: [{ url: m.cover }] },
  }
}

export default async function LeadMagnetPage({ params }: Params) {
  const { guide, locale } = await params
  const m = leadMagnet(guide)
  if (!m) notFound()
  return (
    <main className="bg-background">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">{m.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{m.intro}</p>
          <p className="mt-6 max-w-xl border-l-2 border-gold pl-4 text-muted-foreground">{m.scene}</p>
          <p className="mt-4 max-w-xl font-medium text-foreground">{m.process}</p>
        </div>
        <div className="lg:self-start">
          <LeadMagnetForm magnet={m} locale={locale} thanksHref={`/${locale}/free/${m.slug}/thanks`} />
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <Image src={m.cover} alt={`Cover of ${m.formTitle.replace(/^Get the free /, "")}`} width={927} height={1200}
            className="mx-auto w-full max-w-xs rounded-xl shadow-2xl" />
          <div>
            <Eyebrow>What&apos;s inside</Eyebrow>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{m.insideTitle}</h2>
            <dl className="mt-8 divide-y divide-white/10 border-t border-white/10">
              {m.inside.map((item) => (
                <div key={item.title} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-gold">{item.title}</dt>
                  <dd className="text-ink-foreground/85">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Show the math</Eyebrow>
          <p className="mt-4 inline-block rounded border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Example data</p>
          <p className="mt-3 font-display text-6xl tracking-tight text-foreground sm:text-7xl">{m.mathFigure}</p>
          <p className="mt-4 max-w-2xl text-foreground">{m.mathLine}</p>
          <p className="mt-4 max-w-3xl text-xs text-muted-foreground">{m.mathNote}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">{m.closeTitle}</h2>
        <p className="mt-3 text-muted-foreground">{m.closeBody}</p>
        <a href="#lm-first" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 font-bold text-ink hover:opacity-90">Send me the guide</a>
      </section>
    </main>
  )
}
