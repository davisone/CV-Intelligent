import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MessageCircle, Star, Heart, CheckCircle } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.customerServiceResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/customer-service-resume', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.customerServiceResumePage',
  canonicalPath: '/customer-service-resume',
  hero: {
    badgeIcon: MessageCircle,
  },
  section1Icons: [Star, Heart, CheckCircle],
  section3Type: 'tips',
}

export default function CustomerServiceResumePage() {
  return <SeoLandingPage config={config} />
}
