import { ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/caros/reveal"
import { Eyebrow, AuditButton } from "@/components/caros/ui-bits"

/* ------------------------------------------------------------------ */
/*  1. The revenue problem — not more inquiries, a better system       */
/* ------------------------------------------------------------------ */

const mattersWhen = [
  { label: "Inquiries", detail: "matter when they reach the right person and become intakes." },
  { label: "Consultations", detail: "matter when they turn into signed engagements." },
  { label: "Follow-up", detail: "matters when prospective clients stop slipping between steps." },
  { label: "Referral sources", detail: "matter when you can see which ones actually produce matters." },
]

export function RevenueProblem() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Real Problem</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            Your firm doesn&apos;t need more leads. It needs a{" "}
            <span className="font-serif font-normal italic text-gold-gradient">better system.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A steady flow of inquiries means little if the right prospective clients never reach someone, intake is
            inconsistent, or consultations quietly fail to progress. Revenue in a law practice is created in the space
            between a first inquiry and a signed engagement — and that is exactly where most firms lose it.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {mattersWhen.map((item) => (
              <li key={item.label} className="bg-card p-6 lg:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  <span className="font-semibold text-gold">{item.label}</span>{" "}
                  <span className="text-muted-foreground">{item.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-balance text-2xl font-semibold leading-snug lg:text-3xl">
            CAROS connects your entire client-development process around{" "}
            <span className="text-gold">measurable, engaged-client revenue.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  2. Revenue leaks — legal-specific leakage                          */
/* ------------------------------------------------------------------ */

const leaks = [
  "Prospective clients call and never reach a person.",
  "Web inquiries sit for hours — or days — before anyone responds.",
  "Intake is handled differently depending on who happens to answer.",
  "Consultation requests are booked but never confirmed or followed up.",
  "Prospective clients go quiet after the consultation and are never re-engaged.",
  "Engagement letters go out and quietly stall without a nudge.",
  "Referral sources send business the firm never formally tracks.",
  "Former clients drift out of the firm's relationship ecosystem entirely.",
]

export function RevenueLeaks() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal>
          <Eyebrow tone="danger">Where Revenue Leaks</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-tight">
            The revenue you&apos;re losing is usually{" "}
            <span className="font-serif font-normal italic text-danger">out of sight.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            None of these are failures of talented attorneys. They&apos;re failures of process — the quiet gaps between
            steps where a qualified prospective client simply stops moving forward.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {leaks.map((leak, i) => (
            <Reveal key={leak} delay={i * 60}>
              <div className="flex items-start gap-4 border-b border-border/70 pb-5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger/70" aria-hidden="true" />
                <p className="text-pretty text-lg leading-relaxed text-foreground/85">{leak}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-16 max-w-4xl text-balance text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight">
            Add these together across a year and they represent real, unbilled revenue — and there is usually no report
            that shows it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3. The legal revenue journey — visual flow                         */
/* ------------------------------------------------------------------ */

const journey = [
  "Inquiry",
  "Intake",
  "Screening & Conflicts",
  "Consultation",
  "Engagement",
  "Client Experience",
  "Referral & Future Need",
]

export function RevenueJourney() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>The Client-Development Journey</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            How a prospective client{" "}
            <span className="font-serif font-normal italic text-gold-gradient">becomes a client.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Every matter travels the same path. CAROS makes that path consistent and visible — so you can see where
            prospective clients advance, and where they stop.
          </p>
        </Reveal>

        {/* Journey visual */}
        <Reveal
          delay={160}
          className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink text-ink-foreground"
        >
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              Inquiry to Lasting Relationship
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              End to end
            </span>
          </div>

          <div className="p-6 lg:p-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
              {journey.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold">
                    {step}
                  </span>
                  {i < journey.length - 1 ? (
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-gold lg:rotate-0" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center rounded-xl border border-gold/40 bg-gold/15 py-6 text-center">
              <span className="px-4 font-display text-xl uppercase tracking-[0.18em] text-gold lg:text-2xl">
                Engaged Clients &amp; Firm Revenue
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 lg:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">A note on qualification.</span> Screening a matter may
              involve eligibility, conflicts of interest, jurisdiction, practice-area fit, and other criteria your firm
              defines. CAROS helps you capture information and keep each step moving consistently. It does not perform
              legal judgment, evaluate the merits of a matter, or provide legal advice — those decisions always remain
              with your attorneys.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  4. Prospective client intake — major section                      */
/* ------------------------------------------------------------------ */

const intakeCapabilities = [
  {
    title: "Inquiry capture",
    body: "Calls, web forms, chat, and referral introductions are captured in one place and tagged to their source — nothing lands in a voicemail box or an unread inbox.",
  },
  {
    title: "Prompt, consistent response",
    body: "Every prospective client receives a timely, professional first response, so a qualified matter is never lost to a firm that simply replied first.",
  },
  {
    title: "Structured intake information",
    body: "Collect the information your firm needs at intake in a consistent format, routed to the right person for review — regardless of who first answers.",
  },
  {
    title: "Consultation scheduling",
    body: "Prospective clients can book consultations against your firm's real availability, with confirmations that reduce no-shows.",
  },
  {
    title: "Reminders & follow-up",
    body: "Automated, respectful reminders and follow-up keep consultations confirmed and engagement steps from stalling.",
  },
  {
    title: "Status visibility",
    body: "See exactly where every prospective client stands — new inquiry, awaiting intake, consultation booked, engagement pending — at a glance.",
  },
  {
    title: "Source attribution",
    body: "Know which referral sources, campaigns, and practice areas each prospective client came from, all the way through to engagement.",
  },
  {
    title: "Prospective-client communication",
    body: "Professional, on-brand communication throughout intake, so the experience reflects the standard of the firm from the first message.",
  },
]

export function Intake() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Prospective Client Intake</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            A consistent intake experience,{" "}
            <span className="font-serif font-normal italic text-gold-gradient">every single time.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Intake is where the most revenue is won or lost. CAROS helps your firm deliver the same considered,
            professional experience to every prospective client — not the version that depends on how busy the office
            happened to be that morning.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {intakeCapabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60} className="rounded-2xl border border-border bg-card p-8">
              <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight">{cap.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{cap.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  5. Estate planning — stewardship & long-term relationships         */
/* ------------------------------------------------------------------ */

const estateUseCases = [
  "Wills",
  "Revocable & irrevocable trusts",
  "Powers of attorney",
  "Healthcare directives",
  "Estate-plan consultations",
  "Trust administration",
  "Probate inquiries",
  "Estate-plan reviews",
  "Life-event follow-up",
  "Existing-client relationships",
  "Family & multi-generational referrals",
  "Annual review reminders",
]

export function EstatePlanning() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Estate Planning &amp; Trusts</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
              Relationships measured in{" "}
              <span className="font-serif font-normal italic text-gold-gradient">generations, not matters.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Estate planning is built on preparation, stewardship, and trust. A single engagement often opens the door
              to decades of thoughtful work — plan reviews as life changes, trust administration, guidance for the next
              generation, and referrals across a family.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              CAROS helps your firm stay present through all of it: organizing follow-up around real life events,
              prompting timely plan reviews, and keeping existing clients and their families connected to the attorneys
              they already trust — so the relationship continues long after the documents are signed.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Where CAROS supports the practice
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {estateUseCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="leading-relaxed text-foreground/85">{useCase}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  6. Revenue intelligence — dark dashboard                           */
/* ------------------------------------------------------------------ */

const metrics = [
  { value: "38", label: "New Inquiries" },
  { value: "24", label: "Intakes Completed" },
  { value: "15", label: "Consultations" },
  { value: "9", label: "Engagements" },
  { value: "$142,500", label: "Matter Value" },
  { value: "6.1x", label: "Marketing ROI", highlight: true },
]

const questions = [
  "Which referral sources generate consultations?",
  "Which sources produce engaged clients — not just inquiries?",
  "Which practice areas are actually driving revenue?",
  "Where are prospective clients dropping out of intake?",
  "How quickly are inquiries receiving a response?",
  "How many consultation opportunities fail to progress?",
  "Which former clients may have an appropriate future need?",
  "Where is revenue being lost between inquiry and engagement?",
]

export function RevenueIntelligence() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-60" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>Revenue Intelligence</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
            See what&apos;s actually{" "}
            <span className="font-serif font-normal italic text-gold-gradient">building the practice.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Most firms can tell you how many inquiries came in. Far fewer can tell you which sources and practice areas
            produce engaged clients and revenue. CAROS connects the business side of the practice into a view a managing
            partner can actually use.
          </p>
        </Reveal>

        {/* Mock dashboard */}
        <Reveal delay={60} className="mt-14 overflow-hidden rounded-2xl border border-ink-border bg-ink/60">
          <div className="flex items-center justify-between border-b border-ink-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              Illustrative CAROS Dashboard
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Example data
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-ink-border md:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="bg-ink p-8 lg:p-10">
                <p
                  className={`text-[clamp(2rem,4vw,3.25rem)] font-display leading-none ${
                    m.highlight ? "text-gold-gradient" : "text-ink-foreground"
                  }`}
                >
                  {m.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.12em] text-ink-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted/70">
            Example data shown for demonstration purposes.
          </p>
        </Reveal>

        {/* Revenue recovered callout */}
        <Reveal delay={100} className="mt-10 rounded-2xl border border-gold/40 bg-gold/10 p-8 lg:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">Revenue Recovered by CAROS</p>
          <p className="mt-4 max-w-3xl text-balance text-2xl font-semibold leading-snug text-ink-foreground lg:text-3xl">
            Matters that would have been lost to a missed call or a follow-up that never happened — captured, tracked,
            and returned to the firm.
          </p>
        </Reveal>

        {/* Business questions */}
        <Reveal delay={120}>
          <p className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
            Questions CAROS helps you answer
          </p>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {questions.map((q, i) => (
            <Reveal key={q} delay={i * 60}>
              <p className="border-b border-ink-border pb-5 text-pretty text-lg font-semibold leading-snug text-ink-foreground/90">
                {q}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  7. Client experience — high-touch, human-first                     */
/* ------------------------------------------------------------------ */

const experiencePoints = [
  "Timely, professional responses that reflect the standard of the firm.",
  "Communication delivered under your firm's name and voice.",
  "Respectful reminders that keep consultations and next steps on track.",
  "Clear status for every prospective client, so nothing is forgotten.",
  "Human answering and routing to the right person on your team.",
]

export function ClientExperience() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>Client Experience</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight">
              Technology that supports a{" "}
              <span className="font-serif font-normal italic text-gold-gradient">high-touch practice.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Prospective clients choose an attorney they trust. CAROS is built to protect that — handling the
              responsiveness, reminders, and organization that make a firm feel attentive, while keeping every
              relationship firmly in the hands of your attorneys and staff.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              CAROS does not practice law and never replaces the attorney-client relationship. It removes the
              administrative friction so your people can spend their time where it matters — with clients.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <ul className="space-y-5">
              {experiencePoints.map((point) => (
                <li key={point} className="flex items-start gap-4 border-b border-border/70 pb-5 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-lg leading-relaxed text-foreground/85">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  8. The operating system — what CAROS connects for a firm           */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    label: "Client Acquisition",
    question: "Where do our prospective clients come from?",
    items: ["Call, form & chat capture", "Referral-source intake", "Website & campaign tracking", "Source attribution"],
  },
  {
    label: "Intake & Revenue Operations",
    question: "What happens after they reach us?",
    items: [
      "Consistent intake workflows",
      "Consultation scheduling",
      "Engagement follow-up",
      "Reminders & nurturing",
    ],
  },
  {
    label: "Client Success & Relationships",
    question: "What happens after the matter?",
    items: ["Review requests", "Family & client referrals", "Plan-review reminders", "Former-client re-engagement"],
  },
  {
    label: "Business Intelligence",
    question: "Is any of this building the firm?",
    items: ["Source & practice-area reporting", "Intake-stage visibility", "Response-time tracking", "Marketing ROI"],
  },
  {
    label: "Integrations",
    question: "How does it fit what we use?",
    items: ["Phone, email & SMS", "Calendars & scheduling", "Website & intake forms", "Compatible firm tools"],
  },
]

export function OperatingSystem() {
  return (
    <section className="bg-ink py-28 text-ink-foreground lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow>One Connected System</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4rem)] font-display leading-[0.98] tracking-tight text-ink-foreground">
            The operating system{" "}
            <span className="font-serif font-normal italic text-gold-gradient">behind the practice.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            CAROS connects the parts of client development that usually live in separate tools — and the compatible
            tools you already rely on — into one system your firm can actually run.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.label} delay={i * 60} className="flex flex-col bg-ink p-8 lg:p-10">
              <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink-foreground">{pillar.label}</h3>
              <p className="mt-2 font-serif text-lg italic text-ink-muted">{pillar.question}</p>
              <ul className="mt-6 space-y-3">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
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

/* ------------------------------------------------------------------ */
/*  9. Ethics & professional responsibility — conservative             */
/* ------------------------------------------------------------------ */

export function Ethics() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Reveal>
          <Eyebrow tone="muted">Professional Responsibility</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3.25rem)] font-display leading-[1.02] tracking-tight">
            Built to respect your{" "}
            <span className="font-serif font-normal italic text-gold-gradient">professional obligations.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            CAROS is a customer-acquisition and revenue-operations system. It is not legal practice-management software,
            and it does not provide legal advice or perform legal judgment. Decisions about eligibility, conflicts,
            jurisdiction, and practice-area fit always remain with the firm and its attorneys.
          </p>
          <p>
            CAROS does not guarantee compliance with attorney ethics rules, confidentiality or privilege obligations,
            conflict-of-interest rules, bar advertising rules, or data-retention requirements. Every workflow must be
            configured according to your firm&apos;s jurisdiction, policies, professional obligations, and technology
            requirements.
          </p>
          <p>
            We build conservatively and work alongside your team so the system reflects the way your firm is required —
            and chooses — to operate.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  10. FAQ — also powers FAQPage structured data                      */
/* ------------------------------------------------------------------ */

export const FAQ_ITEMS = [
  {
    q: "Is CAROS legal practice-management software?",
    a: "No. CAROS is a customer-acquisition and revenue-operations system that helps firms capture inquiries, run consistent intake, schedule consultations, and follow up through engagement. It is not a case- or matter-management system and does not provide legal advice.",
  },
  {
    q: "Does CAROS decide which prospective clients a firm should take?",
    a: "No. CAROS helps you capture information and keep each step of intake moving consistently. All decisions about eligibility, conflicts, jurisdiction, and practice-area fit remain entirely with your attorneys.",
  },
  {
    q: "How does CAROS help estate-planning and trusts-and-estates practices specifically?",
    a: "CAROS supports the long-term nature of estate planning — organizing follow-up around life events, prompting plan reviews, and keeping existing clients and their families connected to the attorneys they trust, so relationships continue well beyond the initial engagement.",
  },
  {
    q: "Will CAROS replace the attorney-client relationship with automation?",
    a: "No. CAROS is designed to support a high-touch professional experience. It handles responsiveness, reminders, and organization, while every client relationship stays firmly with your attorneys and staff.",
  },
  {
    q: "Does CAROS guarantee compliance with bar and ethics rules?",
    a: "No. CAROS does not guarantee compliance with ethics rules, confidentiality or privilege requirements, conflict rules, advertising rules, or data-retention requirements. Workflows must be configured according to your firm's jurisdiction, policies, and professional obligations.",
  },
  {
    q: "What does a CAROS Revenue Audit for a law firm involve?",
    a: "We review how inquiries are captured, how quickly they're answered, how intake and consultations are handled, and where prospective clients drop out — then show you where revenue is likely leaking between inquiry and engagement.",
  },
]

export function Faq() {
  return (
    <section className="bg-muted/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Reveal>
          <Eyebrow>Common Questions</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3.25rem)] font-display leading-[1.02] tracking-tight">
            Answers for firms{" "}
            <span className="font-serif font-normal italic text-gold-gradient">considering CAROS.</span>
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 40} as="details" className="group px-6 py-6 lg:px-8">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-lg font-semibold leading-snug text-foreground">{item.q}</span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
