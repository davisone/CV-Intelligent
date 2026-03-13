import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Code2, Zap, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.softwareEngineerResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/software-engineer-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.softwareEngineerResumePage',
  canonicalPath: '/software-engineer-resume',
  hero: {
    badgeIcon: Code2,
  },
  section1Icons: [Zap, Star, Shield],
  section3Type: 'tips',
}

export default function SoftwareEngineerResumePage() {
  return <SeoLandingPage config={config} />
}
