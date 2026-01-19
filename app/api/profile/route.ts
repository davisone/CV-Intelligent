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

    const profile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id },
    })

    const experiences = await prisma.userExperience.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    const educations = await prisma.userEducation.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    const skills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    const languages = await prisma.userLanguage.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

    const projects = await prisma.userProject.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    })

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
        website: data.website,
        summary: data.summary,
        jobTitle: data.jobTitle,
        photoUrl: data.photoUrl,
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
        website: data.website,
        summary: data.summary,
        jobTitle: data.jobTitle,
        photoUrl: data.photoUrl,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[PROFILE_PUT_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
