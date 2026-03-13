import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Code, Code2, Github } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDeveloppeurPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-developpeur' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvDeveloppeurPage',
  canonicalPath: '/cv-developpeur',
  hero: {
    badgeIcon: Code,
  },
  section1Icons: [Code2, Github, Code],
  section3Type: 'steps',
}

export default function CvDeveloppeurPage() {
  return <SeoLandingPage config={config} />
}
