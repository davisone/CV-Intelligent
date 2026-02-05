import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { TwoFactorSettings } from './two-factor-settings'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      totpEnabled: true,
    },
  })

  if (!user) {
    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F1A17]">Paramètres</h1>
        <p className="text-[#6B6560] mt-1">Gérez votre compte et vos préférences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-[#F3EDE5] p-6 rounded-xl border border-[#E0D6C8]">
          <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">Profil</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#6B6560]">Nom</label>
              <p className="text-[#1F1A17]">{user.name || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="text-sm text-[#6B6560]">Email</label>
              <p className="text-[#1F1A17]">{user.email}</p>
            </div>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="bg-[#F3EDE5] p-6 rounded-xl border border-[#E0D6C8]">
          <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
            Authentification à deux facteurs (2FA)
          </h2>
          <TwoFactorSettings initialEnabled={user.totpEnabled} />
        </div>
      </div>
    </div>
  )
}