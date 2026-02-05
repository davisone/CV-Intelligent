import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ProfileForm } from './profile-form'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const [profile, experiences, educations, skills, languages, interests] = await Promise.all([
    prisma.userProfile.findUnique({
      where: { userId: session.user.id },
    }),
    prisma.userExperience.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    }),
    prisma.userEducation.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    }),
    prisma.userSkill.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    }),
    prisma.userLanguage.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    }),
    prisma.userInterest.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' },
    }),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F1A17]">Mon Profil</h1>
        <p className="text-[#6B6560] mt-1">
          Ces informations seront utilisées pour pré-remplir vos CV
        </p>
      </div>

      <ProfileForm
        initialProfile={profile}
        initialExperiences={experiences}
        initialEducations={educations}
        initialSkills={skills}
        initialLanguages={languages}
        initialInterests={interests}
      />
    </div>
  )
}
