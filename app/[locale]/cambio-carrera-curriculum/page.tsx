import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.careerChangeResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cambio-carrera-curriculum', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.careerChangeResumePage',
  canonicalPath: '/cambio-carrera-curriculum',
  hero: {
    badgeIcon: ArrowRight,
  },
  section1Icons: [Sparkles, Star, Zap],
  section3Type: 'steps',
}

export default function CambioCarreraCurriculumPage() {
  return <SeoLandingPage config={config} />
}
