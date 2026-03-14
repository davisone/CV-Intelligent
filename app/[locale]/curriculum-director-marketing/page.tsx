import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TrendingUp, Star, Sparkles, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.marketingManagerResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-director-marketing', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.marketingManagerResumePage',
  canonicalPath: '/curriculum-director-marketing',
  hero: {
    badgeIcon: TrendingUp,
  },
  section1Icons: [Star, Sparkles, Zap],
  section3Type: 'tips',
}

export default function CurriculumDirectorMarketingPage() {
  return <SeoLandingPage config={config} />
}
