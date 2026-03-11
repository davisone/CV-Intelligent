'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useAutoSave } from '@/hooks/useAutoSave'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SortableList, DragHandle, DragHandleProps } from '@/components/ui/sortable-list'
import { cn } from '@/lib/utils/helpers'

// Helper pour formater les dates
const formatDate = (date: Date | string | null | undefined, format: 'input' | 'display' = 'display') => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (format === 'input') {
    return d.toISOString().slice(0, 10)
  }
  return d.toISOString().slice(0, 7)
}

interface ProfileFormProps {
  initialProfile: any
  initialExperiences: any[]
  initialEducations: any[]
  initialCertifications: any[]
  initialProjects: any[]
  initialSkills: any[]
  initialLanguages: any[]
  initialInterests: any[]
}

export function ProfileForm({
  initialProfile,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialProjects,
  initialSkills,
  initialLanguages,
  initialInterests,
}: ProfileFormProps) {
  const t = useTranslations('dashboard.profile')
  const [isUploading, setIsUploading] = useState(false)
  const [profile, setProfile] = useState({
    firstName: initialProfile?.firstName || '',
    lastName: initialProfile?.lastName || '',
    phone: initialProfile?.phone || '',
    jobTitle: initialProfile?.jobTitle || '',
    address: initialProfile?.address || '',
    city: initialProfile?.city || '',
    country: initialProfile?.country || '',
    zipCode: initialProfile?.zipCode || '',
    linkedin: initialProfile?.linkedin || '',
    github: initialProfile?.github || '',
    portfolio: initialProfile?.portfolio || '',
    website: initialProfile?.website || '',
    summary: initialProfile?.summary || '',
    photoUrl: initialProfile?.photoUrl || '',
    birthDate: initialProfile?.birthDate ? formatDate(initialProfile.birthDate, 'input') : '',
    drivingLicenses: initialProfile?.drivingLicenses || '',
  })

  const [experiences, setExperiences] = useState(initialExperiences)
  const [educations, setEducations] = useState(initialEducations)
  const [certifications, setCertifications] = useState(initialCertifications)
  const [projects, setProjects] = useState(initialProjects)
  const [skills, setSkills] = useState(initialSkills)
  const [languages, setLanguages] = useState(initialLanguages)
  const [interests, setInterests] = useState(initialInterests)

  // Sauvegarde l'ordre des éléments après un drag & drop
  const saveOrder = async (type: string, items: { id: string }[]) => {
    await fetch('/api/profile/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        items: items.map((item, index) => ({ id: item.id, order: index })),
      }),
    })
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('photo', file)

      const res = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setProfile(prev => ({ ...prev, photoUrl: data.photoUrl }))
        toast.success(t('photoSaved'))
      } else {
        toast.error(data.error || t('photoUploadError'))
      }
    } catch {
      toast.error(t('serverError'))
    } finally {
      setIsUploading(false)
    }
  }

  const onSaveProfile = useCallback(async (data: typeof profile) => {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erreur sauvegarde')
  }, [])

  const { isSaving, hasUnsavedChanges } = useAutoSave({
    data: profile,
    onSave: onSaveProfile,
    delay: 1500,
  })

  const addExperience = async () => {
    const res = await fetch('/api/profile/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: '',
        position: '',
        startDate: new Date().toISOString(),
        current: true,
      }),
    })
    if (res.ok) {
      const { experience } = await res.json()
      setExperiences(prev => [...prev, experience])
    }
  }

  const updateExperience = async (id: string, data: any) => {
    await fetch('/api/profile/experiences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    })
  }

  const deleteExperience = async (id: string) => {
    await fetch(`/api/profile/experiences?id=${id}`, { method: 'DELETE' })
    setExperiences(prev => prev.filter(e => e.id !== id))
    toast.success(t('experienceDeleted'))
  }

  const addEducation = async () => {
    const res = await fetch('/api/profile/educations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        institution: '',
        degree: '',
        startDate: new Date().toISOString(),
        current: true,
      }),
    })
    if (res.ok) {
      const { education } = await res.json()
      setEducations(prev => [...prev, education])
    }
  }

  const deleteEducation = async (id: string) => {
    await fetch(`/api/profile/educations?id=${id}`, { method: 'DELETE' })
    setEducations(prev => prev.filter(e => e.id !== id))
    toast.success(t('educationDeleted'))
  }

  const addCertification = async () => {
    const res = await fetch('/api/profile/certifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        issuer: '',
        issueDate: new Date().toISOString(),
      }),
    })
    if (res.ok) {
      const { certification } = await res.json()
      setCertifications(prev => [...prev, certification])
    }
  }

  const deleteCertification = async (id: string) => {
    await fetch(`/api/profile/certifications?id=${id}`, { method: 'DELETE' })
    setCertifications(prev => prev.filter(c => c.id !== id))
    toast.success(t('certificationDeleted'))
  }

  const addSkill = async (category?: string) => {
    const res = await fetch('/api/profile/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', category: category || null }),
    })
    if (res.ok) {
      const { skill } = await res.json()
      setSkills(prev => [...prev, skill])
    }
  }

  const deleteSkill = async (id: string) => {
    await fetch(`/api/profile/skills?id=${id}`, { method: 'DELETE' })
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const addLanguage = async () => {
    const res = await fetch('/api/profile/languages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    if (res.ok) {
      const { language } = await res.json()
      setLanguages(prev => [...prev, language])
    }
  }

  const deleteLanguage = async (id: string) => {
    await fetch(`/api/profile/languages?id=${id}`, { method: 'DELETE' })
    setLanguages(prev => prev.filter(l => l.id !== id))
  }

  const addInterest = async () => {
    const res = await fetch('/api/profile/interests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    if (res.ok) {
      const { interest } = await res.json()
      setInterests(prev => [...prev, interest])
    }
  }

  const deleteInterest = async (id: string) => {
    await fetch(`/api/profile/interests?id=${id}`, { method: 'DELETE' })
    setInterests(prev => prev.filter(i => i.id !== id))
  }

  const addProject = async () => {
    const res = await fetch('/api/profile/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    if (res.ok) {
      const { project } = await res.json()
      setProjects(prev => [...prev, project])
    }
  }

  const updateProject = async (id: string, data: Record<string, unknown>) => {
    await fetch('/api/profile/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    })
  }

  const deleteProject = async (id: string) => {
    await fetch(`/api/profile/projects?id=${id}`, { method: 'DELETE' })
    setProjects(prev => prev.filter(p => p.id !== id))
    toast.success(t('projectDeleted'))
  }

  return (
    <div className="space-y-8">
      {/* Indicateur de sauvegarde sticky */}
      <div className="sticky top-16 z-30 -mx-6 px-6 -mt-2 pb-2 pt-2 bg-[#FBF8F4]">
        <div className={cn(
          'flex items-center gap-2 text-sm transition-opacity duration-300',
          isSaving ? 'text-gray-500' : hasUnsavedChanges ? 'text-amber-600' : 'text-green-600'
        )}>
          {isSaving ? (
            <>
              <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              {t('savingInProgress')}
            </>
          ) : hasUnsavedChanges ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {t('unsavedChanges')}
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t('saved')}
            </>
          )}
        </div>
      </div>

      {/* Photo de profil */}
      <section className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profilePhoto')}</h2>
        <div className="flex items-start gap-6">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={t('profilePhoto')}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <div className="flex-1 space-y-4">
            {/* Upload depuis PC */}
            <div>
              <Label>{t('importFromComputer')}</Label>
              <div className="mt-1 flex items-center gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    {isUploading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('uploading')}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t('choosePhoto')}
                      </>
                    )}
                  </span>
                </label>
                <span className="text-xs text-gray-500">{t('photoFormat')}</span>
              </div>
            </div>

            {/* Ou URL */}
            <div>
              <Label htmlFor="photoUrl">{t('orPasteUrl')}</Label>
              <Input
                id="photoUrl"
                name="photoUrl"
                value={profile.photoUrl}
                onChange={handleProfileChange}
                placeholder="https://exemple.com/ma-photo.jpg"
              />
            </div>

            {/* Supprimer */}
            {profile.photoUrl && (
              <button
                type="button"
                onClick={() => setProfile(prev => ({ ...prev, photoUrl: '' }))}
                className="text-sm text-red-600 hover:text-red-700"
              >
                {t('deletePhoto')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Informations personnelles */}
      <section className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('personalInfo')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">{t('firstName')}</Label>
            <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="lastName">{t('lastName')}</Label>
            <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="jobTitle">{t('jobTitle')}</Label>
            <Input id="jobTitle" name="jobTitle" value={profile.jobTitle} onChange={handleProfileChange} placeholder={t('jobTitlePlaceholder')} />
          </div>
          <div>
            <Label htmlFor="birthDate">{t('birthDate')}</Label>
            <Input id="birthDate" name="birthDate" type="date" value={profile.birthDate} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="drivingLicenses">{t('drivingLicenses')}</Label>
            <Input id="drivingLicenses" name="drivingLicenses" value={profile.drivingLicenses} onChange={handleProfileChange} placeholder={t('drivingLicensesPlaceholder')} />
          </div>
          <div>
            <Label htmlFor="city">{t('city')}</Label>
            <Input id="city" name="city" value={profile.city} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="country">{t('country')}</Label>
            <Input id="country" name="country" value={profile.country} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="linkedin">{t('linkedin')}</Label>
            <Input id="linkedin" name="linkedin" value={profile.linkedin} onChange={handleProfileChange} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <Label htmlFor="github">{t('github')}</Label>
            <Input id="github" name="github" value={profile.github} onChange={handleProfileChange} placeholder="https://github.com/..." />
          </div>
          <div className="col-span-2">
            <Label htmlFor="portfolio">{t('portfolio')}</Label>
            <Input id="portfolio" name="portfolio" value={profile.portfolio} onChange={handleProfileChange} placeholder="https://monportfolio.fr" />
          </div>
          <div className="col-span-2">
            <Label htmlFor="summary">{t('summary')}</Label>
            <textarea
              id="summary"
              name="summary"
              value={profile.summary}
              onChange={handleProfileChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg text-gray-900"
              placeholder={t('summaryPlaceholder')}
            />
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('experiences')}</h2>
          <Button variant="outline" onClick={addExperience}>{t('addBtn')}</Button>
        </div>
        {experiences.length > 0 ? (
          <SortableList
            items={experiences}
            onReorder={(newItems) => { setExperiences(newItems); saveOrder('experiences', newItems) }}
            keyExtractor={(exp) => exp.id}
            direction="vertical"
            renderItem={(exp, dragHandleProps) => (
              <ExperienceCard
                experience={exp}
                onUpdate={(data) => updateExperience(exp.id, data)}
                onDelete={() => deleteExperience(exp.id)}
                dragHandleProps={dragHandleProps}
              />
            )}
          />
        ) : (
          <p className="text-gray-500 text-center py-4">{t('noExperiences')}</p>
        )}
      </section>

      {/* Formations */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('educations')}</h2>
          <Button variant="outline" onClick={addEducation}>{t('addBtn')}</Button>
        </div>
        {educations.length > 0 ? (
          <SortableList
            items={educations}
            onReorder={(newItems) => { setEducations(newItems); saveOrder('educations', newItems) }}
            keyExtractor={(edu) => edu.id}
            direction="vertical"
            renderItem={(edu, dragHandleProps) => (
              <EducationCard
                education={edu}
                onDelete={() => deleteEducation(edu.id)}
                dragHandleProps={dragHandleProps}
              />
            )}
          />
        ) : (
          <p className="text-gray-500 text-center py-4">{t('noEducations')}</p>
        )}
      </section>

      {/* Projets */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('projects')}</h2>
          <Button variant="outline" onClick={addProject}>{t('addBtn')}</Button>
        </div>
        {projects.length > 0 ? (
          <SortableList
            items={projects}
            onReorder={(newItems) => { setProjects(newItems); saveOrder('projects', newItems) }}
            keyExtractor={(project) => project.id}
            direction="vertical"
            renderItem={(project, dragHandleProps) => (
              <ProjectCard
                project={project}
                onUpdate={(data) => updateProject(project.id, data)}
                onDelete={() => deleteProject(project.id)}
                dragHandleProps={dragHandleProps}
              />
            )}
          />
        ) : (
          <p className="text-gray-500 text-center py-4">{t('noProjects')}</p>
        )}
      </section>

      {/* Certifications */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('certifications')}</h2>
          <Button variant="outline" onClick={addCertification}>{t('addBtn')}</Button>
        </div>
        {certifications.length > 0 ? (
          <SortableList
            items={certifications}
            onReorder={(newItems) => { setCertifications(newItems); saveOrder('certifications', newItems) }}
            keyExtractor={(cert) => cert.id}
            direction="vertical"
            renderItem={(cert, dragHandleProps) => (
              <CertificationCard
                certification={cert}
                onDelete={() => deleteCertification(cert.id)}
                dragHandleProps={dragHandleProps}
              />
            )}
          />
        ) : (
          <p className="text-gray-500 text-center py-4">{t('noCertifications')}</p>
        )}
      </section>

      {/* Compétences groupées par catégorie */}
      <SkillsSection
        skills={skills}
        onAdd={addSkill}
        onDelete={deleteSkill}
        onReorder={(newItems) => { setSkills(newItems); saveOrder('skills', newItems) }}
      />

      {/* Langues */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('languages')}</h2>
          <Button variant="outline" onClick={addLanguage}>{t('addBtn')}</Button>
        </div>
        {languages.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <SortableList
              items={languages}
              onReorder={(newItems) => { setLanguages(newItems); saveOrder('languages', newItems) }}
              keyExtractor={(lang) => lang.id}
              direction="horizontal"
              renderItem={(lang, dragHandleProps) => (
                <LanguageBadge language={lang} onDelete={() => deleteLanguage(lang.id)} dragHandleProps={dragHandleProps} />
              )}
            />
          </div>
        ) : (
          <p className="text-gray-500">{t('noLanguages')}</p>
        )}
      </section>

      {/* Centres d'intérêt */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('interests')}</h2>
          <Button variant="outline" onClick={addInterest}>{t('addBtn')}</Button>
        </div>
        {interests.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <SortableList
              items={interests}
              onReorder={(newItems) => { setInterests(newItems); saveOrder('interests', newItems) }}
              keyExtractor={(interest) => interest.id}
              direction="horizontal"
              renderItem={(interest, dragHandleProps) => (
                <InterestBadge interest={interest} onDelete={() => deleteInterest(interest.id)} dragHandleProps={dragHandleProps} />
              )}
            />
          </div>
        ) : (
          <p className="text-gray-500">{t('noInterests')}</p>
        )}
      </section>
    </div>
  )
}

