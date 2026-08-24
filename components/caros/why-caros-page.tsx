"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Bot, Check, CircleDollarSign, Headphones, Megaphone, Users, X } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow, PageHero } from "@/components/caros/ui-bits"
import { AuditButton } from "@/components/caros/ui-bits"

const categories = [
  { icon: Megaphone, name: "Marketing", items: ["Google Ads, Meta Ads, SEO, referrals", "Attribution that ties spend to revenue", "Campaigns built around your real offer"] },
  { icon: Headphones, name: "Human Answering", items: ["Human and AI work together to ensure you don't miss a call", "Qualified callers reach the right team", "After-hours coverage without voicemail"] },
  { icon: Bot, name: "Automation", items: ["Instant SMS and email follow-up", "Missed-call text back", "Review requests and nurture sequences"] },
  { icon: BarChart3, name: "CRM", items: ["One record for every lead and customer", "Pipeline visibility from call to close", "No more scattered spreadsheets"] },
  { icon: Users, name: "Retention", items: ["Reactivation for past customers", "Recurring service reminders", "Referral moments that feel natural"] },
  { icon: CircleDollarSign, name: "Revenue Attribution", items: ["See what produces booked jobs", "Know your cost per opportunity", "Make the next dollar smarter"] },
]

const verticals = ["Roofing", "HVAC", "Plumbing", "Electrical", "Cleaning", "Landscaping", "Medical Practices", "Wellness Spas", "Insurance Brokerage", "Law Firms"]

export function WhyCarosPage() {
  const [vertical, setVertical] = useState("Roofing")
  return (
    <main>
      <PageHero eyebrow="WHY CAROS" title="The system behind" serifTitle="the revenue." subtitle="Most businesses do not have a lead problem. They have a connection problem. CAROS connects the six systems that turn attention into revenue." />

      <section className="bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal><Eyebrow>THE STACK</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">Six systems.<br /><span className="font-serif font-normal italic text-gold">One operating rhythm.</span></h2></Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ icon: Icon, name, items }, i) => <Reveal key={name} delay={i * 50} className="bg-ink p-7 lg:p-9"><Icon className="size-6 text-gold" /><h3 className="mt-8 text-xl font-bold">{name}</h3><ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-ink-foreground/65">{items.map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}</ul></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><Reveal><Eyebrow>THE REAL COST</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">You are already paying<br /><span className="font-serif font-normal italic text-gold">for the stack.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">The question is whether the pieces work together — or quietly work against each other.</p></Reveal><div className="mt-14 grid gap-6 md:grid-cols-2"><div className="border border-border p-7 lg:p-10"><div className="flex items-center gap-3 text-muted-foreground"><X className="size-5" />The disconnected stack</div><div className="mt-8 flex flex-col gap-4">{["Ads with no attribution", "Voicemail after hours", "A CRM nobody updates", "Leads that never get followed up", "Customers who disappear after one job"].map(x => <div key={x} className="flex items-center gap-3 text-muted-foreground"><X className="size-4 text-destructive" />{x}</div>)}</div></div><div className="border-2 border-gold bg-ink p-7 text-ink-foreground lg:p-10"><div className="flex items-center gap-3 text-gold"><Check className="size-5" />The CAROS system</div><div className="mt-8 flex flex-col gap-4">{["Every dollar tied to revenue", "Human and AI work together so you don't miss a call", "One connected customer record", "Every opportunity gets a next step", "A revenue loop that compounds"].map(x => <div key={x} className="flex items-center gap-3"><Check className="size-4 text-gold" />{x}</div>)}</div></div></div></div></section>

      <section className="bg-muted/40 py-24 lg:py-32"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><Reveal><Eyebrow>BUILT FOR THE WORK</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">Different vertical.<br /><span className="font-serif font-normal italic text-gold">Same revenue loop.</span></h2></Reveal><Reveal delay={100}><p className="max-w-xl text-lg leading-relaxed text-muted-foreground">The playbook changes by industry. The operating principle does not: capture demand, respond quickly, deliver well, and make it easy to come back.</p></Reveal></div><div className="mt-14 flex flex-wrap gap-2">{verticals.map(item => <button type="button" key={item} onClick={() => setVertical(item)} className={`border px-4 py-2 text-sm transition-colors ${vertical === item ? "border-gold bg-ink text-ink-foreground" : "border-border bg-background text-muted-foreground hover:border-gold"}`}>{item}</button>)}</div><div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-4">{["Demand", "Response", "Delivery", "Return"] .map((label, i) => <div key={label}><span className="font-mono text-xs uppercase tracking-[.18em] text-gold">0{i + 1}</span><h3 className="mt-4 text-xl font-bold">{label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{["Turn intent into a qualified opportunity.", "Make speed and trust part of the experience.", "Keep the handoff visible and accountable.", "Build the next job into the last one."][i]}</p></div>)}</div><p className="mt-10 text-sm text-muted-foreground">Showing the CAROS loop for <span className="font-semibold text-foreground">{vertical}</span>.</p></div></section>

      <section className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-[900px] px-6 text-center lg:px-12"><Reveal><Eyebrow>THE REVENUE LOOP</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">Every step makes<br /><span className="font-serif font-normal italic text-gold">the next one easier.</span></h2><p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Better response creates better experiences. Better experiences create reviews, referrals, and repeat work. That is how a system becomes an asset.</p><div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">{["Attention", "Trust", "Revenue", "Retention", "Referrals"].map((x, i) => <span key={x} className="flex items-center gap-3">{i > 0 && <ArrowRight className="size-4 text-gold" />}<span className="border border-border px-4 py-3">{x}</span></span>)}</div></Reveal></div></section>

      <section className="bg-ink py-24 text-ink-foreground lg:py-32"><div className="mx-auto max-w-[900px] px-6 lg:px-12"><Reveal><Eyebrow>READY WHEN YOU ARE</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-tight">Stop managing<br /><span className="font-serif font-normal italic text-gold">pieces.</span> Start running revenue.</h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/70">See where your growth is coming from, where it is leaking, and what to do next.</p><div className="mt-10 flex flex-wrap gap-4"><AuditButton /><Link href="/contact" className="inline-flex items-center gap-2 border border-ink-foreground/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">Talk to our team <ArrowRight className="size-4" /></Link></div></Reveal></div></section>
    </main>
  )
}

export default WhyCarosPage
