import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Shield, FileText, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvSimplePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-simple' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvSimplePage',
  canonicalPath: '/cv-simple',
  hero: {
    badgeIcon: Shield,
  },
  section1Icons: [Shield, Shield, Shield],
  section3Type: 'tips',
}

export default function CvSimplePage() {
  return <SeoLandingPage config={config} />
}
