import { type NextRequest, NextResponse } from "next/server"

// GHL / LeadConnector v2 API — same pattern as the revenue-audit route.
const GHL_CONTACTS_URL = "https://services.leadconnectorhq.com/contacts/"
const GHL_API_VERSION = "2021-07-28"

// Exact location ID from the GHL account (env var takes precedence)
const FALLBACK_LOCATION_ID = "ZdY2U5V9iKnh7Y7IUj1e"

type NonprofitPayload = {
  firstName?: string
  lastName?: string
  businessName?: string // organization name
  email?: string
  website?: string
  organizationType?: string
  challenges?: string
  requestedCapabilities?: string
  contactPreference?: string
  source?: string
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || FALLBACK_LOCATION_ID

    if (!apiKey || !locationId) {
      console.error("[nonprofit-consultation] missing GHL credentials")
      return NextResponse.json(
        { success: false, error: "Server configuration error: missing GHL credentials" },
        { status: 500 },
      )
    }

    let body: NonprofitPayload
    try {
      body = (await request.json()) as NonprofitPayload
    } catch (err) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 })
    }

    const { firstName, lastName, businessName, email } = body
    if (!email || !businessName || !firstName) {
      return NextResponse.json(
        { success: false, error: "Organization name, contact name, and business email are required." },
        { status: 400 },
      )
    }

    // Compose the inquiry details into GHL custom fields (v2 array format,
    // same pattern as the revenue-audit route).
    const customFields: { id: string; field_value: string }[] = []
    if (body.organizationType?.trim())
      customFields.push({ id: "industry", field_value: `Nonprofit — ${body.organizationType.trim()}` })
    if (body.website?.trim()) customFields.push({ id: "nonprofit_website", field_value: body.website.trim() })
    if (body.challenges?.trim())
      customFields.push({ id: "biggest_challenge", field_value: body.challenges.trim() })
    if (body.requestedCapabilities?.trim())
      customFields.push({ id: "nonprofit_requested_capabilities", field_value: body.requestedCapabilities.trim() })
    if (body.contactPreference?.trim())
      customFields.push({ id: "nonprofit_contact_preference", field_value: body.contactPreference.trim() })
    customFields.push({
      id: "nonprofit_inquiry_source",
      field_value: body.source ?? "nonprofit-consultation",
    })

    const contactPayload = {
      locationId,
      firstName: firstName.slice(0, 100),
      lastName: (lastName ?? "").slice(0, 100),
      email,
      companyName: businessName.slice(0, 200),
      tags: ["SOURCE_Website", "STAGE_New-Lead", "INDUSTRY_Nonprofit", "NONPROFIT_Consultation-Request"],
      customFields,
    }

    const ghlRes = await fetch(GHL_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contactPayload),
    })

    const ghlBody = await ghlRes.text()
    if (!ghlRes.ok) {
      console.error("[nonprofit-consultation] GHL error:", ghlRes.status, ghlBody.slice(0, 500))
      return NextResponse.json(
        { success: false, error: "We couldn't submit your request right now. Please try again or email inquiries@getcarosai.com." },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[nonprofit-consultation] unexpected error:", err instanceof Error ? err.message : String(err))
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or email inquiries@getcarosai.com." },
      { status: 500 },
    )
  }
}
