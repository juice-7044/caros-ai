import catalog from "@/messages/full/forms-legal.es.json"
import { getLocale } from "next-intl/server"
import { translateSpanishData } from "@/lib/spanish"
import type { Metadata } from "next"
import Script from "next/script"

/** Affiliate lead attribution after purchase; owner-approved for English and Spanish only. */
const AFFILIATE_TRACKING_LOCALES = new Set(["en", "es"])

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return translateSpanishData({
  title: "You're In — Your CAROS Revenue System Starts Here",
  description: "Your CAROS purchase is confirmed. Here's what happens next.",
  robots: { index: false, follow: true },
}, locale, catalog)
}

export default async function ThankYouLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      {AFFILIATE_TRACKING_LOCALES.has(locale) && (
        <Script id="caros-affiliate-lead" strategy="beforeInteractive">
          {`(function() {
  var params = new URLSearchParams(window.location.search);
  var email = params.get("email") || "<user-email>";
  var uid = params.get("uid") || "<user-stripe-customer-id>";
  if (window.affiliateManager) {
    window.affiliateManager.trackLead({ email: email, uid: uid });
  } else {
    var manager = window._affiliateManager = window._affiliateManager || [];
    manager.push(["event", "signup"]);
    manager.push(["email", email]);
    manager.push(["uid", uid]);
  }
})();`}
        </Script>
      )}
      {children}
    </>
  )
}
