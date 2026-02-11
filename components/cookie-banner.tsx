'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const GA_ID = 'G-60Z6QM94H8'

export function CookieBanner() {
  const [consent, setConsent] = useState<'pending' | 'accepted' | 'refused'>('pending')
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted') {
      setConsent('accepted')
      setShowBanner(false)
    } else if (stored === 'refused') {
      setConsent('refused')
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
    setShowBanner(false)
  }

  const refuseCookies = () => {
    localStorage.setItem('cookie-consent', 'refused')
    setConsent('refused')
    setShowBanner(false)
  }

  return (
    <>
      {/* Google Analytics - chargé uniquement si accepté */}
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Bannière de cookies */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-[#F3EDE5] border border-[#E0D6C8] rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-[#1F1A17] font-medium mb-1">
                  Nous utilisons des cookies
                </p>
                <p className="text-sm text-[#6B6560]">
                  Ce site utilise des cookies pour analyser le trafic et améliorer votre expérience.{' '}
                  <Link href="/legal/confidentialite" className="text-[#722F37] hover:underline">
                    En savoir plus
                  </Link>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={refuseCookies}
                  className="px-4 py-2 text-sm font-medium text-[#6B6560] hover:text-[#1F1A17] border border-[#E0D6C8] rounded-xl hover:bg-white transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#722F37] rounded-xl hover:bg-[#8B3A44] transition-colors"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
