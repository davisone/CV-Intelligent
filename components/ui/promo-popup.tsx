'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { WEEKEND_PROMO, isPromoActive } from '@/lib/config/pricing'

export function PromoPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isPromoActive()) return
    const seen = localStorage.getItem(WEEKEND_PROMO.slug)
    if (!seen) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(WEEKEND_PROMO.slug, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-md bg-[#FBF8F4] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Bande décorative */}
        <div className="h-1.5 bg-gradient-to-r from-[#722F37] via-[#c0535e] to-[#722F37]" />

        <div className="p-6">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[#9B9590] hover:text-[#1F1A17] hover:bg-[#E8E0D5] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Étiquette promo */}
          <div className="inline-flex items-center gap-1.5 bg-[#722F37]/10 text-[#722F37] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            <span>⚡</span> Offre week-end
          </div>

          <h2 className="text-2xl font-bold text-[#1F1A17] mb-2">
            -1€ sur tout ce week-end
          </h2>
          <p className="text-[#6B6560] text-sm leading-relaxed mb-5">
            Profitez de tarifs réduits jusqu'à dimanche 23h59 sur tous nos services :
          </p>

          <div className="space-y-2.5 mb-6">
            <div className="flex items-center justify-between bg-white border border-[#E0D6C8] rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#1F1A17]">CV Premium</p>
                <p className="text-xs text-[#9B9590]">Tous les templates + IA + export</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#9B9590] line-through">4,99 €</p>
                <p className="text-lg font-bold text-[#722F37]">3,99 €</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#E0D6C8] rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#1F1A17]">Génération IA</p>
                <p className="text-xs text-[#9B9590]">Lettre de motivation par IA</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#9B9590] line-through">2,99 €</p>
                <p className="text-lg font-bold text-[#722F37]">1,99 €</p>
              </div>
            </div>
          </div>

          <button
            onClick={dismiss}
            className="w-full bg-[#722F37] hover:bg-[#5a252c] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            J'en profite
          </button>

          <p className="text-center text-xs text-[#9B9590] mt-3">
            Offre valable jusqu'au dimanche 29 mars à 23h59
          </p>
        </div>
      </div>
    </div>
  )
}
