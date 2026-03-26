const locales = ['fr', 'en', 'es'] as const

/**
 * Génère les balises alternates (canonical + hreflang) pour une page SEO.
 * À utiliser dans chaque generateMetadata des pages publiques.
 *
 * @param canonicalPath - chemin de la page (ex: '/cv-comptable' ou '/')
 * @param locale - locale courante
 * @param allowedLocales - locales supportées par cette page (toutes par défaut)
 */
export function buildAlternates(
  canonicalPath: string,
  locale: string,
  allowedLocales: readonly string[] = locales
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.cv-builder.fr'
  const path = canonicalPath === '/' ? '' : canonicalPath

  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        allowedLocales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
      ),
      'x-default': `${baseUrl}/${allowedLocales[0]}${path}`,
    } as Record<string, string>,
  }
}
