"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

const initial = { first_name: "", last_name: "", email: "", phone: "", company_name: "", website_or_linkedin_url: "", affiliate_promo_method: "", affiliate_audience_description: "", affiliate_caros_familiarity: "", affiliate_motivation: "", affiliate_referral_estimate: "", affiliate_program_source: "", affiliate_referred_by: "", consent: false }
const referralSources = ["Referred by a current CAROS affiliate", "Referred by a CAROS client"]

export function AffiliateApplicationForm() {
  const t = useTranslations("AffiliatesPage")
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const update = (key: keyof typeof initial, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }))
  const referralRequired = referralSources.includes(form.affiliate_program_source)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setStatus("loading")
    try {
      const response = await fetch("/api/affiliate-application", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) { setError(data.error || t("form.error")); setStatus("error"); return }
      setStatus("success")
    } catch {
      setError(t("form.error")); setStatus("error")
    }
  }
  const input = (key: keyof typeof initial, label: string, required = false, type = "text") => <label className="flex flex-col gap-2 text-sm font-semibold"><span>{label}{required && <span className="text-gold"> *</span>}</span><input required={required} type={type} value={String(form[key])} onChange={(e) => update(key, e.target.value)} className="min-h-12 rounded-xl border border-border bg-background px-4 font-normal outline-none focus:border-gold" /></label>
  const area = (key: "affiliate_audience_description" | "affiliate_motivation", label: string, max: number, placeholder: string) => <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2"><span>{label}<span className="text-gold"> *</span></span><textarea required maxLength={max} value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} className="min-h-32 resize-y rounded-xl border border-border bg-background p-4 font-normal outline-none placeholder:text-muted-foreground focus:border-gold" /><span className="text-right text-xs font-normal text-muted-foreground">{form[key].length}/{max}</span></label>
  if (status === "success") return <section className="rounded-2xl border border-gold/40 bg-card p-8 shadow-sm"><h2 className="text-3xl font-extrabold">{t("success.title")}</h2><p className="mt-4 leading-7 text-muted-foreground">{t("success.body")}</p><p className="mt-4 leading-7 text-muted-foreground">{t("success.second")}</p><a href="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 font-bold text-primary-foreground">{t("success.button")}</a></section>
  return <form id="affiliate-application" onSubmit={submit} className="flex flex-col gap-8 rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
    <fieldset><legend className="mb-5 text-xl font-extrabold">1. {t("sections.contact")}</legend><div className="grid gap-5 md:grid-cols-2">{input("first_name", t("form.firstName"), true)}{input("last_name", t("form.lastName"), true)}{input("email", t("form.email"), true, "email")}{input("phone", t("form.phone"), true, "tel")}</div></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">2. {t("sections.professional")}</legend><div className="grid gap-5 md:grid-cols-2">{input("company_name", t("form.company"))}{input("website_or_linkedin_url", t("form.website"))}<p className="text-xs font-normal leading-5 text-muted-foreground md:col-span-2">{t("form.websiteHelp")}</p></div></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">3. {t("sections.audience")}</legend><div className="grid gap-5"><label className="flex flex-col gap-2 text-sm font-semibold"><span>{t("form.promo") }<span className="text-gold"> *</span></span><select required value={form.affiliate_promo_method} onChange={(e) => update("affiliate_promo_method", e.target.value)} className="min-h-12 rounded-xl border border-border bg-background px-4 font-normal"><option value="">{t("form.choose")}</option>{["Through my personal or professional network","Social media content (organic posts, reels, stories)","Email list or newsletter","Podcast, YouTube, or video content","Speaking engagements, workshops, or events","Paid advertising (social or search)","Multiple channels","Other"].map((option) => <option key={option}>{option}</option>)}</select></label>{area("affiliate_audience_description", t("form.audience"), 500, t("form.audiencePlaceholder"))}</div></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">4. {t("sections.experience")}</legend><div className="grid gap-3">{["Yes — I'm an active CAROS client","Yes — I've completed a revenue audit or consultation with CAROS","I'm familiar with CAROS but haven't worked with them directly","No — I was referred to this affiliate program by someone else","No — I discovered the affiliate program independently"].map((option) => <label key={option} className="flex items-start gap-3 rounded-xl border border-border p-4 font-normal"><input required type="radio" name="familiarity" value={option} checked={form.affiliate_caros_familiarity === option} onChange={(e) => update("affiliate_caros_familiarity", e.target.value)} className="mt-1 accent-gold" />{option}</label>)}</div></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">5. {t("sections.why")}</legend><div className="grid gap-5">{area("affiliate_motivation", t("form.motivation"), 600, t("form.motivationPlaceholder"))}</div></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">6. {t("sections.referral")}</legend><label className="flex flex-col gap-2 text-sm font-semibold"><span>{t("form.estimate")}<span className="text-gold"> *</span></span><select required value={form.affiliate_referral_estimate} onChange={(e) => update("affiliate_referral_estimate", e.target.value)} className="min-h-12 rounded-xl border border-border bg-background px-4 font-normal"><option value="">{t("form.choose")}</option>{["1–5 referrals","5–15 referrals","15–30 referrals","30+ referrals","I'm not sure yet — I'd like to learn more first"].map((option) => <option key={option}>{option}</option>)}</select></label></fieldset>
    <fieldset><legend className="mb-5 text-xl font-extrabold">7. {t("sections.found")}</legend><div className="grid gap-5"><label className="flex flex-col gap-2 text-sm font-semibold"><span>{t("form.source")}<span className="text-gold"> *</span></span><select required value={form.affiliate_program_source} onChange={(e) => update("affiliate_program_source", e.target.value)} className="min-h-12 rounded-xl border border-border bg-background px-4 font-normal"><option value="">{t("form.choose")}</option>{[...referralSources,"CAROS website","Social media (Instagram, LinkedIn, etc.)","Email or newsletter","Webinar or online event","In-person event or conference","Other"].map((option) => <option key={option}>{option}</option>)}</select></label>{referralRequired && input("affiliate_referred_by", t("form.referredBy"), true)}</div></fieldset>
    <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input required type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 size-4 accent-gold" />{t("form.consent")}</label>
    {status === "error" && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={status === "loading"} className="min-h-12 w-full rounded-full bg-primary px-6 font-bold text-primary-foreground disabled:opacity-60">{status === "loading" ? t("form.submitting") : t("form.submit")}</button>
  </form>
}
