'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModernTemplate } from '@/components/cv-templates/modern-template'

interface ResumeEditorProps {
  resume: any
}

export function ResumeEditor({ resume }: ResumeEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [title, setTitle] = useState(resume.title)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: resume.personalInfo?.firstName ?? '',
    lastName: resume.personalInfo?.lastName ?? '',
    email: resume.personalInfo?.email ?? '',
    phone: resume.personalInfo?.phone ?? '',
    city: resume.personalInfo?.city ?? '',
    country: resume.personalInfo?.country ?? '',
    linkedin: resume.personalInfo?.linkedin ?? '',
    github: resume.personalInfo?.github ?? '',
    summary: resume.personalInfo?.summary ?? '',
    photoUrl: resume.personalInfo?.photoUrl ?? '',
  })
  const [experiences] = useState<any[]>(resume.experiences || [])
  const [educations] = useState<any[]>(resume.educations || [])
  const [skills] = useState<any[]>(resume.skills || [])
  const [languages] = useState<any[]>(resume.languages || [])

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/resumes/${resume.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          personalInfo: {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            email: personalInfo.email,
            phone: personalInfo.phone || undefined,
            city: personalInfo.city || undefined,
            country: personalInfo.country || undefined,
            linkedin: personalInfo.linkedin || undefined,
            github: personalInfo.github || undefined,
            summary: personalInfo.summary || undefined,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      toast.success('CV sauvegardé !')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncProfile = async () => {
    if (!confirm('Cela va remplacer toutes les données du CV par celles de votre profil. Continuer ?')) {
      return
    }

    setIsSyncing(true)
    try {
      const res = await fetch(`/api/resumes/${resume.id}/sync-profile`, {
        method: 'POST',
      })

      if (res.ok) {
        toast.success('Données importées depuis le profil !')
        router.refresh()
        window.location.reload()
      } else {
        toast.error('Erreur lors de l\'importation')
      }
    } catch {
      toast.error('Erreur serveur')
    } finally {
      setIsSyncing(false)
    }
  }

  const cvData = {
    personalInfo,
    experiences,
    educations,
    skills,
    languages,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm">Template: {resume.template}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/resumes')}>
            Retour
          </Button>
          <Button variant="outline" onClick={handleSyncProfile} disabled={isSyncing}>
            {isSyncing ? '...' : '📥 Importer du profil'}
          </Button>
          <Button onClick={handleSave} isLoading={isLoading}>
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 font-medium ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Éditer
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Aperçu
        </button>
      </div>

      {activeTab === 'edit' ? (
        <div className="space-y-6">
          {/* Titre */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Titre du CV</h2>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du CV"
            />
          </section>

          {/* Informations personnelles */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prénom</Label>
                <Input
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  placeholder="Jean"
                />
              </div>
              <div>
                <Label>Nom</Label>
                <Input
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  placeholder="Dupont"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="jean@exemple.com"
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <div>
                <Label>Ville</Label>
                <Input
                  value={personalInfo.city}
                  onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                  placeholder="Paris"
                />
              </div>
              <div>
                <Label>Pays</Label>
                <Input
                  value={personalInfo.country}
                  onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                  placeholder="France"
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/..."
                />
              </div>
              <div>
                <Label>GitHub</Label>
                <Input
                  value={personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  placeholder="github.com/..."
                />
              </div>
              <div className="col-span-2">
                <Label>Résumé professionnel</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-lg text-gray-900"
                  value={personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  placeholder="Décrivez votre profil..."
                />
              </div>
            </div>
          </section>

          {/* Expériences */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Expériences ({experiences.length})
            </h2>
            {experiences.length > 0 ? (
              <div className="space-y-2">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune expérience (ajoutez-les dans votre profil)</p>
            )}
          </section>

          {/* Formations */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Formations ({educations.length})
            </h2>
            {educations.length > 0 ? (
              <div className="space-y-2">
                {educations.map((edu) => (
                  <div key={edu.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune formation (ajoutez-les dans votre profil)</p>
            )}
          </section>

          {/* Compétences */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Compétences ({skills.length})
            </h2>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune compétence (ajoutez-les dans votre profil)</p>
            )}
          </section>

          {/* Langues */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Langues ({languages.length})
            </h2>
            {languages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {lang.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune langue (ajoutez-les dans votre profil)</p>
            )}
          </section>
        </div>
      ) : (
        /* Preview */
        <div className="bg-gray-100 p-8 rounded-xl">
          <div className="mb-4 flex justify-end">
            <Button variant="outline" onClick={() => window.print()}>
              Imprimer / PDF
            </Button>
          </div>
          <ModernTemplate data={cvData} />
        </div>
      )}
    </div>
  )
}
