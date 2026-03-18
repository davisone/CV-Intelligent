import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, CheckCircle, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.simpleResumeTemplatePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/plantilla-curriculum-simple', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.simpleResumeTemplatePage',
  canonicalPath: '/plantilla-curriculum-simple',
  hero: {
    badgeIcon: FileText,
  },
  section1Icons: [CheckCircle, Star, Shield],
  section3Type: 'tips',
}

export default function PlantillaCurriculumSimplePage() {
  return <SeoLandingPage config={config} />
}
