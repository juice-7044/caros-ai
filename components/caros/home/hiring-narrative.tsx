"use client"

import { useState } from "react"
import { ArrowRight, BriefcaseBusiness, Check, ChevronDown, Megaphone, MessageCircle, Settings2, Star, Users, Workflow } from "lucide-react"
import { DEMO_URL } from "@/lib/home-nav"
import { HiringCalculator } from "./hiring-calculator"
import { ProductShowcase } from "./product-showcase"
import { TrackedLink } from "./tracked-link"

const positions = [
  ["Marketing & Social Media Coordinator", "Managing campaigns, social engagement, marketing activity, and incoming opportunities.", Megaphone],
  ["Sales & Lead Follow-Up Coordinator", "Organizing prospects, tracking opportunities, qualifying inquiries, and keeping deals moving.", Users],
  ["Customer Outreach & Communications Specialist", "Managing calls, email, SMS, appointment coordination, and customer follow-up.", MessageCircle],
  ["Operations & Workflow Coordinator", "Coordinating daily tasks, scheduling, handoffs, reminders, and administrative processes.", Workflow],
  ["Customer Success & Reputation Coordinator", "Managing relationships, service follow-up, reviews, retention, and satisfaction.", Star],
] as const

const functions = [
  ["Marketing & Social Media", "Campaigns, content, social engagement, and incoming opportunities."],
  ["Lead Capture & Qualification", "Capture, organize, and qualify new inquiries as they arrive."],
  ["Sales Pipeline Management", "Track opportunities and keep every deal moving forward."],
  ["Customer Outreach & Communication", "Coordinate calls, email, SMS, and customer follow-up."],
  ["Scheduling & Appointment Coordination", "Make it easier for customers and teams to get on the same page."],
  ["Customer Reactivation", "Reconnect with past customers and create new opportunities."],
  ["Dynamic Operations & Workflow Automation", "Coordinate tasks, handoffs, reminders, and repeatable processes."],
  ["Customer Service & Customer Success", "Support relationships throughout the customer lifecycle."],
  ["Reputation Management", "Support reviews, feedback, retention, and satisfaction."],
  ["Community Building", "Build stronger relationships around your business."],
] as const

export function HiringNarrative() {
  const [employees, setEmployees] = useState<5 | 10>(5)
  const visibleFunctions = employees === 5 ? positions : functions

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1300px] px-6 pb-20 pt-28 lg:px-12 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="h-px w-8 bg-gold/60" />The cost of scaling</span>
          <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,5rem)] font-display leading-[0.94] tracking-tight">What Would It Cost You to Hire 5 More Employees? <span className="font-serif font-normal italic text-gold-gradient">What About 10?</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">Start with the hypothetical cost of adding capacity. Adjust the assumptions to see your own illustrative annual hiring cost.</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl"><HiringCalculator /></div>

        <div className="mx-auto mt-20 max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">The work behind the number</p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-display leading-none">But What Are You Actually Hiring Those Employees to Do?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">To grow your business, you need more than people. You need the right functions working together.</p>

          <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1" role="group" aria-label="Choose hiring comparison">
            {[5, 10].map((count) => <button key={count} type="button" onClick={() => setEmployees(count as 5 | 10)} aria-pressed={employees === count} className="rounded-full px-5 py-2 text-sm font-semibold transition-colors aria-pressed:bg-gold aria-pressed:text-gold-foreground">{count} employees</button>)}
          </div>

          {employees === 10 ? <p className="mt-4 text-sm text-muted-foreground">Ten business functions. One connected operating system.</p> : <p className="mt-4 text-sm text-muted-foreground">Illustrative examples, not mandatory staffing recommendations.</p>}
          <ul className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
            {visibleFunctions.map((item, index) => {
              const Icon = employees === 5 ? item[2] : [Megaphone, BriefcaseBusiness, Users, MessageCircle, Settings2, Workflow, Workflow, Check, Star, Users][index]
              return <li key={item[0]} className="rounded-xl border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1"><Icon className="size-5 text-gold" aria-hidden />{employees === 10 ? <details className="group"><summary className="mt-4 flex cursor-pointer list-none items-start justify-between gap-3 font-semibold leading-snug [&::-webkit-details-marker]:hidden"><span>{item[0]}</span><ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden /></summary><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item[1]}</p></details> : <><p className="mt-4 font-semibold leading-snug">{item[0]}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item[1]}</p></>}</li>
            })}
          </ul>
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-gold/40 bg-ink p-6 text-ink-foreground shadow-xl lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">The CAROS advantage</p>
              <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-none">What If Your Existing Team Could Manage More of That Work From One Place?</h2>
              <p className="mt-5 leading-relaxed text-ink-muted">CAROS brings the tools and workflows supporting these functions together in one cohesive dashboard and unified Revenue Operating System.</p>
              <p className="mt-5 font-semibold text-gold">ONE DASHBOARD. ONE UNIFIED REVENUE OPERATING SYSTEM.</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">One connected system helping your team accomplish more without hiring for every new responsibility.</p>
              <TrackedLink href={DEMO_URL} external events={[["hero_cta_click", { cta: "see_caros_in_action", location: "hiring_narrative" }], ["demo_click", { location: "hiring_narrative" }]]} className="group mt-7 inline-flex h-14 items-center gap-2 rounded-full bg-gold px-7 font-semibold text-gold-foreground hover:bg-gold/90">See CAROS in Action <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></TrackedLink>
            </div>
            <ProductShowcase />
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">The salary figures illustrate hypothetical hiring costs, not guaranteed savings. CAROS supports and automates significant portions of operational work; it does not eliminate the need for employees.</p>
      </div>
    </section>
  )
}
