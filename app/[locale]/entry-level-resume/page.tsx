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
    alternates: buildAlternates('/entry-level-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.entryLevelResumePage',
  canonicalPath: '/entry-level-resume',
  hero: {
    badgeIcon: Zap,
  },
  section1Icons: [Star, Briefcase, CheckCircle],
  section3Type: 'tips',
}

export default function EntryLevelResumePage() {
  return <SeoLandingPage config={config} />
}
