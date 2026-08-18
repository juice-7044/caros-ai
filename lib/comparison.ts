/**
 * Comparison matrix configuration.
 *
 * This is the single source of truth for the /compare page. To add or remove a
 * competitor, edit COMPARISON_COLUMNS (CAROS must stay first). To change a
 * capability, checkmark, or tooltip, edit CAPABILITY_ROWS. The table renders
 * entirely from this data — no cells are hard-coded.
 *
 * Legend:
 *   true  → clearly offered as a core capability
 *   false → not currently positioned as a core capability
 */

export const COMPARISON_COLUMNS = ["CAROS", "LeadTruffle", "CHIIRP", "Hatch", "Podium", "Netic"] as const

export type CompareColumn = (typeof COMPARISON_COLUMNS)[number]

export interface CapabilityRow {
  /** Capability label shown in the sticky first column. */
  capability: string
  /** Optional plain-language explanation revealed on hover/tap. */
  explanation?: string
  /** One boolean per column in COMPARISON_COLUMNS. */
  values: Record<CompareColumn, boolean>
}

export const CAPABILITY_ROWS: CapabilityRow[] = [
  {
    capability: "24/7 AI voice / call handling",
    values: { CAROS: true, LeadTruffle: true, CHIIRP: true, Hatch: true, Podium: true, Netic: true },
  },
  {
    capability: "Automated digital lead response",
    values: { CAROS: true, LeadTruffle: true, CHIIRP: true, Hatch: true, Podium: true, Netic: true },
  },
  {
    capability: "Unsold estimate follow-up as a core use case",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: true, Hatch: true, Podium: true, Netic: false },
  },
  {
    capability: "Customer reactivation / recurring revenue outreach",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: true, Hatch: true, Podium: true, Netic: true },
  },
  {
    capability: "Review / reputation workflow automation",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: true, Hatch: false, Podium: true, Netic: false },
  },
  {
    capability: "Cross-function revenue analytics and actionable insights",
    explanation:
      "Turns information across multiple revenue-related functions into management-level insight about what deserves attention and why.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: true },
  },
  {
    capability: "Public-facing Revenue Audit",
    explanation:
      "Evaluates external signals and customer-facing revenue friction before requiring access to internal systems.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: false },
  },
  {
    capability: "Google Business Profile + website + public revenue-leak analysis",
    explanation:
      "Evaluates signals across the business's public customer journey, including local presence, reputation, website experience and lead-conversion friction.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: false },
  },
  {
    capability: "Client-branded human answering option",
    explanation:
      "Real people can represent the client's business for answering and customer handling, supported by CAROS workflows and technology.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: false },
  },
  {
    capability: "AI + human operational model",
    explanation:
      "CAROS provides human operational and answering capability as part of the solution — not merely allowing an employee to take over an AI conversation.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: false },
  },
  {
    capability: "Owner-focused revenue snapshots and prioritized actions",
    explanation:
      "Reduces complex operational information into the revenue issues and opportunities management should care about now.",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: false, Netic: true },
  },
  {
    capability: "Broader Revenue Operating System approach",
    values: { CAROS: true, LeadTruffle: false, CHIIRP: false, Hatch: false, Podium: true, Netic: true },
  },
]
