'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck } from 'lucide-react'

export default function Verify2FAPage() {
  const t = useTranslations('auth.verify2fa')
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setCode(value)
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code || code.length !== 6) {
      setError(t('errors.codeRequired'))
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/2fa/verify-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t('errors.invalidCode'))
        toast.error(data.error || t('errors.invalidCode'))
        return
      }

      toast.success(t('successMessage'))
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error(t('errors.generic'))
      setError(t('errors.generic'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#722F37]/10">
          <ShieldCheck className="h-6 w-6 text-[#722F37]" />
        </div>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">{t('code')}</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={handleChange}
              error={error}
              disabled={isLoading}
              autoFocus
              className="text-center text-2xl tracking-widest"
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('submit')}
          </Button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-sm text-[#6B6560] hover:text-[#1F1A17] py-2"
          >
            {t('cancel')}
          </button>
        </form>
      </CardContent>
    </Card>
  )
}
