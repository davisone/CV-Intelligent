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
    alternates: buildAlternates('/curriculum-sin-experiencia-laboral', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeNoExperiencePage',
  canonicalPath: '/curriculum-sin-experiencia-laboral',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [Star, Briefcase, CheckCircle],
  section3Type: 'steps',
}

export default function CurriculumSinExperienciaLaboralPage() {
  return <SeoLandingPage config={config} />
}
