import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvMinimalistePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-minimaliste' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvMinimalistePage',
  canonicalPath: '/cv-minimaliste',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Sparkles, Shield, Star],
  section3Type: 'tips',
}

export default function CvMinimalistePage() {
  return <SeoLandingPage config={config} />
}
