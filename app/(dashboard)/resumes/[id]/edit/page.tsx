import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ResumeEditor } from './resume-editor'

interface EditResumePageProps {
  params: Promise<{ id: string }>
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (!session?.user?.id) {
    return null
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
      interests: { orderBy: { order: 'asc' } },
    },
  })

  if (!resume) {
    notFound()
  }

  return <ResumeEditor resume={resume} />
}