import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token requis' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: { gt: new Date() },
      },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[VERIFY_EMAIL_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
