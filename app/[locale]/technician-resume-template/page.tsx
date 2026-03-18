import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Wrench, CheckCircle, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.technicianResumePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/technician-resume-template', locale),
    openGraph: { title: t('title'), description: t('description'), type: 'website' },
  }
}

const config: SeoLandingConfig = {
  namespace: 'landing.technicianResumePage',
  canonicalPath: '/technician-resume-template',
  hero: { badgeIcon: Wrench },
  section1Icons: [Wrench, CheckCircle, Shield],
  section3Type: 'steps',
}

export default function TechnicianResumePage() {
  return <SeoLandingPage config={config} />
}
