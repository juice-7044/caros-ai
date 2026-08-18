import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AUDIT_HREF, AUDIT_LABEL } from "@/lib/site"

export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode
  className?: string
  tone?: "gold" | "muted" | "danger"
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "gold" && "text-gold",
        tone === "muted" && "text-muted-foreground",
        tone === "danger" && "text-danger",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          tone === "gold" && "bg-gold/60",
          tone === "muted" && "bg-muted-foreground/40",
          tone === "danger" && "bg-danger/50",
        )}
      />
      {children}
    </span>
  )
}

export function AuditButton({
  className,
  variant = "gold",
  label = AUDIT_LABEL,
  href = AUDIT_HREF,
  external = false,
}: {
  className?: string
  variant?: "gold" | "outline-dark" | "outline-light"
  label?: string
  href?: string
  external?: boolean
}) {
  const classes = cn(
    "group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold transition-all duration-300",
    variant === "gold" && "bg-gold text-gold-foreground hover:bg-gold/90",
    variant === "outline-light" &&
      "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
    variant === "outline-dark" &&
      "border border-ink-foreground/30 text-ink-foreground hover:border-ink-foreground hover:bg-ink-foreground hover:text-ink",
    className,
  )
  const inner = (
    <>
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}

/** Consistent interior page hero on the template's light gradient background. */
export function PageHero({
  eyebrow,
  title,
  serifTitle,
  subtitle,
}: {
  eyebrow: string
  title: string
  serifTitle?: string
  subtitle?: string
}) {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle grid lines echoing the home hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/10"
            style={{ top: `${16.6 * (i + 1)}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute bottom-0 top-0 w-px bg-foreground/10"
            style={{ left: `${10 * (i + 1)}%` }}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32 lg:pt-48">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-display leading-[0.95] tracking-tight">
          {title}
          {serifTitle ? (
            <>
              {" "}
              <span className="font-serif font-normal italic text-gold-gradient">{serifTitle}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
