import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Sparkles, CheckCircle, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvModernePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-moderne', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvModernePage',
  canonicalPath: '/cv-moderne',
  hero: {
    badgeIcon: Sparkles,
  },
  section1Icons: [Sparkles, Zap, CheckCircle],
  section3Type: 'tips',
}

export default function CvModernePage() {
  return <SeoLandingPage config={config} />
}
