"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  CircleDollarSign,
  ClipboardList,
  FileSpreadsheet,
  Headphones,
  Mail,
  Megaphone,
  MessageSquareText,
  Network,
  Phone,
  RefreshCw,
  ShieldCheck,
  Star,
  Users,
  Workflow,
  X,
} from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { AuditButton, Eyebrow, PageHero } from "@/components/caros/ui-bits"

const stackTiles = [
  [Phone, "CRM"], [Phone, "Business Phone"], [Headphones, "Human Answering"], [MessageSquareText, "Missed-Call Text Back"],
  [Mail, "Email Marketing"], [MessageSquareText, "SMS Marketing"], [CalendarDays, "Appointment Scheduling"], [MessageSquareText, "Website Chat"],
  [ClipboardList, "Forms"], [Workflow, "Lead Follow-Up"], [BarChart3, "Pipeline Management"], [Phone, "Call Tracking"],
  [CircleDollarSign, "Marketing Attribution"], [Star, "Review Requests"], [ShieldCheck, "Reputation Management"], [Megaphone, "Social Media Scheduling"],
  [Users, "Referral Tracking"], [RefreshCw, "Reactivation Campaigns"], [BarChart3, "Reporting"], [BarChart3, "Dashboards"],
  [Bot, "Automation"], [Bot, "AI Tools"], [FileSpreadsheet, "Spreadsheets"], [Users, "Administrative Work"],
] as const

const categories = [
  [Megaphone, "Marketing", ["lead capture", "campaigns", "social scheduling", "forms", "attribution"]],
  [Headphones, "Human Answering", ["live call answering", "lead qualification", "message capture", "routing", "after-hours coverage"]],
  [BarChart3, "CRM", ["contacts", "conversations", "opportunities", "pipeline", "customer history"]],
  [Workflow, "Automation", ["follow-up", "reminders", "nurture", "workflows", "notifications"]],
  [RefreshCw, "Retention", ["reviews", "reactivation", "referrals", "repeat business", "customer communication"]],
  [CircleDollarSign, "Revenue Attribution", ["lead sources", "pipeline value", "conversion", "revenue reporting", "performance visibility"]],
] as const

const verticalData = {
  "Home Services": ["Local search, referrals, ads", "Calls, forms, estimates", "Appointment and service", "Reviews, maintenance, referrals"],
  "Legal & Estate Planning": ["Search, referrals, content", "Calls, forms, consultations", "Matter intake and representation", "Reviews, referrals, ongoing counsel"],
  "Real Estate": ["Listings, search, referrals", "Calls, forms, showings", "Offer and transaction", "Reviews, referrals, repeat clients"],
  "Events & Retreats": ["Search, social, referrals", "Calls, forms, inquiries", "Booking and event delivery", "Reviews, repeat bookings, referrals"],
  Travel: ["Search, content, referrals", "Calls, forms, consultations", "Itinerary and trip delivery", "Reviews, repeat travel, referrals"],
  "Party & Event Rentals": ["Search, social, referrals", "Calls, forms, quotes", "Reservation and delivery", "Reviews, repeat events, referrals"],
  "Wellness Spas": ["Search, social, referrals", "Calls, forms, bookings", "Appointment and treatment", "Reviews, memberships, referrals"],
  "Medical Practices": ["Search, referrals, campaigns", "Calls, forms, scheduling", "Appointment and care", "Reviews, recalls, referrals"],
  "Financial Services": ["Search, referrals, content", "Calls, forms, consultations", "Plan and implementation", "Reviews, renewals, referrals"],
  Insurance: ["Search, referrals, campaigns", "Calls, forms, quotes", "Policy placement and service", "Reviews, renewals, referrals"],
} as const

