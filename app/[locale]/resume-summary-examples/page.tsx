import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Star, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.resumeSummaryExamplesPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/resume-summary-examples', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeSummaryExamplesPage',
  canonicalPath: '/resume-summary-examples',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Sparkles, Star, Zap],
  section3Type: 'tips',
}

export default function ResumeSummaryExamplesPage() {
  return <SeoLandingPage config={config} />
}
