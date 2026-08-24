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

const HELIX_SPINS = 2.5
const HELIX_AMP = 22
const HELIX_RUNGS = 24
const nodeDurations = [20, 32, 24, 36, 28, 22]
const nodeOffsets = [0, 0.17, 0.34, 0.5, 0.67, 0.84]
const buildHelixPath = (phase: number, strand: number) => {
  let d = ""
  for (let x = 0; x <= 100; x += 2) {
    const y = 50 + HELIX_AMP * Math.sin((x / 100) * HELIX_SPINS * Math.PI * 2 + phase + strand)
    d += `${x === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return d
}

function ConnectionDiagram() {
  const [active, setActive] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [card, setCard] = useState<{ x: number; y: number } | null>(null)
  const [entered, setEntered] = useState(false)
  const [reduced, setReduced] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const rungRefs = useRef<(SVGLineElement | null)[]>([])
  const pathARef = useRef<SVGPathElement | null>(null)
  const pathBRef = useRef<SVGPathElement | null>(null)
  const posRef = useRef(networkDetails.map(() => ({ x: 50, y: 50 })))
  const activeRef = useRef<number | null>(null)
  const boostUntil = useRef(0)
  const strandPhase = networkDetails.map((_, i) => (i % 2) * Math.PI)

  useEffect(() => { activeRef.current = active }, [active])
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(mq.matches)
    apply(); mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect() } }, { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setLocked(false); setActive(null); setCard(null) } }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const activate = (i: number) => { setActive(i); setCard({ ...posRef.current[i] }) }

  // Static placement for reduced-motion / entrance frame.
  useEffect(() => {
    if (!reduced) return
    const xs = [8, 24, 40, 60, 76, 92]
    networkDetails.forEach((_, i) => {
      const node = nodeRefs.current[i]; if (!node) return
      const x = xs[i]
      const full = (x / 100) * HELIX_SPINS * Math.PI * 2 + strandPhase[i]
      const y = 50 + HELIX_AMP * Math.sin(full)
      const depth = Math.cos(full)
      node.style.left = `${x}%`; node.style.top = `${y}%`
      node.style.transform = `translate(-50%,-50%) scale(${(0.85 + (depth + 1) / 2 * 0.3).toFixed(3)})`
      node.style.opacity = String(0.6 + (depth + 1) / 2 * 0.4); node.style.zIndex = String(Math.round((depth + 1) * 40))
      posRef.current[i] = { x, y }
    })
    if (pathARef.current) pathARef.current.setAttribute("d", buildHelixPath(0, 0))
    if (pathBRef.current) pathBRef.current.setAttribute("d", buildHelixPath(0, Math.PI))
  }, [reduced])

  useEffect(() => {
    if (!entered || reduced) return
    let raf = 0, last = performance.now(), wavePhase = 0, nodePhase = 0
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      const boost = now < boostUntil.current ? 1.6 : 1
      wavePhase += dt * 0.275 * boost
      nodePhase += dt * boost
      if (pathARef.current) pathARef.current.setAttribute("d", buildHelixPath(wavePhase, 0))
      if (pathBRef.current) pathBRef.current.setAttribute("d", buildHelixPath(wavePhase, Math.PI))
      const hl = ((nodePhase * 7) % 100)
      rungRefs.current.forEach((line, k) => {
        if (!line) return
        const x = (k / (HELIX_RUNGS - 1)) * 100
        const s = HELIX_AMP * Math.sin((x / 100) * HELIX_SPINS * Math.PI * 2 + wavePhase)
        line.setAttribute("x1", String(x)); line.setAttribute("x2", String(x))
        line.setAttribute("y1", String(50 + s)); line.setAttribute("y2", String(50 - s))
        const near = Math.abs(x - hl); line.setAttribute("opacity", String(0.06 + Math.max(0, 1 - near / 14) * 0.22))
      })
      networkDetails.forEach((_, i) => {
        const node = nodeRefs.current[i]; if (!node) return
        if (activeRef.current === i) { node.style.transform = "translate(-50%,-50%) scale(1.32)"; node.style.opacity = "1"; node.style.zIndex = "60"; return }
        const p = ((nodePhase / nodeDurations[i]) + nodeOffsets[i]) % 1
        const x = p * 112 - 6
        const full = (x / 100) * HELIX_SPINS * Math.PI * 2 + wavePhase + strandPhase[i]
        const y = 50 + HELIX_AMP * Math.sin(full)
        const depth = Math.cos(full)
        const edge = Math.max(0, Math.min(1, (x - 0) / 12)) * Math.max(0, Math.min(1, (100 - x) / 12))
        const scale = 0.8 + (depth + 1) / 2 * 0.35
        const op = (0.5 + (depth + 1) / 2 * 0.5) * edge * (activeRef.current !== null ? 0.45 : 1)
        node.style.left = `${x}%`; node.style.top = `${y}%`
        node.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`
        node.style.opacity = op.toFixed(3); node.style.zIndex = String(Math.round((depth + 1) * 40))
        posRef.current[i] = { x, y }
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [entered, reduced])

  const closeAll = () => { setLocked(false); setActive(null); setCard(null) }

  return <div ref={sectionRef} className="relative w-full">
    <style>{`
      @keyframes helix-core { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.09); } }
      @keyframes helix-sonar { 0% { transform: translate(-50%,-50%) scale(1); opacity: .5; } 100% { transform: translate(-50%,-50%) scale(3.4); opacity: 0; } }
      @keyframes helix-dust { 0%,100% { transform: translate(0,0); opacity: .1; } 50% { transform: translate(var(--dx), var(--dy)); opacity: .55; } }
      @keyframes helix-drift { 0%,100% { transform: translateX(-16px); } 50% { transform: translateX(16px); } }
      .helix-core { animation: helix-core 3s ease-in-out infinite; }
      .helix-sonar { animation: helix-sonar 3.4s ease-out infinite; }
      .helix-dust { animation: helix-dust var(--dur,9s) ease-in-out infinite; }
      .helix-stage-inner { animation: helix-drift 10s ease-in-out infinite; }
      .helix-node { opacity: 0; will-change: transform, opacity; }
      @media (prefers-reduced-motion: reduce) {
        .helix-core, .helix-sonar, .helix-dust, .helix-stage-inner { animation: none !important; }
      }
    `}</style>

    <div className="relative mx-auto hidden h-[72vh] min-h-[540px] w-full max-w-[1200px] overflow-hidden sm:block" onClick={(e) => { if (e.target === e.currentTarget) closeAll() }}>
      {/* drifting molecular dust */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (i * 71) % 100, y = (i * 47 + 13) % 100
          const dx = `${((i % 7) - 3) * 6}px`, dy = `${((i % 5) - 2) * 8}px`
          const gold = i % 3 === 0
          return <span key={i} className="helix-dust absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: gold ? 2 : 1.4, height: gold ? 2 : 1.4, background: gold ? "rgba(212,175,55,.7)" : "rgba(255,255,255,.5)", ["--dx" as string]: dx, ["--dy" as string]: dy, ["--dur" as string]: `${7 + (i % 6)}s`, animationDelay: `${(i % 10) * 0.4}s` }} />
        })}
      </div>

      <div className={`absolute inset-0 ${reduced ? "" : "helix-stage-inner"}`}>
        {/* helix strands + rungs */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="helixGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B8860B" /><stop offset="50%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#F4D03F" />
            </linearGradient>
          </defs>
          <g>
            {Array.from({ length: HELIX_RUNGS }).map((_, k) => <line key={k} ref={(el) => { rungRefs.current[k] = el }} stroke="rgba(212,175,55,.2)" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" opacity="0.05" />)}
            <path ref={pathBRef} d={buildHelixPath(0, Math.PI)} fill="none" stroke="rgba(184,134,11,.4)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 2px rgba(212,175,55,.4))" }} />
            <path ref={pathARef} d={buildHelixPath(0, 0)} fill="none" stroke="url(#helixGrad)" strokeWidth="1.75" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 3px rgba(212,175,55,.5))" }} />
          </g>
        </svg>

        {/* CAROS nucleus */}
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          {[0, 1, 2].map((r) => <span key={r} className="helix-sonar absolute left-1/2 top-1/2 size-[140px] rounded-full border border-gold/40" style={{ animationDelay: `${r * 1.1}s` }} />)}
        </div>
        <div
          className="helix-core absolute left-1/2 top-1/2 z-30 flex size-[140px] flex-col items-center justify-center rounded-full text-center"
          style={{ background: "radial-gradient(circle at 38% 32%, #F4D03F, #D4AF37 45%, #B8860B 100%)", boxShadow: "0 0 50px 10px rgba(212,175,55,.55), 0 0 120px 30px rgba(212,175,55,.2)" }}
          onMouseEnter={() => { boostUntil.current = performance.now() + 2000 }}
        >
          <span className="font-serif text-3xl font-bold italic text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,.45)" }}>CAROS</span>
          <span className="mt-1 px-3 font-mono text-[9px] uppercase leading-tight tracking-[.18em] text-white/85">Revenue Operating System</span>
        </div>

        {/* traveling nodes */}
        {networkDetails.map(([name], i) => {
          const Icon = categories[i][0]
          const isActive = active === i
          return <div key={i} ref={(el) => { nodeRefs.current[i] = el }} className="helix-node absolute left-1/2 top-1/2">
            <button
              type="button"
              aria-label={`${name} — ${categories[i][1]}`}
              aria-expanded={isActive}
              onMouseEnter={() => { if (!locked) activate(i) }}
              onMouseLeave={() => { if (!locked) { setActive(null); setCard(null) } }}
              onFocus={() => activate(i)}
              onClick={() => { if (locked && active === i) closeAll(); else { setLocked(true); activate(i) } }}
              className="group relative flex flex-col items-center gap-1.5 outline-none"
            >
              <span
                className="flex items-center justify-center rounded-full transition-shadow duration-300"
                style={{ width: 100 + i * 8, height: 100 + i * 8, background: `radial-gradient(circle at 34% 30%, ${planetColors[i]}, #B8860B 120%)`, boxShadow: isActive ? "0 0 60px 14px rgba(255,240,200,.85)" : `0 0 44px 4px ${planetColors[i]}aa` }}
              >
                <Icon className="size-11 text-ink" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap rounded bg-ink/60 px-3 py-1 text-lg font-semibold text-ink-foreground backdrop-blur-sm">{name}</span>
            </button>
          </div>
        })}

        {/* glassmorphism detail card */}
        {active !== null && card && <div
          className="absolute z-[70] w-[280px] border border-gold/50 bg-ink/70 p-5 text-left text-ink-foreground shadow-[0_0_50px_rgba(212,175,55,.2)] backdrop-blur-xl"
          style={{ top: `${Math.min(Math.max(card.y, 20), 74)}%`, transform: "translateY(-50%)", ...(card.x < 50 ? { left: `calc(${card.x}% + 60px)` } : { right: `calc(${100 - card.x}% + 60px)` }) }}
        >
          <p className="text-sm font-bold text-gold">{networkDetails[active][0]}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">{networkDetails[active][1]}</p>
          <ul className="mt-3 space-y-1 border-t border-ink-foreground/15 pt-3 text-xs leading-relaxed text-ink-foreground/65">
            {networkDetails[active][2].slice(0, 4).map((it) => <li key={it} className="flex items-center gap-2"><span className="size-1 rounded-full bg-gold" aria-hidden="true" />{it}</li>)}
          </ul>
        </div>}
      </div>

      {/* edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-[12%] bg-gradient-to-r from-ink to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-[12%] bg-gradient-to-l from-ink to-transparent" aria-hidden="true" />
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