const verticals = Object.keys(verticalData) as (keyof typeof verticalData)[]
const lifecycle = ["Demand", "Response", "Delivery", "Return"]
const costCards: readonly (readonly [LucideIcon, string, readonly string[]])[] = [
  [BarChart3, "Software", ["CRM", "phone systems", "automation", "email/SMS", "scheduling", "reporting"]],
  [Users, "People", ["receptionists", "office managers", "sales teams", "marketing staff", "administrative support"]],
  [Network, "Vendors", ["answering services", "agencies", "virtual assistants", "consultants", "specialty platforms"]],
  [X, "Revenue Leakage", ["missed calls", "slow follow-up", "lost leads", "forgotten customers", "poor attribution"]],
]
const manualFlows: readonly (readonly [string, readonly string[]])[] = [
  ["Manual Task", ["Missed call", "Lead follow-up", "Appointment reminder", "Review request", "Data entry", "Weekly reporting"]],
  ["Human Time", ["Receptionist", "VA", "Office manager", "Marketing staff", "Salesperson", "Owner"]],
  ["Cost", ["Payroll", "Contractor hours", "Management time", "Delays", "Errors"]],
  ["Revenue Impact", ["Slow response", "Lost leads", "Missed follow-up", "Poor visibility", "Revenue leakage"]],
]

function StackTiles() {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
    {stackTiles.map(([Icon, label], index) => <Reveal key={label} delay={(index % 6) * 35} className={`flex min-h-24 flex-col justify-between border border-border bg-background p-4 ${index % 5 === 0 ? "lg:col-span-2" : ""}`}><Icon className="size-5 text-gold" aria-hidden="true" /><span className="mt-5 text-sm font-semibold leading-snug">{label}</span></Reveal>)}
  </div>
}

const networkDetails = [
  ["Marketing", "Creates and captures demand.", ["Lead capture", "Campaigns", "Social scheduling", "Forms", "Attribution"]],
  ["Human Answering", "Makes sure opportunity gets a response.", ["Live call answering", "Lead qualification", "Message capture", "Routing", "After-hours coverage"]],
  ["CRM", "Keeps the customer journey visible.", ["Contacts", "Conversations", "Opportunities", "Pipeline", "Customer history"]],
  ["Automation", "Moves work forward without waiting.", ["Follow-up", "Reminders", "Nurture", "Workflows", "Notifications"]],
  ["Retention", "Turns customers into repeat revenue and referrals.", ["Reviews", "Reactivation", "Referrals", "Repeat business", "Customer communication"]],
  ["Revenue Attribution", "Shows what is actually producing revenue.", ["Lead sources", "Pipeline value", "Conversion", "Revenue reporting", "Performance visibility"]],
] as const

