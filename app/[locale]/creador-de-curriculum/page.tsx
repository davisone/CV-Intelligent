import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Briefcase, Star, Sparkles, Trophy } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.professionalCvMakerPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/creador-de-curriculum', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.professionalCvMakerPage',
  canonicalPath: '/creador-de-curriculum',
  hero: {
    badgeIcon: Briefcase,
  },
  section1Icons: [Star, Sparkles, Trophy],
  section3Type: 'steps',
}

export default function CreadorDeCurriculumPage() {
  return <SeoLandingPage config={config} />
}
