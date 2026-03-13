import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Zap, CheckCircle, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.onePageResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/one-page-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.onePageResumeTemplatePage',
  canonicalPath: '/one-page-resume-template',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Zap, CheckCircle, Star],
  section3Type: 'tips',
}

export default function OnePageResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
