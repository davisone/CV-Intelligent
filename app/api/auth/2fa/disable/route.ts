import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { verifySync } from 'otplib'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { code } = await request.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code requis' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { totpSecret: true, totpEnabled: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    if (!user.totpEnabled || !user.totpSecret) {
      return NextResponse.json({ error: '2FA non activée' }, { status: 400 })
    }

    // Verify the code before disabling
    const isValid = verifySync({
      token: code,
      secret: user.totpSecret,
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Code invalide' }, { status: 400 })
    }

    // Disable 2FA
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totpEnabled: false,
        totpSecret: null,
      },
    })

    return NextResponse.json({ success: true, message: '2FA désactivée' })
  } catch (error) {
    console.error('[2FA_DISABLE_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la désactivation' },
      { status: 500 }
    )
  }
}