import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Heart, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvInfirmierPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-infirmier', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvInfirmierPage',
  canonicalPath: '/cv-infirmier',
  hero: {
    badgeIcon: Heart,
  },
  section1Icons: [Heart, Heart, Heart],
  section3Type: 'tips',
}

export default function CvInfirmierPage() {
  return <SeoLandingPage config={config} />
}
