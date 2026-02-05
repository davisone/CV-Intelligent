import { Suspense } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ResumeList } from './resume-list'
import { WelcomeToast } from './welcome-toast'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      template: true,
      updatedAt: true,
    },
  })

  return (
    <div>
      <Suspense fallback={null}>
        <WelcomeToast />
      </Suspense>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#E5E5E5]">Dashboard</h1>
          <p className="text-[#A3A3A3] mt-1">
            Bienvenue, {session.user.name ?? session.user.email}
          </p>
        </div>
        <Link href="/dashboard/resumes/new">
          <Button>+ Nouveau CV</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#404040]">
          <p className="text-sm text-[#A3A3A3]">Total CV</p>
          <p className="text-3xl font-bold text-[#C9A227]">{resumes.length}</p>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#404040]">
          <p className="text-sm text-[#A3A3A3]">Ce mois</p>
          <p className="text-3xl font-bold text-[#C9A227]">
            {resumes.filter(r => {
              const now = new Date()
              const resumeDate = new Date(r.updatedAt)
              return resumeDate.getMonth() === now.getMonth() &&
                     resumeDate.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#404040]">
          <p className="text-sm text-[#A3A3A3]">Templates utilisés</p>
          <p className="text-3xl font-bold text-[#C9A227]">
            {new Set(resumes.map(r => r.template)).size}
          </p>
        </div>
      </div>

      {/* Recent Resumes */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-[#E5E5E5]">CV Récents</h2>
        {resumes.length === 0 ? (
          <div className="bg-[#1A1A1A] p-12 rounded-xl border border-[#404040] text-center">
            <p className="text-[#A3A3A3] mb-4">
              Vous n&apos;avez pas encore de CV
            </p>
            <Link href="/dashboard/templates">
              <Button>Créer mon premier CV</Button>
            </Link>
          </div>
        ) : (
          <ResumeList initialResumes={resumes} />
        )}
      </div>
    </div>
  )
}
