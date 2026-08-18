import { AuditButton, Eyebrow } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { AUDIT_URL, AUDIT_URL_LABEL, INSIGHTS_URL, INSIGHTS_LABEL, AUDIT_HREF, AUDIT_LABEL } from "@/lib/site"

const trustRow = [
  "Trusts & Estates",
  "Estate Planning",
  "Probate",
  "Small & Midsize Firms",
  "Managing Partners",
]

export function LawFirmHero() {
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
        <Reveal>
          <Eyebrow>Industry Solution — Law Firms &amp; Estate Planning</Eyebrow>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-display leading-[0.95] tracking-tight">
            The revenue in your firm lives{" "}
            <span className="font-serif font-normal italic text-gold-gradient">
              between inquiry and engagement.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Most firms don&apos;t need more inquiries. They need a dependable way to move the right prospective clients
            from first contact through intake, consultation, and engagement — while keeping clear visibility into the
            business side of the practice. CAROS builds and runs that system with you.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <AuditButton label={AUDIT_URL_LABEL} href={AUDIT_URL} external />
            <AuditButton label={INSIGHTS_LABEL} href={INSIGHTS_URL} external variant="outline-light" />
            <AuditButton label={AUDIT_LABEL} href={AUDIT_HREF} variant="outline-light" />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-foreground/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {trustRow.map((item, i, arr) => (
              <span key={item} className="flex items-center gap-x-3">
                {item}
                {i < arr.length - 1 ? <span className="text-gold/60">·</span> : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
