import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Sparkles, Star, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.creativeResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/creative-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.creativeResumeTemplatePage',
  canonicalPath: '/creative-resume-template',
  hero: {
    badgeIcon: Palette,
  },
  section1Icons: [Sparkles, Palette, Star],
  section3Type: 'tips',
}

export default function CreativeResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