function ConnectionDiagram() {
  const [active, setActive] = useState<number | null>(null)
  const [entered, setEntered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect() } }, { threshold: 0.18 }); if (sectionRef.current) observer.observe(sectionRef.current); return () => observer.disconnect() }, [])
  const strand = "M -10 72 C 12 20 24 20 42 72 S 72 124 90 72 S 120 20 142 72"
  const rungLabels = ["Lead → Conversation", "Conversation → Opportunity", "Opportunity → Customer", "Customer → Review", "Review → Referral", "Referral → Lead"]
  return <div ref={sectionRef} className={`relative min-h-[760px] w-full overflow-visible py-8 lg:min-h-[100vh] ${entered ? "dna-entered" : ""}`}>
    <style>{`@keyframes dna-flow { to { stroke-dashoffset: -160; } } @keyframes dna-drift { 0%,100% { transform: translate3d(-1%,1%,0) rotate(-2deg); } 50% { transform: translate3d(1%,-1%,0) rotate(2deg); } } @keyframes dna-particle { from { offset-distance: 0%; opacity: 0; } 12% { opacity: .9; } 86% { opacity: .9; } to { offset-distance: 100%; opacity: 0; } } .dna-strand { stroke-dasharray: 2 13; animation: dna-flow 8s linear infinite; } .dna-stage { animation: dna-drift 12s ease-in-out infinite; transform-origin: 50% 50%; } .dna-particle { offset-path: path('${strand}'); animation: dna-particle 6s linear infinite; } .dna-node { transition: opacity .6s ease, transform .3s ease, border-color .3s ease, box-shadow .3s ease; opacity: 0; } .dna-entered .dna-node { opacity: 1; } .dna-node:hover, .dna-node:focus-visible { transform: scale(1.08); border-color: hsl(var(--gold)); box-shadow: 0 0 24px hsl(var(--gold) / .28); } @media (prefers-reduced-motion: reduce) { .dna-strand, .dna-stage, .dna-particle { animation: none !important; } .dna-node { opacity: 1; transition: none; } } @media (max-width: 639px) { .dna-stage { transform: rotate(72deg) scale(1.3); animation-duration: 15s; } }`}</style>
    <div className="dna-stage absolute inset-0">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[10, 22, 34, 46, 58, 70, 82, 94].map((x, i) => <line key={x} x1={x} y1={50 - 22 * Math.sin(x / 12)} x2={x} y2={50 + 22 * Math.sin(x / 12)} stroke="hsl(var(--gold) / .3)" strokeWidth=".22" className="dna-strand" style={{ animationDelay: `${i * -.5}s` }} />)}
        <path d={strand} fill="none" stroke="hsl(var(--gold) / .9)" strokeWidth=".55" className="dna-strand" /><path d="M -10 28 C 12 80 24 80 42 28 S 72 -24 90 28 S 120 80 142 28" fill="none" stroke="hsl(var(--ink-foreground) / .55)" strokeWidth=".42" className="dna-strand" />
        {[0,1,2,3,4,5,6].map(i => <circle key={i} r=".8" fill="hsl(var(--gold))" className="dna-particle" style={{ animationDelay: `${i * -.9}s` }} />)}
      </svg>
      <div className="absolute left-[12%] top-[18%] font-mono text-[9px] uppercase tracking-[.2em] text-gold/70">Revenue activity</div><div className="absolute right-[10%] bottom-[18%] font-mono text-[9px] uppercase tracking-[.2em] text-ink-foreground/50">Revenue intelligence</div>
      {networkDetails.map(([name, sentence, items], index) => <button key={name} type="button" aria-expanded={active === index} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setActive(active === index ? null : index)} className={`dna-node absolute z-10 w-[min(210px,42vw)] border border-ink-foreground/30 bg-ink/90 p-3 text-left text-ink-foreground ${active !== null && active !== index ? "opacity-40" : ""}`} style={{ left: `${[15,30,47,62,75,85][index]}%`, top: `${[30,60,25,70,38,58][index]}%`, transitionDelay: `${400 + index * 130}ms` }}><span className="flex items-center gap-2 text-xs font-bold sm:text-sm"><span className="text-gold">{index + 1}</span>{name}</span>{active === index && <span className="mt-3 block border-t border-gold/30 pt-3 text-[11px] leading-relaxed text-ink-foreground/70"><strong className="block text-gold">{sentence}</strong><span className="mt-2 block">{items.join(" • ")}</span></span>}</button>)}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"><span className="font-serif text-2xl italic text-gold">CAROS</span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[.18em] text-ink-foreground/55">Revenue Operating System</span></div>
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[.18em] text-gold/70">Lead → Conversation → Opportunity → Customer → Review → Referral → Lead</div>
    </div>
  </div>
}

