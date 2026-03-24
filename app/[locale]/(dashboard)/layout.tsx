import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { getLatestChangelogSlug } from '@/lib/changelog'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { UpdateAnnouncementModal } from '@/components/ui/update-announcement-modal'
import { DashboardOnboardingTour } from '@/components/layout/dashboard-onboarding-tour'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const CURRENT_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '1.4.0'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${locale}/login`)
  }

  // Date de déploiement du tour d'onboarding — seuls les utilisateurs inscrits après cette date le voient
  const ONBOARDING_TOUR_CUTOFF = new Date('2026-03-24T00:00:00Z')

  const [user, latestSlug] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { lastSeenUpdateVersion: true, lastSeenChangelogSlug: true, createdAt: true },
    }),
    Promise.resolve(getLatestChangelogSlug()),
  ])

  const showUpdateModal = user?.lastSeenUpdateVersion !== CURRENT_VERSION
  const hasUnreadChangelog = !!latestSlug && user?.lastSeenChangelogSlug !== latestSlug
  const isNewUser = user?.createdAt ? user.createdAt >= ONBOARDING_TOUR_CUTOFF : false

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col">
      {isNewUser && <DashboardOnboardingTour />}
      <Header />
      <div className="flex flex-1">
        <Sidebar hasUnreadChangelog={hasUnreadChangelog} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Footer />
      {showUpdateModal && <UpdateAnnouncementModal version={CURRENT_VERSION} />}
    </div>
  )
}
