import type { Metadata } from 'next'

/** Keep share cards intact while localizing the broader audience description. */
export function positioningSocialMetadata(
  description: string,
  locale: string,
  title?: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const shareTitle = title ?? (locale === 'es' ? 'CAROS — Un panel. Un sistema operativo de ingresos unificado.' : 'CAROS — One Dashboard. One Unified Revenue Operating System.')
  return {
    openGraph: {
      type: 'website',
      siteName: 'CAROS',
      url: 'https://getcaros.com',
      title: shareTitle,
      description,
      locale: locale === 'es' ? 'es_419' : 'en_US',
      images: [{ url: '/caros-logo.png', width: 1200, height: 800, alt: locale === 'es' ? 'CAROS — Sistema operativo de captación de clientes e ingresos' : 'CAROS — Customer Acquisition & Revenue Operating System' }],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: ['/caros-logo.png'] },
  }
}
