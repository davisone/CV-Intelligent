import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/session-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'CV Builder - Générateur de CV Intelligent',
    template: '%s | CV Builder',
  },
  description:
    'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle. Templates modernes, suggestions IA, optimisation ATS.',
  keywords: ['CV', 'resume', 'générateur', 'IA', 'ATS', 'professionnel', 'créer CV', 'CV en ligne', 'optimisation ATS'],
  authors: [{ name: 'DVS-Web - Evan Davison', url: 'https://dvs-web.fr' }],
  creator: 'DVS-Web - Evan Davison',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'CV Builder',
    title: 'CV Builder - Générateur de CV Intelligent',
    description: 'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle. Templates modernes, suggestions IA, optimisation ATS.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Builder - Générateur de CV Intelligent',
    description: 'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle.',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-40PK9X3YZT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-40PK9X3YZT');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  )
}
