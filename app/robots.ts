import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cv-builder.fr'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/fr/dashboard/', '/en/dashboard/', '/es/dashboard/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
