import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Wrench, Cog, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvIngenieurPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-ingenieur', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvIngenieurPage',
  canonicalPath: '/cv-ingenieur',
  hero: {
    badgeIcon: Wrench,
  },
  section1Icons: [Wrench, Cog, Zap],
  section3Type: 'steps',
}

export default function CvIngenieurPage() {
  return <SeoLandingPage config={config} />
}
