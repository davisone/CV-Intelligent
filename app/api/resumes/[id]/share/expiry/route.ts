import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PATCH /api/resumes/[id]/share/expiry - Définir ou supprimer la date d'expiration
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const { expiresAt } = await request.json()

    const updated = await prisma.resume.update({
      where: { id },
      data: { publicShareExpiresAt: expiresAt ? new Date(expiresAt) : null },
      select: { publicShareExpiresAt: true },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('[SHARE_EXPIRY]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
