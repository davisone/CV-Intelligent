import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Sparkles, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.creativeResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/plantilla-curriculum-creativo', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.creativeResumeTemplatePage',
  canonicalPath: '/plantilla-curriculum-creativo',
  hero: {
    badgeIcon: Palette,
  },
  section1Icons: [Sparkles, Palette, Star],
  section3Type: 'tips',
}

export default function PlantillaCurriculumCreativoPage() {
  return <SeoLandingPage config={config} />
}
