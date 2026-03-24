import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { getTranslations } from 'next-intl/server'
import { ResumeList } from './resume-list'
import { WelcomeToast } from './welcome-toast'
import { OnboardingTour } from '@/components/ui/onboarding-tour'
import { EmptyState } from '@/components/ui/empty-state'
import { ReviewReminder } from '@/components/review-prompt'
import { Plus, FileText, Sparkles, TrendingUp, Clock, Eye } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dashboard.layout' })
  return { title: t('backToDashboard') }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('dashboard.home')

  if (!session?.user?.id) {
    return null
  }

  const ONBOARDING_CUTOFF = new Date('2026-03-24T00:00:00Z')

  const [resumes, viewStats, user] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        template: true,
        updatedAt: true,
        isPaid: true,
      },
    }),
    prisma.resume.aggregate({
      where: { userId: session.user.id, isPublic: true },
      _sum: { viewCount: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true },
    }),
  ])

  const isNewUser = user?.createdAt ? user.createdAt >= ONBOARDING_CUTOFF : false

  const totalViews = viewStats._sum.viewCount ?? 0

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
      {isNewUser && (
        <OnboardingTour
          storageKey="tour_v2_dashboard"
          steps={[
            {
              id: 'onboarding-create-cv',
              title: '👋 Bienvenue !',
              description: 'Cliquez ici pour créer votre premier CV avec l\'un de nos templates professionnels.',
              side: 'bottom',
            },
            {
              id: 'onboarding-templates',
              title: 'Choisir un template',
              description: 'Parcourez nos 5 templates : Moderne, Classique, ATS, Minimaliste et Créatif.',
              side: 'bottom',
            },
            {
              id: 'onboarding-profile',
              title: 'Votre profil maître',
              description: 'Renseignez vos informations une seule fois — elles pré-rempliront automatiquement tous vos futurs CVs.',
              side: 'right',
            },
            {
              id: 'onboarding-my-resumes',
              title: 'Vos CVs',
              description: 'Accédez à vos CVs, dupliquez-les, renommez-les et partagez-les avec les recruteurs.',
              side: 'right',
            },
            {
              id: 'onboarding-whats-new',
              title: 'Nouveautés',
              description: 'Retrouvez les dernières mises à jour ici. Un badge vous avertira à chaque nouvelle version.',
              side: 'right',
            },
          ]}
        />
      )}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1F1A17]">
          {t('welcome', { name: session.user.name?.split(' ')[0] ?? 'there' })}
        </h1>
        <p className="text-[#6B6560] mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Create New - Large */}
        <Link
          id="onboarding-create-cv"
          href="/dashboard/resumes/new"
          className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#722F37] to-[#5A252C] p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#FBF8F4] mb-2">{t('createNew')}</h3>
              <p className="text-[#FBF8F4]/70">{t('createNewSubtitle')}</p>
            </div>
            <div className="w-16 h-16 bg-[#FBF8F4]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FBF8F4]/20 transition-colors">
              <Plus className="w-8 h-8 text-[#FBF8F4]" />
            </div>
          </div>
        </Link>

        {/* Total CVs */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#722F37]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#1F1A17] mb-1">{resumes.length}</p>
          <p className="text-sm text-[#6B6560]">{t('totalResumes')}</p>
        </div>

        {/* This Month */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#722F37]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#1F1A17] mb-1">{thisMonth}</p>
          <p className="text-sm text-[#6B6560]">{t('thisMonth')}</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8]">
          <h3 className="text-sm font-medium text-[#6B6560] mb-4">{t('quickActions')}</h3>
          <div className="space-y-2">
            <Link
              id="onboarding-templates"
              href="/dashboard/templates"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#FBF8F4] hover:bg-[#E8E0D5] transition-colors group"
            >
              <Sparkles className="w-4 h-4 text-[#722F37]" />
              <span className="text-sm text-[#1F1A17] group-hover:text-[#722F37] transition-colors">{t('viewTemplates')}</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#FBF8F4] hover:bg-[#E8E0D5] transition-colors group"
            >
              <FileText className="w-4 h-4 text-[#722F37]" />
              <span className="text-sm text-[#1F1A17] group-hover:text-[#722F37] transition-colors">{t('myProfile')}</span>
            </Link>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="md:col-span-2 lg:col-span-2 bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8]">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#722F37]" />
            <h3 className="text-sm font-medium text-[#6B6560]">{t('latestActivity')}</h3>
          </div>
          {latestResume ? (
            <Link
              href={`/dashboard/resumes/${latestResume.id}/edit`}
              className="block p-4 rounded-xl bg-[#FBF8F4] hover:bg-[#E8E0D5] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1F1A17] group-hover:text-[#722F37] transition-colors">
                    {latestResume.title}
                  </p>
                  <p className="text-sm text-[#6B6560] mt-1">
                    {t('modifiedAt', { date: formatRelativeDate(latestResume.updatedAt, t) })}
                  </p>
                </div>
                <span className="text-xs bg-[#722F37]/10 text-[#722F37] px-3 py-1 rounded-full border border-[#722F37]/20">
                  {latestResume.template}
                </span>
              </div>
            </Link>
          ) : (
            <p className="text-[#6B6560] text-sm">{t('noActivity')}</p>
          )}
        </div>

        {/* Templates Used */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#722F37]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#1F1A17] mb-1">{templatesUsed}</p>
          <p className="text-sm text-[#6B6560]">{t('templatesUsed')}</p>
        </div>

        {/* Total Views */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#722F37]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#1F1A17] mb-1">{totalViews}</p>
          <p className="text-sm text-[#6B6560]">{t('totalViews')}</p>
        </div>

        {/* Encart avis Google */}
        <Suspense fallback={null}>
          <ReviewReminder />
        </Suspense>

      </div>

      {/* CV List */}
      <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#1F1A17]">{t('myResumes')}</h2>
          <Link
            href="/dashboard/resumes"
            className="text-sm text-[#722F37] hover:text-[#8B3A44] transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>

        {resumes.length === 0 ? (
          <EmptyState />
        ) : (
          <ResumeList initialResumes={resumes.slice(0, 6)} />
        )}
      </div>
    </div>
  )
}

function formatRelativeDate(date: Date, t: (key: string, values?: Record<string, string | number>) => string): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return t('justNow')
  if (minutes < 60) return t('minutesAgo', { count: minutes })
  if (hours < 24) return t('hoursAgo', { count: hours })
  if (days < 7) return t('daysAgo', { count: days })

  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}
