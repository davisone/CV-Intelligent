import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Lightbulb, GraduationCap, CheckCircle, Rocket } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvSansExperiencePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-sans-experience', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvSansExperiencePage',
  canonicalPath: '/cv-sans-experience',
  hero: {
    badgeIcon: Rocket,
  },
  section1Icons: [GraduationCap, Lightbulb, CheckCircle],
  section3Type: 'tips',
}

export default function CvSansExperiencePage() {
  return <SeoLandingPage config={config} />
}
