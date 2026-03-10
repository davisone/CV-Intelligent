'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const VerifyEmailContent = () => {
  const searchParams = useSearchParams()
  const { update } = useSession()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }

    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (res.ok) {
          setStatus('success')
          // Rafraîchir le JWT puis rechargement complet pour que le middleware lise le nouveau token
          await update()
          window.location.href = '/dashboard'
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [token])

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Vérification en cours...</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-[#6B6560]">
          <div className="animate-pulse">Validation de votre email...</div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'success') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Email vérifié !</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-[#6B6560]">
          <p>Votre adresse email a bien été vérifiée. Redirection vers le dashboard...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-red-600">Lien invalide</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-[#6B6560]">Ce lien de vérification est invalide ou a expiré.</p>
        <Link
          href="/verify-email/pending"
          className="inline-flex items-center justify-center px-4 py-2 bg-[#722F37] text-white rounded-lg font-medium hover:bg-[#8B3A44] transition-colors"
        >
          Renvoyer un email
        </Link>
      </CardContent>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
