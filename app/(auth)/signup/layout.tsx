import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Créez votre compte ResumeForge gratuitement et commencez à générer des CV professionnels optimisés avec l\'intelligence artificielle.',
  alternates: {
    canonical: '/signup',
  },
}

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children
}