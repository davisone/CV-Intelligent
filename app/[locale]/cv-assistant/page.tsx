import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CheckCircle, Briefcase, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvAssistantPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-assistant' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvAssistantPage',
  canonicalPath: '/cv-assistant',
  hero: {
    badgeIcon: CheckCircle,
  },
  section1Icons: [CheckCircle, Briefcase, Shield],
  section3Type: 'tips',
}

export default function CvAssistantPage() {
  return <SeoLandingPage config={config} />
}
