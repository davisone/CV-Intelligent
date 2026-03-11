'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react'

export default function CheckoutCancelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resume_id')

  const handleRetry = async () => {
    if (!resumeId) {
      router.push('/dashboard/templates')
      return
    }

    try {
      const res = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        // Rediriger vers l'éditeur
        router.push(`/dashboard/resumes/${resumeId}/edit`)
      }
    } catch {
      router.push('/dashboard/templates')
    }
  }

  const handleGoToEditor = () => {
    if (resumeId) {
      router.push(`/dashboard/resumes/${resumeId}/edit`)
    } else {
      router.push('/dashboard/resumes')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Paiement annulé
          </h1>
          <p className="text-gray-600 mb-6">
            Le paiement a été annulé. Votre CV a été créé mais les fonctionnalités premium sont verrouillées.
          </p>

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-amber-800">
              Vous pouvez toujours modifier votre CV. Les fonctionnalités premium (IA, Score ATS, templates avancés) seront disponibles après le paiement.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Réessayer le paiement
            </Button>
            <Button variant="outline" onClick={handleGoToEditor} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer sans payer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
