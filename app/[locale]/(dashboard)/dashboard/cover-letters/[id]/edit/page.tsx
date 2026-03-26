import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { CoverLetterEditor } from './cover-letter-editor'

interface PageProps {
  params: Promise<{ id: string; locale: string }>
  searchParams: Promise<{ ai_success?: string }>
}

export default async function CoverLetterEditPage({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  const { id } = await params
  const { ai_success } = await searchParams

  const [coverLetter, resumes] = await Promise.all([
    prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
      include: {
        resume: { select: { id: true, title: true, isPaid: true } },
      },
    }),
    prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, isPaid: true },
    }),
  ])

  if (!coverLetter) notFound()

  return (
    <CoverLetterEditor
      coverLetter={coverLetter}
      resumes={resumes}
      aiJustUnlocked={ai_success === '1'}
    />
  )
}
