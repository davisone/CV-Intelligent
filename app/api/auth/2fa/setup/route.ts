import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { generateSecret, generateURI } from 'otplib'
import * as QRCode from 'qrcode'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, totpEnabled: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    if (user.totpEnabled) {
      return NextResponse.json({ error: '2FA déjà activée' }, { status: 400 })
    }

    // Generate secret
    const secret = generateSecret()

    // Store secret temporarily (not enabled yet)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { totpSecret: secret },
    })

    // Generate OTP Auth URL
    const otpAuthUrl = generateURI({
      secret,
      label: user.email || 'user',
      issuer: 'DVS-CV',
    })

    // Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl)

    return NextResponse.json({
      secret,
      qrCode: qrCodeDataUrl,
    })
  } catch (error) {
    console.error('[2FA_SETUP_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la configuration 2FA' },
      { status: 500 }
    )
  }
}