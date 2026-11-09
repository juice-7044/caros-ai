// CAROS lead magnets on getcaros.com (Ann, 8 Nov 2026: copy the GHL lead magnets to getcaros.com; nothing left in GHL).
// The words are the GHL funnels' own, copied verbatim (CAROS_LeadMagnet_* landing and thank-you pages); the guides and
// covers are served from /public/lead-magnets. Each form posts to its CAROS site form (lib/caros-leads.ts), which adds the
// contact to CAROS with the guide's tags; CAROS then emails the guide and the follow-ups (ask-caros
// lib/caros/lead-magnets.ts, by form name "Lead magnet: <trade>").
import type { CarosForm } from "@/lib/caros-leads"

export type LeadMagnet = {
  key: "hvac" | "plumbing" | "real_estate" | "roofing"
  slug: string
  trade: string
  form: CarosForm
  pdf: string
  cover: string
  eyebrow: string
  title: string
  intro: string
  scene: string
  process: string
  formTitle: string
  formNote: string
  insideTitle: string
  inside: { title: string; body: string }[]
  mathFigure: string
  mathLine: string
  mathNote: string
  closeTitle: string
  closeBody: string
  thanksEyebrow: string
  thanksTitle: string
  thanksBody: string
  nextTitle: string
  nextBody: string
  nextNote: string
}

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    "key": "hvac",
    "slug": "hvac-maintenance-agreements",
    "trade": "HVAC",
    "form": "magnet_hvac",
    "pdf": "/lead-magnets/hvac-maintenance-agreement-machine.pdf",
    "cover": "/lead-magnets/covers/hvac-maintenance-agreements.png",
    "eyebrow": "HVAC / Free renewal scripts + automation map",
    "title": "The agreement sold. Who's asking for the renewal?",
    "intro": "The Maintenance Agreement Machine helps HVAC owners find upcoming renewals, explain the value, and record an outcome for every eligible agreement.",
    "scene": "It's Friday. Dispatch is rearranging three calls. Your renewal list is still a spreadsheet.",
    "process": "None of these are failures of good HVAC pros. They're failures of process.",
    "formTitle": "Get the free Maintenance Agreement Machine",
    "formNote": "Free 8-page guide, PDF. We'll email it to you right away.",
    "insideTitle": "A process your team can run on the busiest day.",
    "inside": [
      {
        "title": "Clean list",
        "body": "Build a renewal list your team can trust: terms, payment status, history."
      },
      {
        "title": "Workflow map",
        "body": "Map the renewal workflow from 60 days out to the recorded decision."
      },
      {
        "title": "Copy-ready messages",
        "body": "Renewal emails and texts with bracketed fields you verify before sending."
      },
      {
        "title": "Real replies",
        "body": "Handle the answer like a person, including price and timing questions."
      },
      {
        "title": "Close the loop",
        "body": "What happens after yes, no, and no reply."
      },
      {
        "title": "Scorecard",
        "body": "Count renewals, not reminder volume. Launch one reliable loop."
      }
    ],
    "mathFigure": "$2,400",
    "mathLine": "10 more renewals × an illustrative $240 annual agreement price = $2,400 in additional annual agreement sales. Not profit, and not a recommended price.",
    "mathNote": "Hypothetical planning math from the guide. Not a CAROS customer result, an industry benchmark, or a promise of revenue. The guide shows you how to run it with your own numbers.",
    "closeTitle": "Revenue first. Start with your own numbers.",
    "closeBody": "Get the Maintenance Agreement Machine free and put it to work this week.",
    "thanksEyebrow": "HVAC / You're in",
    "thanksTitle": "Your Maintenance Agreement Machine is on its way.",
    "thanksBody": "Check your inbox in the next few minutes. Want it now? Download the PDF here.",
    "nextTitle": "Find where your follow-up breaks before the next busy week.",
    "nextBody": "Book a 30-minute Free Business Audit with CAROS. Bring a recent lead or call list and a few jobs that went quiet. We'll look at response, booking and follow-up together.",
    "nextNote": "No revenue result is guaranteed. A modeled opportunity is a starting point."
  },
  {
    "key": "plumbing",
    "slug": "plumbing-after-hours-revenue",
    "trade": "Plumbing",
    "form": "magnet_plumbing",
    "pdf": "/lead-magnets/plumbing-after-hours-revenue-worksheet.pdf",
    "cover": "/lead-magnets/covers/plumbing-after-hours-revenue.png",
    "eyebrow": "Plumbing / Free worksheet + 10 text templates",
    "title": "Your phone stopped ringing. Did the opportunity stop, too?",
    "intro": "The After-Hours Revenue Calculator Worksheet helps plumbing owners estimate what sits behind unanswered calls, pick a response workflow, and measure what happens next.",
    "scene": "It's 8:43 p.m. You're finishing a water-heater job. Someone across town has water on the floor.",
    "process": "None of these are failures of skilled plumbers. They're failures of process.",
    "formTitle": "Get the free After-Hours Revenue Calculator Worksheet",
    "formNote": "Free 8-page worksheet, PDF. We'll email it to you right away.",
    "insideTitle": "A process your team can run on the busiest day.",
    "inside": [
      {
        "title": "Count opportunities",
        "body": "Count opportunities, not rings, from one month of call records."
      },
      {
        "title": "Range, not a guess",
        "body": "Put a low, middle and high range around the opportunity."
      },
      {
        "title": "Revenue vs. profit",
        "body": "Keep collected revenue and contribution separate."
      },
      {
        "title": "The handoff",
        "body": "Build the human handoff before you turn on an auto-reply."
      },
      {
        "title": "10 text templates",
        "body": "Five texts for the first response, five for a clearer next step."
      },
      {
        "title": "Weekly review",
        "body": "Review the week, then measure the leak again."
      }
    ],
    "mathFigure": "$1,350",
    "mathLine": "15 eligible unanswered opportunities × 20% assumed additional completion × $450 average collected job = $1,350 in modeled monthly revenue. Revenue, not profit.",
    "mathNote": "Hypothetical planning math from the guide. Not a CAROS customer result, an industry benchmark, or a promise of revenue. The guide shows you how to run it with your own numbers.",
    "closeTitle": "Revenue first. Start with your own numbers.",
    "closeBody": "Get the After-Hours Revenue Calculator Worksheet free and put it to work this week.",
    "thanksEyebrow": "Plumbing / You're in",
    "thanksTitle": "Your After-Hours Revenue Calculator Worksheet is on its way.",
    "thanksBody": "Check your inbox in the next few minutes. Want it now? Download the PDF here.",
    "nextTitle": "Find where your follow-up breaks before the next busy week.",
    "nextBody": "Book a 30-minute Free Business Audit with CAROS. Bring a recent lead or call list and a few jobs that went quiet. We'll look at response, booking and follow-up together.",
    "nextNote": "No revenue result is guaranteed. A modeled opportunity is a starting point."
  },
  {
    "key": "real_estate",
    "slug": "real-estate-5-minute-rule",
    "trade": "Real Estate",
    "form": "magnet_real_estate",
    "pdf": "/lead-magnets/real-estate-5-minute-rule-playbook.pdf",
    "cover": "/lead-magnets/covers/real-estate-5-minute-rule.png",
    "eyebrow": "Real Estate / Free speed-to-lead playbook",
    "title": "You paid for that lead. Give it a next step in five minutes.",
    "intro": "The 5-Minute Rule gives agents, team leads and brokers a repeatable first-response system: an owner for every inquiry, useful replies, booked conversations, and a scorecard.",
    "scene": "It's 2:14 p.m. You're opening a lockbox. A buyer asks about a listing through a portal.",
    "process": "None of these are failures of good real estate pros. They're failures of process.",
    "formTitle": "Get the free 5-Minute Rule Playbook",
    "formNote": "Free 8-page playbook, PDF. We'll email it to you right away.",
    "insideTitle": "A process your team can run on the busiest day.",
    "inside": [
      {
        "title": "Find the gap",
        "body": "A first-response worksheet that puts dollars beside the gap."
      },
      {
        "title": "Coverage card",
        "body": "Give every inquiry an owner and a named backup."
      },
      {
        "title": "Scripts",
        "body": "Acknowledgment, first call, voicemail and text scripts that earn a reply."
      },
      {
        "title": "Follow-up",
        "body": "Stay useful without turning into background noise."
      },
      {
        "title": "Booking + handoff",
        "body": "Book the conversation and protect the handoff, including no-shows."
      },
      {
        "title": "Launch checklist",
        "body": "Measure the system weekly, then improve one thing."
      }
    ],
    "mathFigure": "$500",
    "mathLine": "$2,000 marketing spend ÷ 40 unique leads = $50 per lead. 10 leads with no human response attempt = $500 of acquisition spend behind unattended inquiries. Spending exposure, not proven lost commission.",
    "mathNote": "Hypothetical planning math from the guide. Not a CAROS customer result, an industry benchmark, or a promise of revenue. The guide shows you how to run it with your own numbers.",
    "closeTitle": "Revenue first. Start with your own numbers.",
    "closeBody": "Get the 5-Minute Rule Playbook free and put it to work this week.",
    "thanksEyebrow": "Real Estate / You're in",
    "thanksTitle": "Your 5-Minute Rule Playbook is on its way.",
    "thanksBody": "Check your inbox in the next few minutes. Want it now? Download the PDF here.",
    "nextTitle": "Find where your follow-up breaks before the next busy week.",
    "nextBody": "Book a 30-minute Free Business Audit with CAROS. Bring a recent lead or call list and a few jobs that went quiet. We'll look at response, booking and follow-up together.",
    "nextNote": "No revenue result is guaranteed. A modeled opportunity is a starting point."
  },
  {
    "key": "roofing",
    "slug": "roofing-storm-surge",
    "trade": "Roofing",
    "form": "magnet_roofing",
    "pdf": "/lead-magnets/roofing-storm-surge-playbook.pdf",
    "cover": "/lead-magnets/covers/roofing-storm-surge.png",
    "eyebrow": "Roofing / Free 8-page playbook",
    "title": "You paid for that storm lead. Who owns the next step?",
    "intro": "The Storm Surge Playbook gives roofing owners a 72-hour plan to capture storm inquiries, book inspections your crew can actually deliver, and keep estimates moving toward a decision.",
    "scene": "It's 4:17 p.m. The phone is in the truck. You're on a roof. Another homeowner needs help.",
    "process": "None of these are failures of good roofers. They're failures of process.",
    "formTitle": "Get the free Storm Surge Playbook",
    "formNote": "Free 8-page playbook, PDF. We'll email it to you right away.",
    "insideTitle": "A process your team can run on the busiest day.",
    "inside": [
      {
        "title": "Hours 0–2",
        "body": "Put every inquiry in one queue, with an owner and a backup."
      },
      {
        "title": "Hours 2–6",
        "body": "Acknowledge fast, then make real contact. Call and text scripts included."
      },
      {
        "title": "Hours 6–24",
        "body": "Book inspections you can actually deliver, not promises."
      },
      {
        "title": "Hours 24–48",
        "body": "Give every inspection an outcome and a dated next action."
      },
      {
        "title": "Hours 48–72",
        "body": "Separate claim steps from sales steps so estimates keep moving."
      },
      {
        "title": "Owner review",
        "body": "A 15-minute queue review and a worksheet to model your own numbers."
      }
    ],
    "mathFigure": "$24,000",
    "mathLine": "20 suitable unresolved inquiries × 50% become inspections × 20% become signed jobs × $12,000 average contract = $24,000 in modeled contract revenue opportunity.",
    "mathNote": "Hypothetical planning math from the guide. Not a CAROS customer result, an industry benchmark, or a promise of revenue. The guide shows you how to run it with your own numbers.",
    "closeTitle": "Revenue first. Start with your own numbers.",
    "closeBody": "Get the Storm Surge Playbook free and put it to work this week.",
    "thanksEyebrow": "Roofing / You're in",
    "thanksTitle": "Your Storm Surge Playbook is on its way.",
    "thanksBody": "Check your inbox in the next few minutes. Want it now? Download the PDF here.",
    "nextTitle": "Find where your follow-up breaks before the next busy week.",
    "nextBody": "Book a 30-minute Free Business Audit with CAROS. Bring a recent lead or call list and a few jobs that went quiet. We'll look at response, booking and follow-up together.",
    "nextNote": "No revenue result is guaranteed. A modeled opportunity is a starting point."
  }
]

export const leadMagnet = (slug: string) => LEAD_MAGNETS.find((m) => m.slug === slug) ?? null
export const LEAD_MAGNET_TRADES = ["HVAC", "Plumbing", "Real Estate", "Roofing", "Other home service", "Other"] as const
