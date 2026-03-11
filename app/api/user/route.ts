import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateLocaleSchema = z.object({
  locale: z.enum(['fr', 'en']),
})

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = updateLocaleSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Locale invalide' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { locale: parsed.data.locale },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PATCH_USER_LOCALE_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Supprime l'utilisateur — toutes les relations cascadent automatiquement
    await prisma.user.delete({
      where: { id: session.user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE_USER_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
