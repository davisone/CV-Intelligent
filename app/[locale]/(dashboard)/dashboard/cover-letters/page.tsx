import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { getTranslations } from 'next-intl/server'
import { CoverLettersList } from './cover-letters-list'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dashboard.coverLetters' })
  return { title: t('title') }
}

export default async function CoverLettersPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('dashboard.coverLetters')

  if (!session?.user?.id) return null

  const [coverLetters, resumes] = await Promise.all([
    prisma.coverLetter.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1F1A17]">{t('title')}</h1>
          <p className="text-[#6B6560] mt-1">
            {t('count', { count: coverLetters.length })}
          </p>
        </div>
      </div>
      <CoverLettersList initialCoverLetters={coverLetters} resumes={resumes} />
    </div>
  )
}
