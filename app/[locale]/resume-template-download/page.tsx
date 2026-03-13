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
    alternates: buildAlternates('/resume-template-download', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeTemplateDownloadPage',
  canonicalPath: '/resume-template-download',
  hero: {
    badgeIcon: Download,
  },
  section1Icons: [FileText, Sparkles, Shield],
  section3Type: 'steps',
}

export default function ResumeTemplateDownloadPage() {
  return <SeoLandingPage config={config} />
}
