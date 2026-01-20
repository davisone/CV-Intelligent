'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { templates, TemplateType } from '@/components/cv-templates'

// Types pour les données du CV
interface ExperienceData {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string | null
}

interface EducationData {
  id: string
  institution: string
  degree: string
  field: string | null
  startDate: string
  endDate: string | null
  gpa: string | null
}

type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
type LanguageLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'FLUENT' | 'NATIVE'

interface SkillData {
  id: string
  name: string
  level: SkillLevel
}

interface LanguageData {
  id: string
  name: string
  level: LanguageLevel
}

interface InterestData {
  id: string
  name: string
}

// Helper pour formater les dates
const formatDate = (date: Date | string | null | undefined, format: 'input' | 'display' = 'display') => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (format === 'input') {
    return d.toISOString().slice(0, 10)
  }
  return d.toISOString().slice(0, 7)
}

// Générer un ID unique
const generateId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

interface ResumeEditorProps {
  resume: any
}

export function ResumeEditor({ resume }: ResumeEditorProps) {
  const router = useRouter()
  const cvRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
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
  const [experiences, setExperiences] = useState<ExperienceData[]>(resume.experiences || [])
  const [educations, setEducations] = useState<EducationData[]>(resume.educations || [])
  const [skills, setSkills] = useState<SkillData[]>(resume.skills || [])
  const [languages, setLanguages] = useState<LanguageData[]>(resume.languages || [])
  const [interests, setInterests] = useState<InterestData[]>(resume.interests || [])

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
            photoUrl: personalInfo.photoUrl || undefined,
          },
          experiences: experiences.map(exp => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate || undefined,
            current: exp.current,
            description: exp.description || undefined,
          })),
          educations: educations.map(edu => ({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field || undefined,
            startDate: edu.startDate,
            endDate: edu.endDate || undefined,
            gpa: edu.gpa || undefined,
          })),
          skills: skills.map(skill => ({
            name: skill.name,
            level: skill.level,
          })),
          languages: languages.map(lang => ({
            name: lang.name,
            level: lang.level,
          })),
          interests: interests.map(interest => ({
            name: interest.name,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      toast.success('CV sauvegardé !')
      router.refresh()
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  // Handlers pour les expériences
  const addExperience = () => {
    const newExp: ExperienceData = {
      id: generateId(),
      company: '',
      position: '',
      startDate: new Date().toISOString(),
      endDate: null,
      current: true,
      description: null,
    }
    setExperiences(prev => [...prev, newExp])
  }

  const updateExperience = (id: string, data: Partial<ExperienceData>) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...data } : exp))
  }

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id))
    toast.success('Expérience supprimée')
  }

  // Handlers pour les formations
  const addEducation = () => {
    const newEdu: EducationData = {
      id: generateId(),
      institution: '',
      degree: '',
      field: null,
      startDate: new Date().toISOString(),
      endDate: null,
      gpa: null,
    }
    setEducations(prev => [...prev, newEdu])
  }

  const updateEducation = (id: string, data: Partial<EducationData>) => {
    setEducations(prev => prev.map(edu => edu.id === id ? { ...edu, ...data } : edu))
  }

  const deleteEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id))
    toast.success('Formation supprimée')
  }

  // Handlers pour les compétences
  const addSkill = () => {
    const newSkill: SkillData = {
      id: generateId(),
      name: '',
      level: 'INTERMEDIATE',
    }
    setSkills(prev => [...prev, newSkill])
  }

  const updateSkill = (id: string, data: Partial<SkillData>) => {
    setSkills(prev => prev.map(skill => skill.id === id ? { ...skill, ...data } : skill))
  }

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id))
  }

  // Handlers pour les langues
  const addLanguage = () => {
    const newLang: LanguageData = {
      id: generateId(),
      name: '',
      level: 'INTERMEDIATE',
    }
    setLanguages(prev => [...prev, newLang])
  }

  const updateLanguage = (id: string, data: Partial<LanguageData>) => {
    setLanguages(prev => prev.map(lang => lang.id === id ? { ...lang, ...data } : lang))
  }

  const deleteLanguage = (id: string) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id))
  }

  // Handlers pour les centres d'intérêt
  const addInterest = () => {
    const newInterest: InterestData = {
      id: generateId(),
      name: '',
    }
    setInterests(prev => [...prev, newInterest])
  }

  const updateInterest = (id: string, data: Partial<InterestData>) => {
    setInterests(prev => prev.map(interest => interest.id === id ? { ...interest, ...data } : interest))
  }

  const deleteInterest = (id: string) => {
    setInterests(prev => prev.filter(interest => interest.id !== id))
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

  const downloadPDF = async () => {
    if (!cvRef.current) return

    setIsGeneratingPdf(true)
    try {
      // Capturer le CV à sa taille naturelle
      const imgData = await toPng(cvRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      })

      // Charger l'image pour obtenir ses dimensions
      const img = new Image()
      img.src = imgData
      await new Promise((resolve) => { img.onload = resolve })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth() // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight() // 297mm

      // Calculer le ratio de l'image
      const imgAspectRatio = img.width / img.height
      const pdfAspectRatio = pdfWidth / pdfHeight

      let finalWidth, finalHeight, xOffset, yOffset

      if (imgAspectRatio > pdfAspectRatio) {
        // Image plus large que le PDF - ajuster à la largeur
        finalWidth = pdfWidth
        finalHeight = pdfWidth / imgAspectRatio
        xOffset = 0
        yOffset = 0
      } else {
        // Image plus haute que le PDF - ajuster à la largeur quand même pour remplir
        finalWidth = pdfWidth
        finalHeight = pdfWidth / imgAspectRatio
        xOffset = 0
        yOffset = 0
      }

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight)

      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cv.pdf`
      pdf.save(fileName)

      toast.success('PDF téléchargé !')
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      toast.error('Erreur lors de la génération du PDF')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const cvData = {
    personalInfo,
    experiences,
    educations,
    skills,
    languages,
    interests,
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Expériences ({experiences.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addExperience}>
                + Ajouter
              </Button>
            </div>
            {experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    onUpdate={(data) => updateExperience(exp.id, data)}
                    onDelete={() => deleteExperience(exp.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">Aucune expérience ajoutée</p>
            )}
          </section>

          {/* Formations */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Formations ({educations.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addEducation}>
                + Ajouter
              </Button>
            </div>
            {educations.length > 0 ? (
              <div className="space-y-4">
                {educations.map((edu) => (
                  <EducationCard
                    key={edu.id}
                    education={edu}
                    onUpdate={(data) => updateEducation(edu.id, data)}
                    onDelete={() => deleteEducation(edu.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">Aucune formation ajoutée</p>
            )}
          </section>

          {/* Compétences */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Compétences ({skills.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addSkill}>
                + Ajouter
              </Button>
            </div>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    skill={skill}
                    onUpdate={(data) => updateSkill(skill.id, data)}
                    onDelete={() => deleteSkill(skill.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune compétence ajoutée</p>
            )}
          </section>

          {/* Langues */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Langues ({languages.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addLanguage}>
                + Ajouter
              </Button>
            </div>
            {languages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <LanguageBadge
                    key={lang.id}
                    language={lang}
                    onUpdate={(data) => updateLanguage(lang.id, data)}
                    onDelete={() => deleteLanguage(lang.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune langue ajoutée</p>
            )}
          </section>

          {/* Centres d'intérêt */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Centres d'intérêt ({interests.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addInterest}>
                + Ajouter
              </Button>
            </div>
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <InterestBadge
                    key={interest.id}
                    interest={interest}
                    onUpdate={(data) => updateInterest(interest.id, data)}
                    onDelete={() => deleteInterest(interest.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucun centre d'intérêt ajouté</p>
            )}
          </section>
        </div>
      ) : (
        /* Preview */
        <div className="bg-gray-100 p-8 rounded-xl">
          <div className="mb-4 flex justify-end">
            <Button onClick={downloadPDF} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Télécharger PDF
                </>
              )}
            </Button>
          </div>
          <div ref={cvRef} data-cv-container>
            {(() => {
              const templateKey = (resume.template as TemplateType) || 'MODERN'
              const TemplateComponent = templates[templateKey] || templates.MODERN
              return <TemplateComponent data={cvData} />
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

// Composant ExperienceCard
interface ExperienceCardProps {
  experience: ExperienceData
  onUpdate: (data: Partial<ExperienceData>) => void
  onDelete: () => void
}

function ExperienceCard({ experience, onUpdate, onDelete }: ExperienceCardProps) {
  const [data, setData] = useState(experience)
  const [editing, setEditing] = useState(!experience.company)

  const handleChange = (field: keyof ExperienceData, value: string | boolean | null) => {
    const newData = { ...data, [field]: value }
    if (field === 'current' && value === true) {
      newData.endDate = null
    }
    setData(newData)
  }

  const save = () => {
    onUpdate(data)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Entreprise</Label>
            <Input
              placeholder="Nom de l'entreprise"
              value={data.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
          <div>
            <Label>Poste</Label>
            <Input
              placeholder="Titre du poste"
              value={data.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
          </div>
          <div>
            <Label>Date de début</Label>
            <Input
              type="date"
              value={formatDate(data.startDate, 'input')}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label>Date de fin</Label>
            <Input
              type="date"
              value={data.endDate ? formatDate(data.endDate, 'input') : ''}
              onChange={(e) => handleChange('endDate', e.target.value || null)}
              disabled={data.current}
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={data.current}
            onChange={(e) => handleChange('current', e.target.checked)}
            className="rounded"
          />
          Poste actuel
        </label>
        <div>
          <Label>Description</Label>
          <textarea
            placeholder="Décrivez vos responsabilités et accomplissements..."
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value || null)}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 min-h-[80px]"
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Valider</Button>
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
        {data.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{data.description}</p>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

// Composant EducationCard
interface EducationCardProps {
  education: EducationData
  onUpdate: (data: Partial<EducationData>) => void
  onDelete: () => void
}

function EducationCard({ education, onUpdate, onDelete }: EducationCardProps) {
  const [data, setData] = useState(education)
  const [editing, setEditing] = useState(!education.institution)

  const handleChange = (field: keyof EducationData, value: string | null) => {
    setData({ ...data, [field]: value })
  }

  const save = () => {
    onUpdate(data)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Établissement</Label>
            <Input
              placeholder="Nom de l'établissement"
              value={data.institution}
              onChange={(e) => handleChange('institution', e.target.value)}
            />
          </div>
          <div>
            <Label>Diplôme</Label>
            <Input
              placeholder="Ex: Master, Licence..."
              value={data.degree}
              onChange={(e) => handleChange('degree', e.target.value)}
            />
          </div>
          <div>
            <Label>Domaine / Spécialité</Label>
            <Input
              placeholder="Ex: Informatique"
              value={data.field || ''}
              onChange={(e) => handleChange('field', e.target.value || null)}
            />
          </div>
          <div>
            <Label>Mention / GPA</Label>
            <Input
              placeholder="Ex: Bien, 3.8/4.0"
              value={data.gpa || ''}
              onChange={(e) => handleChange('gpa', e.target.value || null)}
            />
          </div>
          <div>
            <Label>Date de début</Label>
            <Input
              type="date"
              value={formatDate(data.startDate, 'input')}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label>Date de fin</Label>
            <Input
              type="date"
              value={data.endDate ? formatDate(data.endDate, 'input') : ''}
              onChange={(e) => handleChange('endDate', e.target.value || null)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Valider</Button>
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
        <p className="text-sm text-gray-500">
          {formatDate(data.startDate)} - {data.endDate ? formatDate(data.endDate) : 'En cours'}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

// Composant SkillBadge
interface SkillBadgeProps {
  skill: SkillData
  onUpdate: (data: Partial<SkillData>) => void
  onDelete: () => void
}

const skillLevelLabels: Record<SkillLevel, string> = {
  BEGINNER: 'Débutant',
  INTERMEDIATE: 'Intermédiaire',
  ADVANCED: 'Avancé',
  EXPERT: 'Expert',
}

function SkillBadge({ skill, onUpdate, onDelete }: SkillBadgeProps) {
  const [data, setData] = useState(skill)
  const [editing, setEditing] = useState(!skill.name)

  const save = () => {
    if (data.name.trim()) {
      onUpdate(data)
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
        <input
          className="bg-transparent text-sm w-20 outline-none text-gray-900"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          placeholder="Compétence"
          autoFocus
        />
        <select
          className="text-xs bg-transparent outline-none text-gray-700"
          value={data.level}
          onChange={(e) => setData({ ...data, level: e.target.value as SkillLevel })}
        >
          <option value="BEGINNER">Débutant</option>
          <option value="INTERMEDIATE">Intermédiaire</option>
          <option value="ADVANCED">Avancé</option>
          <option value="EXPERT">Expert</option>
        </select>
        <button onClick={save} className="text-green-600 hover:text-green-700 text-sm px-1">✓</button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full px-3 py-1">
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <span className="text-xs text-blue-600">({skillLevelLabels[data.level]})</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

// Composant LanguageBadge
interface LanguageBadgeProps {
  language: LanguageData
  onUpdate: (data: Partial<LanguageData>) => void
  onDelete: () => void
}

const languageLevelLabels: Record<LanguageLevel, string> = {
  BEGINNER: 'Débutant',
  INTERMEDIATE: 'Intermédiaire',
  ADVANCED: 'Avancé',
  FLUENT: 'Courant',
  NATIVE: 'Natif',
}

function LanguageBadge({ language, onUpdate, onDelete }: LanguageBadgeProps) {
  const [data, setData] = useState(language)
  const [editing, setEditing] = useState(!language.name)

  const save = () => {
    if (data.name.trim()) {
      onUpdate(data)
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
        <input
          className="bg-transparent text-sm w-20 outline-none text-gray-900"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          placeholder="Langue"
          autoFocus
        />
        <select
          className="text-xs bg-transparent outline-none text-gray-700"
          value={data.level}
          onChange={(e) => setData({ ...data, level: e.target.value as LanguageLevel })}
        >
          <option value="BEGINNER">Débutant</option>
          <option value="INTERMEDIATE">Intermédiaire</option>
          <option value="ADVANCED">Avancé</option>
          <option value="FLUENT">Courant</option>
          <option value="NATIVE">Natif</option>
        </select>
        <button onClick={save} className="text-green-600 hover:text-green-700 text-sm px-1">✓</button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-3 py-1">
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <span className="text-xs text-green-600">({languageLevelLabels[data.level]})</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}

// Composant InterestBadge
interface InterestBadgeProps {
  interest: InterestData
  onUpdate: (data: Partial<InterestData>) => void
  onDelete: () => void
}

function InterestBadge({ interest, onUpdate, onDelete }: InterestBadgeProps) {
  const [data, setData] = useState(interest)
  const [editing, setEditing] = useState(!interest.name)

  const save = () => {
    if (data.name.trim()) {
      onUpdate(data)
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
        <input
          className="bg-transparent text-sm w-24 outline-none text-gray-900"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          placeholder="Centre d'intérêt"
          autoFocus
        />
        <button onClick={save} className="text-green-600 hover:text-green-700 text-sm px-1">✓</button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">×</button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-purple-100 text-purple-800 rounded-full px-3 py-1">
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">×</button>
    </div>
  )
}
