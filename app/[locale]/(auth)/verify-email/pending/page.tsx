'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPendingPage() {
  const t = useTranslations('auth.verifyEmail')
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
        toast.error(data.error || t('errors.generic'))
      }
    } catch {
      toast.error(t('errors.generic'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t('pendingTitle')}</CardTitle>
        <CardDescription>
          {t('pendingSubtitle')}
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
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-[#722F37] hover:underline"
          >
            Se déconnecter
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
