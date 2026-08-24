"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CircleDollarSign,
  Headphones,
  Megaphone,
  MessageSquareText,
  Network,
  Users,
  X,
} from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { AuditButton, Eyebrow, PageHero } from "@/components/caros/ui-bits"

const stackLayers = [
  { icon: Megaphone, label: "Marketing", detail: "Ads, SEO, referrals" },
  { icon: Headphones, label: "Answering", detail: "Human + AI response" },
  { icon: MessageSquareText, label: "Follow-up", detail: "SMS, email, nurture" },
  { icon: BarChart3, label: "CRM", detail: "Pipeline + customer record" },
  { icon: Users, label: "Retention", detail: "Reviews, referrals, repeat work" },
  { icon: CircleDollarSign, label: "Attribution", detail: "Spend connected to revenue" },
]

const categories = [
  { icon: Megaphone, name: "Marketing", items: ["Google Ads, Meta Ads, SEO, referrals", "Campaigns built around your real offer", "Spend connected to the calls it creates"] },
  { icon: Headphones, name: "Human + AI Answering", items: ["Human and AI work together so you don't miss a call", "Qualified callers reach the right team", "After-hours coverage without voicemail"] },
  { icon: Bot, name: "Automation", items: ["Instant SMS and email follow-up", "Missed-call text back", "Review requests and nurture sequences"] },
  { icon: BarChart3, name: "CRM", items: ["One record for every lead and customer", "Pipeline visibility from call to close", "No more scattered spreadsheets"] },
  { icon: Users, name: "Retention", items: ["Reactivation for past customers", "Recurring service reminders", "Referral moments that feel natural"] },
  { icon: CircleDollarSign, name: "Revenue Attribution", items: ["See what produces booked jobs", "Know your cost per opportunity", "Make the next dollar smarter"] },
]

const verticals = ["Roofing", "HVAC", "Plumbing", "Electrical", "Cleaning", "Landscaping", "Medical Practices", "Wellness Spas", "Insurance Brokerage", "Law Firms"]
const loop = [
  ["Demand", "Turn intent into a qualified opportunity."],
  ["Response", "Make speed and trust part of the experience."],
  ["Delivery", "Keep the handoff visible and accountable."],
  ["Return", "Build the next job into the last one."],
]

function StackDiagram() {
  return (
    <div className="relative mx-auto flex w-full max-w-[760px] flex-col items-center gap-3">
      <div className="grid w-full gap-3 sm:grid-cols-3">
        {stackLayers.map(({ icon: Icon, label, detail }, i) => (
          <Reveal key={label} delay={i * 60} className="border border-border bg-background p-5">
            <Icon className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-5 font-semibold">{label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </Reveal>
        ))}
      </div>
      <ArrowDown className="size-5 text-gold" aria-hidden="true" />
      <div className="w-full border-2 border-gold bg-ink px-6 py-8 text-center text-ink-foreground shadow-[10px_10px_0_hsl(var(--gold)/.2)] sm:px-10">
        <Network className="mx-auto size-7 text-gold" aria-hidden="true" />
        <p className="mt-4 text-2xl font-bold tracking-tight">CAROS</p>
        <p className="mt-2 text-sm text-ink-foreground/65">One operating system for the whole revenue journey.</p>
      </div>
    </div>
  )
}

