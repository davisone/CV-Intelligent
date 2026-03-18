import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BookOpen, CheckCircle, Star, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.howToWriteAResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/como-hacer-un-curriculum', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.howToWriteAResumePage',
  canonicalPath: '/como-hacer-un-curriculum',
  hero: {
    badgeIcon: BookOpen,
  },
  section1Icons: [CheckCircle, Star, Sparkles],
  section3Type: 'steps',
}

export default function ComoHacerUnCurriculumPage() {
  return <SeoLandingPage config={config} />
}
