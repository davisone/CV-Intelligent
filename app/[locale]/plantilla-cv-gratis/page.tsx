import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Download, FileText, Sparkles, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.resumeTemplateDownloadPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/plantilla-cv-gratis', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeTemplateDownloadPage',
  canonicalPath: '/plantilla-cv-gratis',
  hero: {
    badgeIcon: Download,
  },
  section1Icons: [FileText, Sparkles, Shield],
  section3Type: 'steps',
}

export default function PlantillaCvGratisPage() {
  return <SeoLandingPage config={config} />
}
