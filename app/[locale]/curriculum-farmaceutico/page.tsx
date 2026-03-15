import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Leaf, Heart, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.curriculumFarmaceuticoPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/curriculum-farmaceutico', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.curriculumFarmaceuticoPage',
  canonicalPath: '/curriculum-farmaceutico',
  hero: { badgeIcon: Leaf },
  section1Icons: [Leaf, Heart, Shield],
  section3Type: 'steps',
}

export default function CurriculumFarmaceuticoPage() {
  return <SeoLandingPage config={config} />
}
