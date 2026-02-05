import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ResumesList } from './resumes-list'

export default async function ResumesPage() {
  const session = await getServerSession(authOptions)

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
          <h1 className="text-3xl font-bold text-[#1F1A17]">Mes CV</h1>
          <p className="text-[#6B6560] mt-1">
            {resumes.length} CV{resumes.length > 1 ? 's' : ''} créé{resumes.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <ResumesList initialResumes={resumes} />
    </div>
  )
}
