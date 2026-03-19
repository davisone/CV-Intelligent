import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium-min'],
  async redirects() {
    const locales = ['fr', 'en', 'es']
    const slugsToRedirect = ['ats-friendly-resume-tips', 'how-to-beat-ats-2025']
    return [
      // Redirections avec préfixe de locale (1 saut)
      ...locales.flatMap((locale) =>
        slugsToRedirect.map((slug) => ({
          source: `/${locale}/blog/${slug}`,
          destination: `/${locale}/blog/optimiser-cv-ats`,
          permanent: true,
        }))
      ),
      // Redirections sans préfixe de locale (court-circuite la chaîne next-intl + next.config)
      ...slugsToRedirect.map((slug) => ({
        source: `/blog/${slug}`,
        destination: `/fr/blog/optimiser-cv-ats`,
        permanent: true,
      })),
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
};

export default withNextIntl(nextConfig);
