import {NextIntlClientProvider} from "next-intl"
import type {Metadata} from "next"
import {positioningSocialMetadata} from "@/lib/positioning-metadata"
import {getMessages, getTranslations} from "next-intl/server"
import {notFound} from "next/navigation"
import {routing} from "@/i18n/routing"
import {RouteChrome} from "@/components/caros/route-chrome"

const RTL_LOCALES = new Set(["ar"])

export async function generateMetadata(
  {params}: {params: Promise<{locale: string}>},
): Promise<Metadata> {
  const {locale} = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) return {}
  const t = await getTranslations({locale, namespace: "Metadata"})
  const description = t("description")
  return {
    description,
    ...(locale === "es" ? {
      title: { absolute: "CAROS — Primero los ingresos. Todo lo demás está a su servicio.", template: "%s | CAROS" },
      keywords: ["gestión de relaciones", "operaciones de ingresos", "captación de clientes", "seguimiento de consultas", "automatización de procesos", "atribución de marketing", "gestión de organizaciones", "inteligencia de ingresos"],
    } : {}),
    ...positioningSocialMetadata(description, locale),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{locale: string}>
}>) {
  const {locale} = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages({locale})

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} lang={locale} data-locale={locale}>
        <RouteChrome>{children}</RouteChrome>
      </div>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
