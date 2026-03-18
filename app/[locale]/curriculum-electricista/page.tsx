import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Zap, Shield, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.curriculumElectricistaPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-electricista', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.curriculumElectricistaPage',
  canonicalPath: '/curriculum-electricista',
  hero: { badgeIcon: Zap },
  section1Icons: [Zap, Shield, CheckCircle],
  section3Type: 'steps',
}

export default function CurriculumElectricistaPage() {
  return <SeoLandingPage config={config} />
}
