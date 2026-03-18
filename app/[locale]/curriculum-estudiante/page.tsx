import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, BookOpen, Briefcase, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.studentResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-estudiante', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.studentResumeTemplatePage',
  canonicalPath: '/curriculum-estudiante',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [BookOpen, Briefcase, Star],
  section3Type: 'steps',
}

export default function CurriculumEstudiantePage() {
  return <SeoLandingPage config={config} />
}
