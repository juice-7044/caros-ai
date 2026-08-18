export const NAV_LINKS = [
  { name: "Home", href: "https://getcaros.com", external: true },
  { name: "How It Works", href: "/how-it-works" },
  { name: "What's Included", href: "/whats-included" },
  { name: "Marketing ROI", href: "/marketing-roi" },
  { name: "Industries", href: "/industries" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

export const AUDIT_HREF = "/revenue-audit"
export const AUDIT_LABEL = "Book A Business Review"

// Core brand tagline — kept prominent across the site
export const PRODUCT_TAGLINE = "AI where it makes sense. Humans where they matter. Automation underneath both."

// External free revenue insights tool (GoHighLevel-hosted)
export const INSIGHTS_URL = "https://free-revenue-insights.getcarosai.com"
export const INSIGHTS_LABEL = "Free Business Insights"

// External free business audit tool (GoHighLevel-hosted)
export const AUDIT_URL = "https://free-revenue-audit.getcarosai.com"
export const AUDIT_URL_LABEL = "Generate My Free Business Audit"

// GoHighLevel booking calendar (post-submission redirect) — Revenue Audits calendar
export const BOOKING_URL = "https://links.getcaros.com/widget/booking/9gAyyAFYYodUmthJicbD"

export const DIAGNOSTIC_HREF = "/diagnostic"
export const DIAGNOSTIC_LABEL = "Free Diagnostic"

export const EMAIL = "inquiries@getcarosai.com"
export const EMAIL_HREF = "mailto:inquiries@getcarosai.com"

// Legal entity / official business contact details
export const COMPANY_NAME = "CAROSAi LLC"
export const COMPANY_ADDRESS = "418 Broadway, Ste. N, Albany, NY 12207"
export const COMPANY_EMAIL = "inquiries@getcarosai.com"
export const COMPANY_EMAIL_HREF = "mailto:inquiries@getcarosai.com"
export const COMPANY_PHONE = "+1 631-458-3332"
export const COMPANY_PHONE_HREF = "tel:+16314583332"

// Pages that contain a lead form — the floating chat widget is suppressed here
export const FORM_PATHS = ["/revenue-audit"]

export const INDUSTRIES = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "Painting",
  "Pest Control",
  "Pressure Washing",
  "Handyman",
  "Flooring",
  "General Contracting",
  "Pool Services",
]

export const PILLARS = [
  {
    id: "acquisition",
    label: "Customer Acquisition",
    question: "Where are my customers coming from?",
    blurb: "Capture leads from the places your customers already find you.",
    items: [
      "Google & Facebook lead capture",
      "Website forms & web chat",
      "SMS & missed-call text back",
      "QR codes on signage & trucks",
      "Social & referral capture",
      "Tracking codes on every source",
    ],
  },
  {
    id: "operations",
    label: "Revenue Operations",
    question: "What happens after they find me?",
    blurb: "Turn inquiries into appointments, estimates, follow-up, and booked work.",
    items: [
      "CRM & opportunity pipeline",
      "Human answering under your brand",
      "Appointment booking workflows",
      "Estimate follow-up & nudging",
      "Automated lead nurturing",
      "Digital signatures & invoicing",
    ],
  },
  {
    id: "success",
    label: "Customer Success",
    question: "What happens after I finish the job?",
    blurb: "Stay connected after the job, generate reviews, reactivate customers, and create repeat business.",
    items: [
      "Review requests & responses",
      "Referral campaigns per job",
      "Repeat-service reminders",
      "Dormant customer reactivation",
      "Membership fulfillment",
      "Win-back offers",
    ],
  },
  {
    id: "intelligence",
    label: "Business Intelligence",
    question: "Is any of this actually making me money?",
    blurb: "See what generates leads, bookings, customers, and revenue.",
    items: [
      "Lead-source attribution",
      "Booked-revenue reporting",
      "Marketing ROI by campaign",
      "Pipeline reporting",
      "Weekly performance reports",
      "Monthly business briefing",
    ],
  },
  {
    id: "platform",
    label: "Platform & Integrations",
    question: "How do I keep track of all of this?",
    blurb: "Connect the tools you already use into one operating system.",
    items: [
      "Phone, email & SMS",
      "Calendars & scheduling",
      "Website & advertising sources",
      "Payments & card-on-file",
      "Routing & FSM integrations",
      "And more, connected for you",
    ],
  },
] as const
