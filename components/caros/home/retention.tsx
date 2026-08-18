import { Reveal } from "@/components/caros/reveal"

const columns = [
  {
    title: "You paid for the lead. Don't lose it because you got busy.",
    items: [
      "Estimate follow-up",
      "Missed-call text back",
      "Appointment reminders",
      "Lead nurturing",
      "Reactivation campaigns",
    ],
  },
  {
    title: "Your cheapest customer may be one you've already paid to acquire.",
    items: [
      "Review requests",
      "Referral campaigns",
      "Repeat-service reminders",
      "Dormant customer win-back",
      "Membership fulfillment",
    ],
  },
]

export function Retention() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="relative grid gap-8 lg:grid-cols-2">
          {/* connective line */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-16 -translate-x-1/2 -translate-y-1/2 bg-gold lg:block" />
          {columns.map((col, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 lg:p-10"
            >
              <h3 className="text-balance text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl">
                {col.title}
              </h3>
              <ul className="mt-8 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
