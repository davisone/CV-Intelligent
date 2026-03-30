import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const [profile, experiences, educations, skills, languages, projects] = await Promise.all([
      prisma.userProfile.findUnique({ where: { userId: session.user.id } }),
      prisma.userExperience.findMany({ where: { userId: session.user.id }, orderBy: { order: 'asc' } }),
      prisma.userEducation.findMany({ where: { userId: session.user.id }, orderBy: { order: 'asc' } }),
      prisma.userSkill.findMany({ where: { userId: session.user.id }, orderBy: { order: 'asc' } }),
      prisma.userLanguage.findMany({ where: { userId: session.user.id }, orderBy: { order: 'asc' } }),
      prisma.userProject.findMany({ where: { userId: session.user.id }, orderBy: { order: 'asc' } }),
    ])

    return NextResponse.json({
      profile,
      experiences,
      educations,
      skills,
      languages,
      projects,
    })
  } catch (error) {
    console.error('[PROFILE_GET_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()

    // Update or create profile
    const profile = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        linkedin: data.linkedin,
        github: data.github,
        portfolio: data.portfolio,
        portfolioLabel: data.portfolioLabel,
        website: data.website,
        summary: data.summary,
        jobTitle: data.jobTitle,
        photoUrl: data.photoUrl,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        drivingLicenses: data.drivingLicenses || null,
      },
      create: {
        userId: session.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        linkedin: data.linkedin,
        github: data.github,
        portfolio: data.portfolio,
        portfolioLabel: data.portfolioLabel,
        website: data.website,
        summary: data.summary,
        jobTitle: data.jobTitle,
        photoUrl: data.photoUrl,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        drivingLicenses: data.drivingLicenses || null,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[PROFILE_PUT_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
