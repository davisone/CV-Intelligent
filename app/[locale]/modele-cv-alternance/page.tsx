import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BookOpen, CheckCircle, Briefcase } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvAlternancePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/modele-cv-alternance', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.modeleCvAlternancePage',
  canonicalPath: '/modele-cv-alternance',
  hero: {
    badgeIcon: BookOpen,
  },
  section1Icons: [BookOpen, Briefcase, CheckCircle],
  section3Type: 'tips',
}

export default function ModeleCvAlternancePage() {
  return <SeoLandingPage config={config} />
}
