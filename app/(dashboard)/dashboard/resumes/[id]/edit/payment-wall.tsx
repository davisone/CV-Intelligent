'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PRICING } from '@/lib/config/pricing'
import {
  Lock,
  ArrowLeft,
  Sparkles,
  FileText,
  BarChart3,
  Download,
  Check,
  Loader2,
} from 'lucide-react'

interface PaymentWallProps {
  resume: {
    id: string
    title: string
    template: string
  }
}

export function PaymentWall({ resume }: PaymentWallProps) {
  const router = useRouter()
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
        body: JSON.stringify({ resumeId: resume.id }),
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

  const features = [
    { icon: FileText, text: 'Accès à tous les templates premium' },
    { icon: Sparkles, text: 'Suggestions IA pour améliorer votre CV' },
    { icon: BarChart3, text: 'Score ATS détaillé avec recommandations' },
    { icon: Download, text: 'Export PDF haute qualité' },
  ]

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            CV Verrouillé
          </h1>
          <p className="text-gray-600">
            Débloquez <span className="font-medium">"{resume.title}"</span> pour accéder à l'éditeur complet et toutes les fonctionnalités premium.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          {/* Features */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Ce que vous obtenez :
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <feature.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="text-center py-4 border-t border-b border-gray-100 mb-6">
            <p className="text-4xl font-bold text-gray-900">{PRICING.displayPrice}</p>
            <p className="text-sm text-gray-500 mt-1">Paiement unique • Accès permanent</p>
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
              {' '}et je renonce expressément à mon droit de rétractation.
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              className="w-full h-12 text-lg"
              onClick={handleCheckout}
              disabled={isLoading || !acceptedCGV}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Redirection...
                </>
              ) : (
                <>
                  Débloquer pour {PRICING.displayPrice}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/dashboard/resumes')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à mes CV
            </Button>
          </div>

          {/* Security note */}
          <p className="mt-4 text-xs text-center text-gray-400">
            Paiement sécurisé par Stripe • Satisfait ou remboursé
          </p>
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Vous avez déjà utilisé votre CV gratuit. Chaque CV supplémentaire nécessite un paiement unique.
        </p>
      </div>
    </div>
  )
}
