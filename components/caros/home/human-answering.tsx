import { Check } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"

const checklist = [
  "Live human answering",
  "Answered under your brand",
  "Lead info captured into CAROS",
  "Booking workflows",
  "SMS follow-up",
  "After-hours options",
]

export function HumanAnswering() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-50" />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <Reveal>
          <h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            Your customers called a business.{" "}
            <span className="font-serif font-normal italic text-gold-gradient">Let them talk to a person.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            CAROS combines intelligent automation with real human support. Our operators answer under your business
            name, helping you capture opportunities even when you&apos;re on a roof, under a sink, driving between jobs,
            or simply trying to run your company.
          </p>
          <p className="mt-8 border-l-2 border-gold pl-6 text-xl font-bold tracking-tight">
            Automation where it makes sense. Humans where they matter.
          </p>
        </Reveal>

        <Reveal delay={80} className="rounded-2xl border border-ink-border bg-ink/60 p-8 lg:p-10">
          <ul className="space-y-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-lg font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
