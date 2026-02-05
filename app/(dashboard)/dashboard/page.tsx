import { Suspense } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ResumeList } from './resume-list'
import { WelcomeToast } from './welcome-toast'
import { Plus, FileText, Sparkles, TrendingUp, Clock } from 'lucide-react'

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
      isPaid: true,
    },
  })

  const thisMonth = resumes.filter(r => {
    const now = new Date()
    const resumeDate = new Date(r.updatedAt)
    return resumeDate.getMonth() === now.getMonth() &&
           resumeDate.getFullYear() === now.getFullYear()
  }).length

  const templatesUsed = new Set(resumes.map(r => r.template)).size
  const latestResume = resumes[0]

  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={null}>
        <WelcomeToast />
      </Suspense>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E5E5E5]">
          Bonjour, {session.user.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-[#A3A3A3] mt-1">
          Gérez vos CV et créez-en de nouveaux
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Create New - Large */}
        <Link
          href="/dashboard/resumes/new"
          className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#C9A227] to-[#A68620] p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#0D0D0D] mb-2">Créer un nouveau CV</h3>
              <p className="text-[#0D0D0D]/70">Commencez avec nos templates professionnels</p>
            </div>
            <div className="w-16 h-16 bg-[#0D0D0D]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0D0D0D]/20 transition-colors">
              <Plus className="w-8 h-8 text-[#0D0D0D]" />
            </div>
          </div>
        </Link>

        {/* Total CVs */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#404040] hover:border-[#C9A227]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#C9A227]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#E5E5E5] mb-1">{resumes.length}</p>
          <p className="text-sm text-[#A3A3A3]">CV créés</p>
        </div>

        {/* This Month */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#404040] hover:border-[#C9A227]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#C9A227]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#E5E5E5] mb-1">{thisMonth}</p>
          <p className="text-sm text-[#A3A3A3]">Ce mois-ci</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#404040]">
          <h3 className="text-sm font-medium text-[#A3A3A3] mb-4">Actions rapides</h3>
          <div className="space-y-2">
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2D2D2D] transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span className="text-sm text-[#E5E5E5] group-hover:text-[#C9A227] transition-colors">Voir templates</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2D2D2D] transition-colors group"
            >
              <FileText className="w-4 h-4 text-[#C9A227]" />
              <span className="text-sm text-[#E5E5E5] group-hover:text-[#C9A227] transition-colors">Mon profil</span>
            </Link>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="md:col-span-2 lg:col-span-2 bg-[#1A1A1A] p-6 rounded-2xl border border-[#404040]">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#C9A227]" />
            <h3 className="text-sm font-medium text-[#A3A3A3]">Dernière activité</h3>
          </div>
          {latestResume ? (
            <Link
              href={`/dashboard/resumes/${latestResume.id}/edit`}
              className="block p-4 rounded-xl bg-[#0D0D0D] hover:bg-[#2D2D2D] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#E5E5E5] group-hover:text-[#C9A227] transition-colors">
                    {latestResume.title}
                  </p>
                  <p className="text-sm text-[#A3A3A3] mt-1">
                    Modifié {formatRelativeDate(latestResume.updatedAt)}
                  </p>
                </div>
                <span className="text-xs bg-[#C9A227]/10 text-[#C9A227] px-3 py-1 rounded-full border border-[#C9A227]/20">
                  {latestResume.template}
                </span>
              </div>
            </Link>
          ) : (
            <p className="text-[#A3A3A3] text-sm">Aucune activité récente</p>
          )}
        </div>

        {/* Templates Used */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#404040] hover:border-[#C9A227]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#E5E5E5] mb-1">{templatesUsed}</p>
          <p className="text-sm text-[#A3A3A3]">Templates utilisés</p>
        </div>

      </div>

      {/* CV List */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-[#404040] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#E5E5E5]">Mes CV</h2>
          <Link
            href="/dashboard/resumes"
            className="text-sm text-[#C9A227] hover:text-[#D4B44A] transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[#C9A227]" />
            </div>
            <p className="text-[#A3A3A3] mb-4">
              Vous n&apos;avez pas encore de CV
            </p>
            <Link
              href="/dashboard/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-black font-bold rounded-xl hover:bg-[#D4B44A] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer mon premier CV
            </Link>
          </div>
        ) : (
          <ResumeList initialResumes={resumes.slice(0, 6)} />
        )}
      </div>
    </div>
  )
}

function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "à l'instant"
  if (minutes < 60) return `il y a ${minutes}min`
  if (hours < 24) return `il y a ${hours}h`
  if (days < 7) return `il y a ${days}j`

  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}
