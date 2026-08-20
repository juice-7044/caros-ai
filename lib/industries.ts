import { PRODUCT_TAGLINE } from "@/lib/site"

/* ============================================================================
   CAROS industry landing-page content model.

   Product-identical sections (capture, operating-system pillars, customer
   experience, scaling) are generated from trade-specific vocabulary tokens so
   they read in the trade's language. The high-signal, differentiating sections
   (hero, revenue problem, revenue leaks, the revenue journey, the signature
   recurring-revenue theme, dashboard metrics, business questions, and FAQ) are
   authored bespoke per trade below.
   ========================================================================== */

export type Emphasized = { text: string; gold: string }
export type Metric = { value: string; label: string; highlight?: boolean }
export type Capability = { title: string; body: string }
export type Pillar = { label: string; question: string; items: string[] }
export type QA = { q: string; a: string }
export type IndustryVisualTheme = "clinical" | "competitive" | "luxury" | "discreet"

export interface IndustryContent {
  slug: string
  name: string
  // Hero
  heroEyebrow: string
  heroTitle: string
  heroTitleSerif: string
  heroSub: string
  visualTheme?: IndustryVisualTheme
  trustRow: string[]
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]
  // 1. Revenue problem
  problemTitle: string
  problemTitleSerif: string
  problemIntro: string
  mattersWhen: { label: string; detail: string }[]
  problemClose: Emphasized
  // 2. Revenue leaks
  leaksIntro: string
  leaks: string[]
  leaksClose: string
  // 3. Revenue journey
  journeyIntro: string
  journey: string[]
  journeyEndLabel: string
  // 4. Capture (built)
  captureTitle: string
  captureTitleSerif: string
  captureIntro: string
  captureCapabilities: Capability[]
  // 5. Signature recurring-revenue theme (bespoke)
  signatureEyebrow: string
  signatureTitle: string
  signatureTitleSerif: string
  signatureBody: string[]
  signatureListLabel: string
  signatureUseCases: string[]
  // 6. Revenue intelligence
  metrics: Metric[]
  questions: string[]
  recoveredText: string
  // 7. Customer experience (built)
  experienceTitle: string
  experienceTitleSerif: string
  experienceIntro: string[]
  experiencePoints: string[]
  // 8. Operating system (built)
  pillars: Pillar[]
  // 9. Scaling with less (built, carries the tagline)
  scalingTitle: string
  scalingTitleSerif: string
  scalingBody: string[]
  scalingPoints: string[]
  // 10. FAQ
  faq: QA[]
  // CTA
  ctaHeadline: string
  ctaSub: string
}

/* --------------------------------------------------------------------------
   Trade vocabulary tokens — drive the product-constant sections so they read
   in each trade's real language rather than generic "customer/job" wording.
   -------------------------------------------------------------------------- */

interface Tokens {
  trade: string
  /** Optional display name for nav/grid/schema when it differs from the grammatical `trade`. */
  label?: string
  slug: string
  customers: string // plural, e.g. "homeowners"
  customer: string // singular
  job: string // "job" | "project"
  jobs: string
  estimate: string // "estimate" | "quote" | "inspection" | "bid"
  estimates: string
  tech: string // "crew" | "technician" | "electrician"
  techs: string
  site: string // "job site" | "property" | "home"
  callWord: string // "service call" | "call" | "inquiry"
  bookLabel: string // "booked jobs" | "signed projects"
}

/* --------------------------------------------------------------------------
   Builders for the product-constant sections.
   -------------------------------------------------------------------------- */

function buildCapture(t: Tokens): Capability[] {
  return [
    {
      title: "Every lead in one place",
      body: `Phone calls, web forms, chat, Google and Facebook leads, and referrals all land in one inbox tagged to their source — no ${t.callWord} lost to a full voicemail box or an unread email.`,
    },
    {
      title: "Instant first response",
      body: `New ${t.customers} get an immediate, professional reply by text and email, so you win the ${t.jobs} that go to whoever answers first instead of losing them to the next company on the list.`,
    },
    {
      title: "Missed-call text back",
      body: `When a call slips through during a ${t.job} or after hours, CAROS texts the caller back automatically so the ${t.callWord} isn't gone for good.`,
    },
    {
      title: "Human answering under your name",
      body: `Real people answer, qualify, and route ${t.customers} under your company's name when your team is on a ${t.site} — booking the appointment instead of taking a message.`,
    },
    {
      title: `${cap(t.estimate)} follow-up`,
      body: `Every ${t.estimate} is tracked and followed up automatically with respectful reminders until the ${t.customer} decides — so quotes stop dying in silence.`,
    },
    {
      title: "Online booking & scheduling",
      body: `${cap(t.customers)} can book against your real availability, with confirmations and reminders that cut no-shows and keep the schedule full.`,
    },
    {
      title: "Pipeline visibility",
      body: `See exactly where every ${t.customer} stands — new lead, ${t.estimate} sent, scheduled, or ${t.bookLabel} — at a glance, without digging through notebooks or texts.`,
    },
    {
      title: "Source attribution",
      body: `Know which ads, campaigns, and referral sources produced each ${t.callWord}, all the way through to ${t.bookLabel} and revenue.`,
    },
  ]
}

function buildExperience(t: Tokens): { intro: string[]; points: string[] } {
  return {
    intro: [
      `${cap(t.customers)} choose a company they trust to show up and do good work. CAROS protects that — handling the responsiveness, reminders, and organization that make you feel dependable, while your ${t.techs} stay focused on the work itself.`,
      `CAROS never replaces your people. It removes the busywork around the ${t.job} so your team can spend time where it matters — with ${t.customers} and on the ${t.site}.`,
    ],
    points: [
      `Fast, professional responses that make ${t.customers} feel taken care of from the first contact.`,
      "Every message sent under your company's name, brand, and voice.",
      `Respectful reminders that keep appointments and ${t.estimates} on track.`,
      `Clear status on every ${t.customer}, so nothing gets forgotten in the rush of the season.`,
      "Human answering and routing to the right person on your team.",
    ],
  }
}

function buildPillars(t: Tokens, acquisitionItems: string[]): Pillar[] {
  return [
    {
      label: "Customer Acquisition",
      question: "Where are our customers coming from?",
      items: acquisitionItems,
    },
    {
      label: "Revenue Operations",
      question: "What happens after they reach us?",
      items: [
        `${cap(t.estimate)} follow-up & nudging`,
        "Appointment booking workflows",
        "Automated lead nurturing",
        "Digital estimates, signatures & invoicing",
      ],
    },
    {
      label: "Customer Success",
      question: `What happens after the ${t.job}?`,
      items: [
        "Review requests & responses",
        `Referral campaigns after every ${t.job}`,
        "Repeat-service reminders",
        "Dormant-customer reactivation",
      ],
    },
    {
      label: "Business Intelligence",
      question: "Is any of this making money?",
      items: [
        "Lead-source attribution",
        "Booked-revenue reporting",
        "Marketing ROI by campaign",
        "Weekly performance reports",
      ],
    },
    {
      label: "Integrations",
      question: "How does it fit what we use?",
      items: [
        "Phone, email & SMS",
        "Calendars & scheduling",
        "Website & advertising sources",
        "Payments & compatible field tools",
      ],
    },
  ]
}

