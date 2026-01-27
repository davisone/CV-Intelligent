'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/helpers'
import { PRICING } from '@/lib/config/pricing'
import { Lock, Sparkles, FileText, BarChart3, Download, Check } from 'lucide-react'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resumeId: string
  resumeTitle: string
}

export function CheckoutModal({
  open,
  onOpenChange,
  resumeId,
  resumeTitle,
}: CheckoutModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptedCGV, setAcceptedCGV] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du paiement')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onOpenChange(false)
      }
    },
    [onOpenChange, isLoading]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open) return null

  const features = [
    { icon: FileText, text: 'Tous les templates premium' },
    { icon: Sparkles, text: 'Suggestions IA illimitées' },
    { icon: BarChart3, text: 'Score ATS détaillé' },
    { icon: Download, text: 'Export PDF et DOCX' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isLoading && onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          'relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2
              id="checkout-modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Débloquer votre CV
            </h2>
            <p className="text-sm text-gray-500">{resumeTitle}</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Accès premium inclus :
          </p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <feature.icon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="text-center py-4 border-t border-b border-gray-100 mb-4">
          <p className="text-3xl font-bold text-gray-900">{PRICING.displayPrice}</p>
          <p className="text-sm text-gray-500">Paiement unique, accès permanent</p>
        </div>

        {/* CGV Checkbox */}
        <label className="flex items-start gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedCGV}
            onChange={(e) => setAcceptedCGV(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-600">
            J'accepte les{' '}
            <Link
              href="/legal/cgv"
              target="_blank"
              className="text-primary hover:underline"
            >
              Conditions Générales de Vente
            </Link>
            {' '}et je renonce expressément à mon droit de rétractation conformément à l'article L221-28 du Code de la consommation.
          </span>
        </label>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            className="flex-1"
            onClick={handleCheckout}
            disabled={!acceptedCGV}
            isLoading={isLoading}
          >
            Payer {PRICING.displayPrice}
          </Button>
        </div>

        {/* Security note */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Paiement sécurisé par Stripe
        </p>
      </div>
    </div>
  )
}
