import { Check } from "lucide-react"
import { AuditButton } from "./ui-bits"
import { cn } from "@/lib/utils"

const included = [
  "Multi-channel lead capture & tracking codes",
  "CRM, pipeline & opportunity management",
  "Human answering under your brand",
  "Missed-call text back & estimate follow-up",
  "Reviews, referrals & reactivation campaigns",
  "Lead-source attribution & booked-revenue reporting",
  "Weekly performance reports",
  "The monthly business intelligence briefing",
]

export function PricingCard({
  className,
  ctaLabel,
  ctaHref,
  ctaExternal,
}: {
  className?: string
  ctaLabel?: string
  ctaHref?: string
  ctaExternal?: boolean
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground",
        className,
      )}
    >
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-ink-border p-8 lg:border-b-0 lg:border-r lg:p-12">
          <span className="eyebrow text-gold">Transparent Pricing</span>
          <div className="mt-6 flex items-end gap-2">
            <span className="text-[clamp(3rem,7vw,5rem)] font-extrabold leading-none text-gold-gradient">$997</span>
            <span className="pb-2 text-xl text-ink-muted">/month</span>
          </div>
          <p className="mt-4 text-lg text-ink-muted">
            One revenue operating system built around your business.
          </p>

          <div className="mt-8 rounded-xl border border-ink-border p-5">
            <p className="text-sm uppercase tracking-[0.12em] text-ink-muted">Implementation</p>
            <p className="mt-2 text-2xl font-bold">$2,500 one-time</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Covers strategy, configuration, workflows, integrations, pipelines, automation, reporting, communication
              setup, testing, and launch.
            </p>
          </div>

          <AuditButton className="mt-8 w-full" label={ctaLabel} href={ctaHref} external={ctaExternal} />
        </div>

        <div className="p-8 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-muted">What&apos;s included</p>
          <ul className="mt-6 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-ink-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-ink-border pt-6 text-sm leading-relaxed text-ink-muted">
            No percentage of your revenue. No long implementation project. No pile of disconnected software to figure
            out yourself.
          </p>
        </div>
      </div>
    </div>
  )
}
