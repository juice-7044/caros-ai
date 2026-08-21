import { useTranslations } from "next-intl"
import { Reveal } from "./reveal"
import { PILLARS } from "@/lib/site"
import { cn } from "@/lib/utils"

export function PillarsGrid({
  variant = "dark",
  showItems = false,
}: {
  variant?: "dark" | "light"
  showItems?: boolean
}) {
  const dark = variant === "dark"
  const t = useTranslations("pillars")
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-3"
      style={{ borderColor: dark ? "var(--ink-border)" : "var(--border)" }}
    >
      {PILLARS.map((pillar, i) => (
        <Reveal
          key={pillar.id}
          delay={i * 60}
          className={cn(
            "group relative flex flex-col p-8 lg:p-10",
            dark ? "bg-ink" : "bg-card",
          )}
        >
          <span className="absolute inset-x-0 top-0 h-0.5 bg-gold opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
          <span className={cn("eyebrow", dark ? "text-gold" : "text-gold")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "mt-5 text-xl font-extrabold tracking-tight",
              dark ? "text-ink-foreground" : "text-foreground",
            )}
          >
            {t(`${pillar.id}.label`)}
          </h3>
          <p
            className={cn(
              "mt-3 font-serif text-lg italic",
              dark ? "text-ink-foreground/90" : "text-foreground/80",
            )}
          >
            &ldquo;{t(`${pillar.id}.question`)}&rdquo;
          </p>
          <p className={cn("mt-4 text-sm leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>
            {t(`${pillar.id}.blurb`)}
          </p>
          {showItems ? (
            <ul className="mt-6 space-y-2">
              {(t.raw(`${pillar.id}.items`) as string[]).map((item) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-start gap-2 text-sm",
                    dark ? "text-ink-foreground/80" : "text-foreground/80",
                  )}
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ))}
    </div>
  )
}
