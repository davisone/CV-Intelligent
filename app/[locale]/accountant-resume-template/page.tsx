import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Calculator, Shield, CheckCircle, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.accountantResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/accountant-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.accountantResumeTemplatePage',
  canonicalPath: '/accountant-resume-template',
  hero: {
    badgeIcon: Calculator,
  },
  section1Icons: [Shield, CheckCircle, Star],
  section3Type: 'tips',
}

export default function AccountantResumeTemplatePage() {
  return <SeoLandingPage config={config} />
}
