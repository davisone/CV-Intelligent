import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const createSchema = z.object({
  resumeId: z.string().min(1),
  title: z.string().min(1).max(200),
  content: z.string().default(''),
  jobTitle: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
})

// GET /api/cover-letters
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coverLetters = await prisma.coverLetter.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        resume: {
          select: { id: true, title: true, isPaid: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: coverLetters })
  } catch (error) {
    console.error('[COVER_LETTERS_GET]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cover-letters
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Données invalides' },
        { status: 400 }
      )
    }

    // Vérifier que le CV appartient à l'utilisateur
    const resume = await prisma.resume.findFirst({
      where: { id: parsed.data.resumeId, userId: session.user.id },
      select: { id: true },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
    }

    const coverLetter = await prisma.coverLetter.create({
      data: {
        userId: session.user.id,
        resumeId: parsed.data.resumeId,
        title: parsed.data.title,
        content: parsed.data.content,
        jobTitle: parsed.data.jobTitle,
        company: parsed.data.company,
      },
      include: {
        resume: { select: { id: true, title: true, isPaid: true } },
      },
    })

    return NextResponse.json({ success: true, data: coverLetter }, { status: 201 })
  } catch (error) {
    console.error('[COVER_LETTERS_POST]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
