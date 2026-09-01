import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const WANTED = [
  "affiliate_promo_method",
  "affiliate_audience_description",
  "affiliate_caros_familiarity",
  "affiliate_motivation",
  "affiliate_referral_estimate",
  "affiliate_program_source",
  "affiliate_referred_by",
]

export async function GET() {
  const key = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID
  if (!key || !locationId) {
    return NextResponse.json({ ok: false, hasKey: Boolean(key), hasLocation: Boolean(locationId) }, { status: 503 })
  }

  const res = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}/customFields`, {
    headers: { Authorization: `Bearer ${key}`, Version: "2021-07-28" },
    cache: "no-store",
  })

  const status = res.status
  const data = await res.json().catch(() => ({}))
  const fields: Array<{ id?: string; fieldKey?: string; name?: string }> = data.customFields || data.customField || []

  // Return the full inventory (key + name only, no values) plus the matched mapping.
  const inventory = fields.map((f) => ({ id: f.id, fieldKey: f.fieldKey, name: f.name }))
  const mapping: Record<string, string | null> = {}
  for (const wanted of WANTED) {
    const match = fields.find((f) => {
      const fk = (f.fieldKey || "").replace(/^contact\./, "")
      return fk === wanted || f.fieldKey === wanted
    })
    mapping[wanted] = match?.id ?? null
  }

  return NextResponse.json({ ok: res.ok, status, count: fields.length, mapping, inventory })
}
