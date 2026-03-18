import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BarChart3, CheckCircle, Zap, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.atsResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/ats-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.atsResumeTemplatePage',
  canonicalPath: '/ats-resume-template',
  hero: {
    badgeIcon: BarChart3,
  },
  section1Icons: [CheckCircle, Zap, Shield],
  section3Type: 'tips',
}

export default function AtsResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
