import { NextResponse } from "next/server"

const customFields = {
  website_or_linkedin_url: "GHL_AFFILIATE_WEBSITE_OR_LINKEDIN_URL_FIELD_ID",
  affiliate_promo_method: "GHL_AFFILIATE_PROMO_METHOD_FIELD_ID",
  affiliate_audience_description: "GHL_AFFILIATE_AUDIENCE_DESCRIPTION_FIELD_ID",
  affiliate_caros_familiarity: "GHL_AFFILIATE_CAROS_FAMILIARITY_FIELD_ID",
  affiliate_motivation: "GHL_AFFILIATE_MOTIVATION_FIELD_ID",
  affiliate_referral_estimate: "GHL_AFFILIATE_REFERRAL_ESTIMATE_FIELD_ID",
  affiliate_program_source: "GHL_AFFILIATE_PROGRAM_SOURCE_FIELD_ID",
  affiliate_referred_by: "GHL_AFFILIATE_REFERRED_BY_FIELD_ID",
} as const

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const required = ["first_name", "last_name", "email", "phone", "affiliate_promo_method", "affiliate_audience_description", "affiliate_caros_familiarity", "affiliate_motivation", "affiliate_referral_estimate", "affiliate_program_source"]
    const missing = required.find((key) => typeof body[key] !== "string" || !body[key].trim())
    if (missing || body.consent !== true) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 })
    if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    if (body.affiliate_audience_description.length > 500 || body.affiliate_motivation.length > 600) return NextResponse.json({ error: "Please keep responses within the character limits." }, { status: 400 })
    const referralRequired = ["Referred by a current CAROS affiliate", "Referred by a CAROS client"].includes(body.affiliate_program_source)
    if (referralRequired && !body.affiliate_referred_by?.trim()) return NextResponse.json({ error: "Please tell us who referred you." }, { status: 400 })
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return NextResponse.json({ error: "Applications are temporarily unavailable. Please try again shortly." }, { status: 503 })
    const unmapped = Object.entries(customFields).filter(([, env]) => !process.env[env]).map(([key]) => key)
    if (unmapped.length) { console.error("[v0] Missing affiliate custom field IDs", unmapped); return NextResponse.json({ error: "Applications are temporarily unavailable. Please try again shortly." }, { status: 503 }) }
    const fields = Object.entries(customFields).map(([key, env]) => ({ id: process.env[env]!, field_value: body[key] || "" }))
    const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", { method: "POST", headers: { Authorization: `Bearer ${process.env.GHL_API_KEY}`, Version: "2021-07-28", "Content-Type": "application/json" }, body: JSON.stringify({ locationId: process.env.GHL_LOCATION_ID, firstName: body.first_name, lastName: body.last_name, email: body.email, phone: body.phone, companyName: body.company_name || undefined, customFields: fields, tags: ["AFFILIATE APPLICATION"] }) })
    if (!response.ok) { console.error("[v0] Affiliate GHL submission failed", response.status); return NextResponse.json({ error: "We couldn't submit your application just yet. Your information is still here. Please try again in a moment." }, { status: 502 }) }
    return NextResponse.json({ ok: true })
  } catch (error) { console.error("[v0] Affiliate application error", error); return NextResponse.json({ error: "We couldn't submit your application just yet. Your information is still here. Please try again in a moment." }, { status: 500 }) }
}
