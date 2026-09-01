import { NextResponse } from "next/server"

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert"
const GHL_API_VERSION = "2021-07-28"
const AFFILIATE_TAG = "AFFILIATE APPLICATION"

// Sources that require the conditional "Who referred you?" field.
const REFERRAL_SOURCES = ["Referred by a current CAROS affiliate", "Referred by a CAROS client"]

// Each affiliate custom field is mapped to its REAL GoHighLevel custom-field
// ID, supplied via an environment variable. We do NOT fall back to
// fieldKey-only submission (contact.<key>) because that leaves the fields
// blank ("--") on the GHL contact record. If a required ID is not configured,
// the submission FAILS server-side with a clear logged configuration error
// rather than silently creating a partially populated contact.
//
// Populate these in the Vercel project environment with the IDs from
// GHL → Settings → Custom Fields (see the `key` values below to match each):
const FIELD_ID_ENV: Record<string, string> = {
  affiliate_promo_method: "GHL_AFFILIATE_PROMO_METHOD_FIELD_ID",
  affiliate_audience_description: "GHL_AFFILIATE_AUDIENCE_DESCRIPTION_FIELD_ID",
  affiliate_caros_familiarity: "GHL_AFFILIATE_CAROS_FAMILIARITY_FIELD_ID",
  affiliate_motivation: "GHL_AFFILIATE_MOTIVATION_FIELD_ID",
  affiliate_referral_estimate: "GHL_AFFILIATE_REFERRAL_ESTIMATE_FIELD_ID",
  affiliate_program_source: "GHL_AFFILIATE_PROGRAM_SOURCE_FIELD_ID",
  affiliate_referred_by: "GHL_AFFILIATE_REFERRED_BY_FIELD_ID",
}

// Fields that must always be present on every submission.
const ALWAYS_REQUIRED_FIELDS = [
  "affiliate_promo_method",
  "affiliate_audience_description",
  "affiliate_caros_familiarity",
  "affiliate_motivation",
  "affiliate_referral_estimate",
  "affiliate_program_source",
] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const required = ["first_name", "last_name", "email", "phone", ...ALWAYS_REQUIRED_FIELDS]
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

    // Attribution: source (category) and referred_by (specific person) are two
    // separate fields. referred_by is only valid/required for referral sources;
    // any stale value for other sources is dropped.
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

    // The set of custom fields we intend to submit for THIS request. The
    // conditional referred_by is only included when a referral source is used.
    const values: Record<string, string> = {
      affiliate_promo_method: body.affiliate_promo_method,
      affiliate_audience_description: body.affiliate_audience_description,
      affiliate_caros_familiarity: body.affiliate_caros_familiarity,
      affiliate_motivation: body.affiliate_motivation,
      affiliate_referral_estimate: body.affiliate_referral_estimate,
      affiliate_program_source: body.affiliate_program_source,
      ...(referredBy ? { affiliate_referred_by: referredBy } : {}),
    }

    // Resolve every value to its REAL GHL field ID. Any field that is missing
    // its configured ID is a hard configuration error — do NOT submit a
    // partially populated record and report success.
    const customFields: { id: string; value: string }[] = []
    const missingIds: string[] = []
    for (const [key, value] of Object.entries(values)) {
      if (!value || !value.trim()) continue
      const envName = FIELD_ID_ENV[key]
      const fieldId = envName ? process.env[envName] : undefined
      if (!fieldId) {
        missingIds.push(envName ?? key)
        continue
      }
      customFields.push({ id: fieldId, value: value.trim() })
    }

    if (missingIds.length > 0) {
      console.error(
        "[v0] Affiliate submission blocked: missing GHL custom-field ID env vars:",
        missingIds.join(", "),
      )
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please try again shortly." },
        { status: 503 },
      )
    }

    const payload = {
      locationId,
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      phone: body.phone,
      companyName: body.company_name || undefined,
      // Website / LinkedIn / social profile maps to the NATIVE contact website
      // property — never a custom field.
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
        {
          error:
            "We couldn't submit your application just yet. Your information is still here. Please try again in a moment.",
        },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Affiliate application error", error)
    return NextResponse.json(
      {
        error:
          "We couldn't submit your application just yet. Your information is still here. Please try again in a moment.",
      },
      { status: 500 },
    )
  }
}
