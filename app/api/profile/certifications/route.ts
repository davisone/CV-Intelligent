import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()

    const certification = await prisma.userCertification.create({
      data: {
        userId: session.user.id,
        name: data.name,
        issuer: data.issuer,
        issueDate: new Date(data.issueDate),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        credentialId: data.credentialId,
        credentialUrl: data.credentialUrl,
        order: data.order || 0,
      },
    })

    return NextResponse.json({ certification })
  } catch (error) {
    console.error('[CERTIFICATION_POST_ERROR]:', error)
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

    await prisma.userCertification.updateMany({
      where: { id: data.id, userId: session.user.id },
      data: {
        name: data.name,
        issuer: data.issuer,
        issueDate: new Date(data.issueDate),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        credentialId: data.credentialId,
        credentialUrl: data.credentialUrl,
        order: data.order,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CERTIFICATION_PUT_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await prisma.userCertification.deleteMany({
      where: { id, userId: session.user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CERTIFICATION_DELETE_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
