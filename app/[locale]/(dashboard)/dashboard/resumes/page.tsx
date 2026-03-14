import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { getTranslations } from 'next-intl/server'
import { ResumesList } from './resumes-list'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dashboard.resumes' })
  return { title: t('title') }
}

export default async function ResumesPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('dashboard.resumes')

  if (!session?.user?.id) {
    return null
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      personalInfo: true,
      _count: {
        select: {
          experiences: true,
          educations: true,
          skills: true,
          languages: true,
          interests: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1F1A17]">{t('title')}</h1>
          <p className="text-[#6B6560] mt-1">
            {t('count', { count: resumes.length })}
          </p>
        </div>
      </div>

      <ResumesList initialResumes={resumes} />
    </div>
  )
}
