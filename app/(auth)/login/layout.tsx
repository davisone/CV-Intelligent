import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte ResumeForge pour accéder à vos CV et continuer à créer des CV professionnels avec l\'IA.',
  alternates: {
    canonical: '/login',
  },
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}