import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Building2, PieChart, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.architectResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/architect-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.architectResumePage',
  canonicalPath: '/architect-resume-template',
  hero: { badgeIcon: Building2 },
  section1Icons: [Building2, PieChart, Star],
  section3Type: 'steps',
}

export default function ArchitectResumePage() {
  return <SeoLandingPage config={config} />
}
