import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TrendingUp, Star, Zap, Trophy } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.salesResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/sales-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.salesResumeTemplatePage',
  canonicalPath: '/sales-resume-template',
  hero: {
    badgeIcon: TrendingUp,
  },
  section1Icons: [Star, Zap, Trophy],
  section3Type: 'tips',
}

export default function SalesResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
