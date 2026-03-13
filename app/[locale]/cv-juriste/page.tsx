import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Briefcase, Shield, Scale, FileText } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvJuristePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-juriste' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvJuristePage',
  canonicalPath: '/cv-juriste',
  hero: {
    badgeIcon: Briefcase,
  },
  section1Icons: [Scale, FileText, Shield],
  section3Type: 'steps',
}

export default function CvJuristePage() {
  return <SeoLandingPage config={config} />
}
