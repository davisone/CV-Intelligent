import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Mail, MessageSquare, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.coverLetterPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cover-letter-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.coverLetterPage',
  canonicalPath: '/cover-letter-template',
  hero: { badgeIcon: Mail },
  section1Icons: [Mail, MessageSquare, Star],
  section3Type: 'steps',
}

export default function CoverLetterPage() {
  return <SeoLandingPage config={config} />
}
