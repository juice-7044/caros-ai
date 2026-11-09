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
      <section className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-24">
        <Eyebrow>{m.thanksEyebrow}</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl">{m.thanksTitle}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{m.thanksBody}</p>
        <a href={m.pdf} download className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-8 font-bold text-ink hover:opacity-90">
          <Download className="h-4 w-4" /> Download the PDF
        </a>
      </section>
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Eyebrow>Your next step</Eyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground">{m.nextTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{m.nextBody}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{m.nextNote}</p>
          <a href={audit} className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-8 font-bold text-ink-foreground hover:opacity-90">
            <CalendarCheck className="h-4 w-4" /> Book the Free Business Audit
          </a>
        </div>
      </section>
    </main>
  )
}
