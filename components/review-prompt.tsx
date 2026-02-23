'use client'

import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcSyetXUJJrpEAE/review'
const DISMISS_DELAY_DAYS = 30

// Logique localStorage partagée
const shouldShowReviewPrompt = (): boolean => {
  if (typeof window === 'undefined') return false

  const clicked = localStorage.getItem('review-clicked')
  if (clicked === 'true') return false

  const never = localStorage.getItem('review-never')
  if (never === 'true') return false

  const dismissed = localStorage.getItem('review-dismissed')
  if (dismissed) {
    const dismissedAt = parseInt(dismissed, 10)
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
    if (daysSince < DISMISS_DELAY_DAYS) return false
  }

  return true
}

// Modal affichée après le téléchargement du PDF
interface ReviewPromptModalProps {
  onClose: () => void
}

export const ReviewPromptModal = ({ onClose }: ReviewPromptModalProps) => {
  // null = pas encore vérifié, true/false = résultat du check localStorage
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const show = shouldShowReviewPrompt()
    if (!show) {
      onClose()
    } else {
      setVisible(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  const handleLeaveReview = () => {
    window.open(GOOGLE_REVIEW_URL, '_blank')
    localStorage.setItem('review-clicked', 'true')
    onClose()
  }

  const handleDismiss = () => {
    localStorage.setItem('review-dismissed', Date.now().toString())
    onClose()
  }

  const handleNeverShow = () => {
    localStorage.setItem('review-never', 'true')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Carte */}
      <div
        className="relative z-50 w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Étoiles */}
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Contenu */}
        <h2
          id="review-modal-title"
          className="text-xl font-semibold text-[#1F1A17] text-center mb-2"
        >
          Votre avis compte !
        </h2>
        <p className="text-[#6B6560] text-center text-sm mb-6">
          Vous venez de télécharger votre CV. Si l&apos;expérience vous a plu, un petit avis sur Google nous aiderait beaucoup !
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleLeaveReview}
            className="w-full bg-[#722F37] hover:bg-[#5A252C] text-white"
          >
            <Star className="w-4 h-4 fill-white" />
            Laisser un avis
          </Button>
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="w-full"
          >
            Plus tard
          </Button>
          <button
            onClick={handleNeverShow}
            className="text-xs text-[#6B6560]/60 hover:text-[#6B6560] transition-colors mt-1"
          >
            Ne plus demander
          </button>
        </div>
      </div>
    </div>
  )
}

// Encart permanent pour le dashboard
export const ReviewReminder = () => {
  const handleLeaveReview = () => {
    window.open(GOOGLE_REVIEW_URL, '_blank')
  }

  return (
    <div className="md:col-span-2 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 rounded-2xl border border-amber-200/60 relative overflow-hidden">
      {/* Étoile décorative en arrière-plan */}
      <div className="absolute -top-2 -right-2 opacity-10">
        <Star className="w-24 h-24 fill-amber-400 text-amber-400" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <h3 className="text-base font-semibold text-[#1F1A17] mb-1">
          Vous aimez CV Builder ?
        </h3>
        <p className="text-sm text-[#6B6560] mb-4">
          Votre avis sur Google nous aide à nous faire connaître et à nous améliorer !
        </p>

        <button
          onClick={handleLeaveReview}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] hover:bg-[#5A252C] text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Star className="w-4 h-4 fill-white" />
          Laisser un avis
        </button>
      </div>
    </div>
  )
}
