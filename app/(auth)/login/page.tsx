'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="h-8 bg-[#2D2D2D] rounded animate-pulse mx-auto w-32" />
        <div className="h-4 bg-[#2D2D2D] rounded animate-pulse mx-auto w-48 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-10 bg-[#2D2D2D] rounded animate-pulse" />
        <div className="h-10 bg-[#2D2D2D] rounded animate-pulse" />
        <div className="h-10 bg-[#2D2D2D] rounded animate-pulse" />
      </CardContent>
    </Card>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const [isLoading, setIsLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totpCode: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'totpCode') {
      // Only allow digits for TOTP code
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    }

    if (requires2FA && !formData.totpCode) {
      newErrors.totpCode = 'Le code 2FA est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        totpCode: formData.totpCode || undefined,
        redirect: false,
      })

      if (result?.error) {
        if (result.error.includes('2FA_REQUIRED')) {
          setRequires2FA(true)
          toast.info('Veuillez entrer votre code 2FA')
        } else if (result.error.includes('Invalid 2FA')) {
          toast.error('Code 2FA invalide')
          setErrors({ totpCode: 'Code 2FA invalide' })
        } else {
          toast.error('Email ou mot de passe incorrect')
          setErrors({ password: 'Email ou mot de passe incorrect' })
        }
      } else {
        toast.success('Connexion réussie !')
        window.location.href = callbackUrl
      }
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    await signIn(provider, { callbackUrl })
  }

  const handleBack = () => {
    setRequires2FA(false)
    setFormData(prev => ({ ...prev, totpCode: '' }))
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{requires2FA ? 'Vérification 2FA' : 'Connexion'}</CardTitle>
        <CardDescription>
          {requires2FA
            ? 'Entrez le code de votre application d\'authentification'
            : 'Connectez-vous pour accéder à vos CV'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!requires2FA ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#C9A227] hover:text-[#D4B44A] hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isLoading}
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totpCode">Code à 6 chiffres</Label>
                <Input
                  id="totpCode"
                  name="totpCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  value={formData.totpCode}
                  onChange={handleChange}
                  error={errors.totpCode}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-[#A3A3A3] hover:text-[#E5E5E5]"
              >
                ← Retour
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {requires2FA ? 'Vérifier' : 'Se connecter'}
          </Button>
        </form>

        {!requires2FA && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#404040]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1A1A1A] px-2 text-[#A3A3A3]">
                  Ou continuer avec
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-[#A3A3A3]">
              Pas encore de compte ?{' '}
              <Link href="/signup" className="text-[#C9A227] hover:text-[#D4B44A] hover:underline font-medium">
                S&apos;inscrire
              </Link>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}