import type { Metadata } from 'next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cv-builder.fr'

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
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
