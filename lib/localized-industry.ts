import { getIndustry, type IndustryContent } from './industries'
import { INDUSTRY_CONTENT as SPANISH_INDUSTRY_CONTENT } from './industries-es'

/** Server-side selection keeps English content unchanged and Spanish fully pre-rendered. */
export function getLocalizedIndustry(slug: string, locale: string): IndustryContent | undefined {
  return locale === 'es' ? SPANISH_INDUSTRY_CONTENT[slug] : getIndustry(slug)
}
