import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Target, TrendingUp } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvManagerPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-gerente', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvManagerPage',
  canonicalPath: '/curriculum-gerente',
  hero: {
    badgeIcon: Users,
  },
  section1Icons: [Target, TrendingUp, Users],
  section3Type: 'tips',
}

export default function CurriculumGerentePage() {
  return <SeoLandingPage config={config} />
}
