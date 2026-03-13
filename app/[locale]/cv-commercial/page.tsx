import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Briefcase, Target, TrendingUp } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvCommercialPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-commercial', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvCommercialPage',
  canonicalPath: '/cv-commercial',
  hero: {
    badgeIcon: Briefcase,
  },
  section1Icons: [Target, Users, TrendingUp],
  section3Type: 'tips',
}

export default function CvCommercialPage() {
  return <SeoLandingPage config={config} />
}
