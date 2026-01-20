import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Vérifier que le CV appartient à l'utilisateur
    const resume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV non trouvé' }, { status: 404 })
    }

    // Récupérer les données du profil
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
    const userInterests = await prisma.userInterest.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    // Supprimer les anciennes données du CV
    await prisma.personalInfo.deleteMany({ where: { resumeId: id } })
    await prisma.experience.deleteMany({ where: { resumeId: id } })
    await prisma.education.deleteMany({ where: { resumeId: id } })
    await prisma.skill.deleteMany({ where: { resumeId: id } })
    await prisma.language.deleteMany({ where: { resumeId: id } })
    await prisma.interest.deleteMany({ where: { resumeId: id } })

    // Créer les nouvelles données depuis le profil
    if (userProfile) {
      await prisma.personalInfo.create({
        data: {
          resumeId: id,
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
      })
    }

    if (userExperiences.length > 0) {
      await prisma.experience.createMany({
        data: userExperiences.map((exp, index) => ({
          resumeId: id,
          company: exp.company,
          position: exp.position,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
          order: index,
        })),
      })
    }

    if (userEducations.length > 0) {
      await prisma.education.createMany({
        data: userEducations.map((edu, index) => ({
          resumeId: id,
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
      })
    }

    if (userSkills.length > 0) {
      await prisma.skill.createMany({
        data: userSkills.map((skill, index) => ({
          resumeId: id,
          name: skill.name,
          level: skill.level,
          category: skill.category,
          order: index,
        })),
      })
    }

    if (userLanguages.length > 0) {
      await prisma.language.createMany({
        data: userLanguages.map((lang, index) => ({
          resumeId: id,
          name: lang.name,
          level: lang.level,
          order: index,
        })),
      })
    }

    if (userInterests.length > 0) {
      await prisma.interest.createMany({
        data: userInterests.map((interest, index) => ({
          resumeId: id,
          name: interest.name,
          order: index,
        })),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[SYNC_PROFILE_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
