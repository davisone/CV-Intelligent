import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Lightbulb, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvEtudiantPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-etudiant', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvEtudiantPage',
  canonicalPath: '/cv-etudiant',
  hero: {
    badgeIcon: GraduationCap,
  },
  section1Icons: [GraduationCap, Lightbulb, CheckCircle],
  section3Type: 'tips',
}

export default function CvEtudiantPage() {
  return <SeoLandingPage config={config} />
}
