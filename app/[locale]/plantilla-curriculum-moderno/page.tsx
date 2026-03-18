import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Sparkles, Star, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modernResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/plantilla-curriculum-moderno', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.modernResumeTemplatePage',
  canonicalPath: '/plantilla-curriculum-moderno',
  hero: {
    badgeIcon: Palette,
  },
  section1Icons: [Sparkles, Star, Zap],
  section3Type: 'tips',
}

export default function PlantillaCurriculumModernoPage() {
  return <SeoLandingPage config={config} />
}
