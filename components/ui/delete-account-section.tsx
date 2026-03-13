'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const DeleteAccountSection = () => {
  const t = useTranslations('dashboard.settings.dangerZone')
  const [isOpen, setIsOpen] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const confirmPhrase = t('confirmPhrase')
  const isConfirmed = phrase === confirmPhrase

  const handleDelete = async () => {
    if (!isConfirmed) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/user', { method: 'DELETE' })

      if (!res.ok) {
        toast.error(t('error'))
        return
      }

      toast.success(t('success'))
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error(t('error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#F3EDE5] p-6 rounded-xl border border-red-200">
      <h2 className="text-xl font-semibold text-red-700 mb-2">{t('title')}</h2>
      <p className="text-[#6B6560] text-sm mb-4">
        {t('description')}
      </p>

      {!isOpen ? (
        <Button
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
          onClick={() => setIsOpen(true)}
        >
          {t('deleteButton')}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {t('warning')}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-phrase">
              {t.rich('confirmLabel', {
                phrase: () => <span className="font-mono font-semibold">{confirmPhrase}</span>,
              })}
            </Label>
            <Input
              id="confirm-phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder={confirmPhrase}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => { setIsOpen(false); setPhrase('') }}
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={!isConfirmed}
              isLoading={isLoading}
            >
              {t('confirm')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
