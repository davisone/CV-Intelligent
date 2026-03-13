import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Code, Github, Rocket } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDeveloppeurJuniorPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-developpeur-junior', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvDeveloppeurJuniorPage',
  canonicalPath: '/cv-developpeur-junior',
  hero: {
    badgeIcon: Code,
  },
  section1Icons: [Code, Github, Rocket],
  section3Type: 'steps',
}

export default function CvDeveloppeurJuniorPage() {
  return <SeoLandingPage config={config} />
}
