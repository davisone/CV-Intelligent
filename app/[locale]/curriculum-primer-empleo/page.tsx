import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Zap, Star, Briefcase, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.entryLevelResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-primer-empleo', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.entryLevelResumePage',
  canonicalPath: '/curriculum-primer-empleo',
  hero: {
    badgeIcon: Zap,
  },
  section1Icons: [Star, Briefcase, CheckCircle],
  section3Type: 'tips',
}

export default function CurriculumPrimerEmpleoPage() {
  return <SeoLandingPage config={config} />
}
