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

    if (user.totpEnabled) {
      return NextResponse.json({ error: '2FA déjà activée' }, { status: 400 })
    }

    if (!user.totpSecret) {
      return NextResponse.json(
        { error: 'Configuration 2FA non initialisée' },
        { status: 400 }
      )
    }

    // Verify the code
    const isValid = verifySync({
      token: code,
      secret: user.totpSecret,
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Code invalide' }, { status: 400 })
    }

    // Enable 2FA
    await prisma.user.update({
      where: { id: session.user.id },
      data: { totpEnabled: true },
    })

    return NextResponse.json({ success: true, message: '2FA activée avec succès' })
  } catch (error) {
    console.error('[2FA_VERIFY_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}