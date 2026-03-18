import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Download, FileText, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvPdfPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-pdf', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvPdfPage',
  canonicalPath: '/curriculum-pdf',
  hero: {
    badgeIcon: Download,
  },
  section1Icons: [FileText, Shield, Download],
  section3Type: 'tips',
}

export default function CurriculumPdfPage() {
  return <SeoLandingPage config={config} />
}
