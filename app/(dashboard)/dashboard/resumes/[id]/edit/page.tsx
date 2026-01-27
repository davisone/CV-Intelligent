import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { checkResumeAccess } from '@/lib/payments/feature-check'
import { ResumeEditor } from './resume-editor'
import { PaymentWall } from './payment-wall'

interface EditResumePageProps {
  params: Promise<{ id: string }>
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (!session?.user?.id) {
    return null
  }

  // Vérifier l'accès aux features premium AVANT de charger les données
  const access = await checkResumeAccess(id, session.user.id)

  // Si paiement requis, ne charger que les infos de base
  if (access.requiresPayment && !access.canAccess) {
    const basicResume = await prisma.resume.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        template: true,
        isPaid: true,
        paymentStatus: true,
      },
    })

    if (!basicResume) {
      notFound()
    }

    return <PaymentWall resume={basicResume} />
  }

  // Accès autorisé - charger les données complètes
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
      interests: { orderBy: { order: 'asc' } },
    },
  })

  if (!resume) {
    notFound()
  }

  return (
    <ResumeEditor
      resume={resume}
      canAccessPremiumFeatures={access.canAccess}
      requiresPayment={access.requiresPayment}
    />
  )
}
