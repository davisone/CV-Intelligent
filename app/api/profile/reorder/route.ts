import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

// Mapping entre le type envoyé et le modèle Prisma
const modelMap = {
  experiences: 'userExperience',
  educations: 'userEducation',
  certifications: 'userCertification',
  skills: 'userSkill',
  languages: 'userLanguage',
  interests: 'userInterest',
} as const

type ReorderType = keyof typeof modelMap

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { type, items } = await request.json() as {
      type: ReorderType
      items: { id: string; order: number }[]
    }

    if (!modelMap[type]) {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    const model = modelMap[type]

    // Mise à jour de l'ordre pour chaque élément
    await Promise.all(
      items.map((item) =>
        (prisma[model] as any).update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur reorder:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
