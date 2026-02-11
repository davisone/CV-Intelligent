import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email/nodemailer'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `auth-forgot-password:${ip}`
    const rateLimit = checkRateLimit(rateLimitKey, AUTH_RATE_LIMITS.forgotPassword)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      )
    }

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

    // Envoyer l'email de réinitialisation
    const emailResult = await sendPasswordResetEmail(email, resetToken)

    if (!emailResult.success) {
      console.error('[FORGOT_PASSWORD] Failed to send email:', emailResult.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    )
  }
}