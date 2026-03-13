import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BookOpen, Star, CheckCircle, GraduationCap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.teacherResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/teacher-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.teacherResumeTemplatePage',
  canonicalPath: '/teacher-resume-template',
  hero: {
    badgeIcon: BookOpen,
  },
  section1Icons: [Star, CheckCircle, GraduationCap],
  section3Type: 'tips',
}

export default function TeacherResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
