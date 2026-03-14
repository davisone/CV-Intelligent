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
    alternates: buildAlternates('/curriculum-vitae-ats', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.atsResumeTemplatePage',
  canonicalPath: '/curriculum-vitae-ats',
  hero: {
    badgeIcon: BarChart3,
  },
  section1Icons: [CheckCircle, Zap, Shield],
  section3Type: 'tips',
}

export default function CurriculumVitaeAtsPage() {
  return <SeoLandingPage config={config} />
}
