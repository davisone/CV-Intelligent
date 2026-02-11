'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck } from 'lucide-react'

export default function Verify2FAPage() {
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
      setError('Veuillez entrer un code à 6 chiffres')
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
        setError(data.error || 'Code invalide')
        toast.error(data.error || 'Code invalide')
        return
      }

      toast.success('Vérification réussie !')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Une erreur est survenue')
      setError('Une erreur est survenue')
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
        <CardTitle>Vérification 2FA</CardTitle>
        <CardDescription>
          Entrez le code à 6 chiffres de votre application d&apos;authentification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code de vérification</Label>
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
            Vérifier
          </Button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-sm text-[#6B6560] hover:text-[#1F1A17] py-2"
          >
            Annuler et se déconnecter
          </button>
        </form>
      </CardContent>
    </Card>
  )
}
