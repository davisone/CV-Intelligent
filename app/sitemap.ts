import type { MetadataRoute } from 'next'

const locales = ['fr', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/guide', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/templates', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/cv-etudiant', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-pdf', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/cv-alternance', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-developpeur', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/cv-minimaliste', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/legal/cgv', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
        ),
      },
    }))
  )
}
