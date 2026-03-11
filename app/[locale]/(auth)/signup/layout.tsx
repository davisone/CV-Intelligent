import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth.signup' })
  return {
    title: t('meta.title'),
    alternates: { canonical: '/signup' },
  }
}

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children
}
