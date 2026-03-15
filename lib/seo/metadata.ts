const locales = ['fr', 'en', 'es'] as const

/**
 * Génère les balises alternates (canonical + hreflang) pour une page SEO.
 * À utiliser dans chaque generateMetadata des pages publiques.
 */
export function buildAlternates(canonicalPath: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cv-builder.fr'
  const path = canonicalPath === '/' ? '' : canonicalPath

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
      ),
      'x-default': `${baseUrl}/fr${path}`,
    } as Record<string, string>,
  }
}
