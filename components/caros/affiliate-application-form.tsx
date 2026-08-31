"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

const initial = { name: "", email: "", phone: "", company: "", website: "", audience: "", fit: "", referral: "", consent: false }

export function AffiliateApplicationForm() {
  const t = useTranslations("AffiliatesPage")
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const update = (key: keyof typeof initial, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("loading")
    setError("")
    const response = await fetch("/api/affiliate-application", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) { setStatus("error"); setError(data.error || t("form.error")); return }
    setStatus("success")
    setForm(initial)
  }
  const field = (key: keyof typeof initial, label: string, required = false, type = "text") => (
    <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
      <span>{label}{required && <span className="text-gold"> *</span>}</span>
      <input required={required} type={type} value={String(form[key])} onChange={(e) => update(key, e.target.value)} className="min-h-12 rounded-xl border border-border bg-background px-4 font-normal outline-none transition focus:border-gold" />
    </label>
  )
  return (
    <form onSubmit={submit} className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        {field("name", t("form.name"), true)}
        {field("email", t("form.email"), true, "email")}
        {field("phone", t("form.phone"))}
        {field("company", t("form.company"), true)}
        {field("website", t("form.website"), false, "url")}
        {field("audience", t("form.audience"), true)}
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground"><span>{t("form.fit")}<span className="text-gold"> *</span></span><textarea required maxLength={1000} value={form.fit} onChange={(e) => update("fit", e.target.value)} className="min-h-32 resize-y rounded-xl border border-border bg-background p-4 font-normal outline-none transition focus:border-gold" /><span className="text-right text-xs font-normal text-muted-foreground">{form.fit.length}/1000</span></label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground"><span>{t("form.referral")}</span><textarea maxLength={1000} value={form.referral} onChange={(e) => update("referral", e.target.value)} className="min-h-24 resize-y rounded-xl border border-border bg-background p-4 font-normal outline-none transition focus:border-gold" /><span className="text-right text-xs font-normal text-muted-foreground">{form.referral.length}/1000</span></label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 size-4 accent-gold" /><span>{t("form.consent")}</span></label>
      {status === "error" && <p role="alert" className="flex items-center gap-2 text-sm text-destructive"><AlertCircle className="size-4" />{error}</p>}
      {status === "success" && <p role="status" className="flex items-center gap-2 text-sm text-primary"><CheckCircle2 className="size-4" />{t("form.success")}</p>}
      <button disabled={status === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{status === "loading" && <Loader2 className="size-4 animate-spin" />}{status === "loading" ? t("form.submitting") : t("form.submit")}</button>
    </form>
  )
}
