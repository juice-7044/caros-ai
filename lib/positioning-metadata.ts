import type { Metadata } from 'next'

/** Keep share cards intact while localizing the broader audience description. */
export function positioningSocialMetadata(
  description: string,
  locale: string,
  title = 'CAROS — Revenue First. Everything Else Serves It.',
): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      siteName: 'CAROS',
      url: 'https://getcaros.com',
      title,
      description,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [{ url: '/caros-logo.png', width: 1200, height: 800, alt: 'CAROS — Customer Acquisition & Revenue Operating System' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/caros-logo.png'] },
  }
}
