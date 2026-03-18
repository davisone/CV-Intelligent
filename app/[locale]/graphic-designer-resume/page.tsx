import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Lightbulb, Image } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvGraphistePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/graphic-designer-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.cvGraphistePage',
  canonicalPath: '/graphic-designer-resume',
  hero: {
    badgeIcon: Palette,
  },
  section1Icons: [Palette, Image, Lightbulb],
  section3Type: 'tips',
}

export default function GraphicDesignerResumePage() {
  return <SeoLandingPage config={config} />
}
