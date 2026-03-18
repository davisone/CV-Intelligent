import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Star, Briefcase, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.resumeNoExperiencePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/resume-no-experience', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeNoExperiencePage',
  canonicalPath: '/resume-no-experience',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [Star, Briefcase, CheckCircle],
  section3Type: 'steps',
}

export default function ResumeNoExperiencePage() {
  return <SeoLandingPage config={config} />
}
