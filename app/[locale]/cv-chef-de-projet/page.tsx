import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, CheckCircle, Target, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvChefDeProjetPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-chef-de-projet' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvChefDeProjetPage',
  canonicalPath: '/cv-chef-de-projet',
  hero: {
    badgeIcon: Zap,
  },
  section1Icons: [Target, Users, CheckCircle],
  section3Type: 'steps',
}

export default function CvChefDeProjetPage() {
  return <SeoLandingPage config={config} />
}
