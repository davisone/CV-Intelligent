import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Code2, Globe, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.webDeveloperResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/web-developer-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.webDeveloperResumePage',
  canonicalPath: '/web-developer-resume',
  hero: { badgeIcon: Code2 },
  section1Icons: [Code2, Globe, Zap],
  section3Type: 'steps',
}

export default function WebDeveloperResumePage() {
  return <SeoLandingPage config={config} />
}
