import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Layers, BarChart3, Zap, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.productManagerResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/product-manager-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.productManagerResumePage',
  canonicalPath: '/product-manager-resume',
  hero: {
    badgeIcon: Layers,
  },
  section1Icons: [BarChart3, Zap, Star],
  section3Type: 'tips',
}

export default function ProductManagerResumePage() {
  return <SeoLandingPage config={config} />
}
