'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('L\'email est requis')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email invalide')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Email envoyé !')
      } else {
        // On affiche toujours un message de succès pour des raisons de sécurité
        // (ne pas révéler si l'email existe ou non)
        setIsSubmitted(true)
      }
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle>Email envoyé</CardTitle>
          <CardDescription>
            Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-[#6B6560] text-center">
              Vérifiez votre boîte de réception et vos spams.
            </p>
            <Link href="/login" className="block">
              <Button variant="outline" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Mot de passe oublié ?</CardTitle>
        <CardDescription>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              error={error}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Envoyer le lien
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B6560]">
          Vous vous souvenez de votre mot de passe ?{' '}
          <Link href="/login" className="text-[#722F37] hover:text-[#8B3A44] hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}