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

    // Récupérer le profil de l'utilisateur pour pré-remplir
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id },
    })
    const userExperiences = await prisma.userExperience.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })
    const userEducations = await prisma.userEducation.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })
    const userLanguages = await prisma.userLanguage.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    // Créer le CV avec les données pré-remplies
    const resume = await prisma.resume.create({
      data: {
        title,
        template,
        userId: session.user.id,
        // Pré-remplir les infos personnelles depuis le profil
        ...(userProfile && {
          personalInfo: {
            create: {
              firstName: userProfile.firstName || '',
              lastName: userProfile.lastName || '',
              email: session.user.email || '',
              phone: userProfile.phone,
              address: userProfile.address,
              city: userProfile.city,
              country: userProfile.country,
              zipCode: userProfile.zipCode,
              linkedin: userProfile.linkedin,
              github: userProfile.github,
              website: userProfile.website,
              summary: userProfile.summary,
              photoUrl: userProfile.photoUrl,
            },
          },
        }),
        // Pré-remplir les expériences
        ...(userExperiences.length > 0 && {
          experiences: {
            create: userExperiences.map((exp, index) => ({
              company: exp.company,
              position: exp.position,
              location: exp.location,
              startDate: exp.startDate,
              endDate: exp.endDate,
              current: exp.current,
              description: exp.description,
              order: index,
            })),
          },
        }),
        // Pré-remplir les formations
        ...(userEducations.length > 0 && {
          educations: {
            create: userEducations.map((edu, index) => ({
              institution: edu.institution,
              degree: edu.degree,
              field: edu.field,
              location: edu.location,
              startDate: edu.startDate,
              endDate: edu.endDate,
              current: edu.current,
              description: edu.description,
              gpa: edu.gpa,
              order: index,
            })),
          },
        }),
        // Pré-remplir les compétences
        ...(userSkills.length > 0 && {
          skills: {
            create: userSkills.map((skill, index) => ({
              name: skill.name,
              level: skill.level,
              category: skill.category,
              order: index,
            })),
          },
        }),
        // Pré-remplir les langues
        ...(userLanguages.length > 0 && {
          languages: {
            create: userLanguages.map((lang, index) => ({
              name: lang.name,
              level: lang.level,
              order: index,
            })),
          },
        }),
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