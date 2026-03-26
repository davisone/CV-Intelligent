import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

interface RouteParams {
  params: Promise<{ id: string }>
}

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  jobTitle: z.string().max(200).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  resumeId: z.string().min(1).optional(),
})

// GET /api/cover-letters/[id]
export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const coverLetter = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
      include: {
        resume: { select: { id: true, title: true, isPaid: true } },
      },
    })

    if (!coverLetter) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: coverLetter })
  } catch (error) {
    console.error('[COVER_LETTER_GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cover-letters/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Données invalides' },
        { status: 400 }
      )
    }

    const existing = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    // Vérifier ownership du nouveau CV si changé
    if (parsed.data.resumeId && parsed.data.resumeId !== existing.resumeId) {
      const resume = await prisma.resume.findFirst({
        where: { id: parsed.data.resumeId, userId: session.user.id },
      })
      if (!resume) {
        return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
      }
    }

    const updated = await prisma.coverLetter.update({
      where: { id },
      data: {
        ...parsed.data,
      },
      include: {
        resume: { select: { id: true, title: true, isPaid: true } },
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('[COVER_LETTER_PUT]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cover-letters/[id]
export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const existing = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    await prisma.coverLetter.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[COVER_LETTER_DELETE]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
