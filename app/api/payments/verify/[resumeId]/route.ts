import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { checkResumeAccess } from '@/lib/payments/feature-check'

interface RouteParams {
  params: Promise<{ resumeId: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { resumeId } = await params

    // Vérifier ownership
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId: session.user.id },
      select: {
        id: true,
        isPaid: true,
        paidAt: true,
        paymentStatus: true,
        template: true,
      },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
    }

    // Vérifier l'accès aux features
    const access = await checkResumeAccess(resumeId, session.user.id)

    return NextResponse.json({
      success: true,
      data: {
        resumeId: resume.id,
        isPaid: resume.isPaid,
        paidAt: resume.paidAt,
        paymentStatus: resume.paymentStatus,
        template: resume.template,
        canAccessPremiumFeatures: access.canAccess,
        accessReason: access.reason,
        requiresPayment: access.requiresPayment,
      },
    })
  } catch (error) {
    console.error('[PAYMENT_VERIFY_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    )
  }
}
