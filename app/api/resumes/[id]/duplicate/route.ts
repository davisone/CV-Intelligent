import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/resumes/[id]/duplicate - Dupliquer un CV
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Récupérer le CV original avec toutes ses relations
    const originalResume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        personalInfo: true,
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        projects: true,
        interests: true,
      },
    })

    if (!originalResume) {
      return NextResponse.json(
        { error: 'CV non trouvé' },
        { status: 404 }
      )
    }

    // Créer la copie dans une transaction
    const duplicatedResume = await prisma.$transaction(async (tx) => {
      // Créer le nouveau CV
      const newResume = await tx.resume.create({
        data: {
          title: `${originalResume.title} (copie)`,
          template: originalResume.template,
          userId: session.user.id,
        },
      })

      // Dupliquer les infos personnelles
      if (originalResume.personalInfo) {
        const { id: _, resumeId: __, ...personalInfoData } = originalResume.personalInfo
        await tx.personalInfo.create({
          data: {
            ...personalInfoData,
            resumeId: newResume.id,
          },
        })
      }

      // Dupliquer les expériences
      if (originalResume.experiences.length > 0) {
        await tx.experience.createMany({
          data: originalResume.experiences.map(({ id: _, resumeId: __, ...exp }) => ({
            ...exp,
            resumeId: newResume.id,
          })),
        })
      }

      // Dupliquer les formations
      if (originalResume.educations.length > 0) {
        await tx.education.createMany({
          data: originalResume.educations.map(({ id: _, resumeId: __, ...edu }) => ({
            ...edu,
            resumeId: newResume.id,
          })),
        })
      }

      // Dupliquer les compétences
      if (originalResume.skills.length > 0) {
        await tx.skill.createMany({
          data: originalResume.skills.map(({ id: _, resumeId: __, ...skill }) => ({
            ...skill,
            resumeId: newResume.id,
          })),
        })
      }

      // Dupliquer les langues
      if (originalResume.languages.length > 0) {
        await tx.language.createMany({
          data: originalResume.languages.map(({ id: _, resumeId: __, ...lang }) => ({
            ...lang,
            resumeId: newResume.id,
          })),
        })
      }

      // Dupliquer les projets
      if (originalResume.projects.length > 0) {
        await tx.project.createMany({
          data: originalResume.projects.map(({ id: _, resumeId: __, ...project }) => ({
            ...project,
            resumeId: newResume.id,
          })),
        })
      }

      // Dupliquer les centres d'intérêt
      if (originalResume.interests.length > 0) {
        await tx.interest.createMany({
          data: originalResume.interests.map(({ id: _, resumeId: __, ...interest }) => ({
            ...interest,
            resumeId: newResume.id,
          })),
        })
      }

      return newResume
    })

    return NextResponse.json({
      success: true,
      data: duplicatedResume,
      message: 'CV dupliqué avec succès',
    })
  } catch (error) {
    console.error('[RESUME_DUPLICATE]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la duplication' },
      { status: 500 }
    )
  }
}