function buildScaling(t: Tokens): { body: string[]; points: string[] } {
  return {
    body: [
      `The hardest question in a growing ${t.trade.toLowerCase()} business isn't whether to grow — it's when to add people, and when your systems should carry the load instead. Hire too early and payroll eats the margin. Hire too late and ${t.customers} slip through the cracks while everyone is buried.`,
      `CAROS is built on a simple principle: ${PRODUCT_TAGLINE} You capture more ${t.callWord}s, follow up on every ${t.estimate}, and keep ${t.customers} moving — without adding an office person for every jump in volume. When it is genuinely time to hire, you will have the numbers to know it.`,
    ],
    points: [
      `Answer more ${t.callWord}s without adding front-office headcount too early.`,
      `Automation handles the follow-up and reminders your team has no time for.`,
      "Humans stay on the high-value conversations that actually close work.",
      "Clear numbers tell you when to add staff — not too early, not too late.",
    ],
  }
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/* --------------------------------------------------------------------------
   Assemble a full IndustryContent from bespoke content + built sections.
   -------------------------------------------------------------------------- */

type Bespoke = Omit<
  IndustryContent,
  | "slug"
  | "name"
  | "captureTitle"
  | "captureTitleSerif"
  | "captureIntro"
  | "captureCapabilities"
  | "experienceIntro"
  | "experiencePoints"
  | "pillars"
  | "scalingTitle"
  | "scalingTitleSerif"
  | "scalingBody"
  | "scalingPoints"
> & {
  acquisitionItems: string[]
  /* Optional overrides — default to the field-service wording when omitted, so
     non-field trades (real estate, travel, events) can supply natural titles. */
  captureTitle?: string
  captureTitleSerif?: string
  captureIntro?: string
  scalingTitle?: string
  scalingTitleSerif?: string
}

function make(t: Tokens, b: Bespoke): IndustryContent {
  const exp = buildExperience(t)
  const scaling = buildScaling(t)
  const {
    acquisitionItems,
    captureTitle,
    captureTitleSerif,
    captureIntro,
    scalingTitle,
    scalingTitleSerif,
    ...rest
  } = b
  return {
    slug: t.slug,
    name: t.label ?? t.trade,
    ...rest,
    captureTitle: captureTitle ?? "Capture every lead, and turn it into a",
    captureTitleSerif: captureTitleSerif ?? "booked job.",
    captureIntro:
      captureIntro ??
      `Most ${t.trade.toLowerCase()} revenue is won or lost in the first few minutes and the first few follow-ups. CAROS makes sure every ${t.callWord}, form, and referral is captured, answered fast, and moved toward a ${t.bookLabel.replace(/s$/, "")} — automatically.`,
    captureCapabilities: buildCapture(t),
    experienceIntro: exp.intro,
    experiencePoints: exp.points,
    pillars: buildPillars(t, acquisitionItems),
    scalingTitle: scalingTitle ?? "Grow your revenue without growing",
    scalingTitleSerif: scalingTitleSerif ?? "the chaos.",
    scalingBody: scaling.body,
    scalingPoints: scaling.points,
  }
}

/* ==========================================================================
   ROOFING
   ========================================================================== */

const roofing = make(
  {
    trade: "Roofing",
    slug: "roofing",
    customers: "homeowners",
    customer: "homeowner",
    job: "job",
    jobs: "jobs",
    estimate: "estimate",
    estimates: "estimates",
    tech: "crew",
    techs: "crews",
    site: "roof",
    callWord: "storm call",
    bookLabel: "signed jobs",
  },
  {
    heroEyebrow: "Industry Solution — Roofing",
    heroTitle: "When the storm hits, the revenue goes to whoever",
    heroTitleSerif: "answers first.",
    heroSub:
      "Roofing revenue is won in the hours after a storm and lost in the weeks after an estimate. CAROS makes sure every call is answered, every inspection is booked, and every estimate is followed up — so leads don't go to the truck that beat you to the door.",
    trustRow: ["Storm Response", "Retail & Insurance", "Residential Re-Roofs", "Repairs", "Commercial"],
    metaTitle: "CAROS for Roofing Companies | Capture Storm Calls & Follow Up Estimates",
    metaDescription:
      "CAROS helps roofing contractors answer every storm call, book more inspections, follow up on every estimate, and track which lead sources produce signed jobs — the revenue operating system built for roofers.",
    keywords: [
      "roofing lead management",
      "roofing estimate follow up",
      "storm response roofing software",
      "roofing crm",
      "roofing contractor marketing",
      "insurance claim roofing leads",
      "roofing appointment booking",
      "roofing missed call text back",
      "roofing sales pipeline",
      "roofing marketing roi",
    ],
    problemTitle: "You don't need more storm leads. You need to",
    problemTitleSerif: "stop losing them.",
    problemIntro:
      "After a hail or wind event, the phones ring for everyone. The roofer who wins isn't the one with the most leads — it's the one who answers, inspects, quotes, and follows up before the homeowner signs with someone else. That race is where roofing revenue is really decided.",
    mattersWhen: [
      { label: "Storm calls", detail: "matter when someone answers them before the homeowner calls the next roofer." },
      { label: "Inspections", detail: "matter when they're actually scheduled instead of promised and forgotten." },
      { label: "Estimates", detail: "matter when they're followed up until the homeowner decides." },
      { label: "Ad spend", detail: "matter when you can see which campaigns produce signed roofs." },
    ],
    problemClose: {
      text: "CAROS connects your whole storm-to-signature process around",
      gold: "measurable, signed-roof revenue.",
    },
    leaksIntro:
      "None of these are failures of good roofers. They're failures of process — the quiet gaps where a ready-to-buy homeowner simply stops moving toward your company.",
    leaks: [
      "Storm calls hit voicemail while your crews are up on a roof.",
      "Web leads sit for hours before anyone calls back — and the homeowner already booked an inspection elsewhere.",
      "Inspections get promised on the phone but never make it onto the schedule.",
      "Estimates go out and the homeowner goes quiet, with no follow-up.",
      "Insurance-claim jobs stall waiting on paperwork nobody is chasing.",
      "Repair customers never hear from you again about the full re-roof they'll eventually need.",
      "Referral and door-knock leads never get logged or tracked.",
      "Past customers forget your name by the time the next storm rolls through.",
    ],
    leaksClose:
      "Add up the missed calls and dead estimates across one storm season and it's often more revenue than a new truck and crew would bring in — and no report shows it.",
    journeyIntro:
      "Every roof follows the same path from first call to final invoice. CAROS makes that path consistent and visible — so you can see where homeowners move forward and where they stall.",
    journey: ["Storm Call", "Inspection", "Estimate", "Insurance / Approval", "Signed Job", "Install", "Reviews & Referrals"],
    journeyEndLabel: "Signed Roofs & Repeat Revenue",
    signatureEyebrow: "Storm & Insurance Revenue",
    signatureTitle: "The revenue after the storm is",
    signatureTitleSerif: "yours to keep.",
    signatureBody: [
      "A single storm can generate a season's worth of work — but only if you can absorb the surge without dropping calls, losing estimates, or letting insurance jobs stall. Most roofers simply can't answer fast enough when it matters most.",
      "CAROS handles the surge with you: answering every storm call, booking inspections, following up on estimates, and keeping insurance-claim jobs moving through approval. When the next event hits, you're the company that's ready — not the one playing catch-up.",
    ],
    signatureListLabel: "Where CAROS keeps roofing revenue moving",
    signatureUseCases: [
      "Storm-response call capture",
      "Free-inspection booking",
      "Estimate follow-up",
      "Insurance-claim coordination",
      "Adjuster & approval tracking",
      "Repair-to-replacement follow-up",
      "Financing follow-up",
      "Warranty & maintenance reminders",
      "Neighborhood / referral campaigns",
      "Review generation after install",
      "Past-customer reactivation",
      "Commercial re-roof pipeline",
    ],
    metrics: [
      { value: "61", label: "Storm Calls" },
      { value: "42", label: "Inspections Booked" },
      { value: "28", label: "Estimates Sent" },
      { value: "17", label: "Signed Jobs" },
      { value: "$318,000", label: "Booked Revenue" },
      { value: "7.4x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which ad campaigns actually produce signed roofs?",
      "How fast are we answering storm calls?",
      "How many estimates are still waiting on follow-up?",
      "Which insurance jobs are stuck in approval?",
      "How many inspections converted to signed jobs?",
      "Which neighborhoods produced the most work this season?",
      "How many past customers are due for a re-roof?",
      "Where are we losing revenue between call and contract?",
    ],
    recoveredText:
      "Storm calls that would have gone to voicemail and estimates that would have died in silence — captured, followed up, and turned into signed roofs.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "on the roof.",
    faq: [
      {
        q: "Is CAROS roofing estimating or measurement software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures leads, books inspections, follows up on estimates, and tracks which sources produce signed jobs. It works alongside the estimating and measurement tools you already use.",
      },
      {
        q: "How does CAROS help during a storm surge?",
        a: "CAROS answers and texts back every incoming call, books inspections against your real availability, and follows up on estimates automatically — so a sudden spike in demand doesn't turn into a pile of missed calls and dead quotes.",
      },
      {
        q: "Can CAROS help with insurance-claim jobs?",
        a: "Yes. CAROS keeps claim jobs moving by tracking each one's status and prompting the follow-up needed through inspection, adjuster approval, and scheduling — so jobs don't stall waiting on a call nobody made.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles the overflow and the after-hours calls, and automates the follow-up your team has no time for, so your people focus on selling and running jobs. It helps you scale without adding office headcount too early.",
      },
      {
        q: "Does CAROS work with my current CRM and phone system?",
        a: "CAROS connects with common phone, calendar, website, and field tools, and can serve as your central system or work alongside what you have. We configure the integrations for you during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a roofing company involve?",
        a: "We review how your calls are answered, how fast leads get a response, how estimates are followed up, and where jobs stall — then show you exactly where revenue is leaking between the first storm call and the signed contract.",
      },
    ],
    ctaHeadline: "See where your roofing revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where storm calls, inspections, and estimates are slipping away — and what it would take to capture them before the next storm.",
    acquisitionItems: ["Storm & service call capture", "Google & Facebook lead capture", "Door-knock & referral logging", "Source attribution"],
  },
)

/* ==========================================================================
   HVAC
   ========================================================================== */

const hvac = make(
  {
    trade: "HVAC",
    slug: "hvac",
    customers: "homeowners",
    customer: "homeowner",
    job: "call",
    jobs: "calls",
    estimate: "quote",
    estimates: "quotes",
    tech: "technician",
    techs: "technicians",
    site: "home",
    callWord: "service call",
    bookLabel: "booked calls",
  },
  {
    heroEyebrow: "Industry Solution — HVAC",
    heroTitle: "Your busiest season is also where you",
    heroTitleSerif: "leak the most revenue.",
    heroSub:
      "When the first heat wave hits, the calls come faster than anyone can answer. CAROS captures every service call, books more tune-ups, follows up on every replacement quote, and keeps maintenance plans renewing — so peak season fills your schedule instead of your voicemail.",
    trustRow: ["Service & Repair", "Replacements", "Maintenance Plans", "Residential", "Light Commercial"],
    metaTitle: "CAROS for HVAC Contractors | Capture Calls & Grow Maintenance Plans",
    metaDescription:
      "CAROS helps HVAC companies answer every service call, book more tune-ups, follow up on replacement quotes, and renew maintenance agreements — the revenue operating system built for HVAC contractors.",
    keywords: [
      "hvac lead management",
      "hvac maintenance plan software",
      "hvac call booking",
      "hvac replacement quote follow up",
      "hvac crm",
      "hvac marketing roi",
      "hvac missed call text back",
      "hvac tune up campaign",
      "hvac dispatch scheduling",
      "hvac service agreement renewals",
    ],
    problemTitle: "You don't need more calls in July. You need to",
    problemTitleSerif: "answer the ones you get.",
    problemIntro:
      "In peak season, demand isn't the problem — capacity is. The calls that go to voicemail, the tune-ups that never get scheduled, and the replacement quotes that never get a follow-up are pure lost revenue, and they pile up exactly when you're too busy to notice.",
    mattersWhen: [
      { label: "Service calls", detail: "matter when a person answers before the homeowner calls the next company." },
      { label: "Tune-ups", detail: "matter when they're booked and remembered, not lost in a busy week." },
      { label: "Replacement quotes", detail: "matter when they're followed up until the homeowner decides." },
      { label: "Maintenance plans", detail: "matter when they renew on time instead of quietly lapsing." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-comfort process around",
      gold: "measurable, recurring revenue.",
    },
    leaksIntro:
      "None of these are failures of good technicians. They're failures of process — the gaps where a ready customer stops moving before the work is booked.",
    leaks: [
      "Service calls hit voicemail while every tech is out on a job.",
      "After-hours emergency calls go to a competitor with a 24/7 line.",
      "Tune-up requests get promised over the phone and never scheduled.",
      "Replacement quotes go out and the homeowner goes silent.",
      "Maintenance agreements lapse because no one sent the renewal.",
      "Repair customers are never offered the plan that keeps them coming back.",
      "Aging systems you serviced years ago never get a replacement follow-up.",
      "Past customers forget your name by the next season change.",
    ],
    leaksClose:
      "Add up the missed calls, lapsed plans, and dead quotes across one cooling season and it usually dwarfs the cost of the system that would have captured them.",
    journeyIntro:
      "Every HVAC customer follows the same path from first call to renewed plan. CAROS makes that path consistent and visible — so you can see where homeowners move forward and where they drop off.",
    journey: ["Service Call", "Dispatch / Booking", "Diagnosis", "Repair or Quote", "Replacement", "Maintenance Plan", "Renewals & Referrals"],
    journeyEndLabel: "Booked Work & Recurring Revenue",
    signatureEyebrow: "Maintenance Plans & Seasonal Demand",
    signatureTitle: "Recurring revenue that carries you through",
    signatureTitleSerif: "the slow months.",
    signatureBody: [
      "Maintenance agreements are the difference between an HVAC business that scrambles every season and one that starts each month with revenue already on the books. But plans only work if they're sold consistently, renewed on time, and fulfilled with tune-up reminders that actually go out.",
      "CAROS keeps the whole recurring engine running: offering plans at the right moment, sending renewal and tune-up reminders automatically, and re-engaging the customers whose plans lapsed — so recurring revenue grows instead of leaking away between seasons.",
    ],
    signatureListLabel: "Where CAROS keeps HVAC revenue moving",
    signatureUseCases: [
      "After-hours call capture",
      "Tune-up scheduling",
      "Replacement-quote follow-up",
      "Maintenance-plan enrollment",
      "Plan renewal reminders",
      "Seasonal tune-up campaigns",
      "Financing follow-up",
      "Aging-system replacement follow-up",
      "Repair-to-plan conversion",
      "Review generation",
      "Lapsed-plan reactivation",
      "Light-commercial pipeline",
    ],
    metrics: [
      { value: "88", label: "Service Calls" },
      { value: "63", label: "Calls Booked" },
      { value: "21", label: "Replacement Quotes" },
      { value: "34", label: "Plans Renewed" },
      { value: "$247,000", label: "Booked Revenue" },
      { value: "6.8x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "How many calls went to voicemail this week?",
      "Which campaigns produce booked calls, not just clicks?",
      "How many replacement quotes are waiting on follow-up?",
      "How many maintenance plans are due to renew?",
      "How many lapsed plans could we win back?",
      "Which techs' quotes convert best?",
      "How many aging systems are due for replacement outreach?",
      "Where are we losing revenue between the call and the booked job?",
    ],
    recoveredText:
      "After-hours calls that would have gone to a competitor and maintenance plans that would have quietly lapsed — captured, renewed, and turned into recurring revenue.",
    experienceTitle: "Technology that keeps your techs",
    experienceTitleSerif: "in the field.",
    faq: [
      {
        q: "Is CAROS HVAC dispatch or field-service software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, books appointments, follows up on quotes, and grows maintenance plans. It works alongside the dispatch and field-service tools you already run.",
      },
      {
        q: "How does CAROS help during peak season?",
        a: "CAROS answers and texts back every call, books appointments against your real availability, and automates quote follow-up — so a July call surge fills your schedule instead of your voicemail.",
      },
      {
        q: "Can CAROS grow our maintenance-plan revenue?",
        a: "Yes. CAROS offers plans at the right moments, sends renewal and tune-up reminders automatically, and re-engages lapsed members — turning maintenance agreements into dependable recurring revenue.",
      },
      {
        q: "Will this replace my office or dispatch staff?",
        a: "No. CAROS handles overflow and after-hours calls and automates the follow-up your team can't get to, so your people focus on booking and running calls. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our existing systems?",
        a: "CAROS connects with common phone, calendar, website, and field-service tools, and can be your central system or complement what you already use. We handle the integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for an HVAC company involve?",
        a: "We review how calls are answered, how fast leads get a response, how quotes and plans are followed up, and where work stalls — then show you exactly where revenue is leaking across the season.",
      },
    ],
    ctaHeadline: "See where your HVAC revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls, quotes, and maintenance plans are slipping away — and what it would take to capture them before your next peak season.",
    acquisitionItems: ["Service & emergency call capture", "Google & Facebook lead capture", "Seasonal tune-up campaigns", "Source attribution"],
  },
)

/* ==========================================================================
   PLUMBING
   ========================================================================== */

const plumbing = make(
  {
    trade: "Plumbing",
    slug: "plumbing",
    customers: "homeowners",
    customer: "homeowner",
    job: "call",
    jobs: "calls",
    estimate: "estimate",
    estimates: "estimates",
    tech: "technician",
    techs: "technicians",
    site: "home",
    callWord: "service call",
    bookLabel: "booked calls",
  },
  {
    heroEyebrow: "Industry Solution — Plumbing",
    heroTitle: "When a pipe bursts, they call whoever",
    heroTitleSerif: "picks up first.",
    heroSub:
      "Plumbing emergencies don't wait, and neither do customers. CAROS captures every service call, texts back missed calls instantly, books more jobs, and turns one-time repairs into recurring service — so urgent calls become booked work instead of lost revenue.",
    trustRow: ["Emergency Service", "Drain & Sewer", "Repair & Repipe", "Water Heaters", "Service Agreements"],
    metaTitle: "CAROS for Plumbing Companies | Capture Emergency Calls & Book More Jobs",
    metaDescription:
      "CAROS helps plumbing contractors answer every emergency call, text back missed calls, book more service jobs, follow up on estimates, and grow service agreements — the revenue operating system built for plumbers.",
    keywords: [
      "plumbing lead management",
      "plumbing call booking",
      "emergency plumbing leads",
      "plumbing crm",
      "plumbing estimate follow up",
      "plumbing marketing roi",
      "plumbing missed call text back",
      "plumbing service agreement",
      "plumbing dispatch scheduling",
      "plumber marketing",
    ],
    problemTitle: "You don't need more emergencies. You need to",
    problemTitleSerif: "catch every call.",
    problemIntro:
      "A plumbing emergency is the easiest sale you'll ever make — if you answer. The revenue you lose isn't in your pricing or your work; it's in the calls that hit voicemail, the estimates that never get a follow-up, and the customers you never contact again.",
    mattersWhen: [
      { label: "Emergency calls", detail: "matter when they're answered live, not sent to voicemail." },
      { label: "Missed calls", detail: "matter when the caller gets a text back before they dial the next plumber." },
      { label: "Estimates", detail: "matter when they're followed up until the homeowner decides." },
      { label: "Service agreements", detail: "matter when they turn one repair into years of work." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-completion process around",
      gold: "measurable, booked revenue.",
    },
    leaksIntro:
      "None of these are failures of skilled plumbers. They're failures of process — the gaps where an urgent customer gives up and calls the next number.",
    leaks: [
      "Emergency calls hit voicemail while your techs are under a sink.",
      "After-hours calls go straight to a competitor's 24/7 line.",
      "Missed calls are never returned — and never texted back.",
      "Estimates for repipes and water heaters go out and go silent.",
      "One-time repair customers are never offered a service agreement.",
      "Drain customers never hear about the sewer work they'll eventually need.",
      "Referral and repeat calls never get tracked to a source.",
      "Past customers forget your name until the next emergency — and Google another plumber.",
    ],
    leaksClose:
      "Add up the after-hours misses and dead estimates over a year and it's routinely more than a new service van and tech would earn — with no report to show it.",
    journeyIntro:
      "Every plumbing customer follows the same path from first call to completed job. CAROS makes that path consistent and visible — so you can see where homeowners book and where they slip away.",
    journey: ["Service Call", "Text Back / Booking", "Dispatch", "Diagnosis", "Estimate", "Completed Job", "Agreement & Referrals"],
    journeyEndLabel: "Booked Jobs & Recurring Service",
    signatureEyebrow: "Emergency Calls & Service Agreements",
    signatureTitle: "Turn one emergency into",
    signatureTitleSerif: "years of service.",
    signatureBody: [
      "The plumber who answers the 2 a.m. call wins the job — but the plumber who follows up wins the customer. Most repair customers would happily stay with one company, yet they drift away simply because no one stayed in touch or offered a reason to come back.",
      "CAROS captures every emergency and after-hours call, texts back the ones you miss, and converts one-time repairs into service agreements and repeat work — so the customer you win tonight is still yours the next time something breaks.",
    ],
    signatureListLabel: "Where CAROS keeps plumbing revenue moving",
    signatureUseCases: [
      "24/7 emergency call capture",
      "Missed-call text back",
      "Job booking & dispatch",
      "Estimate follow-up",
      "Service-agreement enrollment",
      "Water-heater replacement follow-up",
      "Drain & sewer follow-up",
      "Financing follow-up",
      "Review generation",
      "Repeat-service reminders",
      "Past-customer reactivation",
      "Commercial service pipeline",
    ],
    metrics: [
      { value: "94", label: "Service Calls" },
      { value: "71", label: "Calls Booked" },
      { value: "26", label: "Estimates Sent" },
      { value: "22", label: "Agreements Sold" },
      { value: "$196,000", label: "Booked Revenue" },
      { value: "6.5x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "How many calls went unanswered this week?",
      "Which campaigns produce booked jobs?",
      "How fast are we texting back missed calls?",
      "How many estimates are waiting on follow-up?",
      "How many repairs converted to service agreements?",
      "How many past customers haven't heard from us in a year?",
      "Which techs' estimates convert best?",
      "Where are we losing revenue between call and completed job?",
    ],
    recoveredText:
      "After-hours calls that would have gone to voicemail and repair customers who would have drifted away — captured, followed up, and turned into booked jobs and agreements.",
    experienceTitle: "Technology that keeps your techs",
    experienceTitleSerif: "on the job.",
    faq: [
      {
        q: "Is CAROS plumbing dispatch software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, texts back missed calls, books jobs, follows up on estimates, and grows service agreements. It works alongside your dispatch and field tools.",
      },
      {
        q: "How does CAROS handle emergency and after-hours calls?",
        a: "CAROS answers live under your name, and instantly texts back any call you miss so the customer gets a response before they dial the next plumber. After-hours calls are captured and booked instead of lost.",
      },
      {
        q: "Can CAROS help grow service agreements?",
        a: "Yes. CAROS offers agreements at the right moment, automates renewals and repeat-service reminders, and re-engages past customers — turning one-time repairs into recurring revenue.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow and after-hours calls and automates follow-up, so your team focuses on booking and running jobs. It lets you scale without hiring office staff too early.",
      },
      {
        q: "Does CAROS work with our current systems?",
        a: "CAROS connects with common phone, calendar, website, and field tools, and can be your central system or complement what you use. We configure integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a plumbing company involve?",
        a: "We review how calls are answered, how fast missed calls are texted back, how estimates are followed up, and where jobs stall — then show you exactly where revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your plumbing revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls, estimates, and repeat customers are slipping away — and what it would take to capture them.",
    acquisitionItems: ["Emergency & service call capture", "Google & Facebook lead capture", "Missed-call text back", "Source attribution"],
  },
)

/* ==========================================================================
   ELECTRICAL
   ========================================================================== */

const electrical = make(
  {
    trade: "Electrical",
    slug: "electrical",
    customers: "homeowners",
    customer: "homeowner",
    job: "job",
    jobs: "jobs",
    estimate: "quote",
    estimates: "quotes",
    tech: "electrician",
    techs: "electricians",
    site: "home",
    callWord: "service call",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Electrical",
    heroTitle: "Every panel upgrade you quote and don't",
    heroTitleSerif: "follow up is money left on the table.",
    heroSub:
      "Electrical work runs from quick service calls to five-figure panel and rewiring projects — and the bigger the job, the more follow-up it needs. CAROS captures every call, books more service visits, and follows up on every quote until the homeowner decides.",
    trustRow: ["Service & Repair", "Panel Upgrades", "Rewires", "EV Chargers", "Service Contracts"],
    metaTitle: "CAROS for Electrical Contractors | Capture Calls & Follow Up Quotes",
    metaDescription:
      "CAROS helps electricians answer every service call, book more visits, follow up on panel-upgrade and project quotes, and grow service contracts — the revenue operating system built for electrical contractors.",
    keywords: [
      "electrical lead management",
      "electrician crm",
      "panel upgrade leads",
      "electrical quote follow up",
      "electrical contractor marketing",
      "ev charger installation leads",
      "electrical service contract",
      "electrician call booking",
      "electrical marketing roi",
      "electrical missed call text back",
    ],
    problemTitle: "You don't need more quotes out. You need",
    problemTitleSerif: "more of them to close.",
    problemIntro:
      "Electrical customers rarely say no — they go quiet. A panel upgrade or rewire is a considered purchase, and the homeowner is comparing you against two other electricians. The one who follows up professionally, answers questions, and stays top of mind is the one who gets the job.",
    mattersWhen: [
      { label: "Service calls", detail: "matter when someone answers and books them, not just takes a message." },
      { label: "Project quotes", detail: "matter when they're followed up until the homeowner decides." },
      { label: "Code & safety work", detail: "matter when you circle back on the repairs you flagged." },
      { label: "Service contracts", detail: "matter when they turn a one-time job into ongoing work." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-close process around",
      gold: "measurable, booked revenue.",
    },
    leaksIntro:
      "None of these are failures of good electricians. They're failures of process — the gaps where a considered buyer quietly chooses someone who stayed in touch.",
    leaks: [
      "Service calls hit voicemail while your electricians are on a job.",
      "Web leads sit for hours before anyone follows up.",
      "Panel-upgrade and rewire quotes go out and never get a second touch.",
      "Safety and code issues you flagged are never followed up on.",
      "EV-charger and generator inquiries slip through without a callback.",
      "One-time service customers are never offered a contract.",
      "Referral and repeat work never gets tracked to a source.",
      "Past customers forget your name before their next project.",
    ],
    leaksClose:
      "A handful of unclosed panel upgrades and rewires a month is a six-figure gap over a year — and most electrical shops have no report that shows it.",
    journeyIntro:
      "Every electrical customer follows the same path from first call to completed project. CAROS makes that path consistent and visible — so you can see where homeowners move forward and where they stall.",
    journey: ["Service Call", "Booking", "On-Site Diagnosis", "Quote", "Follow-Up", "Booked Project", "Contract & Referrals"],
    journeyEndLabel: "Booked Projects & Recurring Work",
    signatureEyebrow: "Project Quotes & Service Contracts",
    signatureTitle: "Big projects are won in",
    signatureTitleSerif: "the follow-up.",
    signatureBody: [
      "Panel upgrades, rewires, generators, and EV chargers are high-value jobs with long decision windows. The homeowner isn't ready the day you quote — they're weighing cost, financing, and two competitors. Without steady, professional follow-up, your quote simply gets forgotten.",
      "CAROS keeps every project quote alive: automated, respectful follow-up until the homeowner decides, plus service contracts and repeat-work reminders that turn a single project into an ongoing relationship. Your best quotes stop dying in silence.",
    ],
    signatureListLabel: "Where CAROS keeps electrical revenue moving",
    signatureUseCases: [
      "Service-call capture",
      "Project-quote follow-up",
      "Panel-upgrade pipeline",
      "EV-charger inquiry follow-up",
      "Generator quote follow-up",
      "Financing follow-up",
      "Code / safety follow-up",
      "Service-contract enrollment",
      "Review generation",
      "Repeat-service reminders",
      "Past-customer reactivation",
      "Commercial project pipeline",
    ],
    metrics: [
      { value: "57", label: "Service Calls" },
      { value: "39", label: "Jobs Booked" },
      { value: "31", label: "Project Quotes" },
      { value: "14", label: "Projects Won" },
      { value: "$228,000", label: "Booked Revenue" },
      { value: "6.9x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce booked jobs?",
      "How many project quotes are waiting on follow-up?",
      "What's our close rate on panel upgrades?",
      "How fast are we responding to new leads?",
      "How many flagged safety issues went un-followed-up?",
      "How many past customers are due for outreach?",
      "Which electricians' quotes convert best?",
      "Where are we losing revenue between quote and booked project?",
    ],
    recoveredText:
      "Project quotes that would have died in silence and service calls that would have gone to voicemail — captured, followed up, and turned into booked work.",
    experienceTitle: "Technology that keeps your electricians",
    experienceTitleSerif: "on the tools.",
    faq: [
      {
        q: "Is CAROS electrical estimating software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, books visits, follows up on quotes, and grows contracts. It works alongside the estimating tools you already use.",
      },
      {
        q: "How does CAROS help close more panel upgrades and projects?",
        a: "CAROS follows up on every project quote automatically and professionally until the homeowner decides, keeping you top of mind through a long decision window instead of letting the quote go cold.",
      },
      {
        q: "Can CAROS help with EV chargers and generators?",
        a: "Yes. CAROS captures those inquiries, responds instantly, and follows up until the customer books — so high-value, high-interest jobs don't slip through without a callback.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow calls and automates follow-up, so your team focuses on quoting and running jobs. It lets you scale without adding office headcount too early.",
      },
      {
        q: "Does CAROS integrate with our systems?",
        a: "CAROS connects with common phone, calendar, website, and field tools, and can be your central system or complement what you have. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for an electrical company involve?",
        a: "We review how calls are answered, how leads are responded to, how quotes are followed up, and where projects stall — then show you exactly where revenue is leaking between quote and booked job.",
      },
    ],
    ctaHeadline: "See where your electrical revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls and project quotes are slipping away — and what it would take to close more of them.",
    acquisitionItems: ["Service & project call capture", "Google & Facebook lead capture", "EV & generator inquiry capture", "Source attribution"],
  },
)

/* ==========================================================================
   CLEANING
   ========================================================================== */

const cleaning = make(
  {
    trade: "Cleaning",
    slug: "cleaning",
    customers: "clients",
    customer: "client",
    job: "clean",
    jobs: "cleans",
    estimate: "quote",
    estimates: "quotes",
    tech: "crew",
    techs: "crews",
    site: "property",
    callWord: "inquiry",
    bookLabel: "booked cleans",
  },
  {
    heroEyebrow: "Industry Solution — Cleaning",
    heroTitle: "One-time cleans pay once. Recurring clients",
    heroTitleSerif: "pay every week.",
    heroSub:
      "The money in cleaning isn't the first job — it's the client who stays for years. CAROS captures every inquiry, books more first cleans, and turns one-time jobs into recurring contracts, so your route fills with dependable, repeating revenue.",
    trustRow: ["Residential", "Commercial", "Recurring Contracts", "Move-In / Move-Out", "Janitorial"],
    metaTitle: "CAROS for Cleaning Companies | Book More Cleans & Grow Recurring Clients",
    metaDescription:
      "CAROS helps cleaning businesses respond to every inquiry, book more first cleans, convert one-time jobs into recurring contracts, and reduce cancellations — the revenue operating system built for cleaning companies.",
    keywords: [
      "cleaning business lead management",
      "cleaning company crm",
      "recurring cleaning contracts",
      "maid service booking software",
      "commercial cleaning leads",
      "cleaning quote follow up",
      "cleaning business marketing",
      "cleaning marketing roi",
      "janitorial sales pipeline",
      "cleaning missed call text back",
    ],
    problemTitle: "You don't need more inquiries. You need",
    problemTitleSerif: "clients who stay.",
    problemIntro:
      "A cleaning business lives and dies on recurring revenue. A one-time clean is nice; a client on a weekly or biweekly plan is a business. Most cleaning companies lose money not on getting the first job, but on failing to convert it into a contract and keep it on the schedule.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a fast, professional response and become booked cleans." },
      { label: "First cleans", detail: "matter when they convert into recurring plans, not one-offs." },
      { label: "Recurring clients", detail: "matter when cancellations get caught and won back." },
      { label: "Commercial bids", detail: "matter when they're followed up until the account signs." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-contract process around",
      gold: "measurable, recurring revenue.",
    },
    leaksIntro:
      "None of these are failures of good cleaners. They're failures of process — the gaps where a ready client never gets booked or quietly cancels.",
    leaks: [
      "Inquiries sit for hours before anyone replies — and the client books the company that answered.",
      "Quote requests never get a follow-up.",
      "First-time cleans are never offered a recurring plan.",
      "Cancellations happen with no attempt to save or reschedule the client.",
      "Commercial bids go out and are never followed up.",
      "Happy clients are never asked for a review or referral.",
      "Lapsed clients are never reactivated.",
      "Nobody tracks which ads or referrals produce recurring clients.",
    ],
    leaksClose:
      "A few recurring clients lost or never converted each month compounds into serious lost revenue over a year — because every one of them was worth months of cleans.",
    journeyIntro:
      "Every cleaning client follows the same path from first inquiry to standing appointment. CAROS makes that path consistent and visible — so you can see who books, who converts, and who slips away.",
    journey: ["Inquiry", "Quote / Walkthrough", "First Clean", "Recurring Plan", "Standing Schedule", "Save & Retain", "Reviews & Referrals"],
    journeyEndLabel: "Recurring Clients & Repeat Revenue",
    signatureEyebrow: "Recurring Contracts & Retention",
    signatureTitle: "Build a business on clients who",
    signatureTitleSerif: "never cancel.",
    signatureBody: [
      "The most valuable thing a cleaning company can do is turn a first clean into a standing appointment — and then keep it. Every recurring client is worth dozens of cleans, yet most are lost to a missed follow-up, an un-offered plan, or a cancellation nobody tried to save.",
      "CAROS builds and protects your recurring base: converting first cleans into contracts, catching cancellations before they stick, and re-engaging lapsed clients — so your route grows more predictable every month instead of resetting every week.",
    ],
    signatureListLabel: "Where CAROS keeps cleaning revenue moving",
    signatureUseCases: [
      "Inquiry capture & fast response",
      "Quote & walkthrough follow-up",
      "First-clean booking",
      "Recurring-plan conversion",
      "Cancellation save flows",
      "Standing-schedule reminders",
      "Commercial-bid follow-up",
      "Review generation",
      "Referral campaigns",
      "Lapsed-client reactivation",
      "Membership / add-on offers",
      "Janitorial account pipeline",
    ],
    metrics: [
      { value: "76", label: "Inquiries" },
      { value: "48", label: "First Cleans Booked" },
      { value: "29", label: "Converted to Recurring" },
      { value: "12", label: "Cancellations Saved" },
      { value: "$164,000", label: "Booked Revenue" },
      { value: "6.2x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce recurring clients, not just one-offs?",
      "How fast are we responding to new inquiries?",
      "What's our first-clean-to-recurring conversion rate?",
      "How many cancellations did we save this month?",
      "How many commercial bids are waiting on follow-up?",
      "How many lapsed clients could we win back?",
      "Which clients are due for an add-on service?",
      "Where are we losing revenue between inquiry and standing schedule?",
    ],
    recoveredText:
      "First cleans that would have stayed one-offs and clients who would have quietly cancelled — converted, saved, and turned into recurring revenue.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "cleaning, not chasing.",
    faq: [
      {
        q: "Is CAROS cleaning-scheduling software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, books cleans, converts one-time jobs into recurring contracts, and saves cancellations. It works alongside your scheduling tools.",
      },
      {
        q: "How does CAROS grow recurring revenue?",
        a: "CAROS follows up on quotes, offers recurring plans at the right moment, catches cancellations with save flows, and re-engages lapsed clients — steadily growing your base of standing appointments.",
      },
      {
        q: "Can CAROS handle both residential and commercial?",
        a: "Yes. CAROS manages fast residential response and booking as well as commercial-bid follow-up and account pipelines, so both sides of your business stay organized.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles fast response and automates follow-up, so your team focuses on service and sales. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We configure integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a cleaning company involve?",
        a: "We review how inquiries are answered, how quotes are followed up, how first cleans convert to recurring plans, and where clients cancel — then show you exactly where recurring revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your cleaning revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, first cleans, and recurring clients are slipping away — and what it would take to keep them.",
    acquisitionItems: ["Inquiry & call capture", "Google & Facebook lead capture", "Website & booking forms", "Source attribution"],
  },
)

/* ==========================================================================
   LANDSCAPING
   ========================================================================== */

const landscaping = make(
  {
    trade: "Landscaping",
    slug: "landscaping",
    customers: "clients",
    customer: "client",
    job: "job",
    jobs: "jobs",
    estimate: "estimate",
    estimates: "estimates",
    tech: "crew",
    techs: "crews",
    site: "property",
    callWord: "inquiry",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Landscaping",
    heroTitle: "The spring rush fills your voicemail faster than",
    heroTitleSerif: "it fills your schedule.",
    heroSub:
      "Landscaping demand explodes in a few short weeks and disappears just as fast. CAROS captures every inquiry during the rush, follows up on every estimate, and locks in seasonal maintenance contracts — so your season is booked solid instead of scattered.",
    trustRow: ["Maintenance", "Design & Build", "Seasonal Contracts", "Hardscaping", "Commercial Grounds"],
    metaTitle: "CAROS for Landscaping Companies | Capture Spring Leads & Lock In Contracts",
    metaDescription:
      "CAROS helps landscaping businesses handle the spring rush, follow up on every estimate, lock in recurring maintenance contracts, and track marketing ROI — the revenue operating system built for landscapers.",
    keywords: [
      "landscaping lead management",
      "landscaping crm",
      "lawn care contracts",
      "landscaping estimate follow up",
      "seasonal maintenance contracts",
      "landscaping business marketing",
      "landscaping marketing roi",
      "landscaping booking software",
      "design build sales pipeline",
      "landscaping missed call text back",
    ],
    problemTitle: "You don't need more spring leads. You need to",
    problemTitleSerif: "book the ones you get.",
    problemIntro:
      "Landscaping is a race against a short season. When the weather breaks, everyone calls at once — and the estimates you can't get to, the follow-ups you don't make, and the maintenance contracts you never lock in are gone until next year.",
    mattersWhen: [
      { label: "Spring inquiries", detail: "matter when they're answered fast during the few weeks they flood in." },
      { label: "Estimates", detail: "matter when they're followed up before the client hires someone else." },
      { label: "Maintenance contracts", detail: "matter when they turn one job into a full-season commitment." },
      { label: "Design-build leads", detail: "matter when high-value projects get the follow-up they deserve." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-contract process around",
      gold: "measurable, season-long revenue.",
    },
    leaksIntro:
      "None of these are failures of talented crews. They're failures of process — the gaps where a ready client stops moving before the job is booked.",
    leaks: [
      "Inquiries hit voicemail during the spring rush while crews are in the field.",
      "Estimate requests pile up faster than anyone can send them.",
      "Estimates go out and never get a follow-up.",
      "One-time jobs are never converted to seasonal maintenance.",
      "Design-build and hardscape leads slip away without a second touch.",
      "Clients from last season are never re-signed for this one.",
      "Referral and repeat work never gets tracked to a source.",
      "Commercial grounds bids go out and go quiet.",
    ],
    leaksClose:
      "A handful of maintenance contracts and design-build jobs lost each spring is a season's worth of revenue gone — and most landscapers never see the number.",
    journeyIntro:
      "Every landscaping client follows the same path from first inquiry to renewed contract. CAROS makes that path consistent and visible — so you can see who books, who signs, and who slips away.",
    journey: ["Inquiry", "Estimate / Walkthrough", "Follow-Up", "Booked Job", "Maintenance Contract", "Seasonal Renewal", "Reviews & Referrals"],
    journeyEndLabel: "Season-Long Contracts & Repeat Revenue",
    signatureEyebrow: "Seasonal Contracts & Maintenance",
    signatureTitle: "Turn one spring job into a",
    signatureTitleSerif: "year-round contract.",
    signatureBody: [
      "The difference between a landscaper who scrambles and one who thrives is recurring maintenance. A seasonal contract turns a single project into predictable revenue from spring cleanup through fall — but only if it's offered, followed up, and renewed every year.",
      "CAROS locks in the recurring side of your business: converting one-time jobs into maintenance contracts, sending renewal reminders before each season, and re-signing last year's clients before a competitor does — so every spring starts with revenue already booked.",
    ],
    signatureListLabel: "Where CAROS keeps landscaping revenue moving",
    signatureUseCases: [
      "Spring-rush inquiry capture",
      "Estimate follow-up",
      "Maintenance-contract conversion",
      "Seasonal renewal reminders",
      "Design-build project follow-up",
      "Hardscape & install pipeline",
      "Snow & off-season upsells",
      "Financing follow-up",
      "Review generation",
      "Referral campaigns",
      "Past-client re-signing",
      "Commercial grounds pipeline",
    ],
    metrics: [
      { value: "83", label: "Spring Inquiries" },
      { value: "51", label: "Estimates Sent" },
      { value: "33", label: "Jobs Booked" },
      { value: "26", label: "Contracts Signed" },
      { value: "$212,000", label: "Booked Revenue" },
      { value: "6.6x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce signed contracts?",
      "How fast are we answering spring inquiries?",
      "How many estimates are waiting on follow-up?",
      "What's our estimate-to-contract conversion rate?",
      "How many last-season clients haven't re-signed?",
      "How many design-build leads are still open?",
      "Which crews' jobs generate the most add-on work?",
      "Where are we losing revenue between inquiry and contract?",
    ],
    recoveredText:
      "Spring inquiries that would have hit voicemail and one-time jobs that would have stayed one-offs — captured, followed up, and turned into season-long contracts.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "in the field.",
    faq: [
      {
        q: "Is CAROS landscaping route or scheduling software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, follows up on estimates, converts jobs into maintenance contracts, and handles renewals. It works alongside your routing and scheduling tools.",
      },
      {
        q: "How does CAROS help during the spring rush?",
        a: "CAROS answers and texts back every inquiry, organizes estimate requests, and automates follow-up — so the flood of spring demand becomes booked jobs instead of a full voicemail box.",
      },
      {
        q: "Can CAROS grow our recurring maintenance revenue?",
        a: "Yes. CAROS converts one-time jobs into seasonal contracts, sends renewal reminders before each season, and re-signs past clients — building predictable, recurring revenue.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles the rush and automates follow-up, so your team focuses on estimating and running crews. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a landscaping company involve?",
        a: "We review how inquiries are answered, how estimates are followed up, how jobs convert to contracts, and where clients drop off — then show you exactly where seasonal revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your landscaping revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where spring inquiries, estimates, and contracts are slipping away — and what it would take to book them.",
    acquisitionItems: ["Seasonal inquiry capture", "Google & Facebook lead capture", "Website & estimate forms", "Source attribution"],
  },
)

/* ==========================================================================
   PAINTING
   ========================================================================== */

const painting = make(
  {
    trade: "Painting",
    slug: "painting",
    customers: "homeowners",
    customer: "homeowner",
    job: "job",
    jobs: "jobs",
    estimate: "estimate",
    estimates: "estimates",
    tech: "crew",
    techs: "crews",
    site: "property",
    callWord: "inquiry",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Painting",
    heroTitle: "You give great estimates. You just don't",
    heroTitleSerif: "follow up on them.",
    heroSub:
      "Painting is an estimate business — and most painters lose more revenue in un-followed-up quotes than anywhere else. CAROS captures every inquiry, books more estimates, and follows up on every quote until the homeowner picks a color and a date.",
    trustRow: ["Interior", "Exterior", "Residential", "Commercial", "Cabinet & Specialty"],
    metaTitle: "CAROS for Painting Companies | Book More Estimates & Close More Quotes",
    metaDescription:
      "CAROS helps painting contractors respond to every inquiry, book more estimates, follow up on every quote, and track which sources produce booked jobs — the revenue operating system built for painters.",
    keywords: [
      "painting lead management",
      "painting contractor crm",
      "painting estimate follow up",
      "painting quote software",
      "painter marketing",
      "painting marketing roi",
      "painting booking software",
      "painting sales pipeline",
      "commercial painting leads",
      "painting missed call text back",
    ],
    problemTitle: "You don't need more estimates out. You need",
    problemTitleSerif: "more of them to close.",
    problemIntro:
      "Painting customers get three quotes and take their time. The painter who wins isn't always the cheapest — it's the one who responds fast, shows up professionally, and follows up until the homeowner is ready. Most painters do the first two and completely miss the third.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a fast response and become booked estimates." },
      { label: "Estimates", detail: "matter when they're followed up until the homeowner decides." },
      { label: "Color & scope questions", detail: "matter when someone answers them before the customer moves on." },
      { label: "Repeat & referral work", detail: "matter when past customers actually hear from you again." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-booked-job process around",
      gold: "measurable, booked revenue.",
    },
    leaksIntro:
      "None of these are failures of skilled painters. They're failures of process — the gaps where a comparing homeowner quietly picks whoever followed up.",
    leaks: [
      "Inquiries sit unanswered while crews are on a job — and the homeowner books whoever called back first.",
      "Estimate requests never get scheduled.",
      "Quotes go out and are never followed up.",
      "Homeowners go quiet and nobody re-engages them.",
      "Interior customers are never offered exterior work — and vice versa.",
      "Happy customers are never asked for a review or referral.",
      "Past customers are never contacted for their next project.",
      "Nobody tracks which ads produce booked jobs.",
    ],
    leaksClose:
      "A few unclosed exterior repaints a month adds up to a painting season's worth of lost revenue over a year — and most shops have no report that shows it.",
    journeyIntro:
      "Every painting customer follows the same path from first inquiry to finished walls. CAROS makes that path consistent and visible — so you can see who books, who closes, and who slips away.",
    journey: ["Inquiry", "Estimate Booked", "Quote Sent", "Follow-Up", "Booked Job", "Completed Work", "Reviews & Referrals"],
    journeyEndLabel: "Booked Jobs & Repeat Revenue",
    signatureEyebrow: "Estimate Follow-Up & Project Pipeline",
    signatureTitle: "Your best quotes are dying",
    signatureTitleSerif: "in silence.",
    signatureBody: [
      "The single biggest leak in a painting business is the estimate that never gets a second touch. Homeowners are comparing quotes and waiting to feel confident — and the painter who follows up, answers questions, and stays top of mind is the one who gets the brush in hand.",
      "CAROS keeps every quote alive with automated, professional follow-up until the homeowner decides, then keeps the relationship going with repeat-project and referral outreach — so your pipeline stays full and your best estimates stop going cold.",
    ],
    signatureListLabel: "Where CAROS keeps painting revenue moving",
    signatureUseCases: [
      "Inquiry capture & fast response",
      "Estimate booking",
      "Quote follow-up",
      "Color / scope question handling",
      "Interior-to-exterior upsells",
      "Financing follow-up",
      "Review generation",
      "Referral campaigns",
      "Repeat-project reminders",
      "Past-customer reactivation",
      "Cabinet & specialty pipeline",
      "Commercial project pipeline",
    ],
    metrics: [
      { value: "72", label: "Inquiries" },
      { value: "47", label: "Estimates Booked" },
      { value: "41", label: "Quotes Sent" },
      { value: "19", label: "Jobs Won" },
      { value: "$158,000", label: "Booked Revenue" },
      { value: "6.4x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce booked jobs?",
      "How fast are we responding to new inquiries?",
      "How many quotes are waiting on follow-up?",
      "What's our estimate-to-booked-job close rate?",
      "How many past customers are due for a repaint?",
      "How many quotes went cold with no second touch?",
      "Which crews' jobs generate the most referrals?",
      "Where are we losing revenue between quote and booked job?",
    ],
    recoveredText:
      "Quotes that would have died in silence and inquiries that would have gone to voicemail — captured, followed up, and turned into booked jobs.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "on the ladder.",
    faq: [
      {
        q: "Is CAROS painting estimating software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, books estimates, follows up on quotes, and drives repeat work. It works alongside the estimating tools you already use.",
      },
      {
        q: "How does CAROS help me close more estimates?",
        a: "CAROS follows up on every quote automatically and professionally until the homeowner decides, keeping you top of mind through the comparison window instead of letting the quote go cold.",
      },
      {
        q: "Can CAROS help with both interior and exterior work?",
        a: "Yes. CAROS captures and follows up on both, and prompts interior-to-exterior upsells and repeat projects so each customer is worth more over time.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles fast response and automates follow-up, so your team focuses on estimating and painting. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We configure integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a painting company involve?",
        a: "We review how inquiries are answered, how estimates are booked, how quotes are followed up, and where jobs stall — then show you exactly where revenue is leaking between quote and booked job.",
      },
    ],
    ctaHeadline: "See where your painting revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries and estimates are slipping away — and what it would take to close more of them.",
    acquisitionItems: ["Inquiry & call capture", "Google & Facebook lead capture", "Website & estimate forms", "Source attribution"],
  },
)

/* ==========================================================================
   PEST CONTROL
   ========================================================================== */

const pestControl = make(
  {
    trade: "Pest Control",
    slug: "pest-control",
    customers: "customers",
    customer: "customer",
    job: "service",
    jobs: "services",
    estimate: "quote",
    estimates: "quotes",
    tech: "technician",
    techs: "technicians",
    site: "property",
    callWord: "service call",
    bookLabel: "booked services",
  },
  {
    heroEyebrow: "Industry Solution — Pest Control",
    heroTitle: "One-time treatments end. Recurring routes",
    heroTitleSerif: "pay all year.",
    heroSub:
      "Pest control is a recurring-revenue business hiding inside a service call. CAROS captures every call, books more first treatments, and converts one-time jobs into quarterly and monthly plans — so your routes stay full and your revenue repeats.",
    trustRow: ["Residential", "Commercial", "Recurring Plans", "Termite & WDO", "Wildlife"],
    metaTitle: "CAROS for Pest Control | Book Services & Grow Recurring Routes",
    metaDescription:
      "CAROS helps pest control companies answer every call, book more first treatments, convert one-time jobs into recurring plans, and reduce cancellations — the revenue operating system built for pest control.",
    keywords: [
      "pest control lead management",
      "pest control crm",
      "recurring pest control plans",
      "pest control booking software",
      "pest control quote follow up",
      "pest control marketing",
      "pest control marketing roi",
      "termite lead follow up",
      "pest control route revenue",
      "pest control missed call text back",
    ],
    problemTitle: "You don't need more calls. You need",
    problemTitleSerif: "customers on a plan.",
    problemIntro:
      "The economics of pest control are simple: a one-time treatment pays once, a recurring plan pays for years. The revenue you lose isn't in the first call — it's in the plans you never offer, the follow-ups you never make, and the customers who lapse without a word.",
    mattersWhen: [
      { label: "Service calls", detail: "matter when they're answered and booked, not sent to voicemail." },
      { label: "First treatments", detail: "matter when they convert into recurring plans." },
      { label: "Recurring routes", detail: "matter when cancellations get caught and won back." },
      { label: "Termite & WDO quotes", detail: "matter when high-value jobs get followed up." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-plan process around",
      gold: "measurable, recurring revenue.",
    },
    leaksIntro:
      "None of these are failures of good technicians. They're failures of process — the gaps where recurring revenue quietly slips off the route.",
    leaks: [
      "Service calls hit voicemail while techs are on a route.",
      "Web leads sit for hours before anyone responds.",
      "First treatments are never offered a recurring plan.",
      "Plan customers cancel with no attempt to save them.",
      "Termite and WDO quotes go out and go silent.",
      "One-time customers are never contacted again.",
      "Reviews and referrals are never requested.",
      "Nobody tracks which ads produce recurring customers.",
    ],
    leaksClose:
      "A handful of recurring plans lost or never converted each month compounds fast — because each one was worth years of scheduled service.",
    journeyIntro:
      "Every pest control customer follows the same path from first call to standing route. CAROS makes that path consistent and visible — so you can see who books, who converts, and who lapses.",
    journey: ["Service Call", "Booking", "First Treatment", "Recurring Plan", "Route Schedule", "Save & Retain", "Reviews & Referrals"],
    journeyEndLabel: "Recurring Routes & Repeat Revenue",
    signatureEyebrow: "Recurring Routes & Service Plans",
    signatureTitle: "Every treatment should become a",
    signatureTitleSerif: "standing route.",
    signatureBody: [
      "The healthiest pest control businesses aren't the ones with the most calls — they're the ones with the fullest routes. A recurring plan turns a single treatment into quarterly or monthly revenue, but only if it's offered every time, renewed on schedule, and protected against cancellation.",
      "CAROS builds and defends your recurring base: converting first treatments into plans, keeping routes on schedule with reminders, catching cancellations before they stick, and reactivating lapsed customers — so your route revenue compounds season after season.",
    ],
    signatureListLabel: "Where CAROS keeps pest control revenue moving",
    signatureUseCases: [
      "Service-call capture",
      "First-treatment booking",
      "Recurring-plan conversion",
      "Route reminders",
      "Cancellation save flows",
      "Termite / WDO quote follow-up",
      "Wildlife & specialty follow-up",
      "Review generation",
      "Referral campaigns",
      "Lapsed-customer reactivation",
      "Add-on service offers",
      "Commercial account pipeline",
    ],
    metrics: [
      { value: "97", label: "Service Calls" },
      { value: "64", label: "Services Booked" },
      { value: "38", label: "Converted to Plans" },
      { value: "13", label: "Cancellations Saved" },
      { value: "$178,000", label: "Booked Revenue" },
      { value: "6.7x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce recurring customers?",
      "How fast are we responding to new calls?",
      "What's our first-treatment-to-plan conversion rate?",
      "How many cancellations did we save this month?",
      "How many termite/WDO quotes are open?",
      "How many lapsed customers could we reactivate?",
      "Which routes have room for more stops?",
      "Where are we losing revenue between call and standing route?",
    ],
    recoveredText:
      "First treatments that would have stayed one-offs and plan customers who would have lapsed — converted, saved, and turned into recurring route revenue.",
    experienceTitle: "Technology that keeps your techs",
    experienceTitleSerif: "on the route.",
    faq: [
      {
        q: "Is CAROS pest control routing software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, books treatments, converts jobs into recurring plans, and saves cancellations. It works alongside your routing and field tools.",
      },
      {
        q: "How does CAROS grow recurring route revenue?",
        a: "CAROS offers plans at the right moment, follows up on quotes, keeps routes on schedule with reminders, catches cancellations, and reactivates lapsed customers — steadily growing your recurring base.",
      },
      {
        q: "Can CAROS help with termite and specialty work?",
        a: "Yes. CAROS captures and follows up on higher-value termite, WDO, and wildlife quotes so those jobs don't slip away without a second touch.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow calls and automates follow-up, so your team focuses on booking and servicing. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our systems?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a pest control company involve?",
        a: "We review how calls are answered, how first treatments convert to plans, how quotes are followed up, and where customers lapse — then show you exactly where recurring revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your pest control revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls, first treatments, and recurring plans are slipping away — and what it would take to keep them on the route.",
    acquisitionItems: ["Service-call capture", "Google & Facebook lead capture", "Website & booking forms", "Source attribution"],
  },
)

/* ==========================================================================
   PRESSURE WASHING
   ========================================================================== */

const pressureWashing = make(
  {
    trade: "Pressure Washing",
    slug: "pressure-washing",
    customers: "customers",
    customer: "customer",
    job: "job",
    jobs: "jobs",
    estimate: "quote",
    estimates: "quotes",
    tech: "crew",
    techs: "crews",
    site: "property",
    callWord: "inquiry",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Pressure Washing",
    heroTitle: "Fast quotes win the job. Follow-up wins the",
    heroTitleSerif: "customer for years.",
    heroSub:
      "Pressure washing is quick to quote and easy to repeat — if you have a system. CAROS captures every inquiry, sends fast quotes, follows up until they book, and turns one-time washes into recurring maintenance so your season stays full.",
    trustRow: ["Residential", "Commercial", "Fleet & Concrete", "Roof & Soft Wash", "Recurring Maintenance"],
    metaTitle: "CAROS for Pressure Washing | Quote Fast, Follow Up, Repeat",
    metaDescription:
      "CAROS helps pressure washing businesses respond to every inquiry, send fast quotes, follow up until they book, and turn one-time washes into recurring maintenance — the revenue operating system built for pressure washing.",
    keywords: [
      "pressure washing lead management",
      "pressure washing crm",
      "pressure washing quote follow up",
      "pressure washing booking software",
      "soft wash leads",
      "pressure washing marketing",
      "pressure washing marketing roi",
      "recurring pressure washing",
      "commercial pressure washing leads",
      "pressure washing missed call text back",
    ],
    problemTitle: "You don't need more inquiries. You need to",
    problemTitleSerif: "quote fast and follow up.",
    problemIntro:
      "Pressure washing customers want a number quickly and book whoever gives it to them first. The revenue you lose is in slow quotes, un-followed-up estimates, and one-time customers who'd happily rebook every year if anyone reminded them.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a fast quote before the customer calls someone else." },
      { label: "Quotes", detail: "matter when they're followed up until the customer books." },
      { label: "One-time washes", detail: "matter when they become recurring maintenance." },
      { label: "Commercial accounts", detail: "matter when bids get the follow-up they deserve." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-rebook process around",
      gold: "measurable, repeat revenue.",
    },
    leaksIntro:
      "None of these are failures of good crews. They're failures of process — the gaps where a ready customer books whoever quoted fastest and followed up.",
    leaks: [
      "Inquiries sit for hours before a quote goes out — and the customer already booked someone else.",
      "Quotes are sent once and never followed up.",
      "Missed calls are never returned or texted back.",
      "One-time washes are never offered a maintenance plan.",
      "Last year's customers are never reminded to rebook.",
      "Commercial and fleet bids go quiet with no second touch.",
      "Reviews and referrals are never requested.",
      "Nobody tracks which ads produce booked jobs.",
    ],
    leaksClose:
      "A season of slow quotes and un-rebooked customers is a large, invisible revenue gap — because every repeat customer was worth years of washes.",
    journeyIntro:
      "Every pressure washing customer follows the same path from first inquiry to rebooked wash. CAROS makes that path consistent and visible — so you can see who books, who repeats, and who slips away.",
    journey: ["Inquiry", "Fast Quote", "Follow-Up", "Booked Job", "Completed Wash", "Recurring Maintenance", "Reviews & Referrals"],
    journeyEndLabel: "Repeat Customers & Recurring Revenue",
    signatureEyebrow: "Seasonal Demand & Recurring Maintenance",
    signatureTitle: "Turn a one-time wash into a",
    signatureTitleSerif: "yearly appointment.",
    signatureBody: [
      "Most pressure washing revenue walks away after a single job — not because customers were unhappy, but because nobody offered a maintenance plan or reminded them to rebook next season. The work naturally repeats; the follow-up usually doesn't.",
      "CAROS builds the repeat engine: converting one-time washes into annual or seasonal maintenance, reminding past customers to rebook before the grime returns, and following up on commercial bids — so your calendar fills itself instead of starting from zero each season.",
    ],
    signatureListLabel: "Where CAROS keeps pressure washing revenue moving",
    signatureUseCases: [
      "Inquiry capture & fast quoting",
      "Quote follow-up",
      "Missed-call text back",
      "Recurring-maintenance conversion",
      "Seasonal rebook reminders",
      "Soft-wash & roof follow-up",
      "Commercial & fleet bid follow-up",
      "Financing / package offers",
      "Review generation",
      "Referral campaigns",
      "Past-customer reactivation",
      "Recurring commercial pipeline",
    ],
    metrics: [
      { value: "68", label: "Inquiries" },
      { value: "52", label: "Quotes Sent" },
      { value: "34", label: "Jobs Booked" },
      { value: "18", label: "On Maintenance" },
      { value: "$121,000", label: "Booked Revenue" },
      { value: "6.3x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce booked jobs?",
      "How fast are we sending quotes?",
      "How many quotes are waiting on follow-up?",
      "How many one-time customers are on maintenance?",
      "How many past customers are due to rebook?",
      "How many commercial bids are still open?",
      "What's our quote-to-booked-job rate?",
      "Where are we losing revenue between inquiry and rebook?",
    ],
    recoveredText:
      "Inquiries that would have gone to a faster quote and customers who would have never rebooked — captured, followed up, and turned into recurring revenue.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "on the wand.",
    faq: [
      {
        q: "Is CAROS pressure washing scheduling software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, sends and follows up on quotes, books jobs, and drives rebooks. It works alongside your scheduling tools.",
      },
      {
        q: "How does CAROS help me quote faster?",
        a: "CAROS responds to every inquiry instantly and keeps quotes moving with automated follow-up, so you win the customers who book whoever answers first.",
      },
      {
        q: "Can CAROS create recurring revenue for a pressure washing business?",
        a: "Yes. CAROS converts one-time washes into maintenance plans and reminds past customers to rebook each season — turning a one-off trade into repeat revenue.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles fast response and automates follow-up, so your team focuses on quoting and washing. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We configure integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a pressure washing company involve?",
        a: "We review how inquiries are answered, how fast quotes go out, how they're followed up, and how customers rebook — then show you exactly where revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your pressure washing revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, quotes, and repeat customers are slipping away — and what it would take to keep them booking.",
    acquisitionItems: ["Inquiry & call capture", "Google & Facebook lead capture", "Website & quote forms", "Source attribution"],
  },
)

/* ==========================================================================
   HANDYMAN
   ========================================================================== */

const handyman = make(
  {
    trade: "Handyman",
    slug: "handyman",
    customers: "homeowners",
    customer: "homeowner",
    job: "job",
    jobs: "jobs",
    estimate: "quote",
    estimates: "quotes",
    tech: "technician",
    techs: "technicians",
    site: "home",
    callWord: "service call",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Handyman",
    heroTitle: "Small jobs add up fast — when you actually",
    heroTitleSerif: "book them all.",
    heroSub:
      "Handyman work is a steady stream of small jobs from repeat customers — but only if you answer, quote, and follow up on every one. CAROS captures every call, books more jobs, and keeps customers coming back for the next item on their list.",
    trustRow: ["Repairs", "Installs", "Punch Lists", "Property Managers", "Recurring Customers"],
    metaTitle: "CAROS for Handyman Businesses | Book More Jobs & Repeat Customers",
    metaDescription:
      "CAROS helps handyman businesses answer every call, book more small jobs, follow up on quotes, and turn one-time customers into repeat clients — the revenue operating system built for handyman services.",
    keywords: [
      "handyman lead management",
      "handyman crm",
      "handyman booking software",
      "handyman quote follow up",
      "handyman business marketing",
      "handyman marketing roi",
      "property manager handyman leads",
      "handyman repeat customers",
      "handyman scheduling",
      "handyman missed call text back",
    ],
    problemTitle: "You don't need bigger jobs. You need to",
    problemTitleSerif: "capture every small one.",
    problemIntro:
      "Handyman revenue is a volume game — lots of small jobs, many from the same customers, most decided by who answers and shows up. The money you lose is in unanswered calls, quotes you never followed up, and customers who forgot you existed before their next honey-do list.",
    mattersWhen: [
      { label: "Service calls", detail: "matter when someone answers and books them instead of taking a message." },
      { label: "Quotes", detail: "matter when they're followed up until the homeowner schedules." },
      { label: "Repeat customers", detail: "matter when they call you first for the next job, every time." },
      { label: "Property managers", detail: "matter when steady accounts get consistent, reliable service." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-repeat-customer process around",
      gold: "measurable, steady revenue.",
    },
    leaksIntro:
      "None of these are failures of a good handyman. They're failures of process — the gaps where a small, easy job simply never gets booked.",
    leaks: [
      "Calls hit voicemail while you're on a job — and the homeowner calls the next handyman.",
      "Quotes and callbacks get lost in a phone full of texts.",
      "Estimates go out and never get a follow-up.",
      "One-time customers never hear from you again.",
      "Repeat customers can't remember your number when they need you.",
      "Property-manager accounts drift because responses got slow.",
      "Reviews and referrals are never requested.",
      "Nobody tracks which sources actually produce booked jobs.",
    ],
    leaksClose:
      "A few missed jobs a week is thousands of dollars a month walking away — and it never shows up on any report.",
    journeyIntro:
      "Every handyman customer follows the same path from first call to the next job on their list. CAROS makes that path consistent and visible — so you can see who books, who repeats, and who slips away.",
    journey: ["Service Call", "Text Back / Booking", "Quote", "Booked Job", "Completed Work", "Repeat Job", "Reviews & Referrals"],
    journeyEndLabel: "Repeat Customers & Steady Revenue",
    signatureEyebrow: "Small Jobs, Repeat Customers",
    signatureTitle: "The real money is the customer who",
    signatureTitleSerif: "keeps calling back.",
    signatureBody: [
      "A single handyman job is small. A customer who calls you for every repair, install, and punch-list item for years is a business. Most handymen never build that repeat base — not because customers were unhappy, but because nobody kept them organized or stayed in touch.",
      "CAROS makes you the handyman they always call: capturing and texting back every call, following up on quotes, and reminding past customers you're one message away — so a steady flow of small jobs turns into dependable, repeating revenue.",
    ],
    signatureListLabel: "Where CAROS keeps handyman revenue moving",
    signatureUseCases: [
      "Service-call capture",
      "Missed-call text back",
      "Quote follow-up",
      "Job booking & scheduling",
      "Repeat-customer reminders",
      "Property-manager accounts",
      "Punch-list follow-up",
      "Financing / package offers",
      "Review generation",
      "Referral campaigns",
      "Past-customer reactivation",
      "Recurring maintenance offers",
    ],
    metrics: [
      { value: "91", label: "Service Calls" },
      { value: "67", label: "Jobs Booked" },
      { value: "23", label: "Quotes Sent" },
      { value: "44", label: "Repeat Customers" },
      { value: "$96,000", label: "Booked Revenue" },
      { value: "6.1x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which sources produce booked jobs?",
      "How many calls went to voicemail this week?",
      "How fast are we texting back missed calls?",
      "How many quotes are waiting on follow-up?",
      "How many customers are repeat vs one-time?",
      "How many past customers haven't called in six months?",
      "Which property-manager accounts are slipping?",
      "Where are we losing revenue between call and booked job?",
    ],
    recoveredText:
      "Calls that would have gone to voicemail and customers who would have forgotten your number — captured, followed up, and turned into repeat jobs.",
    experienceTitle: "Technology that keeps you",
    experienceTitleSerif: "on the tools.",
    faq: [
      {
        q: "Is CAROS handyman scheduling software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, texts back missed calls, follows up on quotes, and drives repeat business. It works alongside your scheduling tools.",
      },
      {
        q: "How does CAROS help a small handyman business?",
        a: "CAROS answers and texts back every call, keeps quotes moving, and reminds past customers you're one message away — so more small jobs get booked and more customers keep coming back.",
      },
      {
        q: "Can CAROS handle property-manager accounts?",
        a: "Yes. CAROS keeps steady accounts organized with fast, consistent responses and clear job status, so reliable recurring work doesn't slip through the cracks.",
      },
      {
        q: "Will this replace hiring help?",
        a: "No. CAROS handles the calls and follow-up you can't get to while you're on a job, so you can take on more work before you need to hire — and know when it's finally time to.",
      },
      {
        q: "Does CAROS integrate with my phone and calendar?",
        a: "Yes. CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle setup for you.",
      },
      {
        q: "What does a CAROS Revenue Audit for a handyman business involve?",
        a: "We review how calls are answered, how missed calls are texted back, how quotes are followed up, and how customers repeat — then show you exactly where revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your handyman revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls, quotes, and repeat customers are slipping away — and what it would take to capture them.",
    acquisitionItems: ["Service-call capture", "Google & Facebook lead capture", "Missed-call text back", "Source attribution"],
  },
)

/* ==========================================================================
   FLOORING
   ========================================================================== */

const flooring = make(
  {
    trade: "Flooring",
    slug: "flooring",
    customers: "customers",
    customer: "customer",
    job: "project",
    jobs: "projects",
    estimate: "estimate",
    estimates: "estimates",
    tech: "crew",
    techs: "crews",
    site: "home",
    callWord: "inquiry",
    bookLabel: "booked projects",
  },
  {
    heroEyebrow: "Industry Solution — Flooring",
    heroTitle: "Between the showroom and the install is",
    heroTitleSerif: "where the sale is lost.",
    heroSub:
      "Flooring is a considered purchase with a long decision — samples, measurements, quotes, and comparisons. CAROS captures every inquiry, books more in-home estimates, and follows up through material selection until the project is scheduled.",
    trustRow: ["Hardwood & LVP", "Tile", "Carpet", "In-Home Estimates", "Commercial"],
    metaTitle: "CAROS for Flooring Companies | Book Estimates & Close More Projects",
    metaDescription:
      "CAROS helps flooring businesses respond to every inquiry, book more in-home estimates, follow up through material selection, and track marketing ROI — the revenue operating system built for flooring companies.",
    keywords: [
      "flooring lead management",
      "flooring crm",
      "flooring estimate follow up",
      "in-home flooring estimates",
      "flooring showroom leads",
      "flooring business marketing",
      "flooring marketing roi",
      "flooring sales pipeline",
      "commercial flooring leads",
      "flooring missed call text back",
    ],
    problemTitle: "You don't need more foot traffic. You need to",
    problemTitleSerif: "close the quotes you give.",
    problemIntro:
      "A flooring customer visits the showroom, gets a measurement, takes samples home, and disappears to think. The company that follows up through that long decision — answering questions, comparing options, staying present — is the one that books the install. Most flooring shops let the quote go cold.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a fast response and become booked estimates." },
      { label: "In-home estimates", detail: "matter when they're followed up through material selection." },
      { label: "Samples & questions", detail: "matter when someone answers them before the customer moves on." },
      { label: "Commercial bids", detail: "matter when they get the follow-up a large project deserves." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-install process around",
      gold: "measurable, booked revenue.",
    },
    leaksIntro:
      "None of these are failures of good installers. They're failures of process — the gaps where a comparing customer quietly chooses whoever stayed in touch.",
    leaks: [
      "Inquiries and showroom leads never get a timely follow-up.",
      "In-home estimate requests aren't scheduled promptly.",
      "Quotes go out and the customer disappears to 'think about it.'",
      "Sample and material questions go unanswered.",
      "Financing options are never followed up on.",
      "Past customers are never contacted for the next room or referral.",
      "Commercial and builder bids go quiet.",
      "Nobody tracks which sources produce booked projects.",
    ],
    leaksClose:
      "A few unclosed flooring projects a month is a six-figure annual gap — and most shops have no report that shows where it went.",
    journeyIntro:
      "Every flooring customer follows the same path from first inquiry to finished install. CAROS makes that path consistent and visible — so you can see who books, who closes, and who slips away.",
    journey: ["Inquiry", "In-Home Estimate", "Quote & Samples", "Follow-Up", "Booked Project", "Install", "Reviews & Referrals"],
    journeyEndLabel: "Booked Projects & Repeat Revenue",
    signatureEyebrow: "In-Home Estimates & Project Pipeline",
    signatureTitle: "Long decisions are won by",
    signatureTitleSerif: "staying in touch.",
    signatureBody: [
      "Flooring is rarely bought on the first visit. The customer is weighing materials, budget, and two competitors over days or weeks. Without professional follow-up through that window, even a great estimate simply fades — and the install goes to whoever kept the conversation alive.",
      "CAROS keeps every flooring project moving: booking in-home estimates, following up through material selection and financing, and staying present until the job is scheduled — then driving referrals and the next room. Your best quotes stop going cold.",
    ],
    signatureListLabel: "Where CAROS keeps flooring revenue moving",
    signatureUseCases: [
      "Inquiry & showroom-lead capture",
      "In-home estimate booking",
      "Quote & sample follow-up",
      "Material-selection follow-up",
      "Financing follow-up",
      "Next-room / repeat-project outreach",
      "Builder & commercial bid follow-up",
      "Review generation",
      "Referral campaigns",
      "Past-customer reactivation",
      "Warranty & care reminders",
      "Commercial project pipeline",
    ],
    metrics: [
      { value: "64", label: "Inquiries" },
      { value: "43", label: "Estimates Booked" },
      { value: "37", label: "Quotes Sent" },
      { value: "16", label: "Projects Won" },
      { value: "$241,000", label: "Booked Revenue" },
      { value: "6.6x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce booked projects?",
      "How fast are we responding to inquiries?",
      "How many quotes are waiting on follow-up?",
      "What's our estimate-to-project close rate?",
      "How many past customers are due for another room?",
      "How many quotes went cold with no follow-up?",
      "How many commercial bids are open?",
      "Where are we losing revenue between quote and install?",
    ],
    recoveredText:
      "Quotes that would have gone cold and estimates that were never followed up — captured, nurtured, and turned into booked projects.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "installing, not chasing.",
    faq: [
      {
        q: "Is CAROS flooring estimating software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, books estimates, follows up through material selection, and drives repeat work. It works alongside your estimating and measurement tools.",
      },
      {
        q: "How does CAROS help close more flooring projects?",
        a: "CAROS follows up through the entire decision window — questions, samples, financing — keeping you present until the customer books, instead of letting the quote fade.",
      },
      {
        q: "Can CAROS handle both residential and commercial?",
        a: "Yes. CAROS manages fast residential response and in-home estimates as well as builder and commercial bid follow-up, so both sides of the business stay organized.",
      },
      {
        q: "Will this replace my showroom or office staff?",
        a: "No. CAROS handles response and automates follow-up, so your team focuses on selling and installing. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a flooring company involve?",
        a: "We review how inquiries are answered, how estimates are booked, how quotes are followed up through selection, and where projects stall — then show you exactly where revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your flooring revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, estimates, and projects are slipping away — and what it would take to close more of them.",
    acquisitionItems: ["Inquiry & showroom-lead capture", "Google & Facebook lead capture", "Website & estimate forms", "Source attribution"],
  },
)

/* ==========================================================================
   GENERAL CONTRACTING
   ========================================================================== */

const generalContracting = make(
  {
    trade: "General Contracting",
    slug: "general-contracting",
    customers: "clients",
    customer: "client",
    job: "project",
    jobs: "projects",
    estimate: "bid",
    estimates: "bids",
    tech: "crew",
    techs: "crews",
    site: "job site",
    callWord: "inquiry",
    bookLabel: "signed projects",
  },
  {
    heroEyebrow: "Industry Solution — General Contracting",
    heroTitle: "Long sales cycles kill deals that",
    heroTitleSerif: "nobody followed up on.",
    heroSub:
      "Remodels and builds are high-value projects with long, complex decisions. CAROS captures every inquiry, keeps every bid moving through the decision, and stays organized across a full pipeline — so your best projects don't stall between the first call and the signed contract.",
    trustRow: ["Remodels", "Additions", "New Builds", "Design-Build", "Commercial"],
    metaTitle: "CAROS for General Contractors | Manage Bids & Win More Projects",
    metaDescription:
      "CAROS helps general contractors capture every inquiry, follow up on every bid, manage a long-cycle project pipeline, and track marketing ROI — the revenue operating system built for general contracting.",
    keywords: [
      "general contractor lead management",
      "general contractor crm",
      "construction bid follow up",
      "remodeling sales pipeline",
      "contractor project pipeline",
      "general contracting marketing",
      "contractor marketing roi",
      "design build leads",
      "commercial construction leads",
      "contractor missed call text back",
    ],
    problemTitle: "You don't need more bids out. You need",
    problemTitleSerif: "more of them to sign.",
    problemIntro:
      "A remodel or build is a considered, high-dollar decision that can take weeks or months. The client is comparing bids, clarifying scope, and lining up financing — and the contractor who stays organized and follows up professionally wins, while the others get a polite 'we went another direction.'",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a fast, professional response and a scheduled consult." },
      { label: "Bids", detail: "matter when they're followed up through a long decision window." },
      { label: "Scope & change questions", detail: "matter when they're answered promptly and clearly." },
      { label: "Referrals & repeat clients", detail: "matter when past clients stay connected for the next project." },
    ],
    problemClose: {
      text: "CAROS connects your whole inquiry-to-contract process around",
      gold: "measurable, signed-project revenue.",
    },
    leaksIntro:
      "None of these are failures of skilled builders. They're failures of process — the gaps where a high-value client quietly chooses whoever stayed on top of it.",
    leaks: [
      "Inquiries sit unanswered while you're managing a job site.",
      "Consultation requests never get scheduled.",
      "Bids go out and are never followed up through the decision.",
      "Clients go quiet and nobody re-engages them.",
      "Scope and change questions get slow, scattered answers.",
      "Past clients are never contacted for their next project or referral.",
      "Commercial and design-build opportunities slip without a second touch.",
      "Nobody tracks which sources produce signed projects.",
    ],
    leaksClose:
      "A single unsigned remodel is often tens of thousands of dollars — and a few a year is a real hit to revenue that no report ever surfaces.",
    journeyIntro:
      "Every contracting client follows the same path from first inquiry to signed contract. CAROS makes that path consistent and visible — so you can see which projects advance and which stall.",
    journey: ["Inquiry", "Consultation", "Bid / Proposal", "Follow-Up", "Signed Contract", "Build", "Referrals & Repeat Work"],
    journeyEndLabel: "Signed Projects & Repeat Revenue",
    signatureEyebrow: "Bids & Project Pipeline",
    signatureTitle: "Your pipeline is only as strong as your",
    signatureTitleSerif: "follow-up.",
    signatureBody: [
      "General contracting lives on a pipeline of long-cycle, high-value projects — and the biggest revenue leak is the bid that goes quiet with no follow-up. Clients aren't saying no; they're deciding slowly, and the contractor who stays present and organized is the one who signs.",
      "CAROS runs your pipeline with you: capturing every inquiry, scheduling consultations, following up on every bid through the decision, and keeping past clients connected for the next project — so your best opportunities convert instead of quietly drifting away.",
    ],
    signatureListLabel: "Where CAROS keeps contracting revenue moving",
    signatureUseCases: [
      "Inquiry capture & fast response",
      "Consultation scheduling",
      "Bid & proposal follow-up",
      "Long-cycle pipeline tracking",
      "Scope & change communication",
      "Financing follow-up",
      "Design-build project follow-up",
      "Review generation",
      "Referral campaigns",
      "Past-client reactivation",
      "Warranty & callback organization",
      "Commercial project pipeline",
    ],
    metrics: [
      { value: "46", label: "Inquiries" },
      { value: "31", label: "Consults Held" },
      { value: "24", label: "Bids Sent" },
      { value: "9", label: "Projects Signed" },
      { value: "$486,000", label: "Booked Revenue" },
      { value: "7.1x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which sources produce signed projects?",
      "How fast are we responding to new inquiries?",
      "How many bids are waiting on follow-up?",
      "What's our bid-to-signed-contract rate?",
      "Which project types are most profitable to chase?",
      "How many past clients are due for outreach?",
      "How many bids went quiet with no follow-up?",
      "Where are we losing revenue between bid and signed contract?",
    ],
    recoveredText:
      "Bids that would have gone quiet and inquiries that were never scheduled — captured, followed up, and turned into signed projects.",
    experienceTitle: "Technology that keeps you",
    experienceTitleSerif: "on the job site.",
    faq: [
      {
        q: "Is CAROS construction project-management software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, schedules consultations, follows up on bids, and manages your sales pipeline. It works alongside the project-management tools you already use.",
      },
      {
        q: "How does CAROS help with long sales cycles?",
        a: "CAROS keeps every bid moving with professional, automated follow-up through a decision that can take weeks — so high-value projects don't stall out simply because nobody stayed in touch.",
      },
      {
        q: "Can CAROS handle both residential and commercial work?",
        a: "Yes. CAROS manages residential remodel pipelines as well as commercial and design-build bid follow-up, keeping every opportunity organized in one place.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles response and automates follow-up, so your team focuses on estimating and building. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our systems?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a general contractor involve?",
        a: "We review how inquiries are answered, how consultations are scheduled, how bids are followed up, and where projects stall — then show you exactly where revenue is leaking across the pipeline.",
      },
    ],
    ctaHeadline: "See where your contracting revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, bids, and projects are slipping away — and what it would take to sign more of them.",
    acquisitionItems: ["Inquiry & call capture", "Google & Facebook lead capture", "Website & consultation forms", "Source attribution"],
  },
)

/* ==========================================================================
   POOL SERVICES
   ========================================================================== */

const poolServices = make(
  {
    trade: "Pool Services",
    slug: "pool-services",
    customers: "customers",
    customer: "customer",
    job: "service",
    jobs: "services",
    estimate: "quote",
    estimates: "quotes",
    tech: "technician",
    techs: "technicians",
    site: "property",
    callWord: "service call",
    bookLabel: "booked services",
  },
  {
    heroEyebrow: "Industry Solution — Pool Services",
    heroTitle: "Openings, closings, and recurring routes —",
    heroTitleSerif: "if you capture them all.",
    heroSub:
      "Pool services run on seasonal spikes and recurring maintenance. CAROS captures every call during the open-and-close rush, follows up on every repair quote, and locks in recurring service routes — so your season is booked and your revenue repeats.",
    trustRow: ["Maintenance Routes", "Openings & Closings", "Repairs", "Green-to-Clean", "Commercial"],
    metaTitle: "CAROS for Pool Services | Capture Seasonal Calls & Grow Recurring Routes",
    metaDescription:
      "CAROS helps pool service companies handle the seasonal rush, follow up on repair quotes, lock in recurring maintenance routes, and track marketing ROI — the revenue operating system built for pool services.",
    keywords: [
      "pool service lead management",
      "pool service crm",
      "pool maintenance routes",
      "pool opening closing scheduling",
      "pool repair quote follow up",
      "pool service marketing",
      "pool service marketing roi",
      "recurring pool service",
      "commercial pool service leads",
      "pool service missed call text back",
    ],
    problemTitle: "You don't need more seasonal calls. You need to",
    problemTitleSerif: "keep them all year.",
    problemIntro:
      "Pool services spike hard at opening and closing, then settle into recurring maintenance. The revenue you lose is in the rush calls you can't answer, the repair quotes you never follow up, and the seasonal customers you never convert to a year-round route.",
    mattersWhen: [
      { label: "Seasonal calls", detail: "matter when they're answered fast during the open-and-close rush." },
      { label: "Repair quotes", detail: "matter when they're followed up until the customer approves." },
      { label: "One-time services", detail: "matter when they convert to recurring maintenance routes." },
      { label: "Commercial accounts", detail: "matter when steady, high-value accounts get reliable service." },
    ],
    problemClose: {
      text: "CAROS connects your whole call-to-route process around",
      gold: "measurable, recurring revenue.",
    },
    leaksIntro:
      "None of these are failures of good techs. They're failures of process — the gaps where seasonal demand and recurring revenue quietly slip away.",
    leaks: [
      "Opening and closing calls hit voicemail during the seasonal rush.",
      "Web leads sit for hours before anyone responds.",
      "Repair and equipment quotes go out and go silent.",
      "One-time customers are never offered a recurring route.",
      "Route customers cancel with no attempt to save them.",
      "Green-to-clean and specialty jobs slip without follow-up.",
      "Reviews and referrals are never requested.",
      "Nobody tracks which sources produce recurring customers.",
    ],
    leaksClose:
      "A handful of recurring routes lost or never converted each season compounds fast — because each one was worth a full year of scheduled service.",
    journeyIntro:
      "Every pool customer follows the same path from first call to standing route. CAROS makes that path consistent and visible — so you can see who books, who converts, and who lapses.",
    journey: ["Service Call", "Booking", "Opening / Service", "Repair Quote", "Recurring Route", "Save & Retain", "Reviews & Referrals"],
    journeyEndLabel: "Recurring Routes & Repeat Revenue",
    signatureEyebrow: "Seasonal Service & Recurring Routes",
    signatureTitle: "Turn a spring opening into a",
    signatureTitleSerif: "year-round route.",
    signatureBody: [
      "The best pool businesses smooth out the seasonal spikes with recurring maintenance. A single opening or repair can become a standing weekly route — but only if it's offered, scheduled, and protected against the cancellations that quietly thin your routes each year.",
      "CAROS builds and defends your recurring base: capturing the seasonal rush, converting one-time services into routes, following up on repair quotes, and saving cancellations before they stick — so your route revenue grows steadier every season.",
    ],
    signatureListLabel: "Where CAROS keeps pool revenue moving",
    signatureUseCases: [
      "Seasonal call capture",
      "Opening & closing scheduling",
      "Repair-quote follow-up",
      "Recurring-route conversion",
      "Route reminders",
      "Cancellation save flows",
      "Green-to-clean follow-up",
      "Equipment-upgrade follow-up",
      "Review generation",
      "Referral campaigns",
      "Lapsed-customer reactivation",
      "Commercial account pipeline",
    ],
    metrics: [
      { value: "79", label: "Service Calls" },
      { value: "54", label: "Services Booked" },
      { value: "31", label: "Converted to Routes" },
      { value: "11", label: "Cancellations Saved" },
      { value: "$147,000", label: "Booked Revenue" },
      { value: "6.5x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which campaigns produce recurring customers?",
      "How fast are we answering seasonal calls?",
      "How many repair quotes are waiting on follow-up?",
      "What's our one-time-to-route conversion rate?",
      "How many cancellations did we save this season?",
      "How many lapsed customers could we win back?",
      "Which routes have room for more stops?",
      "Where are we losing revenue between call and standing route?",
    ],
    recoveredText:
      "Seasonal calls that would have gone to voicemail and one-time services that would have stayed one-offs — captured, followed up, and turned into recurring routes.",
    experienceTitle: "Technology that keeps your techs",
    experienceTitleSerif: "on the route.",
    faq: [
      {
        q: "Is CAROS pool service routing software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures calls, books services, converts jobs into recurring routes, follows up on repair quotes, and saves cancellations. It works alongside your routing tools.",
      },
      {
        q: "How does CAROS help during the seasonal rush?",
        a: "CAROS answers and texts back every call, books openings and closings against your real availability, and automates follow-up — so the spring and fall rush fills your schedule instead of your voicemail.",
      },
      {
        q: "Can CAROS grow recurring route revenue?",
        a: "Yes. CAROS converts one-time services into recurring routes, keeps them on schedule, saves cancellations, and reactivates lapsed customers — building predictable, recurring revenue.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow calls and automates follow-up, so your team focuses on booking and servicing. It lets you scale without adding office staff too early.",
      },
      {
        q: "Does CAROS integrate with our systems?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can be your central system or complement what you use. We handle integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a pool service company involve?",
        a: "We review how calls are answered, how repair quotes are followed up, how services convert to routes, and where customers lapse — then show you exactly where recurring revenue is leaking.",
      },
    ],
    ctaHeadline: "See where your pool service revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where seasonal calls, repair quotes, and recurring routes are slipping away — and what it would take to keep them.",
    acquisitionItems: ["Seasonal call capture", "Google & Facebook lead capture", "Website & booking forms", "Source attribution"],
  },
)

/* ==========================================================================
   HOME SERVICES (general umbrella)
   ========================================================================== */

const homeServices = make(
  {
    trade: "Home Services",
    slug: "home-services",
    customers: "homeowners",
    customer: "homeowner",
    job: "job",
    jobs: "jobs",
    estimate: "estimate",
    estimates: "estimates",
    tech: "crew",
    techs: "crews",
    site: "job site",
    callWord: "service call",
    bookLabel: "booked jobs",
  },
  {
    heroEyebrow: "Industry Solution — Home Services",
    heroTitle: "Every service call is revenue. CAROS makes sure none of it",
    heroTitleSerif: "slips away.",
    heroSub:
      "Whether you run one trade or several, home-service revenue is won on the phone and lost in the follow-up. CAROS captures every call, books more jobs, follows up on every estimate, and shows you which marketing actually produces booked work.",
    trustRow: ["Residential", "Commercial", "Emergency Service", "Recurring Maintenance", "Multi-Trade"],
    metaTitle: "CAROS for Home Services | Capture Every Call & Book More Jobs",
    metaDescription:
      "CAROS is the customer-acquisition and revenue operating system for home-service businesses — answer every call, book more jobs, follow up on every estimate, and track which marketing produces booked revenue.",
    keywords: [
      "home services lead management",
      "home service crm",
      "contractor lead management software",
      "home services estimate follow up",
      "missed call text back home services",
      "home services appointment booking",
      "home services marketing roi",
      "trades business software",
      "home services sales pipeline",
      "service business automation",
    ],
    problemTitle: "You don't need more leads. You need to stop",
    problemTitleSerif: "losing the ones you have.",
    problemIntro:
      "Most home-service owners are told the answer is always more leads. But when you look at what already comes in — the calls that hit voicemail, the estimates that go quiet, the past customers who forget your name — the revenue you already paid to generate is leaking out faster than new leads come in.",
    mattersWhen: [
      { label: "Calls", detail: "matter when someone answers them before the homeowner dials the next company." },
      { label: "Estimates", detail: "matter when they're followed up until the homeowner actually decides." },
      { label: "Appointments", detail: "matter when they're confirmed and kept instead of quietly no-showing." },
      { label: "Ad spend", detail: "matters when you can see which campaigns produce booked jobs." },
    ],
    problemClose: {
      text: "CAROS ties your whole operation together around one thing:",
      gold: "booked, measurable revenue.",
    },
    leaksIntro:
      "None of these are failures of good tradespeople. They're failures of process — the quiet gaps where a ready-to-buy homeowner simply stops moving toward your business.",
    leaks: [
      "Calls hit voicemail while your crews are on a job site.",
      "Web and form leads sit for hours before anyone responds.",
      "Estimates go out and the homeowner goes silent, with no follow-up.",
      "Appointments get booked but never confirmed, so no-shows pile up.",
      "After-hours and weekend calls are lost entirely.",
      "One-time customers never hear from you again about the work they'll need next.",
      "Referrals come in verbally and never get logged or tracked.",
      "You can't tell which ads and campaigns actually produced paying jobs.",
    ],
    leaksClose:
      "Add up the missed calls and dead estimates across a single month and it's often more revenue than another marketing campaign would bring in — and no report is showing it to you.",
    journeyIntro:
      "Every job follows the same path from first contact to final invoice. CAROS makes that path consistent and visible — so you can see exactly where homeowners move forward and where they stall.",
    journey: ["Call / Inquiry", "First Response", "Estimate", "Scheduled Job", "Completed Work", "Invoice & Payment", "Reviews & Referrals"],
    journeyEndLabel: "Booked Jobs & Repeat Revenue",
    signatureEyebrow: "One System, Every Trade",
    signatureTitle: "One operating system for the whole",
    signatureTitleSerif: "business.",
    signatureBody: [
      "Most home-service owners run their business across a voicemail box, a paper calendar, a spreadsheet, and their own memory. Leads fall between the cracks not because anyone is careless, but because there's no single place where the whole customer journey lives.",
      "CAROS connects customer acquisition, follow-up, scheduling, reviews, and reporting into one system — so whether you do roofing, HVAC, plumbing, cleaning, or all of the above, every lead is captured and every dollar is accounted for in one place.",
    ],
    signatureListLabel: "Where CAROS keeps home-service revenue moving",
    signatureUseCases: [
      "Missed-call text back",
      "After-hours answering",
      "Instant lead response",
      "Estimate follow-up",
      "Online booking",
      "Appointment reminders",
      "Review generation",
      "Referral campaigns",
      "Maintenance reminders",
      "Past-customer reactivation",
      "Lead-source attribution",
      "Marketing ROI reporting",
    ],
    metrics: [
      { value: "84", label: "Calls & Leads" },
      { value: "56", label: "Jobs Booked" },
      { value: "39", label: "Estimates Sent" },
      { value: "27", label: "Jobs Won" },
      { value: "$142,000", label: "Booked Revenue" },
      { value: "6.8x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which ad campaigns actually produce booked jobs?",
      "How many calls did we miss last week?",
      "How many estimates are still waiting on follow-up?",
      "What's our booking rate from lead to job?",
      "How many past customers are due for repeat service?",
      "Which lead sources give us the best return?",
      "How fast are we responding to new leads?",
      "Where are we losing revenue between call and completed job?",
    ],
    recoveredText:
      "Calls that would have gone to voicemail and estimates that would have died in silence — captured, followed up, and turned into booked jobs.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "on the work.",
    faq: [
      {
        q: "I run more than one trade. Does CAROS still fit?",
        a: "Yes — that's exactly what it's built for. CAROS captures leads, books jobs, and follows up on estimates the same way across every service you offer, so a multi-trade business runs on one system instead of a patchwork of tools.",
      },
      {
        q: "Is CAROS field-service or dispatch software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures leads, books appointments, follows up on estimates, and tracks which sources produce booked jobs. It works alongside the field or dispatch tools you already use.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow calls, after-hours inquiries, and the follow-up your team has no time for, so your people focus on selling and running jobs. It helps you grow without adding office headcount too early.",
      },
      {
        q: "How fast can leads get a response with CAROS?",
        a: "Instantly. New leads get an automatic professional reply by text and email the moment they come in, and missed calls trigger an automatic text back — so you win the jobs that go to whoever answers first.",
      },
      {
        q: "Does CAROS work with my current phone and tools?",
        a: "CAROS connects with common phone, calendar, website, and payment tools, and can serve as your central system or work alongside what you already have. We configure the integrations for you during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit involve?",
        a: "We review how your calls are answered, how fast leads get a response, how estimates are followed up, and where jobs stall — then show you exactly where revenue is leaking between the first call and the completed job.",
      },
    ],
    ctaHeadline: "See where your revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where calls, estimates, and repeat work are slipping away — and what it would take to capture them.",
    acquisitionItems: ["Call & service-call capture", "Google & Facebook lead capture", "Website & form leads", "Referral logging & attribution"],
  },
)

/* ==========================================================================
   EVENTS & RETREATS
   ========================================================================== */

const eventsRetreats = make(
  {
    trade: "Events & Retreats",
    slug: "events-retreats",
    customers: "clients",
    customer: "client",
    job: "event",
    jobs: "events",
    estimate: "proposal",
    estimates: "proposals",
    tech: "coordinator",
    techs: "coordinators",
    site: "retreat",
    callWord: "inquiry call",
    bookLabel: "booked events",
  },
  {
    captureTitleSerif: "booked event.",
    captureIntro:
      "Event and retreat revenue is won in the first reply and lost in the long, quiet middle. CAROS makes sure every inquiry gets an instant response, every proposal is followed up, and every date is nurtured through the months-long decision — so bookings don't drift away to the planner who answered faster.",
    heroEyebrow: "Industry Solution — Events & Retreats",
    heroTitle: "The booking goes to whoever answers first and",
    heroTitleSerif: "follows up longest.",
    heroSub:
      "Event and retreat clients research for weeks and book slowly. CAROS answers every inquiry instantly, keeps proposals alive through the long decision, and nurtures every date on your calendar — so you fill the year instead of chasing it.",
    trustRow: ["Corporate Retreats", "Wellness Retreats", "Weddings", "Conferences", "Private Events"],
    metaTitle: "CAROS for Events & Retreats | Capture Inquiries & Fill Your Calendar",
    metaDescription:
      "CAROS helps event planners and retreat hosts respond to every inquiry instantly, follow up on proposals, and nurture bookings through a long decision cycle — the revenue operating system for the events industry.",
    keywords: [
      "event planner lead management",
      "retreat booking software",
      "event proposal follow up",
      "event planning crm",
      "wedding planner lead follow up",
      "corporate retreat booking",
      "event inquiry response",
      "venue booking pipeline",
      "event planner marketing roi",
      "retreat center crm",
    ],
    problemTitle: "You don't lose bookings on price. You lose them on",
    problemTitleSerif: "silence.",
    problemIntro:
      "By the time a client reaches out about an event or retreat, they've usually contacted several planners. The one who books the date is rarely the cheapest — it's the one who replied first, sent a thoughtful proposal, and kept the conversation warm through weeks of deliberation. Everyone else fades into the client's inbox.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a real response before the client hears back from three competitors." },
      { label: "Proposals", detail: "matter when they're followed up instead of left to decide in silence." },
      { label: "Dates", detail: "matter when tentative holds are nurtured toward signed contracts." },
      { label: "Referrals", detail: "matter when past clients are asked, at the right moment, to send the next one." },
    ],
    problemClose: {
      text: "CAROS keeps every inquiry, proposal, and held date moving toward",
      gold: "a signed, booked event.",
    },
    leaksIntro:
      "None of these are failures of a talented planner. They're failures of process — the quiet gaps where an excited client slowly cools off and books elsewhere.",
    leaks: [
      "Inquiries sit for a day while the client books a planner who replied in an hour.",
      "Proposals go out and the client goes quiet, with no structured follow-up.",
      "Tentative date holds expire because no one nurtured them to contract.",
      "Discovery calls get scheduled but never confirmed, so no-shows waste your week.",
      "Past clients plan another event and never think to call you.",
      "Vendor and venue referrals come in and never get logged.",
      "Deposits and contracts stall waiting on a reminder nobody sent.",
      "You can't tell which channels — ads, referrals, listings — actually produce booked events.",
    ],
    leaksClose:
      "A single lost corporate retreat or wedding can be tens of thousands in revenue — and most planners never see how many quietly slipped away between the first inquiry and the signed contract.",
    journeyIntro:
      "Every event follows the same path from first inquiry to final thank-you. CAROS makes that path consistent and visible — so you can see where clients move forward and where they stall.",
    journey: ["Inquiry", "Instant Response", "Discovery Call", "Proposal", "Follow-Up & Hold", "Signed Contract", "Event Day", "Reviews & Referrals"],
    journeyEndLabel: "Booked Events & Repeat Clients",
    signatureEyebrow: "The Long Decision Cycle",
    signatureTitle: "Stay top of mind through the",
    signatureTitleSerif: "long decision.",
    signatureBody: [
      "Events and retreats aren't impulse buys. A client might inquire in January for an October retreat and take months to commit. That long window is where most bookings are won or lost — and it's exactly where busy planners run out of time to follow up.",
      "CAROS carries the client through that window for you: instant replies, thoughtful proposal follow-ups, gentle nudges on held dates, and reminders at every deposit and milestone. You stay present and professional through the whole decision — without living in your inbox.",
    ],
    signatureListLabel: "Where CAROS keeps event revenue moving",
    signatureUseCases: [
      "Instant inquiry response",
      "Discovery-call booking",
      "Proposal follow-up",
      "Date-hold nurturing",
      "Deposit & contract reminders",
      "Milestone check-ins",
      "Vendor coordination reminders",
      "Post-event review requests",
      "Repeat-event reactivation",
      "Referral campaigns",
      "Seasonal date-fill campaigns",
      "Source attribution",
    ],
    metrics: [
      { value: "48", label: "Inquiries" },
      { value: "31", label: "Discovery Calls" },
      { value: "22", label: "Proposals Sent" },
      { value: "11", label: "Events Booked" },
      { value: "$268,000", label: "Booked Revenue" },
      { value: "9.1x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which channels actually produce booked events?",
      "How fast are we responding to new inquiries?",
      "How many proposals are still waiting on follow-up?",
      "Which held dates are close to expiring?",
      "What's our inquiry-to-booking rate?",
      "How many past clients are due for another event?",
      "Which seasons and date ranges are underbooked?",
      "Where are we losing bookings between inquiry and contract?",
    ],
    recoveredText:
      "Inquiries that would have gone cold and proposals that would have been forgotten — answered, nurtured, and turned into signed, booked events.",
    experienceTitle: "Technology that lets you focus on the",
    experienceTitleSerif: "experience.",
    faq: [
      {
        q: "Is CAROS event-management or day-of production software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, books discovery calls, follows up on proposals, and nurtures dates toward signed contracts. It works alongside the planning and production tools you use to run the event itself.",
      },
      {
        q: "Our sales cycle is months long. Does CAROS handle that?",
        a: "That's exactly where it helps most. CAROS keeps clients warm through a long decision with automatic proposal follow-ups, date-hold nudges, and milestone reminders — so bookings don't fade just because the decision takes time.",
      },
      {
        q: "Will CAROS make our outreach feel automated or impersonal?",
        a: "No. Every message goes out under your name and voice, and real people can step into any conversation. CAROS handles timing and consistency; your team keeps the relationship personal.",
      },
      {
        q: "Can it handle both corporate retreats and private events?",
        a: "Yes. You can run different inquiry types, proposals, and follow-up sequences for corporate retreats, weddings, conferences, and private events — all in one pipeline with clear reporting.",
      },
      {
        q: "Does CAROS work with our calendar and website forms?",
        a: "CAROS connects with common calendar, email, website, and payment tools, and can serve as your central system or work alongside what you have. We configure the integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for an events business involve?",
        a: "We review how quickly inquiries get answered, how proposals are followed up, how held dates are nurtured, and where bookings stall — then show you exactly where revenue is leaking across your calendar.",
      },
    ],
    ctaHeadline: "See where your event bookings are leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, proposals, and held dates are slipping away — and what it would take to fill your calendar.",
    acquisitionItems: ["Inquiry capture & instant response", "Google & Facebook lead capture", "Website & listing forms", "Referral logging & attribution"],
  },
)

/* ==========================================================================
   PARTY & EVENT RENTALS
   ========================================================================== */

const partyRentals = make(
  {
    trade: "Party & Event Rentals",
    slug: "party-event-rentals",
    customers: "customers",
    customer: "customer",
    job: "rental",
    jobs: "rentals",
    estimate: "quote",
    estimates: "quotes",
    tech: "crew",
    techs: "crews",
    site: "setup",
    callWord: "rental request",
    bookLabel: "booked rentals",
  },
  {
    captureTitleSerif: "booked rental.",
    captureIntro:
      "Rental revenue is won on the first quote and lost the moment a customer has to wait. CAROS answers every rental request fast, quotes availability while interest is hot, and follows up until the order is confirmed — so bookings don't go to the company that replied first.",
    heroEyebrow: "Industry Solution — Party & Event Rentals",
    heroTitle: "When someone needs a tent this weekend, they book whoever",
    heroTitleSerif: "answers now.",
    heroSub:
      "Rental customers shop fast and book fast. CAROS captures every request, quotes availability instantly, and follows up on every hold — so your inventory stays booked instead of losing orders to the next company on the list.",
    trustRow: ["Tents & Structures", "Tables & Seating", "Bounce Houses", "Staging & AV", "Linens & Décor"],
    metaTitle: "CAROS for Party & Event Rentals | Capture Requests & Book More Orders",
    metaDescription:
      "CAROS helps party and event rental companies answer every request fast, quote availability instantly, follow up on holds, and keep inventory booked — the revenue operating system for the rental industry.",
    keywords: [
      "party rental lead management",
      "event rental booking software",
      "rental quote follow up",
      "party rental crm",
      "bounce house rental software",
      "tent rental booking",
      "event rental inquiry response",
      "rental availability quoting",
      "party rental marketing roi",
      "equipment rental pipeline",
    ],
    problemTitle: "You don't lose orders on inventory. You lose them on",
    problemTitleSerif: "response time.",
    problemIntro:
      "A customer planning a party or event usually messages several rental companies at once. Whoever confirms availability and price first almost always wins the order. If a request sits in a voicemail box or unread inbox for a few hours, the tent, tables, or bounce house are already booked with someone else.",
    mattersWhen: [
      { label: "Requests", detail: "matter when someone quotes them before the customer books another company." },
      { label: "Quotes", detail: "matter when they're followed up instead of left sitting unanswered." },
      { label: "Holds", detail: "matter when tentative reservations are confirmed and paid before they expire." },
      { label: "Delivery", detail: "matters when setups and pickups are confirmed so nothing falls apart on event day." },
    ],
    problemClose: {
      text: "CAROS keeps every request, quote, and hold moving toward",
      gold: "a confirmed, paid rental.",
    },
    leaksIntro:
      "None of these are failures of a good rental operation. They're failures of process — the quiet gaps where a ready-to-book customer moves on to the company that answered faster.",
    leaks: [
      "Requests hit voicemail while your crews are out on a setup.",
      "Quotes go out and the customer goes quiet, with no follow-up.",
      "Tentative holds expire because no one confirmed the deposit.",
      "After-hours and weekend requests — peak booking time — are missed entirely.",
      "Delivery and pickup times aren't confirmed, causing event-day chaos.",
      "Repeat seasonal customers never get reminded to book again.",
      "Referrals from planners and venues never get logged or tracked.",
      "You can't tell which ads or listings actually produced paid orders.",
    ],
    leaksClose:
      "During peak season, a handful of missed requests each weekend can be more lost revenue than a new inventory purchase would earn back — and nothing on your calendar shows it.",
    journeyIntro:
      "Every rental follows the same path from first request to returned inventory. CAROS makes that path consistent and visible — so you can see where customers book and where they slip away.",
    journey: ["Rental Request", "Availability & Quote", "Follow-Up", "Deposit & Hold", "Confirmed Order", "Delivery & Setup", "Pickup & Reviews"],
    journeyEndLabel: "Booked Rentals & Repeat Orders",
    signatureEyebrow: "Peak-Season Demand",
    signatureTitle: "Capture the rush without dropping",
    signatureTitleSerif: "a single order.",
    signatureBody: [
      "Rental demand spikes hard around weekends, holidays, and event seasons. That's when the requests flood in — and when a small team can't possibly quote, follow up, and confirm fast enough. Every dropped request during the rush is inventory sitting idle that should have been earning.",
      "CAROS absorbs the surge with you: answering and texting back every request, quoting availability instantly, following up on holds, and confirming delivery windows — so your inventory stays booked through the busiest weekends instead of losing orders to a slow reply.",
    ],
    signatureListLabel: "Where CAROS keeps rental revenue moving",
    signatureUseCases: [
      "Instant request response",
      "Missed-call text back",
      "Availability quoting",
      "Quote follow-up",
      "Deposit & hold reminders",
      "Delivery & pickup confirmations",
      "Online booking forms",
      "Seasonal rebooking campaigns",
      "Review generation",
      "Planner & venue referral tracking",
      "Past-customer reactivation",
      "Source attribution",
    ],
    metrics: [
      { value: "97", label: "Rental Requests" },
      { value: "64", label: "Quotes Sent" },
      { value: "43", label: "Orders Confirmed" },
      { value: "38", label: "Deliveries Booked" },
      { value: "$88,000", label: "Booked Revenue" },
      { value: "7.9x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which ads and listings actually produce paid orders?",
      "How fast are we quoting new requests?",
      "How many quotes are still waiting on follow-up?",
      "Which holds are about to expire unpaid?",
      "What's our request-to-order conversion rate?",
      "How many seasonal customers haven't rebooked?",
      "Which weekends are underbooked right now?",
      "Where are we losing orders between request and confirmation?",
    ],
    recoveredText:
      "Requests that would have gone to voicemail and quotes that would have been forgotten — answered, followed up, and turned into confirmed, paid rentals.",
    experienceTitle: "Technology that keeps your crews",
    experienceTitleSerif: "on the truck.",
    faq: [
      {
        q: "Is CAROS rental inventory or logistics software?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures requests, quotes availability, follows up on holds, and confirms orders. It works alongside the inventory and dispatch tools you use to manage stock and delivery.",
      },
      {
        q: "How does CAROS help during peak-season weekends?",
        a: "CAROS answers and texts back every incoming request, sends quotes fast, and follows up on holds automatically — so a flood of weekend and after-hours requests turns into confirmed orders instead of missed calls.",
      },
      {
        q: "Can it handle delivery and pickup confirmations?",
        a: "Yes. CAROS sends automatic confirmations and reminders for delivery and pickup windows, cutting the day-of confusion that leads to unhappy customers and wasted crew trips.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No. CAROS handles overflow and after-hours requests and automates the follow-up your team has no time for, so your people focus on quoting big orders and running deliveries. It helps you scale through peak season without over-hiring.",
      },
      {
        q: "Does CAROS work with my website and booking forms?",
        a: "CAROS connects with common website, calendar, phone, and payment tools, and can serve as your central system or work alongside what you have. We configure the integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a rental business involve?",
        a: "We review how fast requests get quoted, how quotes are followed up, how holds are confirmed, and where orders slip away — then show you exactly where revenue is leaking across your booking calendar.",
      },
    ],
    ctaHeadline: "See where your rental orders are leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where requests, quotes, and holds are slipping away — and what it would take to keep your inventory booked.",
    acquisitionItems: ["Request capture & instant response", "Google & Facebook lead capture", "Website & booking forms", "Referral logging & attribution"],
  },
)

/* ==========================================================================
   REAL ESTATE
   ========================================================================== */

const realEstate = make(
  {
    trade: "Real Estate",
    slug: "real-estate",
    customers: "clients",
    customer: "client",
    job: "deal",
    jobs: "deals",
    estimate: "consultation",
    estimates: "consultations",
    tech: "agent",
    techs: "agents",
    site: "showing",
    callWord: "new client call",
    bookLabel: "signed clients",
  },
  {
    captureTitleSerif: "signed client.",
    captureIntro:
      "Real estate is won by speed-to-lead and lost in the long nurture. CAROS responds to every buyer and seller inquiry in seconds, books the consultation, and stays in touch through months of deciding — so leads you already paid for don't sign with the agent who called back first.",
    heroEyebrow: "Industry Solution — Real Estate",
    heroTitle: "The lead signs with the agent who called back",
    heroTitleSerif: "in five minutes.",
    heroSub:
      "In real estate, speed-to-lead decides who wins the client. CAROS responds to every inquiry in seconds, books consultations automatically, and nurtures buyers and sellers through a long decision — so the leads you paid for don't go to whoever answered first.",
    trustRow: ["Buyer's Agents", "Listing Agents", "Teams & Brokerages", "New Construction", "Property Management"],
    metaTitle: "CAROS for Real Estate | Speed-to-Lead & Long-Term Client Nurture",
    metaDescription:
      "CAROS helps real estate agents and teams respond to every lead in seconds, book consultations, and nurture buyers and sellers through a long decision cycle — the revenue operating system for real estate.",
    keywords: [
      "real estate lead management",
      "real estate speed to lead",
      "real estate crm",
      "realtor lead follow up",
      "real estate lead nurture",
      "buyer seller lead response",
      "real estate team pipeline",
      "real estate marketing roi",
      "real estate appointment booking",
      "realtor lead conversion",
    ],
    problemTitle: "You don't need more leads. You need to answer the ones",
    problemTitleSerif: "you're already buying.",
    problemIntro:
      "Agents spend a fortune on portals, ads, and lead sources — then lose most of those leads to slow follow-up. Studies have shown for years that the agent who responds within minutes wins the client, yet the average online lead waits hours for a first reply, if it comes at all. The leak isn't lead volume; it's response and nurture.",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a reply in minutes, not hours, while the client is still looking." },
      { label: "Consultations", detail: "matter when they're actually booked instead of promised and forgotten." },
      { label: "Nurture", detail: "matters when not-yet-ready buyers and sellers stay warm for months." },
      { label: "Lead spend", detail: "matters when you can see which sources produce signed clients." },
    ],
    problemClose: {
      text: "CAROS turns the leads you already pay for into",
      gold: "booked appointments and signed clients.",
    },
    leaksIntro:
      "None of these are failures of a good agent. They're failures of process — the quiet gaps where an expensive lead goes cold before anyone builds a relationship.",
    leaks: [
      "Portal and ad leads wait hours for a first response — and sign with a faster agent.",
      "Inquiries come in after hours or during showings and never get a reply.",
      "Not-yet-ready buyers and sellers get one call, then nothing for months.",
      "Consultations get scheduled but never confirmed, so no-shows waste your day.",
      "Past clients move again and use a different agent because you lost touch.",
      "Sphere and referral contacts never get systematic follow-up.",
      "Leads scattered across portals, email, and texts fall through the cracks.",
      "You can't tell which lead sources actually produce closed deals.",
    ],
    leaksClose:
      "A single lost transaction can be thousands in commission — and most agents never see how many expensive leads quietly went cold between the first inquiry and a signed agreement.",
    journeyIntro:
      "Every client follows the same path from first inquiry to closing and beyond. CAROS makes that path consistent and visible — so you can see where clients move forward and where they stall.",
    journey: ["Inquiry", "Instant Response", "Consultation", "Active Search / Listing", "Offer & Negotiation", "Under Contract", "Closing", "Stay-in-Touch & Referrals"],
    journeyEndLabel: "Signed Clients & Repeat Referrals",
    signatureEyebrow: "Speed-to-Lead & Long-Term Nurture",
    signatureTitle: "Answer in seconds, stay in touch for",
    signatureTitleSerif: "years.",
    signatureBody: [
      "Real estate has two revenue problems at once: the leads that need an instant response, and the ones that won't transact for six, twelve, or eighteen months. Miss the first and you lose the client today; neglect the second and you lose them to whoever stayed in touch.",
      "CAROS handles both. It replies to new inquiries in seconds and books the consultation, then keeps not-yet-ready buyers and sellers warm with consistent, personal-feeling follow-up until they're ready to move. Your database stops being a graveyard and starts being a pipeline.",
    ],
    signatureListLabel: "Where CAROS keeps real estate revenue moving",
    signatureUseCases: [
      "Instant lead response",
      "Missed-call text back",
      "Consultation booking",
      "Long-term buyer nurture",
      "Seller-lead follow-up",
      "Past-client stay-in-touch",
      "Sphere & referral campaigns",
      "Home-anniversary & market-update touches",
      "Review generation after closing",
      "Database reactivation",
      "Lead-source attribution",
      "Team lead routing",
    ],
    metrics: [
      { value: "112", label: "Leads" },
      { value: "58", label: "Consultations Booked" },
      { value: "24", label: "Active Clients" },
      { value: "9", label: "Deals Closed" },
      { value: "$4.2M", label: "Volume Closed" },
      { value: "8.6x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which lead sources actually produce closed deals?",
      "How fast are we responding to new leads?",
      "How many leads are sitting without follow-up?",
      "How many past clients are we losing touch with?",
      "What's our lead-to-consultation conversion rate?",
      "Which nurture contacts are re-engaging cold leads?",
      "How is each agent on the team following up?",
      "Where are we losing clients between inquiry and signed agreement?",
    ],
    recoveredText:
      "Expensive portal and ad leads that would have gone cold — answered in seconds, nurtured for months, and turned into booked consultations and signed clients.",
    experienceTitle: "Technology that lets you focus on",
    experienceTitleSerif: "clients, not admin.",
    faq: [
      {
        q: "Is CAROS a transaction-management or MLS platform?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures and responds to leads, books consultations, and nurtures buyers and sellers over time. It works alongside your MLS, transaction, and brokerage tools.",
      },
      {
        q: "How does CAROS improve speed-to-lead?",
        a: "New leads from any source get an automatic, personalized response within seconds by text and email, and missed calls trigger an instant text back — so you reach clients while they're still looking instead of hours later.",
      },
      {
        q: "Can CAROS nurture leads that won't buy or sell for months?",
        a: "Yes — that's one of its biggest wins. CAROS keeps not-yet-ready buyers and sellers warm with consistent, personal-feeling follow-up and timely touches, so your database becomes a steady source of future transactions instead of going cold.",
      },
      {
        q: "Does it work for a team with multiple agents?",
        a: "Yes. CAROS routes leads to the right agent, tracks how each person follows up, and gives team leaders clear visibility into response times and pipeline — so no lead falls through the cracks between agents.",
      },
      {
        q: "Does CAROS integrate with my portals and current CRM?",
        a: "CAROS connects with common lead sources, phone, calendar, and website tools, and can serve as your central system or work alongside what you have. We configure the integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for real estate involve?",
        a: "We review how fast leads get a response, how consultations are booked, how long-term nurture is handled, and where clients go cold — then show you exactly where commission is leaking across your pipeline.",
      },
    ],
    ctaHeadline: "See where your real estate revenue is leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where leads, consultations, and past clients are slipping away — and what it would take to convert the leads you already pay for.",
    acquisitionItems: ["Instant lead response & capture", "Portal, Google & Facebook leads", "Website & landing-page forms", "Sphere & referral attribution"],
  },
)

/* ==========================================================================
   TRAVEL AGENTS
   ========================================================================== */

const travelAgents = make(
  {
    trade: "Travel",
    label: "Travel Agents",
    slug: "travel-agents",
    customers: "travelers",
    customer: "traveler",
    job: "trip",
    jobs: "trips",
    estimate: "itinerary",
    estimates: "itineraries",
    tech: "advisor",
    techs: "advisors",
    site: "trip",
    callWord: "planning call",
    bookLabel: "booked trips",
  },
  {
    captureTitleSerif: "booked trip.",
    captureIntro:
      "Travel revenue is won on the first reply and lost while a traveler comparison-shops. CAROS answers every planning inquiry fast, keeps proposed itineraries alive through the decision, and nurtures past travelers toward their next trip — so bookings don't drift to the agent who responded first.",
    heroEyebrow: "Industry Solution — Travel Agents",
    heroTitle: "The trip gets booked with whoever responds while the",
    heroTitleSerif: "dream is still fresh.",
    heroSub:
      "Travelers plan on emotion and book on momentum. CAROS answers every inquiry fast, keeps proposed itineraries alive through the decision, and brings past travelers back for the next trip — so you book more without living in your inbox.",
    trustRow: ["Luxury Travel", "Honeymoons", "Group & Corporate", "Cruises", "Destination Weddings"],
    metaTitle: "CAROS for Travel Agents | Capture Inquiries & Book More Trips",
    metaDescription:
      "CAROS helps travel advisors respond to every inquiry fast, follow up on itineraries, and bring past travelers back for their next trip — the revenue operating system for travel agencies.",
    keywords: [
      "travel agent lead management",
      "travel advisor crm",
      "travel itinerary follow up",
      "travel agency lead response",
      "travel agent booking software",
      "travel lead nurture",
      "honeymoon travel leads",
      "travel agency marketing roi",
      "travel advisor pipeline",
      "repeat traveler campaigns",
    ],
    problemTitle: "You don't lose bookings on price. You lose them to",
    problemTitleSerif: "the slow reply.",
    problemIntro:
      "A traveler dreaming about a trip is at their most ready to book the moment they reach out. But they often message several advisors and online options at once, and excitement fades fast. The advisor who replies while the dream is still fresh — and keeps the itinerary moving — wins the booking. Everyone else gets 'we decided to book online.'",
    mattersWhen: [
      { label: "Inquiries", detail: "matter when they get a reply while the traveler is still excited, not two days later." },
      { label: "Itineraries", detail: "matter when they're followed up instead of left to decide in silence." },
      { label: "Deposits", detail: "matter when travelers are gently reminded before the fare or room changes." },
      { label: "Past travelers", detail: "matter when they're brought back for the next trip instead of forgotten." },
    ],
    problemClose: {
      text: "CAROS keeps every inquiry, itinerary, and past traveler moving toward",
      gold: "a booked, paid trip.",
    },
    leaksIntro:
      "None of these are failures of a great advisor. They're failures of process — the quiet gaps where an excited traveler cools off and books without you.",
    leaks: [
      "Inquiries sit for a day while the traveler's excitement fades — or they book online.",
      "Proposed itineraries go out and the traveler goes quiet, with no follow-up.",
      "Quotes expire because no one reminded the traveler before prices changed.",
      "After-hours inquiries — often when people dream and plan — are missed entirely.",
      "Past travelers plan their next trip and never think to call you.",
      "Referrals from happy clients never get logged or asked for.",
      "Deposits and final payments stall waiting on a reminder nobody sent.",
      "You can't tell which ads, referrals, or channels actually produce booked trips.",
    ],
    leaksClose:
      "A single lost honeymoon or luxury group trip can be thousands in commission — and most agencies never see how many excited travelers quietly booked elsewhere.",
    journeyIntro:
      "Every trip follows the same path from first daydream to welcome-home. CAROS makes that path consistent and visible — so you can see where travelers book and where they drift away.",
    journey: ["Inquiry", "Fast Response", "Planning Call", "Itinerary & Quote", "Follow-Up", "Deposit & Booking", "The Trip", "Welcome Home & Referrals"],
    journeyEndLabel: "Booked Trips & Repeat Travelers",
    signatureEyebrow: "Repeat & Referral Travel",
    signatureTitle: "The next trip should always come back",
    signatureTitleSerif: "to you.",
    signatureBody: [
      "Winning a traveler once is hard and expensive. The real profit is in the second, third, and fifth trip — and in the friends they refer. Yet most advisors are so buried in active bookings that past travelers drift away and quietly rebook online or with whoever emailed them first.",
      "CAROS makes repeat and referral travel automatic: welcome-home messages, anniversary-trip nudges, seasonal deals matched to a traveler's style, and easy referral asks at the happiest moment — right after a great trip. Your client list becomes a booking engine instead of a contact archive.",
    ],
    signatureListLabel: "Where CAROS keeps travel revenue moving",
    signatureUseCases: [
      "Fast inquiry response",
      "Planning-call booking",
      "Itinerary follow-up",
      "Deposit & payment reminders",
      "Price-change nudges",
      "Welcome-home messages",
      "Anniversary-trip campaigns",
      "Seasonal & destination deals",
      "Review generation",
      "Referral campaigns",
      "Past-traveler reactivation",
      "Source attribution",
    ],
    metrics: [
      { value: "73", label: "Inquiries" },
      { value: "46", label: "Planning Calls" },
      { value: "34", label: "Itineraries Sent" },
      { value: "21", label: "Trips Booked" },
      { value: "$196,000", label: "Booked Travel" },
      { value: "8.2x", label: "Marketing ROI", highlight: true },
    ],
    questions: [
      "Which channels actually produce booked trips?",
      "How fast are we responding to new inquiries?",
      "How many itineraries are still waiting on follow-up?",
      "Which quotes are about to expire on price?",
      "What's our inquiry-to-booking rate?",
      "How many past travelers are due for their next trip?",
      "Which destinations and seasons are underbooked?",
      "Where are we losing bookings between inquiry and deposit?",
    ],
    recoveredText:
      "Inquiries that would have cooled off and itineraries that would have been forgotten — answered, followed up, and turned into booked, paid trips.",
    experienceTitle: "Technology that lets you focus on the",
    experienceTitleSerif: "journey.",
    faq: [
      {
        q: "Is CAROS a booking or GDS platform?",
        a: "No. CAROS is a customer-acquisition and revenue-operations system. It captures inquiries, books planning calls, follows up on itineraries, and brings past travelers back. It works alongside the booking engines and supplier tools you already use.",
      },
      {
        q: "How does CAROS help me book more of the leads I get?",
        a: "It replies to every inquiry fast while the traveler is still excited, books the planning call, and follows up on proposed itineraries automatically — so fewer dreamers drift off and book online or with a faster advisor.",
      },
      {
        q: "Can CAROS bring back past travelers?",
        a: "Yes — that's one of its biggest wins. CAROS automates welcome-home messages, anniversary-trip nudges, and seasonal offers matched to each traveler, turning your past-client list into a steady source of repeat and referral bookings.",
      },
      {
        q: "Will my outreach still feel personal?",
        a: "Yes. Every message goes out under your name and voice, and you can step into any conversation at any time. CAROS handles the timing and consistency; you keep the relationship personal.",
      },
      {
        q: "Does CAROS work with my calendar, email, and website?",
        a: "CAROS connects with common calendar, email, website, and payment tools, and can serve as your central system or work alongside what you have. We configure the integrations during setup.",
      },
      {
        q: "What does a CAROS Revenue Audit for a travel agency involve?",
        a: "We review how fast inquiries get answered, how itineraries are followed up, how past travelers are re-engaged, and where bookings stall — then show you exactly where commission is leaking across your pipeline.",
      },
    ],
    ctaHeadline: "See where your travel bookings are leaking.",
    ctaSub:
      "A CAROS Revenue Audit shows you exactly where inquiries, itineraries, and past travelers are slipping away — and what it would take to book more of them.",
    acquisitionItems: ["Inquiry capture & fast response", "Google & Facebook lead capture", "Website & landing-page forms", "Referral logging & attribution"],
  },
)

/* ==========================================================================
   WELLNESS SPAS
   ========================================================================== */

const wellnessSpas = make(
  {
    trade: "Wellness Spas", slug: "wellness-spas", customers: "guests", customer: "guest",
    job: "appointment", jobs: "appointments", estimate: "consultation", estimates: "consultations",
    tech: "provider", techs: "providers", site: "spa", callWord: "inquiry", bookLabel: "booked appointments",
  },
  {
    heroEyebrow: "Industry Solution — Wellness Spas",
    heroTitle: "The Guest Experience Begins Before They",
    heroTitleSerif: "Enter the Spa.",
    heroSub: "CAROS gives every guest a seamless, considered path from discovery to rebooking — protecting the calm, elevated experience that makes your spa worth returning to.",
    visualTheme: "luxury",
    trustRow: ["Day Spas", "Medical Spas", "Memberships", "Skin & Body", "Recovery"],
    metaTitle: "CAROS for Spas & Wellness | Booking Recovery & Membership Retention",
    metaDescription: "Fill empty treatment rooms, recover cancellations, and retain members with CAROS revenue automation for spas.",
    keywords: ["wellness spa software", "spa appointment follow up", "med spa lead management", "spa membership retention", "spa marketing roi"],
    problemTitle: "A full treatment room still does not guarantee",
    problemTitleSerif: "healthy revenue.",
    problemIntro: "Spas lose revenue in the space between an inquiry, a first appointment, a recommended plan, and the next visit. CAROS keeps that guest journey moving with timely, personal follow-up.",
    mattersWhen: [
      { label: "11:00 — The Two O'Clock Ritual", detail: "A guest cancels a signature facial with just enough notice to save the appointment. CAROS offers the opening to a matched waitlist guest without making the experience feel transactional." },
      { label: "After the Treatment — The Quiet Upsell", detail: "A guest leaves glowing after a $120 service. A thoughtful product note and care ritual turns the result into a $180 visit without a hard sell at checkout." },
      { label: "Day 30 — The Member Who Went Quiet", detail: "A member has not booked since joining. CAROS surfaces the relationship before it becomes churn and invites them back with a recommendation that feels personal." },
      { label: "The Gift Card That Became a Ritual", detail: "A first-time guest redeems a gift card on a Saturday. A warm welcome and perfectly timed rebooking invitation turns a prepaid visit into a new routine." },
    ],
    problemClose: { text: "CAROS connects the guest journey around", gold: "repeatable wellness revenue." },
    leaksIntro: "The most expensive leaks are usually quiet: an inquiry that waits, a package that is never followed up, or a guest who simply forgets to return.",
    leaks: ["Web inquiries wait until the front desk has a gap.", "Consultation recommendations are not converted into booked treatments.", "Membership prospects leave without a timely follow-up.", "No-show guests are not rebooked with a personal touch.", "Past guests receive no seasonal or milestone outreach.", "Package balances and renewal moments are easy to miss.", "Referral opportunities are not attributed to the right guest or provider."],
    leaksClose: "A handful of missed rebookings each week can quietly outweigh the cost of every new campaign you run.",
    journeyIntro: "CAROS makes the path from curiosity to recurring wellness visible and consistent.",
    journey: ["Booking", "Treatment", "Retail Recommendation", "Rebooking", "Membership", "Gift Card Redemption", "Referral"],
    journeyEndLabel: "Spa Day Flow: Full Rooms & Returning Members",
    signatureEyebrow: "Guest Retention Revenue",
    signatureTitle: "The best spa marketing is the guest who",
    signatureTitleSerif: "comes back.",
    signatureBody: ["A first visit is an opportunity, not the finish line. The right follow-up helps a guest understand what comes next and makes returning feel natural.", "CAROS keeps rebooking, membership, package, and referral moments from depending on memory alone while your team stays focused on care."],
    signatureListLabel: "Where CAROS keeps spa revenue moving",
    signatureUseCases: ["Inquiry response", "Consultation follow-up", "Treatment-plan reminders", "Membership nurture", "No-show recovery", "Package renewal prompts", "Birthday and milestone campaigns", "Review requests", "Referral attribution", "Dormant-guest reactivation"],
    metrics: [{ value: "$500+", label: "Protected / Recovered Cancellation" }, { value: "$1,200", label: "Annual Value / Retained Member" }, { value: "47%", label: "Bookings After 6 PM" }, { value: "60%", label: "No-Shows: First-Time Guests" }, { value: "34%", label: "Retail Follow-Up Spend Lift" }, { value: "Month one", label: "Payback Potential", highlight: true }],
    questions: ["Which campaigns create first visits?", "How many consultations never become treatment plans?", "Which guests are due for a rebooking?", "What is our membership conversion rate?", "Where are no-shows being lost?", "Which providers generate repeat visits?"],
    recoveredText: "Guests who would have drifted away — rebooked, renewed, and referred with a consistent experience.",
    experienceTitle: "Technology that protects the",
    experienceTitleSerif: "human touch.",
    faq: [
      { q: "Is CAROS a spa booking system?", a: "CAROS works alongside your booking and payment tools. It focuses on the revenue layer around them: inquiries, follow-up, rebooking, memberships, and the guest relationships that create repeat visits." },
      { q: "Can it work with memberships and packages?", a: "Yes. CAROS can organize renewal, usage, and follow-up moments so guests receive relevant outreach without your team maintaining another manual list." },
      { q: "Will messages feel automated?", a: "Messages are configured around your brand voice and guest experience. CAROS handles consistency and timing while your team can step into any conversation." },
      { q: "What does a Wellness Spa Revenue Audit review?", a: "We review response speed, consultation conversion, rebooking, membership follow-up, no-show recovery, and past-guest reactivation to show where revenue is being left behind." },
    ],
    ctaHeadline: "See Where Your Spa Revenue Is Leaking",
    ctaSub: "Book a Revenue Walkthrough to see how cancellations, retail, memberships, and gift cards can protect more revenue.",
    acquisitionItems: ["Website & inquiry capture", "Google & social lead capture", "Referral logging", "Campaign source attribution"],
  },
)

/* ==========================================================================
   MEDICAL PRACTICES
   ========================================================================== */

const medicalPractices = make(
  {
    trade: "Medical Practices", slug: "medical-practices", customers: "patients", customer: "patient",
    job: "appointment", jobs: "appointments", estimate: "consultation", estimates: "consultations",
    tech: "care team member", techs: "care team members", site: "practice", callWord: "patient inquiry", bookLabel: "booked visits",
  },
  {
    heroEyebrow: "Industry Solution — Medical Practices",
    heroTitle: "A Missed Call Is a Missed Patient. A Missed Patient Is",
    heroTitleSerif: "Lost Care.",
    heroSub: "When your front desk is triaging a full waiting room, CAROS answers the next patient, collects the clinical context your team needs, and moves the visit toward a safe, scheduled next step.",
    visualTheme: "clinical",
    trustRow: ["Primary Care", "Specialty Care", "Dental", "Wellness Medicine", "Multi-Location"],
    metaTitle: "CAROS for Medical Practices | Patient Acquisition & Retention",
    metaDescription: "Stop losing patients to voicemail. CAROS captures calls, reduces no-shows, and automates follow-up for medical and dental practices.",
    keywords: ["medical practice growth system", "patient appointment follow up", "healthcare lead management", "medical practice marketing roi", "patient reactivation"],
    problemTitle: "More demand does not help if patients cannot find",
    problemTitleSerif: "the next step.",
    problemIntro: "Practice growth is shaped by access: how quickly a prospective patient gets an answer, how reliably a referral is followed, and whether an open appointment becomes a completed visit.",
    mattersWhen: [
      { label: "08:45 — Chest Pain, One Ring", detail: "A patient calls before clinic opens. The nurse is rooming someone else, the call rolls to voicemail, and the patient searches for the next practice with same-day availability. CAROS captures the request, records the urgency for staff review, and protects the callback." },
      { label: "12:10 — The Empty Exam Room", detail: "A no-show leaves a provider and room idle through lunch. CAROS had already sent the reminder sequence and flags the gap for a same-day fill instead of letting capacity disappear." },
      { label: "18:40 — Intake After Hours", detail: "A parent submits symptoms and insurance details after the office closes. CAROS confirms receipt, sets expectations, and queues the right follow-up for the morning team." },
      { label: "Friday — The Referral Without an Owner", detail: "A specialist referral lands in a shared inbox with no clear handoff. CAROS assigns the next step, tracks scheduling, and keeps the patient from becoming a lost fax." },
    ],
    problemClose: { text: "CAROS helps your practice turn access into", gold: "measurable patient growth." },
    leaksIntro: "The revenue leaks in a practice are often operational, not clinical: the missed callback, the referral without an owner, and the patient who never receives a reminder.",
    leaks: ["New-patient calls reach voicemail during busy clinic hours.", "Referral records sit without a scheduling follow-up.", "Online forms do not receive a timely response.", "Patients postpone care and are never invited back.", "Recall lists depend on manual work and inconsistent ownership.", "No-shows are not recovered into new appointments.", "Marketing reports show leads but not completed visits."],
    leaksClose: "When access feels uncertain, patients choose the practice that makes the next step easiest.",
    journeyIntro: "CAROS makes the patient-access journey visible without replacing clinical systems or clinical judgment.",
    journey: ["Online Search", "Call Answered by CAROS", "Appointment Booked", "Reminder Sent", "Visit Completed", "Review Requested", "Rebooking Reminder"],
    journeyEndLabel: "Patient Journey: Completed Visits & Repeat Care",
    signatureEyebrow: "Patient Access Revenue",
    signatureTitle: "The care patients complete is the care your practice",
    signatureTitleSerif: "can grow around.",
    signatureBody: ["A patient who cannot reach the practice may never become a patient. A patient who leaves without a clear follow-up path may not return.", "CAROS coordinates the communication and accountability around access so your staff can spend more time on patients in front of them."],
    signatureListLabel: "Where CAROS keeps practice growth moving",
    signatureUseCases: ["New-patient response", "Referral follow-up", "Appointment reminders", "No-show recovery", "Recall campaigns", "Care-plan next steps", "Review requests", "Location routing", "Source attribution", "Dormant-patient reactivation"],
    metrics: [{ value: "$1,200+", label: "Annual Value / New Patient" }, { value: "2", label: "Extra Patients / Month" }, { value: "40%", label: "No-Show Reduction" }, { value: "24h", label: "Review Request Timing" }, { value: "$250", label: "Profit / Open Chair" }, { value: "Pays for itself", label: "With Two Extra Patients", highlight: true }],
    questions: ["How fast are new patients receiving a response?", "Which referral sources create completed visits?", "How many no-shows are recovered?", "Which providers or locations need more demand?", "How many recall opportunities are outstanding?", "Where does the patient journey stall?"],
    recoveredText: "Patient inquiries, referrals, recalls, and appointments that would have stalled — assigned, followed up, and completed.",
    experienceTitle: "Technology that makes access feel",
    experienceTitleSerif: "human.",
    faq: [
      { q: "Does CAROS replace our EHR or practice management system?", a: "No. CAROS works around the systems you already use, organizing the communication, follow-up, attribution, and access workflows that those systems may not manage end to end." },
      { q: "Can CAROS handle sensitive patient information?", a: "Implementation should be configured around your compliance requirements and approved systems. CAROS is designed to support operational communication, not to replace clinical documentation or medical advice." },
      { q: "Can it help with referrals and recalls?", a: "Yes. CAROS can give each referral or recall opportunity an owner, a next step, and a follow-up rhythm so fewer patients disappear between intent and appointment." },
      { q: "What does a Medical Practice Revenue Audit review?", a: "We review access speed, referral handling, appointment conversion, no-show recovery, recall workflows, and source attribution to identify where practice growth is being lost." },
    ],
    ctaHeadline: "See Your Patient Leak Report",
    ctaSub: "Book a Practice Audit to see where calls, schedule gaps, no-shows, and reviews are costing your practice revenue.",
    acquisitionItems: ["Website & patient inquiry capture", "Referral source tracking", "Google & campaign attribution", "Location and provider routing"],
  },
)

/* ==========================================================================
   FINANCIAL SERVICES
   ========================================================================== */

const financialServices = make(
  {
    trade: "Financial Services", slug: "financial-services", customers: "prospects", customer: "prospect",
    job: "conversation", jobs: "conversations", estimate: "proposal", estimates: "proposals",
    tech: "advisor", techs: "advisors", site: "practice", callWord: "inquiry", bookLabel: "qualified engagements",
  },
  {
    heroEyebrow: "Industry Solution — Financial Services",
    heroTitle: "The Most Valuable Client in the Room Should Never Feel",
    heroTitleSerif: "Rushed.",
    heroSub: "CAROS quietly prepares the right information, protects every follow-up, and gives your advisory team more room to deliver the kind of attention high-value relationships expect.",
    visualTheme: "discreet",
    trustRow: ["Wealth Management", "Financial Planning", "Lending", "Tax Advisory", "Insurance & Risk"],
    metaTitle: "CAROS for Financial Advisors | Prospect Qualification & Onboarding",
    metaDescription: "Qualify high-net-worth prospects instantly, collect documents faster, and never miss a discovery call with CAROS.",
    keywords: ["financial advisor lead follow up", "financial services crm", "wealth management lead management", "advisor marketing roi", "financial planning client acquisition"],
    problemTitle: "Your prospects are making a decision about",
    problemTitleSerif: "trust before price.",
    problemIntro: "Financial decisions take time, but a slow or unclear follow-up experience creates doubt. CAROS helps firms stay present between first inquiry and signed engagement without turning relationship-building into a spreadsheet exercise.",
    mattersWhen: [
      { label: "The Quiet $2M Inquiry", detail: "A senior executive submits a discreet inquiry from a personal device. CAROS acknowledges it without noise, gathers only the right context, and routes a considered response to the right advisor." },
      { label: "The Meeting That Feels Prepared", detail: "Before the discovery call, requested documents arrive in a private, orderly sequence. The advisor enters with context instead of asking the client to repeat their story." },
      { label: "The Calendar Hold That Protects Trust", detail: "A high-intent prospect cannot make the first time offered. CAROS preserves the relationship with a quiet sequence rather than letting a premium conversation dissolve." },
      { label: "The Introduction Made Carefully", detail: "A client mentions a colleague during a milestone review. CAROS helps the advisor follow up with the right degree of discretion, preserving the intimacy of the referral." },
    ],
    problemClose: { text: "CAROS turns scattered prospect activity into", gold: "visible relationship momentum." },
    leaksIntro: "In financial services, the revenue leak is rarely a single missed click. It is the accumulation of unanswered questions and undefined next steps.",
    leaks: ["A high-intent inquiry waits for the advisor to become available.", "Discovery notes do not create an accountable follow-up plan.", "A proposal is sent without a structured decision path.", "Prospects receive inconsistent nurture across advisors.", "Referrals are acknowledged late or not attributed.", "Existing clients are not prompted around planning milestones.", "Marketing activity is reported without tying it to engaged relationships."],
    leaksClose: "When the experience feels uncertain, prospects delay — and delayed decisions are easy for another firm to inherit.",
    journeyIntro: "CAROS gives the relationship journey a dependable operating rhythm while leaving advice and judgment with your advisors.",
    journey: ["Inquiry Received", "CAROS Qualifies in <60s", "Discovery Call Scheduled", "Documents Collected", "Proposal Delivered", "Onboarding Complete", "Quarterly Review Sequence", "Referral Request"],
    journeyEndLabel: "Wealth Journey: Engaged Households & AUM Revenue",
    signatureEyebrow: "Relationship Growth Revenue",
    signatureTitle: "The next client is often already in your",
    signatureTitleSerif: "network.",
    signatureBody: ["Trust is built in the details: remembering the referral, following up after a proposal, and reaching out before a planning need becomes urgent.", "CAROS creates the prompts, ownership, and visibility that help advisors protect those details at scale."],
    signatureListLabel: "Where CAROS keeps advisory growth moving",
    signatureUseCases: ["Inquiry acknowledgment", "Discovery follow-up", "Proposal nurture", "Referral attribution", "Client milestone outreach", "Annual review reminders", "Dormant-prospect reactivation", "Event follow-up", "Source attribution", "Advisor workload visibility"],
    metrics: [{ value: "$50,000", label: "AUM Value / Qualified Household" }, { value: "12+", label: "Documents / New Client" }, { value: "<60s", label: "Prospect Qualification" }, { value: "$2M", label: "Assets in 'Just Looking' Inquiry" }, { value: "$15k–$50k", label: "Annual Revenue / Household" }, { value: "Cheapest", label: "Insurance Policy You'll Buy", highlight: true }],
    questions: ["Which sources create qualified prospects?", "How quickly does each inquiry receive a personal response?", "Which proposals are waiting on a next step?", "Where do prospects lose confidence?", "Which clients are due for a planning conversation?", "How much growth comes from referrals?"],
    recoveredText: "Prospects and referrals that would have cooled off — acknowledged, nurtured, and moved into the right advisor conversation.",
    experienceTitle: "Technology that reinforces",
    experienceTitleSerif: "earned trust.",
    faq: [
      { q: "Is CAROS a financial planning or portfolio system?", a: "No. CAROS is the revenue operating layer around your advisory process. It helps manage inquiry response, follow-up, proposal momentum, referrals, and client reactivation while your existing systems handle financial work." },
      { q: "Will outreach be compliant and advisor-approved?", a: "Your team defines the approved messaging, workflows, and review points. CAROS can automate timing and task ownership, but firms remain responsible for compliance, supervision, and the advice they provide." },
      { q: "Can it work across multiple advisors?", a: "Yes. CAROS can route inquiries, referrals, and follow-up based on advisor, service line, location, or source so every prospect has clear ownership." },
      { q: "What does a Financial Services Revenue Audit review?", a: "We review inquiry response, discovery conversion, proposal follow-up, referral handling, advisor ownership, and source attribution to reveal where relationship momentum is being lost." },
    ],
    ctaHeadline: "Audit Your Prospect Experience",
    ctaSub: "Schedule Your Firm Review to see where qualified prospects, documents, discovery calls, and referrals are losing momentum.",
    acquisitionItems: ["Website & inquiry capture", "Referral source logging", "Campaign and event attribution", "Advisor and service-line routing"],
  },
)

/* ==========================================================================
   INSURANCE BROKERAGE
   ========================================================================== */

const insuranceBrokerage = make(
  {
    trade: "Insurance Brokerage", slug: "insurance-brokerage", customers: "policyholders", customer: "policyholder",
    job: "conversation", jobs: "conversations", estimate: "quote", estimates: "quotes",
    tech: "producer", techs: "producers", site: "office", callWord: "coverage inquiry", bookLabel: "bound policies",
  },
  {
    heroEyebrow: "Industry Solution — Insurance Brokerage",
    heroTitle: "Every Quote Has a Winner. Make Sure It",
    heroTitleSerif: "Isn't the Other Broker.",
    heroSub: "CAROS responds before the comparison shopping starts, keeps every proposal in motion, and gives your producers the sharpest follow-up advantage in the market.",
    visualTheme: "competitive",
    trustRow: ["Personal Lines", "Commercial", "Benefits", "Life & Health", "Independent Agencies"],
    metaTitle: "CAROS for Insurance Brokers | Quote Follow-Up & Renewals",
    metaDescription: "Insurance leads go cold fast. CAROS answers instantly, follows up on quotes, and protects your renewal book.",
    keywords: ["insurance brokerage lead management", "insurance quote follow up", "agency renewal retention", "insurance producer crm", "insurance marketing roi"],
    problemTitle: "A competitive quote does not win without",
    problemTitleSerif: "consistent follow-through.",
    problemIntro: "Insurance revenue is shaped by timing and trust: responding to a coverage question, explaining the quote, following up before expiration, and staying present after the policy binds.",
    mattersWhen: [
      { label: "19:42 — The Umbrella Quote", detail: "A homeowner requests umbrella coverage after dinner. Your producer sees it the next morning; a competitor responds in four minutes with a clear comparison and owns the conversation." },
      { label: "Day 60 — The Renewal Race", detail: "A commercial account hits the renewal window while your team is buried in endorsements. CAROS starts the review before the incumbent becomes an invitation to shop." },
      { label: "The Coverage Gap Your Competitor Found", detail: "A new vehicle and growing business create two cross-sell moments. Without a prompt, another broker discovers them first during a routine review." },
      { label: "The Referral That Deserved a Sprint", detail: "A top policyholder introduces a colleague by text. CAROS routes the referral instantly, credits the source, and keeps the first response worthy of the introduction." },
    ],
    problemClose: { text: "CAROS helps brokerages protect the full value of", gold: "every policy relationship." },
    leaksIntro: "Brokerage leaks happen in the handoffs: a lead between marketing and a producer, a quote between email and decision, or a renewal between service and sales.",
    leaks: ["Coverage inquiries wait while producers are with clients.", "Quote follow-up depends on individual memory.", "Commercial submissions lose momentum during back-and-forth requests.", "Renewal conversations begin too late to protect the relationship.", "Cross-sell opportunities are buried in policy records.", "Referral sources are not tracked from introduction to bound policy.", "Marketing reports show inquiries but not retained commission."],
    leaksClose: "A policy not renewed is not just a lost transaction — it is a relationship and future referral path that may be gone for years.",
    journeyIntro: "CAROS gives each opportunity a visible next step from first coverage question through renewal and referral.",
    journey: ["Quote Requested", "CAROS Responds in <60s", "Needs Assessment Scheduled", "Proposal Sent", "Follow-Up Sequence Active", "Policy Bound", "Renewal Sequence Begins", "Referral Request Sent"],
    journeyEndLabel: "Policy Lifecycle: Retained Commission Revenue",
    signatureEyebrow: "Renewal & Retention Revenue",
    signatureTitle: "The most valuable policy is the one that",
    signatureTitleSerif: "stays with you.",
    signatureBody: ["New business is visible. Renewal revenue is often protected quietly, through early conversations, helpful reviews, and timely reminders.", "CAROS keeps producers and service teams aligned around the moments that preserve trust, uncover needs, and create introductions."],
    signatureListLabel: "Where CAROS keeps brokerage revenue moving",
    signatureUseCases: ["Coverage inquiry response", "Quote follow-up", "Submission status reminders", "Renewal campaigns", "Policy review prompts", "Cross-sell opportunities", "Referral attribution", "Lapsed-policy reactivation", "Review requests", "Producer workload visibility"],
    metrics: [{ value: "$3k–$15k", label: "Commission / Commercial Renewal" }, { value: "5 min", label: "Lead-to-Cold Window" }, { value: "60 days", label: "Renewal Conversation Lead" }, { value: "4x", label: "Referral Close Likelihood" }, { value: "$0", label: "Missed Follow-Up Value" }, { value: "Protected", label: "Revenue You've Earned", highlight: true }],
    questions: ["Which sources create bound policies?", "How quickly are coverage inquiries routed?", "Which quotes are waiting on follow-up?", "Which renewals need attention this month?", "Where are cross-sell opportunities being missed?", "How much retained revenue comes from referrals?"],
    recoveredText: "Quotes, renewals, and referrals that would have gone quiet — assigned, followed up, and protected before the relationship expires.",
    experienceTitle: "Technology that helps producers",
    experienceTitleSerif: "stay present.",
    faq: [
      { q: "Is CAROS an agency management system?", a: "No. CAROS adds a revenue-operations layer around the systems your brokerage already uses. It helps with inquiry response, quote follow-up, renewal outreach, referrals, and attribution." },
      { q: "Can it support personal and commercial lines?", a: "Yes. Workflows can be shaped around the different timing, routing, and follow-up needs of personal, commercial, benefits, life, and health opportunities." },
      { q: "Can CAROS help protect renewals?", a: "Yes. It can organize early renewal reminders, policy review prompts, and service-to-producer handoffs so renewal conversations do not begin at the last possible moment." },
      { q: "What does an Insurance Brokerage Revenue Audit review?", a: "We review inquiry response, quote follow-up, producer ownership, renewal timing, referral attribution, and retained commission visibility to show where brokerage revenue is leaking." },
    ],
    ctaHeadline: "Find the Policies You're About to Lose",
    ctaSub: "Get Your Retention Audit to see where quote follow-up, renewals, cross-sell moments, and referrals are slipping away.",
    acquisitionItems: ["Website & coverage inquiry capture", "Referral source logging", "Campaign attribution", "Producer and line-of-business routing"],
  },
)

/* ==========================================================================
   Registry
   ========================================================================== */

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  "home-services": homeServices,
  roofing,
  hvac,
  plumbing,
  electrical,
  cleaning,
  landscaping,
  painting,
  "pest-control": pestControl,
  "pressure-washing": pressureWashing,
  handyman,
  flooring,
  "general-contracting": generalContracting,
  "pool-services": poolServices,
  "events-retreats": eventsRetreats,
  "party-event-rentals": partyRentals,
  "real-estate": realEstate,
  "travel-agents": travelAgents,
  "wellness-spas": wellnessSpas,
  "medical-practices": medicalPractices,
  "financial-services": financialServices,
  "insurance-brokerage": insuranceBrokerage,
}

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_CONTENT)

export function getIndustry(slug: string): IndustryContent | undefined {
  return INDUSTRY_CONTENT[slug]
}

/** Nav / grid ordering matches the marketing list; law-firms is appended. */
export const INDUSTRY_NAV: { name: string; href: string }[] = [
  ...INDUSTRY_SLUGS.map((slug) => ({ name: INDUSTRY_CONTENT[slug].name, href: `/industries/${slug}` })),
  { name: "Law Firms & Estate Planning", href: "/industries/law-firms" },
]
