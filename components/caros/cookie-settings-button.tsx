"use client"

import { useTranslations } from "next-intl"
import { openConsentSettings } from "@/lib/consent-client"

/** Footer control that reopens the consent banner so the choice can be changed at any time. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("footer")
  return (
    <button type="button" data-caros-cookie-settings onClick={openConsentSettings} className={className}>
      {t("cookieSettings")}
    </button>
  )
}
