import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Briefcase, GraduationCap, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvStagePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv-stage' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.modeleCvStagePage',
  canonicalPath: '/modele-cv-stage',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [GraduationCap, Briefcase, Shield],
  section3Type: 'steps',
}

export default function ModeleCvStagePage() {
  return <SeoLandingPage config={config} />
}
