import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { createResumeSchema } from '@/lib/validations/resume.schema'

// GET /api/resumes - Liste des CV de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        personalInfo: true,
        _count: {
          select: {
            experiences: true,
            educations: true,
            skills: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: resumes })
  } catch (error) {
    console.error('[RESUMES_GET]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/resumes - Créer un nouveau CV
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createResumeSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { title, template } = validatedData.data

    const resume = await prisma.resume.create({
      data: {
        title,
        template,
        userId: session.user.id,
      },
    })

    return NextResponse.json(
      { success: true, data: resume },
      { status: 201 }
    )
  } catch (error) {
    console.error('[RESUMES_POST]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}