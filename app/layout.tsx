import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/session-provider'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-64.png',
    apple: [
      { url: '/icon-192.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  title: {
    default: 'CV Gratuit en Ligne | Créer son CV avec IA - Générateur de CV Français',
    template: '%s | CV Builder France - Générateur de CV Gratuit',
  },
  description:
    'Créez votre CV gratuit en ligne en français avec l\'intelligence artificielle. Générateur de CV professionnel, création de CV rapide, modèles modernes, optimisation ATS et export PDF. Faire son CV n\'a jamais été aussi simple.',
  keywords: [
    // Termes principaux
    'cv', 'cv gratuit', 'cv en ligne', 'cv ia',
    'créer un cv', 'créer son cv', 'créer cv gratuit', 'créer cv en ligne',
    'faire un cv', 'faire son cv', 'faire cv en ligne', 'faire un cv gratuit',
    // Création / génération
    'création cv', 'création de cv', 'création de cv gratuit',
    'générateur de cv', 'générateur cv gratuit', 'générateur cv ia',
    'cv builder', 'cv maker', 'cv creator',
    // Intelligence artificielle
    'cv intelligence artificielle', 'cv avec ia', 'ia cv',
    'cv automatique', 'aide cv', 'améliorer son cv',
    // Modèles / templates
    'modèle cv', 'modèle cv gratuit', 'modèle de cv',
    'template cv', 'exemple cv', 'exemple de cv',
    'cv moderne', 'cv professionnel', 'cv design',
    // Comment faire
    'comment faire un cv', 'comment créer un cv', 'comment rédiger un cv',
    'rédiger un cv', 'rédiger cv', 'mise en page cv',
    // Export
    'cv pdf', 'cv pdf gratuit', 'télécharger cv',
    // Profils spécifiques
    'cv étudiant', 'cv alternance', 'cv stage', 'premier cv', 'cv sans expérience',
    // Optimisation
    'optimisation ats', 'cv ats', 'cv compatible ats',
    // France
    'cv france', 'cv français', 'cv gratuit france', 'cv en ligne france',
    'créer cv france', 'générateur cv français',
    // Local
    'cv rennes', 'Evan Davison', 'DVS-Web',
  ],
  authors: [{ name: 'Evan Davison', url: 'https://dvs-web.fr' }],
  creator: 'Evan Davison - DVS-Web',
  publisher: 'DVS-Web',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'CV Builder par Evan Davison',
    title: 'CV Gratuit en Ligne | Créer un CV avec IA - Evan Davison',
    description: 'Créez votre CV gratuit avec l\'IA. Générateur de CV professionnel à Rennes par Evan Davison. Templates modernes, optimisation ATS, export PDF gratuit.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CV Builder - Générateur de CV Gratuit avec IA par Evan Davison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Gratuit en Ligne | Créer un CV avec IA',
    description: 'Créez votre CV gratuit avec l\'IA. Générateur de CV professionnel par Evan Davison à Rennes.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#722F37" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="Rennes, France" />
        <meta httpEquiv="content-language" content="fr-FR" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
