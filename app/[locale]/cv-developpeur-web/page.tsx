import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Code2, Globe, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDeveloppeurWebPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-developpeur-web', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvDeveloppeurWebPage',
  canonicalPath: '/cv-developpeur-web',
  hero: { badgeIcon: Code2 },
  section1Icons: [Code2, Globe, Zap],
  section3Type: 'steps',
}

export default function CvDeveloppeurWebPage() {
  return <SeoLandingPage config={config} />
}
