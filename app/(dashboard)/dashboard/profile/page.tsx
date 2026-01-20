import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { ProfileForm } from './profile-form'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  })

  const experiences = await prisma.userExperience.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' },
  })

  const educations = await prisma.userEducation.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' },
  })

  const skills = await prisma.userSkill.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' },
  })

  const languages = await prisma.userLanguage.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' },
  })

  const interests = await prisma.userInterest.findMany({
    where: { userId: session.user.id },
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-500 mt-1">
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
