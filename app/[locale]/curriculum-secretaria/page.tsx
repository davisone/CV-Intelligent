import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MessageSquare, Clock, FileText } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.curriculumSecretariaPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-secretaria', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.curriculumSecretariaPage',
  canonicalPath: '/curriculum-secretaria',
  hero: { badgeIcon: MessageSquare },
  section1Icons: [MessageSquare, Clock, FileText],
  section3Type: 'steps',
}

export default function CurriculumSecretariaPage() {
  return <SeoLandingPage config={config} />
}
