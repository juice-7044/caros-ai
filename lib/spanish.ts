export type SpanishCatalog = Record<string, string>

/** Preserve the selected language for same-site page links, never API/assets or external apps. */
export function localeHref(href: string, locale: string): string {
  if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:)/i.test(href)) return href
  try {
    const url = new URL(href, 'https://getcaros.com')
    if (!['getcaros.com', 'www.getcaros.com'].includes(url.hostname)) return href
    if (/^\/(?:api|_next)(?:\/|$)/.test(url.pathname) || /\.[a-z0-9]+$/i.test(url.pathname)) return href
    const path = url.pathname.replace(/^\/(?:en|es)(?=\/|$)/, '').replace(/\/$/, '')
    return `/${locale}${path}${url.search}${url.hash}`
  } catch { return href }
}

/** Exact source-text lookup; never translate identifiers, URLs or object keys. */
export function spanishTranslator(locale: string, catalog: SpanishCatalog) {
  return (source: string, values?: Record<string, string | number>): string => {
    const translated = locale === 'es' ? (catalog[source] ?? source) : source
    return values ? translated.replace(/\{(\w+)\}/g, (token, key) => key in values ? String(values[key]) : token) : translated
  }
}

export function translateSpanishData<T>(value: T, locale: string, catalog: SpanishCatalog): T {
  if (locale !== 'es') return value
  const tr = spanishTranslator(locale, catalog)
  const visit = (item: unknown): unknown => {
    if (typeof item === 'string') return tr(item)
    if (Array.isArray(item)) return item.map(visit)
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).map(([key, entry]) => [key, visit(entry)]))
    return item
  }
  return visit(value) as T
}
