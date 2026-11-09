import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"
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
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl">{m.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{m.intro}</p>
          <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
            <p className="font-semibold text-foreground">{m.scene}</p>
            <p className="mt-2 text-muted-foreground">{m.process}</p>
          </div>
          <Image src={m.cover} alt={`Cover of ${m.formTitle.replace(/^Get the free /, "")}`} width={927} height={1200} priority
            className="mt-10 hidden w-64 rounded-xl border border-border shadow-lg lg:block" />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadMagnetForm magnet={m} locale={locale} thanksHref={`/${locale}/free/${m.slug}/thanks`} />
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>What&apos;s inside</Eyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">{m.insideTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {m.inside.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <Check className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Eyebrow>Show the math</Eyebrow>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Example data</p>
        <p className="mt-2 text-6xl font-black text-foreground">{m.mathFigure}</p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground">{m.mathLine}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">{m.mathNote}</p>
      </section>

      <section className="border-t border-border bg-ink text-ink-foreground">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-black tracking-tight">{m.closeTitle}</h2>
          <p className="mt-3 text-ink-foreground/80">{m.closeBody}</p>
          <a href="#lm-first" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold px-8 font-bold text-ink hover:opacity-90">Send me the guide</a>
        </div>
      </section>
    </main>
  )
}
