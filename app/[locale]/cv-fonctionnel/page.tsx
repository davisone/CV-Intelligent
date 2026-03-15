import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Sparkles, Star, CheckCircle, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.functionalResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-fonctionnel', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.functionalResumeTemplatePage',
  canonicalPath: '/cv-fonctionnel',
  hero: {
    badgeIcon: Sparkles,
  },
  section1Icons: [Star, CheckCircle, Shield],
  section3Type: 'tips',
}

export default function CvFonctionnelPage() {
  return <SeoLandingPage config={config} />
}
