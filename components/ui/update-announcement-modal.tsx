'use client'

import { useState } from 'react'

interface UpdateAnnouncementModalProps {
  version: string
}

export function UpdateAnnouncementModal({ version }: UpdateAnnouncementModalProps) {
  const [visible, setVisible] = useState(true)

  const handleDismiss = async () => {
    setVisible(false)
    await fetch('/api/user/dismiss-update', { method: 'POST' })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#722F37] to-[#8B3A44] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 rounded-lg px-2.5 py-1">
              <span className="text-white font-black text-xs tracking-wide">CV BUILDER</span>
            </div>
            <span className="text-white/80 text-sm">v{version}</span>
          </div>
          <h2 className="text-white font-bold text-xl mt-3">Nouveautés de la mise à jour</h2>
          <p className="text-white/70 text-sm mt-1">Voici ce qui a changé dans cette version.</p>
        </div>

        {/* Changelog */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="font-semibold text-[#1F1A17] text-sm">Partage public de CV</p>
            <p className="text-[#6B6560] text-xs mt-0.5">Partagez votre CV via un lien unique directement aux recruteurs, sans qu&apos;ils aient besoin de créer un compte.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1F1A17] text-sm">Compteur de vues</p>
            <p className="text-[#6B6560] text-xs mt-0.5">Sachez combien de fois votre CV public a été consulté. Le compteur s&apos;affiche dans votre éditeur et sur la page partagée.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1F1A17] text-sm">Page CV adaptée mobile</p>
            <p className="text-[#6B6560] text-xs mt-0.5">La page publique de votre CV s&apos;adapte maintenant aux téléphones et tablettes automatiquement.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={handleDismiss}
            className="w-full bg-[#722F37] hover:bg-[#8B3A44] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            C&apos;est noté, merci !
          </button>
        </div>
      </div>
    </div>
  )
}
