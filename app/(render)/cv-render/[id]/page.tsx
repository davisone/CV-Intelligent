import { notFound } from 'next/navigation'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { templates, TemplateType } from '@/components/cv-templates'
import { AutoFitPage } from '@/components/cv-templates/auto-fit-page'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; ts?: string }>
}

// Vérifie le token HMAC pour protéger la page de rendu interne
function verifyToken(resumeId: string, token: string, timestamp: string): boolean {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return false

  const ts = parseInt(timestamp, 10)
  if (isNaN(ts) || Date.now() - ts > 30_000) return false

  const expected = createHmac('sha256', secret)
    .update(`${resumeId}:${timestamp}`)
    .digest('hex')

  return token === expected
}

function buildCvData(resume: Record<string, unknown>) {
  const personalInfo = resume.personalInfo as Record<string, unknown> | null

  return {
    personalInfo: {
      firstName: (personalInfo?.firstName as string) ?? '',
      lastName: (personalInfo?.lastName as string) ?? '',
      email: (personalInfo?.email as string) ?? '',
      phone: (personalInfo?.phone as string) ?? '',
      city: (personalInfo?.city as string) ?? '',
      country: (personalInfo?.country as string) ?? '',
      linkedin: (personalInfo?.linkedin as string) ?? '',
      linkedinLabel: (personalInfo?.linkedinLabel as string) ?? '',
      github: (personalInfo?.github as string) ?? '',
      githubLabel: (personalInfo?.githubLabel as string) ?? '',
      summary: (personalInfo?.summary as string) ?? '',
      photoUrl: (personalInfo?.photoUrl as string) ?? '',
      drivingLicenses: (personalInfo?.drivingLicenses as string) ?? '',
    },
    experiences: (resume.experiences as unknown[]) ?? [],
    educations: (resume.educations as unknown[]) ?? [],
    certifications: (resume.certifications as unknown[]) ?? [],
    projects: (resume.projects as unknown[]) ?? [],
    skills: (resume.skills as unknown[]) ?? [],
    languages: (resume.languages as unknown[]) ?? [],
    interests: (resume.interests as unknown[]) ?? [],
  }
}

export default async function CvRenderPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { token, ts } = await searchParams

  if (!token || !ts || !verifyToken(id, token, ts)) {
    notFound()
  }

  const resume = await prisma.resume.findUnique({
    where: { id },
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
  const cvData = buildCvData(resume as unknown as Record<string, unknown>)

  return (
    <AutoFitPage>
      <TemplateComponent data={cvData} />
    </AutoFitPage>
  )
}
