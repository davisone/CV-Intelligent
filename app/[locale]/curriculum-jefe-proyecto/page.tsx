import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Briefcase, BarChart3, CheckCircle, Zap } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.projectManagerResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-jefe-proyecto', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.projectManagerResumePage',
  canonicalPath: '/curriculum-jefe-proyecto',
  hero: {
    badgeIcon: Briefcase,
  },
  section1Icons: [BarChart3, CheckCircle, Zap],
  section3Type: 'tips',
}

export default function CurriculumJefeProyectoPage() {
  return <SeoLandingPage config={config} />
}
