import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Utensils, Star, Award } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvCuisinierPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-cuisinier', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvCuisinierPage',
  canonicalPath: '/cv-cuisinier',
  hero: { badgeIcon: Utensils },
  section1Icons: [Utensils, Star, Award],
  section3Type: 'steps',
}

export default function CvCuisinierPage() {
  return <SeoLandingPage config={config} />
}
