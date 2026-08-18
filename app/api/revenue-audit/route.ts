import { type NextRequest, NextResponse } from "next/server"

// GHL / LeadConnector v2 API
const GHL_CONTACTS_URL = "https://services.leadconnectorhq.com/contacts/"
const GHL_API_VERSION = "2021-07-28"

// Exact location ID from the GHL account (env var takes precedence)
const FALLBACK_LOCATION_ID = "ZdY2U5V9iKnh7Y7IUj1e"

// Exact field names sent from the frontend form
type AuditPayload = {
  firstName?: string
  lastName?: string
  businessName?: string
  industry?: string
  email?: string
  phone?: string
  averageJobValue?: string // "Roughly, what does an average job bring in?"
  knownLeaks?: string // "What's leaking that you already know about?"
  smsConsent?: boolean // explicit opt-in to calls/SMS (TCPA)
}

export async function POST(request: NextRequest) {
  // Everything is wrapped so the handler ALWAYS returns a NextResponse and
  // never crashes into a 502.
  try {
    const apiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || FALLBACK_LOCATION_ID

    console.log("[v0] GHL API Key exists:", !!apiKey)
    console.log("[v0] GHL Location ID:", locationId)

    // 1) Validate env vars up front
    if (!apiKey || !locationId) {
      console.error("[v0] Error: missing GHL credentials")
      return NextResponse.json(
        { success: false, error: "Server configuration error: missing GHL credentials" },
        { status: 500 },
      )
    }

    // 2) Parse the request body
    let body: AuditPayload
    try {
      body = (await request.json()) as AuditPayload
    } catch (err) {
      console.error("[v0] Error: invalid request body:", err instanceof Error ? err.message : String(err))
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 })
    }

    console.log("[v0] Received form data:", body)

    // 3) Validate required fields
    const required: [keyof AuditPayload, string][] = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["email", "Email"],
      ["businessName", "Business name"],
      ["industry", "Industry"],
    ]
    for (const [key, label] of required) {
      if (!body[key] || !String(body[key]).trim()) {
        console.error(`[v0] Error: missing required field ${key}`)
        return NextResponse.json({ success: false, error: `${label} is required.` }, { status: 400 })
      }
    }

    // 4) Build the custom fields array (v2 uses customFields: [{ id, field_value }])
    const customFields: { id: string; field_value: string }[] = []
    if (body.industry?.trim()) customFields.push({ id: "industry", field_value: body.industry.trim() })
    if (body.averageJobValue?.trim())
      customFields.push({ id: "average_job_value", field_value: body.averageJobValue.trim() })
    if (body.knownLeaks?.trim()) customFields.push({ id: "biggest_challenge", field_value: body.knownLeaks.trim() })

    // Record explicit TCPA/SMS consent for compliance (timestamped proof of opt-in)
    if (body.smsConsent) {
      customFields.push({
        id: "sms_consent",
        field_value: `Opted in to calls/SMS via website form on ${new Date().toISOString()}`,
      })
    }

    // 5) Create the contact
    const tags = ["SOURCE_Website", "STAGE_New-Lead"]
    if (body.smsConsent) tags.push("SMS_Consent")

    const contactPayload = {
      locationId,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      email: body.email!.trim(),
      phone: body.phone?.trim(),
      companyName: body.businessName!.trim(),
      tags,
      customFields,
    }

    const response = await fetch(GHL_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    })

    console.log("[v0] GHL Response status:", response.status)

    // Read the response defensively — it may not be JSON on error
    const responseText = await response.text()
    let responseData: unknown
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = responseText
    }
    console.log("[v0] GHL Response body:", responseData)

    if (!response.ok) {
      const message =
        (typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData &&
          String((responseData as { message: unknown }).message)) ||
        (typeof responseData === "string" ? responseData : "GHL contact creation failed.")
      console.error("[v0] Error:", message)
      return NextResponse.json({ success: false, error: message }, { status: 500 })
    }

    // Extract the contact ID from the v2 response shape
    const contactId =
      (typeof responseData === "object" &&
        responseData !== null &&
        (("contact" in responseData &&
          (responseData as { contact?: { id?: string } }).contact?.id) ||
          ("id" in responseData && (responseData as { id?: string }).id))) ||
      undefined

    console.log("[v0] Contact created:", contactId)

    return NextResponse.json({ success: true, contactId })
  } catch (error) {
    // Catch-all: never let the function exit without a response
    const message = error instanceof Error ? error.message : String(error)
    console.error("[v0] Error:", message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
