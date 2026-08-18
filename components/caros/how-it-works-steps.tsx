import { Reveal } from "./reveal"

const steps = [
  {
    tag: "Audit",
    title: "We audit your revenue process.",
    body: "Where do leads come from? Who answers the phone? Where are opportunities quietly getting lost?",
  },
  {
    tag: "Build",
    title: "We build your CAROS.",
    body: "Phone workflows, CRM, automations, pipeline, and reporting — configured around how you actually work.",
  },
  {
    tag: "Launch",
    title: "CAROS becomes part of your day-to-day.",
    body: "It runs alongside how you already work. Nothing new for your customers to learn.",
  },
  {
    tag: "Optimize",
    title: "Weekly reporting identifies what's working and what's leaking.",
    body: "We keep tightening the system so the next marketing dollar goes where it performs best.",
  },
]

export function HowItWorksSteps({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark"
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.tag} delay={i * 80} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
              {i + 1}
            </span>
            <span className="eyebrow text-gold">{step.tag}</span>
          </div>
          <h3
            className={`mt-6 text-xl font-extrabold leading-tight tracking-tight ${
              dark ? "text-ink-foreground" : "text-foreground"
            }`}
          >
            {step.title}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>
            {step.body}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