export function WhyCarosPage() {
  const [vertical, setVertical] = useState<(keyof typeof verticalData)>("Home Services")
  const current = verticalData[vertical]

  return <main>
    <PageHero eyebrow="WHY CAROS" title="The system behind" serifTitle="the revenue." subtitle="Most businesses do not have one revenue system. They have software, vendors, employees, contractors, spreadsheets, and manual processes trying to work together. CAROS connects the work from first touch through repeat revenue." />

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>THE FRAGMENTED STACK</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">You may already have all the pieces.<br /><span className="font-serif font-normal italic text-gold">They just don&apos;t work as one system.</span></h2></Reveal><div className="mt-14"><StackTiles /></div></div></section>

    <section className="bg-muted/40 px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>THE REAL COST</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">You are already paying<br /><span className="font-serif font-normal italic text-gold">for the stack.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">You may not pay for every function as a separate software subscription. Some of it lives in payroll, agencies, contractors, administrative time, or missed opportunities.</p></Reveal><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{costCards.map(([Icon, title, items]) => <Reveal key={title as string} className="border border-border bg-background p-6 lg:p-7"><Icon className="size-6 text-gold" aria-hidden="true" /><h3 className="mt-7 text-xl font-bold">{title}</h3><ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">{(items as string[]).map(item => <li key={item}>{item}</li>)}</ul></Reveal>)}</div><p className="mx-auto mt-16 max-w-4xl text-center text-[clamp(1.7rem,3.5vw,3rem)] font-extrabold leading-tight">Different bills.<br />Different logins.<br />Different data.<br /><span className="font-serif font-normal italic text-gold">One customer journey.</span></p></div></section>

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>THE REVENUE WORK</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Six categories of work.<br /><span className="font-serif font-normal italic text-gold">One connected system.</span></h2></Reveal><div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">{categories.map(([Icon, name, items]) => <Reveal key={name} className="bg-background p-7 lg:p-9"><Icon className="size-6 text-gold" aria-hidden="true" /><h3 className="mt-7 text-xl font-bold">{name}</h3><ul className="mt-5 flex flex-col gap-2 text-sm capitalize leading-relaxed text-muted-foreground">{items.map(item => <li key={item}>{item}</li>)}</ul></Reveal>)}</div></div></section>

    <section className="bg-ink px-6 py-24 text-ink-foreground lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>THE OPERATING SYSTEM</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Not another tool.<br /><span className="font-serif font-normal italic text-gold">The connective tissue.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/70">Revenue is the DNA of a business. CAROS connects the systems, people, conversations, workflows, and data that keep it moving.</p></Reveal><div className="mt-14"><ConnectionDiagram /></div></div></section>

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>NOT EVERYTHING HAS A LOGIN</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Some of your most expensive systems<br /><span className="font-serif font-normal italic text-gold">are people doing things manually.</span></h2><p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">If someone on your team is returning missed calls, copying information into spreadsheets, requesting reviews, sending reminders, checking multiple systems, following up with old leads, or building reports by hand, you are already paying for the process.</p></Reveal><div className="mt-14 grid gap-px overflow-hidden bg-border md:grid-cols-2 lg:grid-cols-4">{manualFlows.map(([title, items]) => <div key={title} className="bg-background p-7"><h3 className="font-mono text-xs font-bold uppercase tracking-[.18em] text-gold">{title}</h3><ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">{items.map(item => <li key={item} className="flex items-center gap-2"><ArrowRight className="size-3 text-gold" aria-hidden="true" />{item}</li>)}</ul></div>)}</div><p className="mx-auto mt-12 max-w-3xl text-center text-lg font-semibold leading-relaxed">CAROS automates, coordinates, or supports the work so your people can spend more time on the work that actually requires people.</p></div></section>

    <section className="bg-muted/40 px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>BUILT AROUND HOW YOU SELL</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Different vertical.<br /><span className="font-serif font-normal italic text-gold">Same revenue loop.</span></h2></Reveal><div className="mt-14 flex flex-wrap gap-2">{verticals.map(item => <button type="button" key={item} onClick={() => setVertical(item)} className={`border px-4 py-2 text-sm transition-colors ${vertical === item ? "border-gold bg-ink text-ink-foreground" : "border-border bg-background text-muted-foreground hover:border-gold"}`}>{item}</button>)}</div><div className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-4">{lifecycle.map((label, i) => <div key={label}><span className="font-mono text-xs uppercase tracking-[.18em] text-gold">0{i + 1}</span><h3 className="mt-4 text-xl font-bold">{label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current[i]}</p>{i < lifecycle.length - 1 && <ArrowRight className="mt-6 hidden size-4 text-gold md:block" aria-hidden="true" />}</div>)}</div></div></section>

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1000px] text-center"><Reveal><Eyebrow>THE COMPOUNDING EFFECT</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">The system gets stronger<br /><span className="font-serif font-normal italic text-gold">every time it runs.</span></h2><div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3">{["Attention", "Trust", "Revenue", "Retention", "Referrals"].map((item, i, all) => <span key={item} className="flex items-center gap-3"><span className="border border-border px-4 py-3 text-sm font-semibold">{item}</span>{i < all.length - 1 && <ArrowRight className="size-4 text-gold" aria-hidden="true" />}</span>)}</div><p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">Every interaction creates information the next interaction can use. More context improves follow-up. Better follow-up improves conversion. Better experiences create retention and referrals.</p><p className="mt-6 font-semibold">Every step makes the next one easier.</p></Reveal></div></section>

    <section className="bg-ink px-6 py-24 text-ink-foreground lg:px-12 lg:py-32"><div className="mx-auto max-w-[900px]"><Reveal><Eyebrow>READY WHEN YOU ARE</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-tight">Stop managing<br /><span className="font-serif font-normal italic text-gold">pieces.</span> Start running revenue.</h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/70">See where revenue is leaking, where your systems are disconnected, and what CAROS can help consolidate.</p><div className="mt-10"><AuditButton /></div></Reveal></div></section>
  </main>
}

export default WhyCarosPage
