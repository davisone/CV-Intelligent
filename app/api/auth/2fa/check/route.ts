import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
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