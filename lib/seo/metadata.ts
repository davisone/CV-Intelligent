const locales = ['fr', 'en'] as const

/**
 * Génère les balises alternates (canonical + hreflang) pour une page SEO.
 * À utiliser dans chaque generateMetadata des pages publiques.
 */
export function buildAlternates(canonicalPath: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cv-builder.fr'

  return {
    canonical: `${baseUrl}/${locale}${canonicalPath}`,
    languages: {
      ...Object.fromEntries(
        locales.map((loc) => [loc, `${baseUrl}/${loc}${canonicalPath}`])
      ),
      'x-default': `${baseUrl}/fr${canonicalPath}`,
    } as Record<string, string>,
  }
}