export function WhyCarosPage() {
  const [vertical, setVertical] = useState("Roofing")

  return (
    <main>
      <PageHero
        eyebrow="WHY CAROS"
        title="Your growth is buried in"
        serifTitle="the gaps."
        subtitle="Software, vendors, people, and manual processes are all trying to move revenue forward. CAROS connects them into one operating system."
      />

      <section className="bg-background px-6 pb-24 lg:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal><Eyebrow>THE PROBLEM</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">More tools did not create<br /><span className="font-serif font-normal italic text-gold">more control.</span></h2></Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {["Marketing lives in one dashboard.", "Leads live in another.", "Revenue lives in a spreadsheet."].map((text, i) => <Reveal key={text} delay={i * 80} className="border border-border p-6 lg:p-8"><span className="font-mono text-xs uppercase tracking-[.18em] text-gold">0{i + 1}</span><p className="mt-10 max-w-xs text-xl font-semibold leading-snug">{text}</p></Reveal>)}
          </div>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">The result is not a lack of effort. It is a revenue journey full of handoffs, blind spots, and quiet leaks.</p>
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><Reveal><Eyebrow>THE FRAGMENTED STACK</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Six categories of work.<br /><span className="font-serif font-normal italic text-gold">One connected system.</span></h2></Reveal><div className="mt-14"><StackDiagram /></div></div></section>

      <section className="bg-ink py-24 text-ink-foreground lg:py-28"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><Reveal><Eyebrow>THE CAROS STACK</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">Not another tool.<br /><span className="font-serif font-normal italic text-gold">The connective tissue.</span></h2></Reveal><div className="mt-14 grid gap-px overflow-hidden bg-ink-foreground/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(({ icon: Icon, name, items }, i) => <Reveal key={name} delay={i * 50} className="bg-ink p-7 lg:p-9"><Icon className="size-6 text-gold" aria-hidden="true" /><h3 className="mt-8 text-xl font-bold">{name}</h3><ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-ink-foreground/65">{items.map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{item}</li>)}</ul></Reveal>)}</div></div></section>

      <section className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><Reveal><Eyebrow>THE REAL COST</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">You are already paying<br /><span className="font-serif font-normal italic text-gold">for the pieces.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">The cost is not only the monthly software bill. It is the labor, leakage, and lost context required to make disconnected systems behave like one.</p></Reveal><div className="mt-14 grid gap-6 md:grid-cols-2"><div className="border border-border p-7 lg:p-10"><div className="flex items-center gap-3 text-muted-foreground"><X className="size-5" aria-hidden="true" />The fragmented cost</div><div className="mt-8 flex flex-col gap-4">{["Multiple software subscriptions", "Agency and vendor handoffs", "Manual follow-up and data entry", "Missed calls and unworked leads", "Revenue that cannot be traced back to spend"].map(x => <div key={x} className="flex items-center gap-3 text-muted-foreground"><X className="size-4 text-destructive" aria-hidden="true" />{x}</div>)}</div></div><div className="border-2 border-gold bg-ink p-7 text-ink-foreground lg:p-10"><div className="flex items-center gap-3 text-gold"><Check className="size-5" aria-hidden="true" />The operating-system cost</div><div className="mt-8 flex flex-col gap-4">{["One connected revenue journey", "Human and AI work together so you don't miss a call", "Every lead has a visible next step", "Every dollar can be tied to an outcome", "One system your team can actually run"].map(x => <div key={x} className="flex items-center gap-3"><Check className="size-4 text-gold" aria-hidden="true" />{x}</div>)}</div></div></div></div></section>

      <section className="bg-muted/40 py-24 lg:py-32"><div className="mx-auto max-w-[1200px] px-6 lg:px-12"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><Reveal><Eyebrow>BUILT FOR THE WORK</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">Different vertical.<br /><span className="font-serif font-normal italic text-gold">Same revenue loop.</span></h2></Reveal><Reveal delay={100}><p className="max-w-xl text-lg leading-relaxed text-muted-foreground">The playbook changes by industry. The operating principle does not: capture demand, respond quickly, deliver well, and make it easy to come back.</p></Reveal></div><div className="mt-14 flex flex-wrap gap-2">{verticals.map(item => <button type="button" key={item} onClick={() => setVertical(item)} className={`border px-4 py-2 text-sm transition-colors ${vertical === item ? "border-gold bg-ink text-ink-foreground" : "border-border bg-background text-muted-foreground hover:border-gold"}`}>{item}</button>)}</div><div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-4">{loop.map(([label, detail], i) => <div key={label}><span className="font-mono text-xs uppercase tracking-[.18em] text-gold">0{i + 1}</span><h3 className="mt-4 text-xl font-bold">{label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail}</p></div>)}</div><p className="mt-10 text-sm text-muted-foreground">Showing the CAROS loop for <span className="font-semibold text-foreground">{vertical}</span>.</p></div></section>

      <section className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-[900px] px-6 text-center lg:px-12"><Reveal><Eyebrow>THE REVENUE LOOP</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-tight">The system gets stronger<br /><span className="font-serif font-normal italic text-gold">every time it runs.</span></h2><p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Better response creates better experiences. Better experiences create reviews, referrals, and repeat work. That is how disconnected activity becomes a compounding asset.</p><div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">{["Attention", "Trust", "Revenue", "Retention", "Referrals"].map((x, i) => <span key={x} className="flex items-center gap-3">{i > 0 && <ArrowRight className="size-4 text-gold" aria-hidden="true" />}<span className="border border-border px-4 py-3">{x}</span></span>)}</div></Reveal></div></section>

      <section className="bg-ink py-24 text-ink-foreground lg:py-32"><div className="mx-auto max-w-[900px] px-6 lg:px-12"><Reveal><Eyebrow>READY WHEN YOU ARE</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-tight">Stop managing<br /><span className="font-serif font-normal italic text-gold">pieces.</span> Start running revenue.</h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/70">See where your growth is coming from, where it is leaking, and what to connect next.</p><div className="mt-10 flex flex-wrap gap-4"><AuditButton /><Link href="/contact" className="inline-flex items-center gap-2 border border-ink-foreground/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-gold hover:text-gold">Talk to our team <ArrowRight className="size-4" aria-hidden="true" /></Link></div></Reveal></div></section>
    </main>
  )
}

export default WhyCarosPage
