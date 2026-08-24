import type React from "react"
import type { Metadata } from "next"
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
})

const SITE_URL = "https://getcaros.com"

const SITE_DESCRIPTION =
  "CAROS is the Customer Acquisition & Revenue Operating System for service businesses. Capture every lead, book more jobs with human answering, retain customers, and connect your marketing spend to the calls, jobs, and revenue it actually produces."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CAROS — Revenue First. Everything Else Serves It.",
    template: "%s | CAROS",
  },
  description: SITE_DESCRIPTION,
  applicationName: "CAROS",
  generator: "v0.app",
  keywords: [
    "local service business CRM",
    "contractor lead management software",
    "customer acquisition operating system",
    "revenue operations for service businesses",
    "missed call text back",
    "human answering service for contractors",
    "marketing ROI attribution",
    "lead source attribution",
    "roofing CRM",
    "HVAC lead capture",
    "plumbing business software",
    "booked revenue tracking",
    "service business marketing software",
    "field service automation",
  ],
  authors: [{ name: "CAROS" }],
  creator: "CAROS",
  publisher: "CAROS",
  category: "business software",
  verification: {
    google: "WnrwYXGpNMHxkukHn7M7HmszR0rQmpBr25XJfOATsAc",
    other: {
      "trustpilot-one-time-domain-verification-id":
        "1a3e91f3-74db-43bf-b5f9-af754fc60527",
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "CAROS",
    url: SITE_URL,
    title: "CAROS — Revenue First. Everything Else Serves It.",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/caros-logo.png",
        width: 1200,
        height: 800,
        alt: "CAROS — Customer Acquisition & Revenue Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAROS — Revenue First. Everything Else Serves It.",
    description: SITE_DESCRIPTION,
    images: ["/caros-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CAROS",
      url: SITE_URL,
      logo: `${SITE_URL}/caros-logo.png`,
      description: SITE_DESCRIPTION,
      email: "inquiries@getcarosai.com",
      slogan: "Revenue First. Everything Else Serves It.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "CAROS",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      name: "CAROS",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer Acquisition & Revenue Operating System",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Local service businesses — roofing, HVAC, plumbing, electrical, cleaning, landscaping, and more",
      },
      featureList: [
        "Customer Acquisition — lead capture from ads, forms, chat, SMS, and missed-call text back",
        "Revenue Operations — CRM, human answering, booking, estimate follow-up, and invoicing",
        "Customer Success — reviews, referrals, repeat-service reminders, and reactivation",
        "Business Intelligence — lead-source attribution, booked-revenue reporting, and marketing ROI",
        "Platform & Integrations — phone, email, SMS, calendars, payments, and field service tools",
      ],
      offers: {
        "@type": "Offer",
        price: "997",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "997",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMDX7LW7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script id="caros-affiliate-manager" strategy="beforeInteractive">
          {`(function() {
  var t = document.createElement("script");
  t.type = "text/javascript";
  t.async = true;
  t.src = "https://links.getcaros.com/js/am.js";
  t.onload = t.onreadystatechange = function() {
    var state = this.readyState;
    if (!state || state === "complete" || state === "loaded") {
      try {
        affiliateManager.init("ZdY2U5V9iKnh7Y7IUj1e", "https://backend.leadconnectorhq.com", ".getcaros.com");
      } catch (_) {}
    }
  };
  var first = document.getElementsByTagName("script")[0];
  first.parentNode.insertBefore(t, first);
})();`}
        </Script>
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TMDX7LW7');`}
        </Script>
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MT8HLMZL04" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MT8HLMZL04');
          `}
        </Script>
        {children}
        <Analytics />
        {/* CAROS external tracking */}
        <Script
          src="https://links.getcaros.com/js/external-tracking.js"
          data-tracking-id="tk_12d930143d64417686edf3bdbf78f595"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
