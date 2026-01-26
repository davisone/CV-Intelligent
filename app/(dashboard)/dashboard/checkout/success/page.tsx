'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2, FileText, Sparkles, BarChart3 } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resume_id')
  const sessionId = searchParams.get('session_id')
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!resumeId) {
        setIsVerifying(false)
        return
      }

      try {
        // Attendre un peu pour que le webhook soit traité
        await new Promise(resolve => setTimeout(resolve, 2000))

        const res = await fetch(`/api/payments/verify/${resumeId}`)
        if (res.ok) {
          const data = await res.json()
          setIsSuccess(data.data?.isPaid || data.data?.paymentStatus === 'COMPLETED')
        }
      } catch (error) {
        console.error('Erreur de vérification:', error)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [resumeId])

  const handleGoToEditor = () => {
    if (resumeId) {
      router.push(`/dashboard/resumes/${resumeId}/edit`)
    } else {
      router.push('/dashboard/resumes')
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
          <p className="text-gray-600">Vérification du paiement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Paiement réussi !
          </h1>
          <p className="text-gray-600 mb-6">
            Votre CV est maintenant débloqué. Vous avez accès à toutes les fonctionnalités premium.
          </p>

          {/* Features unlocked */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Fonctionnalités débloquées :
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4 text-green-500" />
                Tous les templates premium
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-green-500" />
                Suggestions IA illimitées
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <BarChart3 className="w-4 h-4 text-green-500" />
                Score ATS détaillé
              </li>
            </ul>
          </div>

          {/* Action button */}
          <Button onClick={handleGoToEditor} className="w-full">
            Accéder à mon CV
          </Button>

          {!isSuccess && (
            <p className="text-xs text-gray-400 mt-4">
              Si le paiement n'est pas encore confirmé, il sera validé sous quelques minutes.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
