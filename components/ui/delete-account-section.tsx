'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CONFIRMATION_PHRASE = 'je veux supprimer mon compte'

export const DeleteAccountSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isConfirmed = phrase === CONFIRMATION_PHRASE

  const handleDelete = async () => {
    if (!isConfirmed) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/user', { method: 'DELETE' })

      if (!res.ok) {
        toast.error('Une erreur est survenue. Réessayez.')
        return
      }

      toast.success('Compte supprimé.')
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error('Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#F3EDE5] p-6 rounded-xl border border-red-200">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Zone dangereuse</h2>
      <p className="text-[#6B6560] text-sm mb-4">
        La suppression de votre compte est définitive. Tous vos CV, données et paiements seront effacés.
      </p>

      {!isOpen ? (
        <Button
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
          onClick={() => setIsOpen(true)}
        >
          Supprimer mon compte
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            <strong>Cette action est irréversible.</strong> Tous vos CVs, votre profil et vos données seront supprimés définitivement.
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-phrase">
              Tapez <span className="font-mono font-semibold">je veux supprimer mon compte</span> pour confirmer
            </Label>
            <Input
              id="confirm-phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="je veux supprimer mon compte"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => { setIsOpen(false); setPhrase('') }}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={!isConfirmed}
              isLoading={isLoading}
            >
              Supprimer définitivement
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
