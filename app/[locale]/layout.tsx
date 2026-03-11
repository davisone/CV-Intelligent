import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { AuthProvider } from '@/components/providers/session-provider'
import { CookieBanner } from '@/components/cookie-banner'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const locales = ['fr', 'en'] as const

export const metadata: Metadata = {
  authors: [{ name: 'Evan Davison', url: 'https://dvs-web.fr' }],
  creator: 'Evan Davison - DVS-Web',
  publisher: 'DVS-Web',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as 'fr' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#722F37" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="Rennes, France" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
            <CookieBanner />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
