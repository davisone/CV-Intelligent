import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Eye, Layers } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDesignPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-design', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvDesignPage',
  canonicalPath: '/cv-design',
  hero: {
    badgeIcon: Palette,
  },
  section1Icons: [Palette, Layers, Eye],
  section3Type: 'tips',
}

export default function CvDesignPage() {
  return <SeoLandingPage config={config} />
}
