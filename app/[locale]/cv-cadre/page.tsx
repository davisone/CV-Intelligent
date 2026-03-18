import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Trophy, Star, Briefcase, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.executiveResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-cadre', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.executiveResumeTemplatePage',
  canonicalPath: '/cv-cadre',
  hero: {
    badgeIcon: Trophy,
  },
  section1Icons: [Star, Briefcase, Shield],
  section3Type: 'steps',
}

export default function CvCadrePage() {
  return <SeoLandingPage config={config} />
}
