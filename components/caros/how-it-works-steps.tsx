import { useTranslations } from "next-intl"
import { Reveal } from "./reveal"

export function HowItWorksSteps({ variant = "light" }: { variant?: "light" | "dark" }) {
  const t = useTranslations("HowItWorksSteps")
  const steps = [
    { tag: t("audit.tag"), title: t("audit.title"), body: t("audit.body") },
    { tag: t("build.tag"), title: t("build.title"), body: t("build.body") },
    { tag: t("launch.tag"), title: t("launch.title"), body: t("launch.body") },
    { tag: t("optimize.tag"), title: t("optimize.title"), body: t("optimize.body") },
  ]
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
