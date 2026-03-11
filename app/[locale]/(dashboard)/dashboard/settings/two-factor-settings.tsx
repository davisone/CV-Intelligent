'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TwoFactorSettingsProps {
  initialEnabled: boolean
}

export function TwoFactorSettings({ initialEnabled }: TwoFactorSettingsProps) {
  const [isEnabled, setIsEnabled] = useState(initialEnabled)
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [isDisabling, setIsDisabling] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const startSetup = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors de la configuration')
        return
      }

      setQrCode(data.qrCode)
      setSecret(data.secret)
      setIsSettingUp(true)
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Veuillez entrer un code à 6 chiffres')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Code invalide')
        return
      }

      toast.success('2FA activée avec succès !')
      setIsEnabled(true)
      setIsSettingUp(false)
      setQrCode(null)
      setSecret(null)
      setVerificationCode('')
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const disable2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Veuillez entrer un code à 6 chiffres')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Code invalide')
        return
      }

      toast.success('2FA désactivée')
      setIsEnabled(false)
      setIsDisabling(false)
      setVerificationCode('')
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSetup = () => {
    setIsSettingUp(false)
    setQrCode(null)
    setSecret(null)
    setVerificationCode('')
  }

  if (isEnabled && !isDisabling) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <p className="text-gray-700">La 2FA est activée sur votre compte</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsDisabling(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Désactiver la 2FA
        </Button>
      </div>
    )
  }

  if (isDisabling) {
    return (
      <div className="space-y-4">
        <p className="text-gray-700">
          Pour désactiver la 2FA, entrez un code depuis votre application d&apos;authentification.
        </p>
        <div className="space-y-2 max-w-xs">
          <Label htmlFor="disable-code">Code de vérification</Label>
          <Input
            id="disable-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            onClick={disable2FA}
            isLoading={isLoading}
          >
            Confirmer la désactivation
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsDisabling(false)
              setVerificationCode('')
            }}
          >
            Annuler
          </Button>
        </div>
      </div>
    )
  }

  if (isSettingUp) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-gray-700">
            1. Scannez ce QR code avec votre application d&apos;authentification
            (Google Authenticator, Authy, etc.)
          </p>
          {qrCode && (
            <div className="flex justify-center p-4 bg-white rounded-lg border">
              <Image
                src={qrCode}
                alt="QR Code pour 2FA"
                width={200}
                height={200}
              />
            </div>
          )}
          <p className="text-sm text-gray-500">
            Ou entrez ce code manuellement : <code className="bg-gray-100 px-2 py-1 rounded text-gray-900">{secret}</code>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            2. Entrez le code à 6 chiffres affiché dans votre application
          </p>
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="verification-code">Code de vérification</Label>
            <Input
              id="verification-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={verifyAndEnable} isLoading={isLoading}>
            Activer la 2FA
          </Button>
          <Button variant="outline" onClick={cancelSetup}>
            Annuler
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        Ajoutez une couche de sécurité supplémentaire à votre compte en activant
        l&apos;authentification à deux facteurs.
      </p>
      <Button onClick={startSetup} isLoading={isLoading}>
        Configurer la 2FA
      </Button>
    </div>
  )
}