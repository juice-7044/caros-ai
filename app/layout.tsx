import type React from "react"
import type { Metadata } from "next"
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { getLocale, getTranslations } from "next-intl/server"
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
  "CAROS is the unified Revenue Operating System for relationship-driven businesses and organizations: one dashboard for everything that drives revenue."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CAROS — One Dashboard. One Unified Revenue Operating System.",
    template: "%s | CAROS",
  },
  description: SITE_DESCRIPTION,
  applicationName: "CAROS",
  generator: "v0.app",
  keywords: [
    "customer relationship management",
    "lead and inquiry management software",
    "customer acquisition operating system",
    "revenue operations for businesses and organizations",
    "missed call text back",
    "human answering and inquiry follow-up",
    "marketing ROI attribution",
    "lead source attribution",
    "professional services operations",
    "nonprofit relationship management",
    "audience and community engagement",
    "booked revenue tracking",
    "relationship-driven business growth",
    "workflow automation",
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
  openGraph: {
    type: "website",
    siteName: "CAROS",
    url: SITE_URL,
    title: "CAROS — One Dashboard. One Unified Revenue Operating System.",
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
    title: "CAROS — One Dashboard. One Unified Revenue Operating System.",
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
      slogan: "One Dashboard. One Unified System. Everything That Drives Revenue.",
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
          "Relationship-driven businesses and organizations, including professional practices, healthcare, automotive, creators, nonprofits, religious institutions, and home services",
      },
      featureList: [
        "Customer Acquisition — lead capture from ads, forms, chat, SMS, and missed-call text back",
        "Revenue Operations — CRM, human answering, booking, proposal follow-up, and invoicing",
        "Customer Success — reviews, referrals, repeat-service reminders, and reactivation",
        "Business Intelligence — lead-source attribution, booked-revenue reporting, and marketing ROI",
        "Platform & Integrations — phone, email, SMS, calendars, payments, and connected operational tools",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const localizedStructuredData = locale === "es" ? {
    ...structuredData,
    "@graph": structuredData["@graph"].map(node => ({
      ...node,
      description: t("description"),
      ...(node["@type"] === "Organization" ? { slogan: "Un panel. Un sistema unificado. Todo lo que impulsa los ingresos." } : {}),
      ...(node["@type"] === "WebSite" ? { inLanguage: "es" } : {}),
      ...(node["@type"] === "SoftwareApplication" ? {
        applicationSubCategory: "Sistema operativo de captación de clientes e ingresos",
        audience: { "@type": "BusinessAudience", audienceType: "Empresas y organizaciones que crecen a través de las relaciones: servicios profesionales, salud, automoción, creadores, entidades sin fines de lucro, instituciones religiosas y servicios para el hogar" },
        featureList: [
          "Captación de clientes: anuncios, formularios, chat, SMS y respuesta a llamadas perdidas",
          "Operaciones de ingresos: CRM, atención humana, reservas, seguimiento de propuestas y facturación",
          "Éxito del cliente: reseñas, recomendaciones, recordatorios y reactivación",
          "Inteligencia empresarial: atribución, informes de ingresos y retorno del marketing",
          "Plataforma e integraciones: teléfono, correo, SMS, calendarios, pagos y herramientas operativas",
        ],
      } : {}),
    })),
  } : structuredData
  return (
    <html lang={locale} className="bg-background">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {/*
          Consent Mode v2: defaults are denied and must be set before GTM / gtag load. A stored choice (first-party
          cookie caros_consent, version 1) is replayed as an update immediately. The GTM <noscript> iframe and the
          Meta Pixel <noscript> image were removed because they cannot honor consent. The Meta Pixel is loaded
          lazily by lib/consent-client.ts only after marketing consent.
        */}
        <Script id="caros-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{var m=document.cookie.match(/(?:^|; )caros_consent=([^;]*)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c&&c.v===1&&typeof c.analytics==='boolean'&&typeof c.marketing==='boolean'){var a=c.analytics?'granted':'denied',d=c.marketing?'granted':'denied';gtag('consent','update',{ad_storage:d,ad_user_data:d,ad_personalization:d,analytics_storage:a});}}}catch(e){}`}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedStructuredData) }}
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
        {/* UTM Forwarder Script */}
        <Script id="utm-forwarder" strategy="afterInteractive">
          {`(function() {
  function forwardUTMs() {
    var search = window.location.search;
    if (!search) return;
    var links = document.querySelectorAll("a");
    links.forEach(function(link) {
      var href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("javascript:") && !href.startsWith("tel:") && !href.startsWith("mailto:")) {
        var separator = href.indexOf("?") !== -1 ? "&" : "?";
        if (href.indexOf("utm_") === -1) {
          link.setAttribute("href", href + separator + search.substring(1));
        }
      }
    });
  }
  forwardUTMs();
  window.addEventListener("DOMContentLoaded", forwardUTMs);
  document.addEventListener("click", forwardUTMs);
})();`}
        </Script>
      </body>
    </html>
  )
}
