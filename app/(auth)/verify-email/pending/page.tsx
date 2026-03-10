'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VerifyEmailPendingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleResend = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST' })
      if (res.ok) {
        setSent(true)
        toast.success('Email de vérification renvoyé !')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Une erreur est survenue')
      }
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Vérifiez votre email</CardTitle>
        <CardDescription>
          Un email de vérification vous a été envoyé. Cliquez sur le lien pour accéder à votre dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#F3EDE5] rounded-lg p-4 text-sm text-[#6B6560]">
          Vérifiez également vos spams si vous ne trouvez pas l'email.
        </div>
        <Button
          onClick={handleResend}
          isLoading={isLoading}
          disabled={sent}
          className="w-full"
          variant="outline"
        >
          {sent ? 'Email renvoyé !' : "Renvoyer l'email"}
        </Button>
        <p className="text-center text-sm text-[#6B6560]">
          <Link href="/login" className="text-[#722F37] hover:underline">
            Se déconnecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
