'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
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
  initialSkills: any[]
  initialLanguages: any[]
  initialInterests: any[]
}

export function ProfileForm({
  initialProfile,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialSkills,
  initialLanguages,
  initialInterests,
}: ProfileFormProps) {
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
    website: initialProfile?.website || '',
    summary: initialProfile?.summary || '',
    photoUrl: initialProfile?.photoUrl || '',
    birthDate: initialProfile?.birthDate ? formatDate(initialProfile.birthDate, 'input') : '',
    drivingLicenses: initialProfile?.drivingLicenses || '',
  })

  const [experiences, setExperiences] = useState(initialExperiences)
  const [educations, setEducations] = useState(initialEducations)
  const [certifications, setCertifications] = useState(initialCertifications)
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
        toast.success('Photo uploadée !')
      } else {
        toast.error(data.error || 'Erreur lors de l\'upload')
      }
    } catch {
      toast.error('Erreur serveur')
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
    toast.success('Expérience supprimée')
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
    toast.success('Formation supprimée')
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
    toast.success('Certification supprimée')
  }

  const addSkill = async () => {
    const res = await fetch('/api/profile/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
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
              Sauvegarde en cours...
            </>
          ) : hasUnsavedChanges ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Modifications non sauvegardées
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Profil sauvegardé
            </>
          )}
        </div>
      </div>

      {/* Photo de profil */}
      <section className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Photo de profil</h2>
        <div className="flex items-start gap-6">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt="Photo de profil"
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
              <Label>Importer depuis votre ordinateur</Label>
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
                        Upload...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Choisir une photo
                      </>
                    )}
                  </span>
                </label>
                <span className="text-xs text-gray-500">JPG, PNG (max 2MB)</span>
              </div>
            </div>

            {/* Ou URL */}
            <div>
              <Label htmlFor="photoUrl">Ou coller une URL</Label>
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
                Supprimer la photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Informations personnelles */}
      <section className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="jobTitle">Titre professionnel</Label>
            <Input id="jobTitle" name="jobTitle" value={profile.jobTitle} onChange={handleProfileChange} placeholder="Ex: Développeur Full Stack" />
          </div>
          <div>
            <Label htmlFor="birthDate">Date de naissance</Label>
            <Input id="birthDate" name="birthDate" type="date" value={profile.birthDate} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="drivingLicenses">Permis</Label>
            <Input id="drivingLicenses" name="drivingLicenses" value={profile.drivingLicenses} onChange={handleProfileChange} placeholder="Ex: B, A2" />
          </div>
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input id="city" name="city" value={profile.city} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="country">Pays</Label>
            <Input id="country" name="country" value={profile.country} onChange={handleProfileChange} />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" name="linkedin" value={profile.linkedin} onChange={handleProfileChange} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" name="github" value={profile.github} onChange={handleProfileChange} placeholder="https://github.com/..." />
          </div>
          <div className="col-span-2">
            <Label htmlFor="summary">Résumé professionnel</Label>
            <textarea
              id="summary"
              name="summary"
              value={profile.summary}
              onChange={handleProfileChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg text-gray-900"
              placeholder="Décrivez-vous en quelques phrases..."
            />
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Expériences professionnelles</h2>
          <Button variant="outline" onClick={addExperience}>+ Ajouter</Button>
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
          <p className="text-gray-500 text-center py-4">Aucune expérience ajoutée</p>
        )}
      </section>

      {/* Formations */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Formations</h2>
          <Button variant="outline" onClick={addEducation}>+ Ajouter</Button>
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
          <p className="text-gray-500 text-center py-4">Aucune formation ajoutée</p>
        )}
      </section>

      {/* Certifications */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
          <Button variant="outline" onClick={addCertification}>+ Ajouter</Button>
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
          <p className="text-gray-500 text-center py-4">Aucune certification ajoutée</p>
        )}
      </section>

      {/* Compétences */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Compétences</h2>
          <Button variant="outline" onClick={addSkill}>+ Ajouter</Button>
        </div>
        {skills.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <SortableList
              items={skills}
              onReorder={(newItems) => { setSkills(newItems); saveOrder('skills', newItems) }}
              keyExtractor={(skill) => skill.id}
              direction="horizontal"
              renderItem={(skill, dragHandleProps) => (
                <SkillBadge skill={skill} onDelete={() => deleteSkill(skill.id)} dragHandleProps={dragHandleProps} />
              )}
            />
          </div>
        ) : (
          <p className="text-gray-500">Aucune compétence ajoutée</p>
        )}
      </section>

      {/* Langues */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Langues</h2>
          <Button variant="outline" onClick={addLanguage}>+ Ajouter</Button>
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
          <p className="text-gray-500">Aucune langue ajoutée</p>
        )}
      </section>

      {/* Centres d'intérêt */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Centres d'intérêt</h2>
          <Button variant="outline" onClick={addInterest}>+ Ajouter</Button>
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
          <p className="text-gray-500">Aucun centre d'intérêt ajouté</p>
        )}
      </section>
    </div>
  )
}

