import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { DollarSign, BarChart3, Lock } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvBanquierPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-banquier', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvBanquierPage',
  canonicalPath: '/cv-banquier',
  hero: { badgeIcon: DollarSign },
  section1Icons: [DollarSign, BarChart3, Lock],
  section3Type: 'steps',
}

export default function CvBanquierPage() {
  return <SeoLandingPage config={config} />
}
