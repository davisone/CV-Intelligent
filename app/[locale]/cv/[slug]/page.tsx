import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { templates, TemplateType } from '@/components/cv-templates'
import { Link } from '@/i18n/navigation'
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

  const resume = await prisma.resume.findFirst({
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
  })

  if (!resume) notFound()

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
    <div className="min-h-screen bg-[#F3EDE5]">
      {/* Bannière CTA */}
      <div className="bg-[#722F37] text-white py-2 px-4 text-center text-sm">
        <span>CV créé avec </span>
        <Link href="/" className="font-semibold underline hover:text-white/80">
          CV Builder
        </Link>
        <span> — </span>
        <Link href="/signup" className="font-semibold underline hover:text-white/80">
          Créez le vôtre gratuitement
        </Link>
      </div>

      {/* CV centré */}
      <div className="py-8 px-4 flex justify-center">
        <div data-cv-container>
          <TemplateComponent data={cvData} locale={locale} />
        </div>
      </div>
    </div>
  )
}
