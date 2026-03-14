import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Zap, Star, CheckCircle, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.resumeSkillsSectionPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/habilidades-en-el-curriculum', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.resumeSkillsSectionPage',
  canonicalPath: '/habilidades-en-el-curriculum',
  hero: {
    badgeIcon: Zap,
  },
  section1Icons: [Star, CheckCircle, Shield],
  section3Type: 'tips',
}

export default function HabilidadesEnElCurriculumPage() {
  return <SeoLandingPage config={config} />
}
