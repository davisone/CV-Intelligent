import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { updateResumeSchema } from '@/lib/validations/resume.schema'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/resumes/[id] - Récupérer un CV avec toutes ses relations
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        personalInfo: true,
        experiences: { orderBy: { order: 'asc' } },
        educations: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
      },
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: resume })
  } catch (error) {
    console.error('[RESUME_GET]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/resumes/[id] - Mettre à jour un CV
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Vérifier ownership
    const existingResume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existingResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = updateResumeSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { title, template, personalInfo, experiences, educations, skills, languages, projects } = validatedData.data

    // Transaction pour mettre à jour toutes les relations
    const resume = await prisma.$transaction(async (tx) => {
      // Update resume base
      const updatedResume = await tx.resume.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(template && { template }),
        },
      })

      // Update personal info
      if (personalInfo) {
        await tx.personalInfo.upsert({
          where: { resumeId: id },
          create: { ...personalInfo, resumeId: id },
          update: personalInfo,
        })
      }

      // Update experiences (replace all)
      if (experiences) {
        await tx.experience.deleteMany({ where: { resumeId: id } })
        if (experiences.length > 0) {
          await tx.experience.createMany({
            data: experiences.map((exp, index) => ({
              ...exp,
              resumeId: id,
              order: exp.order ?? index,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate ? new Date(exp.endDate) : null,
            })),
          })
        }
      }

      // Update educations (replace all)
      if (educations) {
        await tx.education.deleteMany({ where: { resumeId: id } })
        if (educations.length > 0) {
          await tx.education.createMany({
            data: educations.map((edu, index) => ({
              ...edu,
              resumeId: id,
              order: edu.order ?? index,
              startDate: new Date(edu.startDate),
              endDate: edu.endDate ? new Date(edu.endDate) : null,
            })),
          })
        }
      }

      // Update skills (replace all)
      if (skills) {
        await tx.skill.deleteMany({ where: { resumeId: id } })
        if (skills.length > 0) {
          await tx.skill.createMany({
            data: skills.map((skill, index) => ({
              ...skill,
              resumeId: id,
              order: skill.order ?? index,
            })),
          })
        }
      }

      // Update languages (replace all)
      if (languages) {
        await tx.language.deleteMany({ where: { resumeId: id } })
        if (languages.length > 0) {
          await tx.language.createMany({
            data: languages.map((lang, index) => ({
              ...lang,
              resumeId: id,
              order: lang.order ?? index,
            })),
          })
        }
      }

      // Update projects (replace all)
      if (projects) {
        await tx.project.deleteMany({ where: { resumeId: id } })
        if (projects.length > 0) {
          await tx.project.createMany({
            data: projects.map((project, index) => ({
              ...project,
              resumeId: id,
              order: project.order ?? index,
            })),
          })
        }
      }

      return updatedResume
    })

    return NextResponse.json({ success: true, data: resume })
  } catch (error) {
    console.error('[RESUME_PATCH]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/resumes/[id] - Supprimer un CV
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Vérifier ownership
    const existingResume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existingResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    await prisma.resume.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Resume deleted' })
  } catch (error) {
    console.error('[RESUME_DELETE]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}