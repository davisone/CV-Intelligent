import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Heart, Shield, CheckCircle, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.nurseResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/nurse-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.nurseResumeTemplatePage',
  canonicalPath: '/nurse-resume-template',
  hero: {
    badgeIcon: Heart,
  },
  section1Icons: [Shield, CheckCircle, Star],
  section3Type: 'tips',
}

export default function NurseResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
