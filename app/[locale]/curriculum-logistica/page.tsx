import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Box, Truck, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvLogistiquePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-logistica', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvLogistiquePage',
  canonicalPath: '/curriculum-logistica',
  hero: {
    badgeIcon: Truck,
  },
  section1Icons: [Truck, Box, Zap],
  section3Type: 'tips',
}

export default function CurriculumLogisticaPage() {
  return <SeoLandingPage config={config} />
}
