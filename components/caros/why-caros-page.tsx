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

const planetColors = ["#e6b422", "#d98a3d", "#c9922f", "#e0a838", "#b8791f", "#f0c453"] as const

function ConnectionDiagram() {
  const [active, setActive] = useState<number | null>(null)
  const [entered, setEntered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const paused = active !== null

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect() } }, { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Orbit radius as a percentage of the stage's half-size, plus per-planet orbital period.
  const orbits = networkDetails.map((_, i) => ({ radius: 20 + i * 6, duration: 24 + i * 7, start: (i * 360) / networkDetails.length }))

  return <div ref={sectionRef} className={`relative w-full ${entered ? "solar-entered" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActive(null) }}>
    <style>{`
      @keyframes solar-orbit { to { transform: rotate(360deg); } }
      @keyframes solar-counter { to { transform: rotate(-360deg); } }
      @keyframes solar-pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 60px 12px hsl(var(--gold) / .35), 0 0 120px 40px hsl(var(--gold) / .12); } 50% { transform: scale(1.06); box-shadow: 0 0 80px 20px hsl(var(--gold) / .5), 0 0 150px 60px hsl(var(--gold) / .18); } }
      @keyframes solar-twinkle { 0%,100% { opacity: .2; } 50% { opacity: .9; } }
      @keyframes solar-flow { to { stroke-dashoffset: -40; } }
      .solar-ring, .solar-orbit-track { opacity: 0; transition: opacity 1s ease; }
      .solar-entered .solar-ring, .solar-entered .solar-orbit-track { opacity: 1; }
      .solar-orbit-track { animation: solar-orbit linear infinite; }
      .solar-planet-spin { animation: solar-counter linear infinite; }
      .solar-planet { opacity: 0; transform: scale(0); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1); }
      .solar-entered .solar-planet { opacity: 1; transform: scale(1); }
      .solar-sun { animation: solar-pulse 5s ease-in-out infinite; }
      .solar-flow-line { stroke-dasharray: 2 6; animation: solar-flow 2.5s linear infinite; }
      .solar-star { animation: solar-twinkle var(--tw,4s) ease-in-out infinite; }
      .solar-paused .solar-orbit-track, .solar-paused .solar-planet-spin, .solar-paused .solar-sun { animation-play-state: paused; }
      @media (prefers-reduced-motion: reduce) {
        .solar-orbit-track, .solar-planet-spin, .solar-sun, .solar-star, .solar-flow-line { animation: none !important; }
        .solar-planet { opacity: 1; transform: scale(1); }
      }
    `}</style>

    <div className={`relative mx-auto hidden aspect-square w-full max-w-[760px] sm:block ${paused ? "solar-paused" : ""}`}>
      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => { const seed = (i * 977) % 100; const seed2 = (i * 613) % 100; return <span key={i} className="solar-star absolute rounded-full bg-ink-foreground" style={{ left: `${seed}%`, top: `${seed2}%`, width: i % 5 === 0 ? 2.5 : 1.5, height: i % 5 === 0 ? 2.5 : 1.5, ["--tw" as string]: `${3 + (i % 4)}s`, animationDelay: `${i * 0.2}s` }} aria-hidden="true" /> })}
      </div>

      {/* Orbit rings */}
      {orbits.map((o, i) => <div key={`ring-${i}`} className={`solar-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${active === i ? "border-gold/60" : "border-ink-foreground/12"}`} style={{ width: `${o.radius * 2}%`, height: `${o.radius * 2}%`, transitionDelay: `${i * 90}ms` }} aria-hidden="true" />)}

      {/* Data-flow lines from sun to active planet */}
      {active !== null && <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r={orbits[active].radius} fill="none" stroke="hsl(var(--gold) / .5)" strokeWidth=".4" className="solar-flow-line" /></svg>}

      {/* Orbiting planets */}
      {orbits.map((o, i) => {
        const [name] = networkDetails[i]
        const Icon = categories[i][0]
        const dim = active !== null && active !== i
        const startDelay = -(o.start / 360) * o.duration
        return <div key={`orbit-${i}`} className="solar-orbit-track absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: `${o.radius * 2}%`, height: `${o.radius * 2}%`, animationDuration: `${o.duration}s`, animationDelay: `${startDelay}s` }}>
          <div className="solar-planet absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ transitionDelay: `${300 + i * 120}ms` }}>
            <div className="solar-planet-spin" style={{ animationDuration: `${o.duration}s`, animationDelay: `${startDelay}s` }}>
              <button type="button" aria-label={`${name} — ${categories[i][1]}`} aria-expanded={active === i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(active === i ? null : i)} className={`group relative flex flex-col items-center gap-1.5 outline-none transition-opacity ${dim ? "opacity-40" : "opacity-100"}`}>
                <span className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110 group-focus-visible:scale-110" style={{ width: 28 + i * 3, height: 28 + i * 3, background: `radial-gradient(circle at 32% 28%, ${planetColors[i]}, hsl(var(--ink)) 130%)`, boxShadow: `0 0 16px ${planetColors[i]}88, inset -3px -3px 8px rgba(0,0,0,.55)` }}><Icon className="size-3.5 text-ink" aria-hidden="true" /></span>
                <span className="whitespace-nowrap rounded bg-ink/70 px-1.5 text-[10px] font-semibold text-ink-foreground backdrop-blur-sm">{name}</span>
              </button>
            </div>
          </div>
        </div>
      })}

      {/* Sun / CAROS core */}
      <div className="absolute left-1/2 top-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <div className="solar-sun flex size-full flex-col items-center justify-center rounded-full bg-gold text-center text-ink">
          <span className="font-serif text-lg font-bold italic leading-none sm:text-2xl">CAROS</span>
          <span className="mt-1 px-2 font-mono text-[7px] uppercase leading-tight tracking-[.14em] text-ink/80 sm:text-[8px]">Revenue Operating System</span>
        </div>
      </div>

      {/* Active planet detail card */}
      {active !== null && <div className="absolute bottom-0 left-1/2 z-20 w-[min(320px,80%)] -translate-x-1/2 border border-gold/40 bg-ink/95 p-5 text-left text-ink-foreground shadow-[0_0_40px_hsl(var(--gold)/.15)] backdrop-blur">
        <span className="flex items-center gap-2 text-sm font-bold text-gold">{networkDetails[active][0]}</span>
        <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">{networkDetails[active][1]}</p>
        <p className="mt-3 border-t border-ink-foreground/15 pt-3 text-xs leading-relaxed text-ink-foreground/60">{networkDetails[active][2].join(" • ")}</p>
      </div>}
    </div>

    {/* Mobile: planetary stack */}
    <div className="flex flex-col gap-3 sm:hidden">
      <div className="mb-2 flex flex-col items-center"><div className="flex size-24 flex-col items-center justify-center rounded-full bg-gold text-center text-ink shadow-[0_0_40px_hsl(var(--gold)/.4)]"><span className="font-serif text-lg font-bold italic">CAROS</span><span className="mt-0.5 px-2 font-mono text-[7px] uppercase leading-tight tracking-[.14em] text-ink/80">Revenue OS</span></div></div>
      {networkDetails.map(([name, sentence, items], i) => { const Icon = categories[i][0]; const open = active === i; return <button key={name} type="button" aria-expanded={open} onClick={() => setActive(open ? null : i)} className={`flex flex-col border p-4 text-left transition-colors ${open ? "border-gold bg-ink/80" : "border-ink-foreground/20 bg-ink/60"}`}>
        <span className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full text-ink" style={{ background: `radial-gradient(circle at 32% 28%, ${planetColors[i]}, hsl(var(--ink)) 130%)`, boxShadow: `0 0 14px ${planetColors[i]}80` }}><Icon className="size-4" aria-hidden="true" /></span><span className="text-sm font-bold text-ink-foreground">{name}</span></span>
        {open && <span className="mt-3 block border-t border-ink-foreground/15 pt-3 text-xs leading-relaxed text-ink-foreground/70"><strong className="block text-gold">{sentence}</strong><span className="mt-2 block">{items.join(" • ")}</span></span>}
      </button> })}
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

    <section className="bg-ink px-6 py-24 text-ink-foreground lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>THE OPERATING SYSTEM</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Not another tool.<br /><span className="font-serif font-normal italic text-gold">The connective tissue.</span></h2><p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/70">Revenue is the DNA of a business. CAROS connects the systems, people, conversations, workflows, and data that keep it moving.</p></Reveal><div className="mt-16 lg:mt-20"><ConnectionDiagram /></div></div></section>

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>NOT EVERYTHING HAS A LOGIN</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Some of your most expensive systems<br /><span className="font-serif font-normal italic text-gold">are people doing things manually.</span></h2><p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">If someone on your team is returning missed calls, copying information into spreadsheets, requesting reviews, sending reminders, checking multiple systems, following up with old leads, or building reports by hand, you are already paying for the process.</p></Reveal><div className="mt-14 grid gap-px overflow-hidden bg-border md:grid-cols-2 lg:grid-cols-4">{manualFlows.map(([title, items]) => <div key={title} className="bg-background p-7"><h3 className="font-mono text-xs font-bold uppercase tracking-[.18em] text-gold">{title}</h3><ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">{items.map(item => <li key={item} className="flex items-center gap-2"><ArrowRight className="size-3 text-gold" aria-hidden="true" />{item}</li>)}</ul></div>)}</div><p className="mx-auto mt-12 max-w-3xl text-center text-lg font-semibold leading-relaxed">CAROS automates, coordinates, or supports the work so your people can spend more time on the work that actually requires people.</p></div></section>

    <section className="bg-muted/40 px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><Reveal><Eyebrow>BUILT AROUND HOW YOU SELL</Eyebrow><h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">Different vertical.<br /><span className="font-serif font-normal italic text-gold">Same revenue loop.</span></h2></Reveal><div className="mt-14 flex flex-wrap gap-2">{verticals.map(item => <button type="button" key={item} onClick={() => setVertical(item)} className={`border px-4 py-2 text-sm transition-colors ${vertical === item ? "border-gold bg-ink text-ink-foreground" : "border-border bg-background text-muted-foreground hover:border-gold"}`}>{item}</button>)}</div><div className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-4">{lifecycle.map((label, i) => <div key={label}><span className="font-mono text-xs uppercase tracking-[.18em] text-gold">0{i + 1}</span><h3 className="mt-4 text-xl font-bold">{label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current[i]}</p>{i < lifecycle.length - 1 && <ArrowRight className="mt-6 hidden size-4 text-gold md:block" aria-hidden="true" />}</div>)}</div></div></section>

    <section className="bg-background px-6 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1000px] text-center"><Reveal><Eyebrow>THE COMPOUNDING EFFECT</Eyebrow><h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,4.75rem)] font-extrabold leading-[.98] tracking-tight">The system gets stronger<br /><span className="font-serif font-normal italic text-gold">every time it runs.</span></h2><div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3">{["Attention", "Trust", "Revenue", "Retention", "Referrals"].map((item, i, all) => <span key={item} className="flex items-center gap-3"><span className="border border-border px-4 py-3 text-sm font-semibold">{item}</span>{i < all.length - 1 && <ArrowRight className="size-4 text-gold" aria-hidden="true" />}</span>)}</div><p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">Every interaction creates information the next interaction can use. More context improves follow-up. Better follow-up improves conversion. Better experiences create retention and referrals.</p><p className="mt-6 font-semibold">Every step makes the next one easier.</p></Reveal></div></section>

    <section className="bg-ink px-6 py-24 text-ink-foreground lg:px-12 lg:py-32"><div className="mx-auto max-w-[900px]"><Reveal><Eyebrow>READY WHEN YOU ARE</Eyebrow><h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-tight">Stop managing<br /><span className="font-serif font-normal italic text-gold">pieces.</span> Start running revenue.</h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/70">See where revenue is leaking, where your systems are disconnected, and what CAROS can help consolidate.</p><div className="mt-10"><AuditButton /></div></Reveal></div></section>
  </main>
}

export default WhyCarosPage
