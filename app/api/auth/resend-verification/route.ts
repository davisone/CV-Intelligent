import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { sendVerificationEmail } from '@/lib/email/resend'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = await checkRateLimit(`resend-verification:${ip}`, AUTH_RATE_LIMITS.resendVerification)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.` },
        { status: 429 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, emailVerified: true, locale: true },
    })

    if (!user?.email) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email déjà vérifié' }, { status: 400 })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 3600000)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { verificationToken, verificationTokenExpiry },
    })

    const userLocale = (user.locale === 'en' ? 'en' : 'fr') as 'fr' | 'en'
    await sendVerificationEmail(user.email, verificationToken, userLocale)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[RESEND_VERIFICATION_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
