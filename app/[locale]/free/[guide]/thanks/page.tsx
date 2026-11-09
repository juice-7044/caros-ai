import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Download, CalendarCheck } from "lucide-react"
import { Eyebrow } from "@/components/caros/ui-bits"
import { BOOKING_URL } from "@/lib/site"
import { LEAD_MAGNETS, leadMagnet } from "@/lib/lead-magnets"

// After the lead-magnet sign-up (moved from GHL): the instant download and the Free Business Audit.
type Params = { params: Promise<{ guide: string; locale: string }> }

export function generateStaticParams() {
  return LEAD_MAGNETS.map((m) => ({ guide: m.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { guide } = await params
  const m = leadMagnet(guide)
  return m ? { title: m.thanksTitle, robots: { index: false, follow: false } } : {}
}

export default async function LeadMagnetThanks({ params }: Params) {
  const { guide } = await params
  const m = leadMagnet(guide)
  if (!m) notFound()
  const audit = `${BOOKING_URL}?utm_source=getcaros&utm_medium=lead_magnet&utm_campaign=leadmagnet_${m.key}`
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <Eyebrow>{m.thanksEyebrow}</Eyebrow>
        <h1 className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">{m.thanksTitle}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{m.thanksBody}</p>
        <a href={m.pdf} download className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-8 font-bold text-ink hover:opacity-90">
          <Download className="h-4 w-4" /> Download the PDF
        </a>
      </section>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Eyebrow>Your next step</Eyebrow>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{m.nextTitle}</h2>
          <p className="mt-4 max-w-2xl text-ink-foreground/85">{m.nextBody}</p>
          <p className="mt-3 max-w-2xl text-xs text-ink-foreground/60">{m.nextNote}</p>
          <a href={audit} className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-8 font-bold text-ink hover:opacity-90">
            <CalendarCheck className="h-4 w-4" /> Book the Free Business Audit
          </a>
        </div>
      </section>
    </main>
  )
}
