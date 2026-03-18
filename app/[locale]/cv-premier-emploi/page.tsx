import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Lightbulb, GraduationCap, TrendingUp, Rocket } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvPremierEmploiPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-premier-emploi', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvPremierEmploiPage',
  canonicalPath: '/cv-premier-emploi',
  hero: {
    badgeIcon: Rocket,
  },
  section1Icons: [GraduationCap, Lightbulb, TrendingUp],
  section3Type: 'tips',
}

export default function CvPremierEmploiPage() {
  return <SeoLandingPage config={config} />
}
