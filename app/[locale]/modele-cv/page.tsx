import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.modeleCvPage',
  canonicalPath: '/modele-cv',
  hero: {
    badgeIcon: Sparkles,
  },
  section1Icons: [Sparkles, Sparkles, Sparkles],
  section3Type: 'tips',
}

export default function ModeleCvPage() {
  return <SeoLandingPage config={config} />
}
