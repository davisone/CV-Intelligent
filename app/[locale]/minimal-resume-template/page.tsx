import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

const ALLOWED_LOCALES = ['en'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!ALLOWED_LOCALES.includes(locale as 'en')) return {}
  const t = await getTranslations({ locale, namespace: 'landing.cvMinimalistePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/minimal-resume-template', locale, ALLOWED_LOCALES),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvMinimalistePage',
  canonicalPath: '/minimal-resume-template',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Sparkles, Shield, Star],
  section3Type: 'tips',
}

export default async function MinimalResumeTemplatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!ALLOWED_LOCALES.includes(locale as 'en')) notFound()
  return <SeoLandingPage config={config} />
}
