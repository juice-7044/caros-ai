import {NextIntlClientProvider} from "next-intl"
import {getMessages} from "next-intl/server"
import {notFound} from "next/navigation"
import {routing} from "@/i18n/routing"
import {RouteChrome} from "@/components/caros/route-chrome"

const RTL_LOCALES = new Set(["ar"])

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

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} lang={locale} data-locale={locale}>
        <RouteChrome>{children}</RouteChrome>
      </div>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
