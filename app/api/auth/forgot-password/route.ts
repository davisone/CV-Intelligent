import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Pour des raisons de sécurité, on retourne toujours succès
    // même si l'utilisateur n'existe pas
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 heure

    // Sauvegarder le token dans la base de données
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // TODO: Envoyer l'email avec le lien de réinitialisation
    // Pour l'instant, on log le token (à supprimer en production)
    console.log(`[FORGOT_PASSWORD] Reset token for ${email}: ${resetToken}`)
    console.log(`[FORGOT_PASSWORD] Reset link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    )
  }
}