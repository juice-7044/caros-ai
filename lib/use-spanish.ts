import { useLocale } from 'next-intl'
import { spanishTranslator, translateSpanishData, type SpanishCatalog } from './spanish'

export function useSpanish(catalog: SpanishCatalog) {
  const locale = useLocale()
  return {
    locale,
    es: locale === 'es',
    tr: spanishTranslator(locale, catalog),
    localize: <T,>(value: T): T => translateSpanishData(value, locale, catalog),
  }
}
