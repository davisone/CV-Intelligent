'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TwoFactorSettingsProps {
  initialEnabled: boolean
}

export function TwoFactorSettings({ initialEnabled }: TwoFactorSettingsProps) {
  const t = useTranslations('dashboard.settings')
  const tCommon = useTranslations('common')
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
        toast.error(data.error || t('setupError'))
        return
      }

      setQrCode(data.qrCode)
      setSecret(data.secret)
      setIsSettingUp(true)
    } catch {
      toast.error(t('genericError'))
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error(t('invalidCode'))
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
        toast.error(data.error || t('invalidCode'))
        return
      }

      toast.success(t('2faEnabledSuccess'))
      setIsEnabled(true)
      setIsSettingUp(false)
      setQrCode(null)
      setSecret(null)
      setVerificationCode('')
    } catch {
      toast.error(t('genericError'))
    } finally {
      setIsLoading(false)
    }
  }

  const disable2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error(t('invalidCode'))
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
        toast.error(data.error || t('invalidCode'))
        return
      }

      toast.success(t('2faDisabledSuccess'))
      setIsEnabled(false)
      setIsDisabling(false)
      setVerificationCode('')
    } catch {
      toast.error(t('genericError'))
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
          <p className="text-gray-700">{t('2faEnabled')}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsDisabling(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          {t('disable2FA')}
        </Button>
      </div>
    )
  }

  if (isDisabling) {
    return (
      <div className="space-y-4">
        <p className="text-gray-700">
          {t('disable2FADescription')}
        </p>
        <div className="space-y-2 max-w-xs">
          <Label htmlFor="disable-code">{t('verificationCode')}</Label>
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
            {t('confirmDisable2FA')}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsDisabling(false)
              setVerificationCode('')
            }}
          >
            {tCommon('cancel')}
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
            {t('setup2FAQrCode')}
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
            {t('setup2FAManual')} <code className="bg-gray-100 px-2 py-1 rounded text-gray-900">{secret}</code>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            {t('setup2FAEnterCode')}
          </p>
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="verification-code">{t('verificationCode')}</Label>
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
            {t('enable2FA')}
          </Button>
          <Button variant="outline" onClick={cancelSetup}>
            {tCommon('cancel')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        {t('setup2FADescription')}
      </p>
      <Button onClick={startSetup} isLoading={isLoading}>
        {t('configure2FA')}
      </Button>
    </div>
  )
}
