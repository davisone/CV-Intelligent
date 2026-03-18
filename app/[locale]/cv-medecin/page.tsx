import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Stethoscope, Heart, Award } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvMedecinPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-medecin', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvMedecinPage',
  canonicalPath: '/cv-medecin',
  hero: { badgeIcon: Stethoscope },
  section1Icons: [Stethoscope, Heart, Award],
  section3Type: 'steps',
}

export default function CvMedecinPage() {
  return <SeoLandingPage config={config} />
}
