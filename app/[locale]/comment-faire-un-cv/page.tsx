import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.commentFaireUnCvPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/comment-faire-un-cv', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.commentFaireUnCvPage',
  canonicalPath: '/comment-faire-un-cv',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [FileText, FileText, FileText],
  section3Type: 'tips',
}

export default function CommentFaireUnCvPage() {
  return <SeoLandingPage config={config} />
}
