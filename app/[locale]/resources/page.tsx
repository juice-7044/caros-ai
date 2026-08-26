import type { Metadata } from "next"
import { ArrowRight, BookOpen, Calculator, Gauge, Sparkles } from "lucide-react"
import { Link } from "@/i18n/routing"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { AUDIT_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Free Resources | CAROS",
  description: "Free tools and insights to help you find more revenue, understand marketing ROI, and close gaps in your revenue process.",
}

const resources = [
  { title: "Insights", body: "Practical strategies and revenue insights for turning more leads into customers, improving follow-up, strengthening retention, and making smarter growth decisions.", cta: "Explore Insights", href: "https://free-revenue-insights.getcarosai.com", icon: BookOpen, external: true },
  { title: "Marketing ROI", body: "See beyond clicks and leads. Learn how to connect marketing spend to appointments, customers, booked revenue, and the channels actually producing results.", cta: "Explore Marketing ROI", href: "/marketing-roi", icon: Calculator },
  { title: "Free Revenue Diagnostic", body: "Get a quick diagnostic of your revenue process and uncover potential gaps between your marketing investment, incoming leads, follow-up, and booked revenue.", cta: "Get My Free Diagnostic", href: AUDIT_URL, icon: Gauge, external: true, gold: true },
  { title: "More Resources Are Coming", body: "New calculators, guides, templates, benchmarks, and revenue tools are being developed to help business owners make better decisions with their marketing and revenue data.", cta: "Coming Soon", href: "#", icon: Sparkles, soon: true },
]

export default function ResourcesPage() {
  return (
    <main>
      <PageHero eyebrow="Free resources" title="Free Resources to Help You Find More " serifTitle="Revenue" subtitle="Use our free tools and insights to understand where your leads are coming from, what your marketing investment is producing, where revenue may be leaking, and where your next opportunity may be hiding." />
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal><Eyebrow>Learn, measure, grow</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">Useful answers for the revenue questions that matter.</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {resources.map((resource, i) => { const Icon = resource.icon; const className = `group flex h-full flex-col border p-7 transition-all duration-300 ${resource.gold ? "border-gold bg-gold/5" : "border-border bg-card hover:border-gold"}`; const content = <><div className="flex items-start justify-between"><Icon className="size-7 text-gold" aria-hidden="true" />{resource.soon && <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold">Coming Soon</span>}</div><h3 className="mt-10 text-2xl font-bold tracking-tight">{resource.title}</h3><p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{resource.body}</p><span className={`mt-8 inline-flex items-center gap-2 font-semibold ${resource.gold ? "text-gold" : "text-foreground"}`}>{resource.cta}{!resource.soon && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}</span></>; return <Reveal key={resource.title} delay={i * 70}>{resource.soon ? <div className={className}>{content}</div> : resource.external ? <a className={className} href={resource.href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link className={className} href={resource.href}>{content}</Link>}</Reveal> })}
          </div>
        </div>
      </section>
    </main>
  )
}
