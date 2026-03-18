import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BarChart3, Code2, Zap, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.dataScientistResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-cientifico-datos', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.dataScientistResumePage',
  canonicalPath: '/curriculum-cientifico-datos',
  hero: {
    badgeIcon: BarChart3,
  },
  section1Icons: [Code2, Zap, Shield],
  section3Type: 'tips',
}

export default function CurriculumCientificoDatosPage() {
  return <SeoLandingPage config={config} />
}
