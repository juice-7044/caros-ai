import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Eyebrow } from "@/components/caros/ui-bits"
import { AuditForm } from "@/components/caros/audit-form"
import { Reveal } from "@/components/caros/reveal"
import { Sunburst } from "@/components/caros/sunburst"

export const metadata: Metadata = {
  title: "Revenue Audit Review",
  description:
    "Your CAROS Revenue Audit found the signals. In your Revenue Audit Review, we add the business context public data can't see and identify where revenue may be getting lost, delayed, or left uncaptured.",
}

const reviewCards = [
  {
    title: "Your Revenue Readiness Score",
    body: "Understand what contributed to your overall score and where the strongest opportunities exist.",
  },
  {
    title: "Lead Capture & Follow-Up",
    body: "Review how prospects enter your business, what happens after they inquire, and where opportunities may be slipping through.",
  },
  {
    title: "Conversion Infrastructure",
    body: "Examine the systems and processes that help move inquiries toward booked appointments, consultations, estimates, purchases, or signed engagements.",
  },
  {
    title: "Reputation & Demand",
    body: "Review the signals influencing whether prospects discover, trust, and choose your business.",
  },
  {
    title: "Retention & Reactivation",
    body: "Discuss what happens after the first transaction and whether past customers, clients, leads, or inquiries represent additional revenue opportunity.",
  },
  {
    title: "Revenue Intelligence",
    body: "Evaluate what you can currently see about your revenue pipeline and where better tracking, attribution, or reporting could improve decision-making.",
  },
]

const questions = [
  "How quickly new inquiries receive a response",
  "What happens to missed calls and after-hours inquiries",
  "How leads are followed up over time",
  "How appointments, estimates, consultations, or bookings are managed",
  "Whether old leads and past customers are re-engaged",
  "How customer and prospect information is stored",
  "How your team tracks lead sources, conversions, and revenue",
  "Where you believe opportunities currently fall through the cracks",
]

const outcomes = [
  {
    label: "Priority",
    body: "A clearer understanding of which revenue opportunities deserve attention first.",
  },
  {
    label: "Context",
    body: "An explanation of what your audit findings actually mean for your business.",
  },
  {
    label: "Opportunity",
    body: "Areas where stronger processes, automation, human support, or better visibility could potentially improve revenue performance.",
  },
  {
    label: "Next Steps",
    body: "A practical discussion of what makes sense to address now, later, or potentially not at all.",
  },
]

export default function RevenueAuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 radial-glow opacity-70" />
        <div className="relative mx-auto max-w-[900px] px-6 pb-24 pt-40 text-center lg:px-12 lg:pb-32 lg:pt-48">
          <Reveal className="flex flex-col items-center">
            <Sunburst className="w-14 text-gold" />
            <Eyebrow className="mt-8">CAROS Revenue Audit Review</Eyebrow>
            <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[0.98] tracking-tight">
              Your audit found the signals.{" "}
              <span className="font-serif font-normal italic text-gold-gradient">
                Now let&apos;s find the revenue behind them.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              Your CAROS Revenue Audit evaluates what we can verify from publicly available data. During your Revenue
              Audit Review, we&apos;ll walk through your results with you, add the business context the internet
              can&apos;t see, and identify where revenue may be getting lost, delayed, or left uncaptured.
            </p>
            <a
              href="#book"
              className="group mt-10 inline-flex h-16 items-center justify-center gap-2 rounded-full bg-gold px-10 text-lg font-semibold text-gold-foreground transition-all duration-300 hover:bg-gold/90"
            >
              Book My Revenue Audit Review
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="mt-5 text-sm text-ink-muted">
              Come with questions. Leave with clarity on where to focus next.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Starting point */}
      <section className="bg-background">
        <div className="mx-auto max-w-[820px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <h2 className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
              Your audit is the starting point.
            </h2>
            <div className="mt-8 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                Public data can tell us a lot about how your business attracts, captures, converts, retains, and tracks
                revenue. But it can&apos;t tell us everything.
              </p>
              <p>
                Your audit may identify missing signals, opportunities, or areas that cannot be verified publicly. Your
                Revenue Audit Review adds the operational context behind those findings.
              </p>
              <p className="font-medium text-foreground">
                This is where we connect what we can see from the outside with what is actually happening inside your
                business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3 — What we'll review together */}
      <section className="border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <Eyebrow>What We&apos;ll Cover</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
              What we&apos;ll review together
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviewCards.map((card, i) => (
              <Reveal
                as="article"
                key={card.title}
                delay={i * 70}
                className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-card p-8 transition-colors duration-300 hover:border-gold/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/12 text-gold">
                  <Sunburst className="w-5" />
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-card-foreground">{card.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{card.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — The internet can't see inside */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 radial-glow opacity-40" />
        <div className="relative mx-auto max-w-[1000px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
              The internet can&apos;t see inside your business.{" "}
              <span className="font-serif font-normal italic text-gold-gradient">We can ask.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              Some of the most important revenue questions cannot be answered through a website, Google Business Profile,
              reviews, social media, or other public sources. During your review, we may ask about:
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {questions.map((q, i) => (
              <Reveal as="li" key={q} delay={i * 50} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="text-ink-foreground/85">{q}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5 — What you'll leave with */}
      <section className="border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <Eyebrow>The Takeaway</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
              What you&apos;ll leave with
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item, i) => (
              <Reveal
                as="article"
                key={item.label}
                delay={i * 70}
                className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-card p-8"
              >
                <span className="eyebrow text-gold">{item.label}</span>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Is CAROS a fit? */}
      <section className="border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-[820px] px-6 py-24 text-center lg:px-12 lg:py-32">
          <Reveal className="flex flex-col items-center">
            <h2 className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
              Is CAROS a fit?{" "}
              <span className="font-serif font-normal italic text-gold-gradient">Maybe.</span>
            </h2>
            <div className="mt-8 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>The Revenue Audit Review is designed to understand your business before recommending anything.</p>
              <p>
                If CAROS can meaningfully improve the way your business captures, converts, retains, or understands
                revenue, we&apos;ll show you where.
              </p>
              <p className="font-medium text-foreground">
                If there isn&apos;t a strong enough business case, we&apos;ll tell you that too.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA + booking form */}
      <section id="book" className="relative scroll-mt-24 overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 radial-glow opacity-70" />
        <div className="relative mx-auto max-w-[1200px] px-6 pb-28 pt-24 lg:px-12 lg:pb-36 lg:pt-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <Reveal>
              <Sunburst className="w-14 text-gold" />
              <h2 className="mt-8 text-balance text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[0.98] tracking-tight">
                You&apos;ve seen what the data says.{" "}
                <span className="font-serif font-normal italic text-gold-gradient">
                  Let&apos;s talk about what it means.
                </span>
              </h2>
              <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
                Bring your Revenue Audit and your knowledge of the business. We&apos;ll bring the questions, context, and
                revenue lens.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <AuditForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
