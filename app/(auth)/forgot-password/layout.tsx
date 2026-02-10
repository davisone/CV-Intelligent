import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  description: 'Réinitialisez votre mot de passe CV Builder pour retrouver l\'accès à votre compte.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
  return children
}