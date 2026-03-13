import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Star, Briefcase, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.internshipResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/internship-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.internshipResumeTemplatePage',
  canonicalPath: '/internship-resume-template',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [Star, Briefcase, Sparkles],
  section3Type: 'steps',
}

export default function InternshipResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