function ExperienceCard({ experience, onUpdate, onDelete, dragHandleProps }: { experience: any; onUpdate: (data: any) => void; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [data, setData] = useState(experience)
  const [editing, setEditing] = useState(!experience.company)

  const save = () => {
    onUpdate(data)
    setEditing(false)
    toast.success('Expérience sauvegardée')
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Entreprise" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
          <Input placeholder="Poste" value={data.position} onChange={(e) => setData({ ...data, position: e.target.value })} />
          <Input type="date" value={formatDate(data.startDate, 'input')} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
          <Input type="date" value={formatDate(data.endDate, 'input') || ''} onChange={(e) => setData({ ...data, endDate: e.target.value })} disabled={data.current} />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={data.current} onChange={(e) => setData({ ...data, current: e.target.checked, endDate: null })} />
          Poste actuel
        </label>
        <textarea
          placeholder="Description"
          value={data.description || ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-gray-900"
          rows={3}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Sauvegarder</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>Supprimer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.position || 'Nouveau poste'}</h3>
        <p className="text-gray-600">{data.company || 'Entreprise'}</p>
        <p className="text-sm text-gray-500">
          {formatDate(data.startDate)} - {data.current ? 'Présent' : formatDate(data.endDate)}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

function EducationCard({ education, onDelete, dragHandleProps }: { education: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [data, setData] = useState(education)
  const [editing, setEditing] = useState(!education.institution)

  const save = async () => {
    await fetch('/api/profile/educations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: education.id, ...data }),
    })
    setEditing(false)
    toast.success('Formation sauvegardée')
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Établissement" value={data.institution} onChange={(e) => setData({ ...data, institution: e.target.value })} />
          <Input placeholder="Diplôme" value={data.degree} onChange={(e) => setData({ ...data, degree: e.target.value })} />
          <Input placeholder="Domaine" value={data.field || ''} onChange={(e) => setData({ ...data, field: e.target.value })} />
          <Input type="date" value={formatDate(data.startDate, 'input')} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Sauvegarder</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>Supprimer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.degree || 'Nouveau diplôme'}</h3>
        <p className="text-gray-600">{data.institution || 'Établissement'}</p>
        {data.field && <p className="text-sm text-gray-500">{data.field}</p>}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

function CertificationCard({ certification, onDelete, dragHandleProps }: { certification: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [data, setData] = useState(certification)
  const [editing, setEditing] = useState(!certification.name)

  const save = async () => {
    await fetch('/api/profile/certifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: certification.id, ...data }),
    })
    setEditing(false)
    toast.success('Certification sauvegardée')
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Nom de la certification" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <Input placeholder="Organisme" value={data.issuer} onChange={(e) => setData({ ...data, issuer: e.target.value })} />
          <Input type="date" placeholder="Date d'obtention" value={formatDate(data.issueDate, 'input')} onChange={(e) => setData({ ...data, issueDate: e.target.value })} />
          <Input type="date" placeholder="Date d'expiration (optionnel)" value={formatDate(data.expiryDate, 'input') || ''} onChange={(e) => setData({ ...data, expiryDate: e.target.value || null })} />
          <Input placeholder="ID credential (optionnel)" value={data.credentialId || ''} onChange={(e) => setData({ ...data, credentialId: e.target.value })} />
          <Input placeholder="URL de vérification (optionnel)" value={data.credentialUrl || ''} onChange={(e) => setData({ ...data, credentialUrl: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Sauvegarder</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>Supprimer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex items-start gap-2">
      <DragHandle dragHandleProps={dragHandleProps} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">{data.name || 'Nouvelle certification'}</h3>
        <p className="text-gray-600">{data.issuer || 'Organisme'}</p>
        <p className="text-sm text-gray-500">
          Obtenue le {formatDate(data.issueDate)}
          {data.expiryDate && ` • Expire le ${formatDate(data.expiryDate)}`}
        </p>
        {data.credentialUrl && (
          <a href={data.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            Voir le certificat
          </a>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

const skillLevels = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Avancé' },
  { value: 'EXPERT', label: 'Expert' },
]

function SkillBadge({ skill, onDelete, dragHandleProps }: { skill: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [name, setName] = useState(skill.name)
  const [level, setLevel] = useState(skill.level || 'INTERMEDIATE')
  const [editing, setEditing] = useState(!skill.name)

  const save = async () => {
    if (!name.trim()) return
    await fetch('/api/profile/skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: skill.id, name, level }),
    })
    setEditing(false)
  }

  const getLevelLabel = (lvl: string) => skillLevels.find(l => l.value === lvl)?.label || lvl

  if (editing) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <input
          className="bg-transparent text-sm w-28 outline-none text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Compétence"
          autoFocus
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="text-xs bg-white border rounded px-2 py-1 text-gray-700"
        >
          {skillLevels.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
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
      <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">{getLevelLabel(level)}</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

const languageLevels = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Avancé' },
  { value: 'FLUENT', label: 'Courant' },
  { value: 'NATIVE', label: 'Natif' },
]

function LanguageBadge({ language, onDelete, dragHandleProps }: { language: any; onDelete: () => void; dragHandleProps: DragHandleProps }) {
  const [name, setName] = useState(language.name)
  const [level, setLevel] = useState(language.level || 'INTERMEDIATE')
  const [editing, setEditing] = useState(!language.name)

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
          placeholder="Langue"
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
