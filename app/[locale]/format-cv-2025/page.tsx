import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Sparkles, Zap, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.resumeFormat2025Page.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/format-cv-2025', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeFormat2025Page',
  canonicalPath: '/format-cv-2025',
  hero: {
    badgeIcon: Sparkles,
  },
  section1Icons: [Zap, Star, Shield],
  section3Type: 'tips',
}

export default function FormatCv2025Page() {
  return <SeoLandingPage config={config} />
}
