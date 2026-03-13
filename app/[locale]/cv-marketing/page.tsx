import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Megaphone, Target, TrendingUp, BarChart3 } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvMarketingPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-marketing' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvMarketingPage',
  canonicalPath: '/cv-marketing',
  hero: {
    badgeIcon: Megaphone,
  },
  section1Icons: [TrendingUp, BarChart3, Target],
  section3Type: 'tips',
}

export default function CvMarketingPage() {
  return <SeoLandingPage config={config} />
}
