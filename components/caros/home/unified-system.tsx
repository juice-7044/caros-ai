"use client"

import { useTranslations } from "next-intl"
import { ChevronDown, Handshake, LifeBuoy, Megaphone, MessagesSquare, Plus, RefreshCcw, Star, Users, Workflow, type LucideIcon } from "lucide-react"
import { CAPABILITIES_ID } from "@/lib/home-nav"
import { track } from "@/lib/analytics-client"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow } from "@/components/caros/ui-bits"

const ICONS: Record<string, LucideIcon> = {
  marketing: Megaphone,
  sales: Handshake,
  outreach: MessagesSquare,
  reactivation: RefreshCcw,
  workflows: Workflow,
  service: LifeBuoy,
  reputation: Star,
  community: Users,
  more: Plus,
}

type Capability = { id: string; title: string; summary: string; detail: string; status: "live" | "partial" }

export function UnifiedSystem() {
  const t = useTranslations("Home.unified")
  const capabilities = t.raw("capabilities") as Capability[]

  return (
    <section id={CAPABILITIES_ID} className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="mx-auto home-container">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-display leading-[1] tracking-tight">{t("title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("body")}</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = ICONS[c.id] ?? Plus
            return (
              <li key={c.id}>
                <details
                  className="group h-full rounded-xl border border-border bg-card p-5 transition-colors open:border-gold/60"
                  onToggle={(e) => track("showcase_interaction", { action: e.currentTarget.open ? "expand" : "collapse", item: c.id })}
                >
                  <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug">{c.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.summary}</span>
                    </span>
                    <ChevronDown className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
                    <span className="sr-only">{t("details")}</span>
                  </summary>
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                    {c.status === "partial" ? (
                      <span className="mr-2 rounded-full border border-gold/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">{t("expanding")}</span>
                    ) : null}
                    {c.detail}
                  </p>
                </details>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
