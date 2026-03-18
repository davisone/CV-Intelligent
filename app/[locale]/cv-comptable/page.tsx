import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BookOpen, BarChart3, Lock, Calculator } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvComptablePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-comptable', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvComptablePage',
  canonicalPath: '/cv-comptable',
  hero: {
    badgeIcon: Calculator,
  },
  section1Icons: [BookOpen, BarChart3, Lock],
  section3Type: 'steps',
}

export default function CvComptablePage() {
  return <SeoLandingPage config={config} />
}
