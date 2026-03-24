// app/api/resumes/[id]/share/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { randomBytes } from 'crypto'

interface RouteParams {
  params: Promise<{ id: string }>
}

function generateSlug(firstName: string, lastName: string): string {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const suffix = randomBytes(4).toString('hex')
  return `${base}-${suffix}`
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
      include: { personalInfo: true },
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const newIsPublic = !resume.isPublic

    // Générer un slug uniquement lors de la première activation
    let publicSlug = resume.publicSlug
    if (newIsPublic && !publicSlug) {
      const firstName = resume.personalInfo?.firstName ?? 'cv'
      const lastName = resume.personalInfo?.lastName ?? ''
      publicSlug = generateSlug(firstName, lastName)
    }

    const updated = await prisma.resume.update({
      where: { id },
      data: { isPublic: newIsPublic, publicSlug },
    })

    return NextResponse.json({
      success: true,
      data: { isPublic: updated.isPublic, publicSlug: updated.publicSlug },
    })
  } catch (error) {
    console.error('[RESUME_SHARE]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
