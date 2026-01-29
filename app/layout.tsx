import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/session-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'ResumeForge - Générateur de CV Intelligent',
    template: '%s | ResumeForge',
  },
  description:
    'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle. Templates modernes, suggestions IA, optimisation ATS.',
  keywords: ['CV', 'resume', 'générateur', 'IA', 'ATS', 'professionnel'],
  authors: [{ name: 'DVS-Web - Evan Davison', url: 'https://dvs-web.fr' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'ResumeForge',
    title: 'ResumeForge - Générateur de CV Intelligent',
    description: 'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  )
}
