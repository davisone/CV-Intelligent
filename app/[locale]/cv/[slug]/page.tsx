import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { templates, TemplateType } from '@/components/cv-templates'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { CvScaler } from './cv-scaler'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resume = await prisma.resume.findFirst({
    where: { publicSlug: slug, isPublic: true },
    include: { personalInfo: true },
  })
  if (!resume) return { title: 'CV introuvable' }

  const name = `${resume.personalInfo?.firstName ?? ''} ${resume.personalInfo?.lastName ?? ''}`.trim()
  return {
    title: `CV de ${name}`,
    robots: { index: false, follow: false },
  }
}

export default async function PublicCvPage({ params }: PageProps) {
  const { slug, locale } = await params

  const [session, resume] = await Promise.all([
    getServerSession(authOptions),
    prisma.resume.findFirst({
      where: { publicSlug: slug, isPublic: true },
      include: {
        personalInfo: true,
        experiences: { orderBy: { order: 'asc' } },
        educations: { orderBy: { order: 'asc' } },
        certifications: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
        interests: { orderBy: { order: 'asc' } },
      },
    }),
  ])

  if (!resume) notFound()

  const t = await getTranslations({ locale, namespace: 'publicCv' })

  // Vérifier si le lien a expiré
  const isExpired = resume.publicShareExpiresAt && new Date(resume.publicShareExpiresAt) < new Date()
  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#F3EDE5] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#722F37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-xl font-bold text-[#1F1A17] mb-2">{t('expiredTitle')}</h1>
          <p className="text-[#6B6560] text-sm">{t('expiredDescription')}</p>
        </div>
      </div>
    )
  }

  // Incrémenter le compteur sauf si le visiteur est le propriétaire
  let displayCount = resume.viewCount
  if (!session || session.user?.id !== resume.userId) {
    const updated = await prisma.resume.update({
      where: { id: resume.id },
      data: { viewCount: { increment: 1 } },
      select: { viewCount: true },
    })
    displayCount = updated.viewCount
  }

  const templateKey = (resume.template as TemplateType) || 'MODERN'
  const TemplateComponent = templates[templateKey] || templates.MODERN

  const cvData = {
    personalInfo: {
      firstName: resume.personalInfo?.firstName ?? '',
      lastName: resume.personalInfo?.lastName ?? '',
      email: resume.personalInfo?.email ?? '',
      phone: resume.personalInfo?.phone ?? '',
      city: resume.personalInfo?.city ?? '',
      country: resume.personalInfo?.country ?? '',
      linkedin: resume.personalInfo?.linkedin ?? '',
      linkedinLabel: resume.personalInfo?.linkedinLabel ?? '',
      github: resume.personalInfo?.github ?? '',
      githubLabel: resume.personalInfo?.githubLabel ?? '',
      portfolio: resume.personalInfo?.portfolio ?? '',
      portfolioLabel: resume.personalInfo?.portfolioLabel ?? '',
      summary: resume.personalInfo?.summary ?? '',
      photoUrl: resume.personalInfo?.photoUrl ?? '',
      drivingLicenses: resume.personalInfo?.drivingLicenses ?? '',
    },
    experiences: resume.experiences,
    educations: resume.educations,
    certifications: resume.certifications,
    projects: resume.projects,
    skills: resume.skills,
    languages: resume.languages,
    interests: resume.interests,
  }

  return (
    <div className="min-h-screen bg-[#F3EDE5] overflow-x-hidden">
      {/* Bannière CTA redesignée */}
      <div className="bg-gradient-to-r from-[#722F37] to-[#8B3A44] py-2.5 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-white/15 rounded px-2 py-0.5 shrink-0">
            <span className="text-white font-black text-xs tracking-wide">CV BUILDER</span>
          </div>
          <span className="text-white/75 text-xs hidden sm:block truncate">
            {t('bannerTagline')}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {displayCount > 0 && (
            <span className="text-white/60 text-xs hidden sm:block">
              • {displayCount} {t('bannerViews')}
            </span>
          )}
          <Link
            href="/signup"
            className="bg-white text-[#722F37] text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap hover:bg-white/90 transition-colors"
          >
            {t('bannerCta')}
          </Link>
        </div>
      </div>

      {/* CV centré avec scaling mobile */}
      <div className="py-6 flex justify-center">
        <CvScaler>
          <TemplateComponent data={cvData} locale={locale} />
        </CvScaler>
      </div>
    </div>
  )
}
