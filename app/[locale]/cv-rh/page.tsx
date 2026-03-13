import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Target, TrendingUp } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvRhPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-rh', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvRhPage',
  canonicalPath: '/cv-rh',
  hero: {
    badgeIcon: Users,
  },
  section1Icons: [Users, Target, TrendingUp],
  section3Type: 'tips',
}

export default function CvRhPage() {
  return <SeoLandingPage config={config} />
}