function ExperienceCard({ experience, onUpdate, onDelete, dragHandleProps }: { experience: any; onUpdate: (data: any) => void; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const tCommon = useTranslations('common')
  const [data, setData] = useState(experience)
  const [editing, setEditing] = useState(!experience.company)

  const save = () => {
    onUpdate(data)
    setEditing(false)
    toast.success(t('experienceSaved'))
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder={t('companyInputPlaceholder')} value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
          <Input placeholder={t('positionPlaceholder')} value={data.position} onChange={(e) => setData({ ...data, position: e.target.value })} />
          <Input type="date" value={formatDate(data.startDate, 'input')} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
          <Input type="date" value={formatDate(data.endDate, 'input') || ''} onChange={(e) => setData({ ...data, endDate: e.target.value })} disabled={data.current} />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={data.current} onChange={(e) => setData({ ...data, current: e.target.checked, endDate: null })} />
          {t('currentJob')}
        </label>
        <textarea
          placeholder={t('descriptionPlaceholder')}
          value={data.description || ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-gray-900"
          rows={3}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>{t('saveItem')}</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>{tCommon('cancel')}</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>{tCommon('delete')}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.position || t('newJob')}</h3>
        <p className="text-gray-600">{data.company || t('companyPlaceholder')}</p>
        <p className="text-sm text-gray-500">
          {formatDate(data.startDate)} - {data.current ? t('present') : formatDate(data.endDate)}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>{tCommon('edit')}</Button>
    </div>
  )
}

function EducationCard({ education, onDelete, dragHandleProps }: { education: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const tCommon = useTranslations('common')
  const [data, setData] = useState(education)
  const [editing, setEditing] = useState(!education.institution)

  const save = async () => {
    await fetch('/api/profile/educations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: education.id, ...data }),
    })
    setEditing(false)
    toast.success(t('educationSaved'))
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder={t('institutionPlaceholder')} value={data.institution} onChange={(e) => setData({ ...data, institution: e.target.value })} />
          <Input placeholder={t('degreePlaceholder')} value={data.degree} onChange={(e) => setData({ ...data, degree: e.target.value })} />
          <Input placeholder={t('fieldPlaceholder')} value={data.field || ''} onChange={(e) => setData({ ...data, field: e.target.value })} />
          <Input type="date" value={formatDate(data.startDate, 'input')} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
          {!data.current && (
            <Input type="date" value={formatDate(data.endDate, 'input') || ''} onChange={(e) => setData({ ...data, endDate: e.target.value })} placeholder={t('endDatePlaceholder')} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`current-${education.id}`}
            checked={data.current || false}
            onChange={(e) => setData({ ...data, current: e.target.checked, endDate: e.target.checked ? null : data.endDate })}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor={`current-${education.id}`} className="text-sm text-gray-700">
            {t('currentStudy')}
          </label>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>{t('saveItem')}</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>{tCommon('cancel')}</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>{tCommon('delete')}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.degree || t('newDegree')}</h3>
        <p className="text-gray-600">{data.institution || t('institutionPlaceholder')}</p>
        {data.field && <p className="text-sm text-gray-500">{data.field}</p>}
        <p className="text-sm text-gray-500">
          {formatDate(data.startDate)} — {data.current ? t('present') : (data.endDate ? formatDate(data.endDate) : t('present'))}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>{tCommon('edit')}</Button>
    </div>
  )
}

function CertificationCard({ certification, onDelete, dragHandleProps }: { certification: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const tCommon = useTranslations('common')
  const [data, setData] = useState(certification)
  const [editing, setEditing] = useState(!certification.name)

  const save = async () => {
    await fetch('/api/profile/certifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: certification.id, ...data }),
    })
    setEditing(false)
    toast.success(t('certificationSaved'))
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder={t('certificationNamePlaceholder')} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <Input placeholder={t('issuerPlaceholder')} value={data.issuer} onChange={(e) => setData({ ...data, issuer: e.target.value })} />
          <Input type="date" placeholder={t('issueDatePlaceholder')} value={formatDate(data.issueDate, 'input')} onChange={(e) => setData({ ...data, issueDate: e.target.value })} />
          <Input type="date" placeholder={t('expiryDatePlaceholder')} value={formatDate(data.expiryDate, 'input') || ''} onChange={(e) => setData({ ...data, expiryDate: e.target.value || null })} />
          <Input placeholder={t('credentialIdPlaceholder')} value={data.credentialId || ''} onChange={(e) => setData({ ...data, credentialId: e.target.value })} />
          <Input placeholder={t('credentialUrlPlaceholder')} value={data.credentialUrl || ''} onChange={(e) => setData({ ...data, credentialUrl: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>{t('saveItem')}</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>{tCommon('cancel')}</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>{tCommon('delete')}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.name || t('newCertification')}</h3>
        <p className="text-gray-600">{data.issuer || t('issuerPlaceholder')}</p>
        <p className="text-sm text-gray-500">
          {t('obtainedOn', { date: formatDate(data.issueDate) })}
          {data.expiryDate && ` • ${t('expiresOn', { date: formatDate(data.expiryDate) })}`}
        </p>
        {data.credentialUrl && (
          <a href={data.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            {t('viewCertificate')}
          </a>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>{tCommon('edit')}</Button>
    </div>
  )
}

function ProjectCard({ project, onUpdate, onDelete, dragHandleProps }: { project: any; onUpdate: (data: Record<string, unknown>) => void; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const tCommon = useTranslations('common')
  const [data, setData] = useState(project)
  const [editing, setEditing] = useState(!project.name)
  const [techInput, setTechInput] = useState('')

  const save = () => {
    onUpdate(data)
    setEditing(false)
    toast.success(t('projectSaved'))
  }

  const addTech = () => {
    if (!techInput.trim()) return
    setData((prev: typeof data) => ({ ...prev, technologies: [...(prev.technologies || []), techInput.trim()] }))
    setTechInput('')
  }

  const removeTech = (index: number) => {
    setData((prev: typeof data) => ({
      ...prev,
      technologies: prev.technologies.filter((_: string, i: number) => i !== index),
    }))
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder={t('projectNamePlaceholder')} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <Input placeholder={t('projectUrlPlaceholder')} value={data.url || ''} onChange={(e) => setData({ ...data, url: e.target.value })} />
        </div>
        <textarea
          placeholder={t('projectDescriptionPlaceholder')}
          value={data.description || ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-gray-900"
          rows={3}
        />
        {/* Outils utilisés */}
        <div>
          <Label>{t('tools')}</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              placeholder={t('toolsPlaceholder')}
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
            />
            <Button type="button" size="sm" variant="outline" onClick={addTech}>+</Button>
          </div>
          {data.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.technologies.map((tech: string, i: number) => (
                <span key={i} className="flex items-center gap-1 bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                  {tech}
                  <button onClick={() => removeTech(i)} className="hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>{t('saveItem')}</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>{tCommon('cancel')}</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>{tCommon('delete')}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{data.name || t('newProject')}</h3>
          {data.url && (
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              {t('view')}
            </a>
          )}
        </div>
        {data.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{data.description}</p>}
        {data.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.technologies.map((tech: string, i: number) => (
              <span key={i} className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs">{tech}</span>
            ))}
          </div>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>{tCommon('edit')}</Button>
    </div>
  )
}

function SkillsSection({ skills, onAdd, onDelete, onReorder }: {
  skills: any[]
  onAdd: (category?: string) => void
  onDelete: (id: string) => void
  onReorder: (items: any[]) => void
}) {
  const t = useTranslations('dashboard.profile')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  const categories = Array.from(new Set(
    skills.filter(s => s.category).map(s => s.category as string)
  ))
  const uncategorizedSkills = skills.filter(s => !s.category)

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return
    onAdd(newCategoryName.trim())
    setNewCategoryName('')
    setIsCreatingCategory(false)
  }

  const handleRenameCategory = async (oldName: string, newName: string) => {
    if (!newName.trim() || newName === oldName) return
    const skillsInCategory = skills.filter(s => s.category === oldName)
    for (const skill of skillsInCategory) {
      await fetch('/api/profile/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: skill.id, name: skill.name, category: newName }),
      })
    }
    onReorder(skills.map(s => s.category === oldName ? { ...s, category: newName } : s))
  }

  // Quand un groupe est réordonné, on remplace les skills de ce groupe dans le tableau global
  const handleGroupReorder = (category: string | null, reorderedGroupSkills: any[]) => {
    const otherSkills = skills.filter(s => (category ? s.category !== category : !!s.category))
    onReorder([...otherSkills, ...reorderedGroupSkills])
  }

  return (
    <section className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{t('skills')}</h2>
        <div className="flex gap-2">
          {isCreatingCategory ? (
            <div className="flex items-center gap-2">
              <input
                className="text-sm border rounded-lg px-3 py-1.5 outline-none text-gray-900 w-40"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
                placeholder={t('groupNamePlaceholder')}
                autoFocus
              />
              <button onClick={handleCreateCategory} className="text-green-600 hover:text-green-700 text-sm font-medium">✓</button>
              <button onClick={() => { setIsCreatingCategory(false); setNewCategoryName('') }} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsCreatingCategory(true)}>{t('createGroupBtn')}</Button>
          )}
        </div>
      </div>

      {/* Groupes avec drag & drop vertical */}
      {categories.length > 0 && (
        <SortableList
          items={categories.map(cat => ({ id: cat, category: cat }))}
          onReorder={(reorderedCats) => {
            const newSkills: any[] = []
            for (const cat of reorderedCats) {
              newSkills.push(...skills.filter(s => s.category === cat.category))
            }
            newSkills.push(...uncategorizedSkills)
            onReorder(newSkills)
          }}
          keyExtractor={(item) => item.id}
          direction="vertical"
          className="space-y-0"
          renderItem={(item, dragHandleProps) => {
            const categorySkills = skills.filter(s => s.category === item.category)
            return (
              <SkillCategoryGroup
                category={item.category}
                skills={categorySkills}
                onAdd={() => onAdd(item.category)}
                onDelete={onDelete}
                onRename={(newName) => handleRenameCategory(item.category, newName)}
                onReorder={(reordered) => handleGroupReorder(item.category, reordered)}
                dragHandleProps={dragHandleProps}
              />
            )
          }}
        />
      )}

      {uncategorizedSkills.length > 0 && (
        <div className="mt-4">
          {categories.length > 0 && (
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('others')}</h3>
          )}
          <SortableList
            items={uncategorizedSkills}
            onReorder={(reordered) => handleGroupReorder(null, reordered)}
            keyExtractor={(skill) => skill.id}
            direction="horizontal"
            renderItem={(skill, dragHandleProps) => (
              <SkillBadge skill={skill} onDelete={() => onDelete(skill.id)} dragHandleProps={dragHandleProps} />
            )}
          />
        </div>
      )}

      <div className="mt-3">
        <button
          onClick={() => onAdd()}
          className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          {t('addSkillBtn')}
        </button>
      </div>

      {skills.length === 0 && !isCreatingCategory && (
        <p className="text-gray-500">{t('noSkills')}</p>
      )}
    </section>
  )
}

function SkillCategoryGroup({ category, skills, onAdd, onDelete, onRename, onReorder, dragHandleProps }: {
  category: string
  skills: any[]
  onAdd: () => void
  onDelete: (id: string) => void
  onRename: (newName: string) => void
  onReorder: (items: any[]) => void
  dragHandleProps: DragHandleProps
}) {
  const t = useTranslations('dashboard.profile')
  const [isRenaming, setIsRenaming] = useState(false)
  const [categoryName, setCategoryName] = useState(category)

  const handleRename = () => {
    onRename(categoryName)
    setIsRenaming(false)
  }

  return (
    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
            {...dragHandleProps.attributes}
            {...dragHandleProps.listeners}
          >
            <span className="text-sm">⋮⋮</span>
          </button>
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <input
                className="text-sm font-medium bg-white border rounded px-2 py-1 outline-none text-gray-900"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
              />
              <button onClick={handleRename} className="text-green-600 hover:text-green-700 text-sm">✓</button>
              <button onClick={() => { setIsRenaming(false); setCategoryName(category) }} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
          ) : (
            <h3
              className="text-sm font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsRenaming(true)}
              title={t('clickToRename')}
            >
              {category}
            </h3>
          )}
        </div>
        <button
          onClick={onAdd}
          className="text-xs text-gray-500 hover:text-primary transition-colors"
        >
          {t('addBtn')}
        </button>
      </div>
      <SortableList
        items={skills}
        onReorder={onReorder}
        keyExtractor={(skill) => skill.id}
        direction="horizontal"
        renderItem={(skill, dragHandleProps) => (
          <SkillBadge skill={skill} onDelete={() => onDelete(skill.id)} dragHandleProps={dragHandleProps} />
        )}
      />
    </div>
  )
}

function SkillBadge({ skill, onDelete, dragHandleProps }: { skill: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const [name, setName] = useState(skill.name)
  const [editing, setEditing] = useState(!skill.name)

  const save = async () => {
    if (!name.trim()) return
    await fetch('/api/profile/skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: skill.id, name, category: skill.category || null }),
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <input
          className="bg-transparent text-sm w-28 outline-none text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          placeholder={t('skillPlaceholder')}
          autoFocus
        />
        <button onClick={save} className="text-green-600 hover:text-green-700 text-sm font-medium">✓</button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-primary/40 hover:text-primary/60 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm font-medium cursor-pointer" onClick={() => setEditing(true)}>{name}</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

function LanguageBadge({ language, onDelete, dragHandleProps }: { language: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const t = useTranslations('dashboard.profile')
  const [name, setName] = useState(language.name)
  const [level, setLevel] = useState(language.level || 'INTERMEDIATE')
  const [editing, setEditing] = useState(!language.name)

  const languageLevels = [
    { value: 'BEGINNER', label: t('levelBeginner') },
    { value: 'INTERMEDIATE', label: t('levelIntermediate') },
    { value: 'ADVANCED', label: t('levelAdvanced') },
    { value: 'FLUENT', label: t('levelFluent') },
    { value: 'NATIVE', label: t('levelNative') },
  ]

  const save = async () => {
    if (!name.trim()) return
    await fetch('/api/profile/languages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: language.id, name, level }),
    })
    setEditing(false)
  }

  const getLevelLabel = (lvl: string) => languageLevels.find(l => l.value === lvl)?.label || lvl

  if (editing) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <input
          className="bg-transparent text-sm w-28 outline-none text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('languagePlaceholder')}
          autoFocus
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="text-xs bg-white border rounded px-2 py-1 text-gray-700"
        >
          {languageLevels.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        <button onClick={save} className="text-green-600 hover:text-green-700 text-sm font-medium">✓</button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-blue-400 hover:text-blue-600 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm font-medium cursor-pointer" onClick={() => setEditing(true)}>{name}</span>
      <span className="text-xs bg-blue-200 px-2 py-0.5 rounded">{getLevelLabel(level)}</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

function InterestBadge({ interest, onDelete, dragHandleProps }: { interest: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [name, setName] = useState(interest.name)
  const [editing, setEditing] = useState(!interest.name)

  const save = async () => {
    await fetch('/api/profile/interests', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: interest.id, name }),
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
        <input
          className="bg-transparent text-sm w-24 outline-none text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          autoFocus
        />
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-green-400 hover:text-green-600 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>{name}</span>
      <button onClick={onDelete} className="hover:text-red-500">×</button>
    </div>
  )
}
