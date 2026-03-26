import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.templatesPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/templates', locale),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
}

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children
}
