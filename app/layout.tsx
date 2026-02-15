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
  },
  title: {
    default: 'CV Gratuit en Ligne | Créer un CV avec IA - CV Builder par Evan Davison',
    template: '%s | CV Builder - Evan Davison',
  },
  description:
    'Créez votre CV gratuit en ligne avec l\'intelligence artificielle. Générateur de CV professionnel à Rennes par Evan Davison (DVS-Web). Templates modernes, optimisation ATS, export PDF. Comment faire un CV parfait en 5 minutes.',
  keywords: [
    'CV gratuit',
    'CV en ligne',
    'création de CV',
    'CV IA',
    'générateur de CV',
    'comment faire un CV',
    'CV professionnel',
    'CV Rennes',
    'Evan Davison',
    'DVS-Web',
    'CV Builder',
    'créer CV gratuit',
    'modèle CV',
    'template CV',
    'CV moderne',
    'optimisation ATS',
    'CV intelligence artificielle',
    'faire un CV en ligne',
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
