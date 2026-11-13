// Static snapshot of the saved CAROS native form; wording and value are a pair.
export const REVENUE_AUDIT = {
  id: "0b387c89-a47f-4986-acd3-367e14bd6780",
  endpoint: "https://ask.getcaros.com/api/forms/STXwJ6GJRXmSPQMOKgOwJsUlEC80c0J_nmQhpRR2yDo",
  formId: "caros-form-hprr2ydo",
  checkboxValue: "sms-optin-df9eacadc930e901",
  wording: "I consent to receive non-marketing text messages from CAROSAI about my Revenue Audit inquiry, appointment confirmations, appointment reminders, and audit follow-up at the phone number provided. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase. See our Privacy Policy and Terms & Conditions.",
  fields: [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "phone", type: "tel", label: "Phone" },
    { name: "company", type: "text", label: "Business / organization" },
    { name: "site", type: "text", label: "Website" },
    { name: "industry", type: "text", label: "Industry / type" },
    { name: "consent", type: "text", label: "Contact consent" },
    { name: "details", type: "textarea", label: "Details" },
    { name: "sms_consent", type: "checkbox", label: "Text me" },
  ],
} as const

/** Public native endpoint only; unchecked checkbox entries are naturally absent. */
export async function submitRevenueAudit(data: FormData, fetcher: typeof fetch = fetch): Promise<void> {
  const response = await fetcher(REVENUE_AUDIT.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(data.entries())),
  })
  const result = await response.json()
  if (!response.ok || result.ok !== true) throw new Error("Audit request not accepted")
}
