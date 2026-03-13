// app/[locale]/modele-cv-gratuit/page.tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Star, Sparkles, Shield, FileText } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvGratuitPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/modele-cv-gratuit', locale),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.modeleCvGratuitPage',
  canonicalPath: '/modele-cv-gratuit',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [Sparkles, Shield, Star],
  section3Type: 'steps',
}

export default function ModeleCvGratuitPage() {
  return <SeoLandingPage config={config} />
}
