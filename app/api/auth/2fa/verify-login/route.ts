import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { encode } from 'next-auth/jwt'
import { verifySync } from 'otplib'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `auth-2fa-verify-login:${ip}`
    const rateLimit = checkRateLimit(rateLimitKey, AUTH_RATE_LIMITS.twoFactorVerify)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      )
    }

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { code } = await request.json()

    if (!code || typeof code !== 'string' || code.length !== 6) {
      return NextResponse.json({ error: 'Code à 6 chiffres requis' }, { status: 400 })
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

    // Verify the TOTP code
    const isValid = verifySync({
      token: code,
      secret: user.totpSecret,
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Code invalide' }, { status: 400 })
    }

    // Update the JWT token to mark 2FA as verified
    const token = await getToken({
      req: request as Parameters<typeof getToken>[0]['req'],
      secret: process.env.NEXTAUTH_SECRET!,
    })

    if (token) {
      token.twoFactorVerified = true

      // Encode the updated token
      const encodedToken = await encode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
      })

      // Set the updated session token cookie
      const cookieStore = await cookies()
      const isProduction = process.env.NODE_ENV === 'production'
      const cookieName = isProduction
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token'

      cookieStore.set(cookieName, encodedToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    }

    return NextResponse.json({ success: true, message: 'Vérification 2FA réussie' })
  } catch (error) {
    console.error('[2FA_VERIFY_LOGIN_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}
