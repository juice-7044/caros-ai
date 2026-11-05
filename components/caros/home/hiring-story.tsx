"use client"

import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowRight, CalendarCheck, ChevronDown, Handshake, LifeBuoy, Megaphone, MessagesSquare, RefreshCcw, Star, UserPlus, Users, Workflow,
  type LucideIcon,
} from "lucide-react"
import { CAPABILITIES_ID, DEMO_URL } from "@/lib/home-nav"
import { MODE_COUNT, storyView, type StoryMode } from "@/lib/hiring-story"
import { track } from "@/lib/analytics-client"
import { HiringCalculator } from "./hiring-calculator"
import { HiringConverge } from "./hiring-converge"
import { TrackedLink } from "./tracked-link"

const ROLE_ICONS: Record<string, LucideIcon> = { marketing: Megaphone, sales: Handshake, outreach: MessagesSquare, operations: Workflow, success: Star }
const FUNCTION_ICONS: Record<string, LucideIcon> = {
  marketing: Megaphone, leads: UserPlus, pipeline: Handshake, outreach: MessagesSquare, scheduling: CalendarCheck,
  reactivation: RefreshCcw, operations: Workflow, service: LifeBuoy, reputation: Star, community: Users,
}
type Item = { id: string; title: string; text: string }

function FunctionItem({ item, Icon }: { item: Item; Icon: LucideIcon }) {
  const [open, setOpen] = useState(false)
  const panel = useId()
  return (
    <li data-story="function" className={`rounded-xl border bg-card transition-colors ${open ? "border-gold/60" : "border-border"}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => { setOpen(!open); track("showcase_interaction", { action: open ? "collapse" : "expand", item: `function_${item.id}` }) }}
        className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left"
      >
        <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{item.title}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <p id={panel} hidden={!open} className="border-t border-border px-3 py-2.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
    </li>
  )
}

/** Cost -> responsibilities -> CAROS reveal -> primary CTA. Calculator, toggle and the lists share one headcount. */
export function HiringStory() {
  const s = useTranslations("Home.story")
  const h = useTranslations("Home.hero")
  const [employees, setEmployees] = useState("5")
  const [salary, setSalary] = useState("50000")
  const view = storyView(employees)
  const setMode = (m: StoryMode) => setEmployees(String(MODE_COUNT[m]))

  const roles = s.raw("roles") as Item[]
  const fns = s.raw("functions") as Item[]
  const ten = view.mode === "ten"
  const items = ten ? fns : roles
  const icons = ten ? FUNCTION_ICONS : ROLE_ICONS
  const tokens = items.map((it) => { const Icon = icons[it.id]; return <Icon key={it.id} className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden /> })

  return (
    <div data-story-mode={view.mode}>
      <HiringCalculator employees={employees} salary={salary} mode={view.mode} onEmployees={setEmployees} onSalary={setSalary} onMode={setMode} />

      <div data-story="positions" className="mt-8">
        <h2 className="text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-display leading-[1.05] tracking-tight">
          {ten ? s("functionsTitle") : s("rolesTitle")}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{ten ? s("functionsHint") : s("rolesIntro")}</p>
        {view.exact ? null : (
          <p data-story="custom-note" className="mt-2 inline-block rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm">
            {ten ? s("customTen", { count: view.count }) : s("customFive", { count: view.count })}
          </p>
        )}

        {ten ? (
          <ul aria-label={s("functionsLabel")} className="mt-4 grid items-start gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {fns.map((f) => <FunctionItem key={f.id} item={f} Icon={FUNCTION_ICONS[f.id]} />)}
          </ul>
        ) : (
          <ol aria-label={s("rolesLabel")} className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {roles.map((r, i) => {
              const Icon = ROLE_ICONS[r.id]
              return (
                <li key={r.id} data-story="role" className="rounded-xl border border-border bg-card p-3.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-gold/10 text-gold"><Icon className="size-4" strokeWidth={1.75} aria-hidden /></span>
                  <h3 data-role-title className="mt-2 text-sm font-semibold leading-snug"><span className="sr-only">{i + 1}. </span>{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </li>
              )
            })}
          </ol>
        )}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{ten ? s("functionsDisclaimer") : s("rolesDisclaimer")}</p>

        <HiringConverge mode={view.mode} tokens={tokens} />
      </div>

      <div data-story="reveal" className="mt-6 max-w-3xl">
        <h2 className="text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-display leading-[1.05] tracking-tight">{s("revealTitle")}</h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s("revealBody")}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s("revealAreas")}</p>
        <p className="mt-2 text-base leading-relaxed">{s("revealClose")}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-gold">{s("emphasis")}</p>
        <p className="mt-2 font-serif text-xl italic text-foreground">{s("tagline")}</p>
      </div>

      <div data-story="cta" className="mt-5 flex flex-col items-start gap-3 sm:flex-row">
        <TrackedLink
          href={DEMO_URL}
          external
          events={[["hero_cta_click", { cta: "see_caros_in_action", location: "story_reveal" }], ["demo_click", { location: "story_reveal" }]]}
          className="group inline-flex h-14 items-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
        >
          {h("primaryCta")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </TrackedLink>
        <TrackedLink
          href={`#${CAPABILITIES_ID}`}
          events={[["hero_cta_click", { cta: "explore_capabilities", location: "story_reveal" }]]}
          className="group inline-flex h-14 items-center gap-2 rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
        >
          {h("secondaryCta")}
          <ArrowRight className="h-4 w-4 rotate-90" />
        </TrackedLink>
      </div>
    </div>
  )
}
