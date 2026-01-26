import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `auth-2fa-check:${ip}`
    const rateLimit = checkRateLimit(rateLimitKey, AUTH_RATE_LIMITS.twoFactorCheck)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${rateLimit.resetIn} secondes.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      )
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { totpEnabled: true },
    })

    return NextResponse.json({
      totpEnabled: user?.totpEnabled ?? false,
    })
  } catch (error) {
    console.error('[2FA_CHECK_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}