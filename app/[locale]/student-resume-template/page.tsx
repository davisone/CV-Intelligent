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
    alternates: buildAlternates('/student-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.studentResumeTemplatePage',
  canonicalPath: '/student-resume-template',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [BookOpen, Briefcase, Star],
  section3Type: 'steps',
}

export default function StudentResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
