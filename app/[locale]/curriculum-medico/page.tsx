import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Stethoscope, Heart, Award } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.curriculumMedicoPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-medico', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.curriculumMedicoPage',
  canonicalPath: '/curriculum-medico',
  hero: { badgeIcon: Stethoscope },
  section1Icons: [Stethoscope, Heart, Award],
  section3Type: 'steps',
}

export default function CurriculumMedicoPage() {
  return <SeoLandingPage config={config} />
}
