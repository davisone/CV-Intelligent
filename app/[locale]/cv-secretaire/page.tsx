import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MessageSquare, Clock, FileText } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvSecretairePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-secretaire', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvSecretairePage',
  canonicalPath: '/cv-secretaire',
  hero: { badgeIcon: MessageSquare },
  section1Icons: [MessageSquare, Clock, FileText],
  section3Type: 'steps',
}

export default function CvSecretairePage() {
  return <SeoLandingPage config={config} />
}
