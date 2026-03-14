import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.freeResumeBuilderPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-vitae-gratis', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.freeResumeBuilderPage',
  canonicalPath: '/curriculum-vitae-gratis',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Sparkles, Shield, Star],
  section3Type: 'steps',
}

export default function CurriculumVitaeGratisPage() {
  return <SeoLandingPage config={config} />
}
