import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Modèles de CV Gratuits | Templates CV Professionnels',
  description: 'Découvrez nos modèles de CV gratuits et professionnels : Modern, Classic, ATS-Friendly, Minimal et Creative. Choisissez le design parfait pour créer votre CV en ligne.',
  keywords: [
    'modèle cv', 'modèle cv gratuit', 'modèle de cv', 'template cv',
    'exemple cv', 'exemple de cv', 'cv design', 'cv moderne',
    'cv professionnel', 'cv ats', 'cv créatif', 'cv minimaliste',
  ],
  alternates: {
    canonical: '/templates',
  },
}

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children
}