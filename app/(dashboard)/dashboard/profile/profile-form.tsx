'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
  initialSkills: any[]
  initialLanguages: any[]
  initialInterests: any[]
}

export function ProfileForm({
  initialProfile,
  initialExperiences,
  initialEducations,
  initialSkills,
  initialLanguages,
  initialInterests,
}: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
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
  })

  const [experiences, setExperiences] = useState(initialExperiences)
  const [educations, setEducations] = useState(initialEducations)
  const [skills, setSkills] = useState(initialSkills)
  const [languages, setLanguages] = useState(initialLanguages)
  const [interests, setInterests] = useState(initialInterests)

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

  const saveProfile = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        toast.success('Profil sauvegardé')
      } else {
        toast.error('Erreur lors de la sauvegarde')
      }
    } catch {
      toast.error('Erreur serveur')
    } finally {
      setIsLoading(false)
    }
  }

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
        <Button onClick={saveProfile} isLoading={isLoading} className="mt-4">
          Sauvegarder le profil
        </Button>
      </section>

      {/* Expériences */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Expériences professionnelles</h2>
          <Button variant="outline" onClick={addExperience}>+ Ajouter</Button>
        </div>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onUpdate={(data) => updateExperience(exp.id, data)}
              onDelete={() => deleteExperience(exp.id)}
            />
          ))}
          {experiences.length === 0 && (
            <p className="text-gray-500 text-center py-4">Aucune expérience ajoutée</p>
          )}
        </div>
      </section>

      {/* Formations */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Formations</h2>
          <Button variant="outline" onClick={addEducation}>+ Ajouter</Button>
        </div>
        <div className="space-y-4">
          {educations.map((edu) => (
            <EducationCard
              key={edu.id}
              education={edu}
              onDelete={() => deleteEducation(edu.id)}
            />
          ))}
          {educations.length === 0 && (
            <p className="text-gray-500 text-center py-4">Aucune formation ajoutée</p>
          )}
        </div>
      </section>

      {/* Compétences */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Compétences</h2>
          <Button variant="outline" onClick={addSkill}>+ Ajouter</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} onDelete={() => deleteSkill(skill.id)} />
          ))}
          {skills.length === 0 && (
            <p className="text-gray-500">Aucune compétence ajoutée</p>
          )}
        </div>
      </section>

      {/* Langues */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Langues</h2>
          <Button variant="outline" onClick={addLanguage}>+ Ajouter</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <LanguageBadge key={lang.id} language={lang} onDelete={() => deleteLanguage(lang.id)} />
          ))}
          {languages.length === 0 && (
            <p className="text-gray-500">Aucune langue ajoutée</p>
          )}
        </div>
      </section>

      {/* Centres d'intérêt */}
      <section className="bg-white p-6 rounded-xl border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Centres d'intérêt</h2>
          <Button variant="outline" onClick={addInterest}>+ Ajouter</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <InterestBadge key={interest.id} interest={interest} onDelete={() => deleteInterest(interest.id)} />
          ))}
          {interests.length === 0 && (
            <p className="text-gray-500">Aucun centre d'intérêt ajouté</p>
          )}
        </div>
      </section>
    </div>
  )
}

function ExperienceCard({ experience, onUpdate, onDelete }: { experience: any; onUpdate: (data: any) => void; onDelete: () => void }) {
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
    <div className="border rounded-lg p-4 flex justify-between items-start">
      <div>
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

function EducationCard({ education, onDelete }: { education: any; onDelete: () => void }) {
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
    <div className="border rounded-lg p-4 flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900">{data.degree || 'Nouveau diplôme'}</h3>
        <p className="text-gray-600">{data.institution || 'Établissement'}</p>
        {data.field && <p className="text-sm text-gray-500">{data.field}</p>}
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

function SkillBadge({ skill, onDelete }: { skill: any; onDelete: () => void }) {
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
    <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-3 py-2 cursor-pointer" onClick={() => setEditing(true)}>
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">{getLevelLabel(level)}</span>
      <button onClick={(e) => { e.stopPropagation(); onDelete() }} className="hover:text-red-500 ml-1">×</button>
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

function LanguageBadge({ language, onDelete }: { language: any; onDelete: () => void }) {
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
    <div className="flex items-center gap-2 bg-blue-100 text-blue-700 rounded-lg px-3 py-2 cursor-pointer" onClick={() => setEditing(true)}>
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs bg-blue-200 px-2 py-0.5 rounded">{getLevelLabel(level)}</span>
      <button onClick={(e) => { e.stopPropagation(); onDelete() }} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

function InterestBadge({ interest, onDelete }: { interest: any; onDelete: () => void }) {
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
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>{name}</span>
      <button onClick={onDelete} className="hover:text-red-500">×</button>
    </div>
  )
}
