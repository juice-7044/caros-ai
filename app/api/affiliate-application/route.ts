import { NextResponse } from "next/server"

const required = ["name", "email", "company", "audience", "fit", "consent"] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()
    for (const key of required) if (!body[key] || (key === "consent" && body[key] !== true)) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 })
    if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return NextResponse.json({ error: "Applications are temporarily unavailable. Please try again shortly." }, { status: 503 })
    const headers = { Authorization: `Bearer ${process.env.GHL_API_KEY}`, Version: "2021-07-28", "Content-Type": "application/json" }
    const customFields = Object.entries({ website: body.website, audience: body.audience, fit: body.fit, referral: body.referral }).filter(([, value]) => value).map(([key, value]) => ({ id: process.env[`GHL_AFFILIATE_${key.toUpperCase()}_FIELD_ID`], value })).filter((field) => field.id)
    const response = await fetch("https://services.leadconnectorhq.com/contacts/", { method: "POST", headers, body: JSON.stringify({ locationId: process.env.GHL_LOCATION_ID, firstName: body.name, email: body.email, phone: body.phone || undefined, companyName: body.company, tags: ["AFFILIATE APPLICATION"], customFields }) })
    if (!response.ok) { console.error("[v0] Affiliate CRM submission failed", response.status); return NextResponse.json({ error: "We could not submit your application. Please try again." }, { status: 502 }) }
    return NextResponse.json({ ok: true })
  } catch (error) { console.error("[v0] Affiliate application error", error); return NextResponse.json({ error: "We could not submit your application. Please try again." }, { status: 500 }) }
}
