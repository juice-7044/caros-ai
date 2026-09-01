import { NextResponse } from "next/server"

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert"
const GHL_API_VERSION = "2021-07-28"
const AFFILIATE_TAG = "AFFILIATE APPLICATION"

// Sources that require the conditional "Who referred you?" field.
const REFERRAL_SOURCES = ["Referred by a current CAROS affiliate", "Referred by a CAROS client"]

// GHL custom-field keys for the affiliate application. These map to the
// custom fields created in GHL. Using the fieldKey (contact.<key>) avoids
// hardcoding location-specific IDs. An optional per-field env override
// (GHL_AFFILIATE_<KEY>_FIELD_ID) is used when present.
const CUSTOM_FIELD_KEYS = [
  "affiliate_promo_method",
  "affiliate_audience_description",
  "affiliate_caros_familiarity",
  "affiliate_motivation",
  "affiliate_referral_estimate",
  "affiliate_program_source",
  "affiliate_referred_by",
] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const required = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "affiliate_promo_method",
      "affiliate_audience_description",
      "affiliate_caros_familiarity",
      "affiliate_motivation",
      "affiliate_referral_estimate",
      "affiliate_program_source",
    ]
    const missing = required.find((key) => typeof body[key] !== "string" || !body[key].trim())
    if (missing || body.consent !== true) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }
    if (body.affiliate_audience_description.length > 500 || body.affiliate_motivation.length > 600) {
      return NextResponse.json({ error: "Please keep responses within the character limits." }, { status: 400 })
    }

    // Attribution: source (category) and referred_by (specific person) are
    // two separate fields. referred_by is only valid/required for referral
    // sources; any stale value for other sources is dropped.
    const referralRequired = REFERRAL_SOURCES.includes(body.affiliate_program_source)
    if (referralRequired && !body.affiliate_referred_by?.trim()) {
      return NextResponse.json({ error: "Please tell us who referred you." }, { status: 400 })
    }
    const referredBy = referralRequired ? String(body.affiliate_referred_by).trim() : ""

    const apiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID
    if (!apiKey || !locationId) {
      console.error("[v0] Affiliate submission blocked: missing GHL credentials in runtime")
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please try again shortly." },
        { status: 503 },
      )
    }

    // Build custom fields. Prefer an explicit env-provided ID when available,
    // otherwise use the fieldKey (contact.<key>). Empty values are omitted so
    // no stale referrer data is sent.
    const values: Record<string, string> = {
      affiliate_promo_method: body.affiliate_promo_method,
      affiliate_audience_description: body.affiliate_audience_description,
      affiliate_caros_familiarity: body.affiliate_caros_familiarity,
      affiliate_motivation: body.affiliate_motivation,
      affiliate_referral_estimate: body.affiliate_referral_estimate,
      affiliate_program_source: body.affiliate_program_source,
      affiliate_referred_by: referredBy,
    }
    const customFields = CUSTOM_FIELD_KEYS.filter((key) => values[key] && values[key].trim()).map((key) => {
      const idOverride = process.env[`GHL_AFFILIATE_${key.toUpperCase()}_FIELD_ID`]
      return idOverride
        ? { id: idOverride, field_value: values[key] }
        : { key: `contact.${key}`, field_value: values[key] }
    })

    const payload = {
      locationId,
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      phone: body.phone,
      companyName: body.company_name || undefined,
      // Website / LinkedIn / social profile maps to the NATIVE contact website
      // property — not a custom field.
      website: body.website_or_linkedin_url?.trim() || undefined,
      customFields,
      tags: [AFFILIATE_TAG],
    }

    const response = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const detail = await response.text().catch(() => "")
      console.error("[v0] Affiliate GHL submission failed", response.status, detail.slice(0, 500))
      return NextResponse.json(
        { error: "We couldn't submit your application just yet. Your information is still here. Please try again in a moment." },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Affiliate application error", error)
    return NextResponse.json(
      { error: "We couldn't submit your application just yet. Your information is still here. Please try again in a moment." },
      { status: 500 },
    )
  }
}
