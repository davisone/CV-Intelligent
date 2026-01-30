import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Templates de CV',
  description: 'Découvrez nos templates de CV professionnels : Modern, Classic, Minimal et Creative. Choisissez le design parfait pour votre carrière.',
  alternates: {
    canonical: '/templates',
  },
}

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children
}