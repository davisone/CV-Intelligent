import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BookOpen, Briefcase, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvAlternancePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-alternance' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvAlternancePage',
  canonicalPath: '/cv-alternance',
  hero: {
    badgeIcon: BookOpen,
  },
  section1Icons: [BookOpen, Briefcase, CheckCircle],
  section3Type: 'tips',
}

export default function CvAlternancePage() {
  return <SeoLandingPage config={config} />
}
