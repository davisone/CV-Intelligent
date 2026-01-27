'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/confirm-dialog'
import { SortableList, DragHandle, DragHandleProps } from '@/components/ui/sortable-list'
import { CheckoutModal } from '@/components/payments/checkout-modal'
import { PaymentRequired } from '@/components/payments/payment-required'
import { useAutoSave } from '@/hooks/useAutoSave'
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning'
import { templates, TemplateType } from '@/components/cv-templates'
import {
  ArrowLeft,
  Upload,
  Target,
  Save,
  X,
  Check,
  Loader2,
  Sparkles,
  Plus,
  FileDown,
  FileType,
  Key,
  Building2,
  FileText,
  Lightbulb,
  CheckCircle,
  XCircle,
  Lock,
} from '@/components/ui/icons'

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
  canAccessPremiumFeatures?: boolean
  requiresPayment?: boolean
}

export function ResumeEditor({ resume, canAccessPremiumFeatures = true, requiresPayment = false }: ResumeEditorProps) {
  const router = useRouter()
  const cvRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null)
  const [showAtsPanel, setShowAtsPanel] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [atsScore, setAtsScore] = useState<{
    score: number
    breakdown: { formatting: number; keywords: number; structure: number; content: number }
    suggestions: string[]
    missingKeywords: string[]
    matchedKeywords: string[]
  } | null>(null)
  const [isAtsLoading, setIsAtsLoading] = useState(false)
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

  // Dialog de confirmation pour importer depuis le profil
  const syncProfileDialog = useConfirmDialog({
    title: 'Importer depuis le profil',
    description: 'Cela va remplacer toutes les données du CV par celles de votre profil. Voulez-vous continuer ?',
    confirmLabel: 'Importer',
    cancelLabel: 'Annuler',
    variant: 'default',
  })

  // Données pour l'auto-save
  const autoSaveData = useMemo(() => ({
    title,
    personalInfo,
    experiences,
    educations,
    skills,
    languages,
    interests,
  }), [title, personalInfo, experiences, educations, skills, languages, interests])

  // Fonction de sauvegarde pour l'auto-save
  const performSave = useCallback(async (data: typeof autoSaveData) => {
    const response = await fetch(`/api/resumes/${resume.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title,
        personalInfo: {
          firstName: data.personalInfo.firstName,
          lastName: data.personalInfo.lastName,
          email: data.personalInfo.email,
          phone: data.personalInfo.phone || undefined,
          city: data.personalInfo.city || undefined,
          country: data.personalInfo.country || undefined,
          linkedin: data.personalInfo.linkedin || undefined,
          github: data.personalInfo.github || undefined,
          summary: data.personalInfo.summary || undefined,
          photoUrl: data.personalInfo.photoUrl || undefined,
        },
        experiences: data.experiences.map(exp => ({
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate || undefined,
          current: exp.current,
          description: exp.description || undefined,
        })),
        educations: data.educations.map(edu => ({
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || undefined,
          startDate: edu.startDate,
          endDate: edu.endDate || undefined,
          gpa: edu.gpa || undefined,
        })),
        skills: data.skills.map(skill => ({
          name: skill.name,
          level: skill.level,
        })),
        languages: data.languages.map(lang => ({
          name: lang.name,
          level: lang.level,
        })),
        interests: data.interests.map(interest => ({
          name: interest.name,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde')
    }
  }, [resume.id])

  // Hook d'auto-save
  const { isSaving: isAutoSaving, lastSaved, hasUnsavedChanges, saveNow, markAsSaved } = useAutoSave({
    data: autoSaveData,
    onSave: performSave,
    delay: 3000,
    enabled: true,
  })

  // Avertissement avant de quitter avec des changements non sauvegardés
  useUnsavedChangesWarning({ hasUnsavedChanges })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      await performSave(autoSaveData)
      markAsSaved()
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
    const confirmed = await syncProfileDialog.confirm()
    if (!confirmed) return

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

  // Fonction pour améliorer le contenu avec l'IA
  const improveWithAI = async (
    content: string,
    section: 'summary' | 'experience' | 'skills',
    onSuccess: (suggestion: string) => void
  ) => {
    // Vérifier l'accès premium
    if (!canAccessPremiumFeatures) {
      setShowCheckoutModal(true)
      return
    }

    if (!content.trim()) {
      toast.error('Ajoutez du contenu avant d\'utiliser l\'IA')
      return
    }

    setIsAiLoading(section)
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          section,
          resumeId: resume.id,
          context: {
            jobTitle: personalInfo.firstName ? `${personalInfo.firstName} ${personalInfo.lastName}` : undefined,
          },
        }),
      })

      if (res.status === 402) {
        // Paiement requis
        setShowCheckoutModal(true)
        return
      }

      if (res.ok) {
        const { data } = await res.json()
        onSuccess(data.suggestion)
        toast.success('Contenu amélioré avec l\'IA !')
      } else {
        const error = await res.json()
        toast.error(error.error || 'Erreur lors de l\'amélioration')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setIsAiLoading(null)
    }
  }

  // Fonction pour calculer le score ATS
  const calculateATS = async () => {
    // Vérifier l'accès premium
    if (!canAccessPremiumFeatures) {
      setShowCheckoutModal(true)
      return
    }

    setIsAtsLoading(true)
    setShowAtsPanel(true)

    // Construire le contenu du CV en texte
    const resumeContent = `
Nom: ${personalInfo.firstName} ${personalInfo.lastName}
Email: ${personalInfo.email}
Téléphone: ${personalInfo.phone}
Ville: ${personalInfo.city}, ${personalInfo.country}

RÉSUMÉ PROFESSIONNEL:
${personalInfo.summary}

EXPÉRIENCES:
${experiences.map(exp => `
- ${exp.position} chez ${exp.company}
  ${exp.description || ''}
`).join('\n')}

FORMATIONS:
${educations.map(edu => `
- ${edu.degree} - ${edu.institution}
  ${edu.field || ''}
`).join('\n')}

COMPÉTENCES:
${skills.map(s => s.name).join(', ')}

LANGUES:
${languages.map(l => l.name).join(', ')}

CENTRES D'INTÉRÊT:
${interests.map(i => i.name).join(', ')}
    `.trim()

    try {
      const res = await fetch('/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent, resumeId: resume.id }),
      })

      if (res.status === 402) {
        // Paiement requis
        setShowAtsPanel(false)
        setShowCheckoutModal(true)
        return
      }

      if (res.ok) {
        const { data } = await res.json()
        setAtsScore(data)
      } else {
        toast.error('Erreur lors du calcul du score ATS')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setIsAtsLoading(false)
    }
  }

  const downloadPDF = async () => {
    if (!cvRef.current) return

    setIsGeneratingPdf(true)
    try {
      // Créer un conteneur hors-écran pour la capture avec dimensions A4 exactes
      const offScreenContainer = document.createElement('div')
      offScreenContainer.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 21cm;
        min-height: 29.7cm;
        background: white;
        z-index: -1;
      `

      // Cloner le contenu du CV dans le conteneur hors-écran
      const cvClone = cvRef.current.cloneNode(true) as HTMLElement
      cvClone.style.cssText = `
        width: 21cm;
        min-height: 29.7cm;
        transform: none;
        margin: 0;
      `

      // S'assurer que le premier enfant (le template) a aussi les bonnes dimensions
      const templateElement = cvClone.firstElementChild as HTMLElement
      if (templateElement) {
        templateElement.style.width = '21cm'
        templateElement.style.minHeight = '29.7cm'
        templateElement.style.margin = '0'
      }

      offScreenContainer.appendChild(cvClone)
      document.body.appendChild(offScreenContainer)

      // Attendre le rendu complet
      await new Promise(resolve => setTimeout(resolve, 200))

      // Capturer le contenu cloné à haute résolution
      const imgData = await toPng(cvClone, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      // Nettoyer le conteneur hors-écran
      document.body.removeChild(offScreenContainer)

      // Charger l'image pour obtenir ses dimensions réelles
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

      // Calculer les dimensions pour que l'image remplisse la page A4
      // en conservant le ratio si nécessaire
      const imgRatio = img.width / img.height
      const pdfRatio = pdfWidth / pdfHeight

      let finalWidth = pdfWidth
      let finalHeight = pdfHeight
      let xOffset = 0
      let yOffset = 0

      if (imgRatio > pdfRatio) {
        // Image plus large - ajuster à la largeur
        finalHeight = pdfWidth / imgRatio
        yOffset = (pdfHeight - finalHeight) / 2
      } else if (imgRatio < pdfRatio) {
        // Image plus haute - ajuster à la hauteur
        finalWidth = pdfHeight * imgRatio
        xOffset = (pdfWidth - finalWidth) / 2
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

  // Formater l'heure de la dernière sauvegarde
  const formatLastSaved = (date: Date | null) => {
    if (!date) return null
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div>
      {/* Header - Responsive */}
      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray-500 text-sm">Template: {resume.template}</p>
            {/* Indicateur de sauvegarde */}
            {isAutoSaving ? (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Sauvegarde...
              </span>
            ) : hasUnsavedChanges ? (
              <span className="flex items-center gap-1 text-xs text-orange-600">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                Modifications non sauvegardées
              </span>
            ) : lastSaved ? (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Sauvegardé à {formatLastSaved(lastSaved)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/resumes')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Retour</span>
          </Button>
          <Button variant="outline" onClick={handleSyncProfile} disabled={isSyncing}>
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin sm:mr-2" />
            ) : (
              <Upload className="w-4 h-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{isSyncing ? 'Import...' : 'Importer du profil'}</span>
          </Button>
          <Button variant="outline" onClick={calculateATS} disabled={isAtsLoading}>
            {isAtsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin sm:mr-2" />
            ) : !canAccessPremiumFeatures ? (
              <Lock className="w-4 h-4 sm:mr-2" />
            ) : (
              <Target className="w-4 h-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{isAtsLoading ? 'Analyse...' : 'Score ATS'}</span>
          </Button>
          <Button onClick={handleSave} isLoading={isLoading}>
            <Save className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Sauvegarder</span>
          </Button>
        </div>
      </div>

      {/* Tabs - Sticky on mobile */}
      <div className="flex gap-2 mb-6 border-b sticky top-0 bg-white z-10 -mx-4 px-4 md:static md:mx-0 md:px-0">
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

      {/* Banner paiement requis pour IA/ATS */}
      {!canAccessPremiumFeatures && (
        <PaymentRequired
          onUnlock={() => setShowCheckoutModal(true)}
          className="mb-6"
          message="Débloquez les fonctionnalités premium (suggestions IA et score ATS) pour 4,99 €."
        />
      )}

      {/* Panneau Score ATS */}
      {showAtsPanel && (
        <div className="mb-6 bg-white rounded-xl border p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Analyse ATS de votre CV
            </h3>
            <button
              onClick={() => setShowAtsPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isAtsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
              <span className="ml-3 text-gray-600">Analyse en cours...</span>
            </div>
          ) : atsScore ? (
            <div className="space-y-6">
              {/* Score principal */}
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold ${
                  atsScore.score >= 80 ? 'bg-green-100 text-green-700' :
                  atsScore.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {atsScore.score}
                </div>
                <p className="mt-2 text-gray-600">Score ATS global</p>
              </div>

              {/* Breakdown - Responsive grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Formatage', value: atsScore.breakdown.formatting, icon: FileType },
                  { label: 'Mots-clés', value: atsScore.breakdown.keywords, icon: Key },
                  { label: 'Structure', value: atsScore.breakdown.structure, icon: Building2 },
                  { label: 'Contenu', value: atsScore.breakdown.content, icon: FileText },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                      <div className={`text-lg font-semibold ${
                        item.value >= 80 ? 'text-green-600' :
                        item.value >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Suggestions */}
              {atsScore.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Suggestions d'amélioration
                  </h4>
                  <ul className="space-y-2">
                    {atsScore.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-yellow-500">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mots-clés - Responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atsScore.matchedKeywords.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Mots-clés présents
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {atsScore.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {atsScore.missingKeywords.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Mots-clés manquants
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {atsScore.missingKeywords.map((kw, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}

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

          {/* Informations personnelles - Responsive grid */}
          <section className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="col-span-1 md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <Label>Résumé professionnel</Label>
                  <button
                    type="button"
                    onClick={() => improveWithAI(
                      personalInfo.summary,
                      'summary',
                      (suggestion) => handlePersonalInfoChange('summary', suggestion)
                    )}
                    disabled={isAiLoading === 'summary'}
                    className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 flex items-center gap-1"
                  >
                    {isAiLoading === 'summary' ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Amélioration...
                      </>
                    ) : !canAccessPremiumFeatures ? (
                      <>
                        <Lock className="w-3 h-3" />
                        Améliorer avec IA
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Améliorer avec IA
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-lg text-gray-900"
                  value={personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  placeholder="Décrivez votre profil..."
                />
              </div>
            </div>
          </section>

          {/* Expériences avec Drag & Drop */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Expériences ({experiences.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addExperience}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            {experiences.length > 0 ? (
              <SortableList
                items={experiences}
                onReorder={setExperiences}
                keyExtractor={(exp) => exp.id}
                direction="vertical"
                renderItem={(exp, dragHandleProps) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    onUpdate={(data) => updateExperience(exp.id, data)}
                    onDelete={() => deleteExperience(exp.id)}
                    onImproveWithAI={(description, onSuccess) => {
                      improveWithAI(description, 'experience', onSuccess)
                    }}
                    dragHandleProps={dragHandleProps}
                  />
                )}
              />
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">Aucune expérience ajoutée</p>
            )}
          </section>

          {/* Formations avec Drag & Drop */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Formations ({educations.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addEducation}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            {educations.length > 0 ? (
              <SortableList
                items={educations}
                onReorder={setEducations}
                keyExtractor={(edu) => edu.id}
                direction="vertical"
                renderItem={(edu, dragHandleProps) => (
                  <EducationCard
                    key={edu.id}
                    education={edu}
                    onUpdate={(data) => updateEducation(edu.id, data)}
                    onDelete={() => deleteEducation(edu.id)}
                    dragHandleProps={dragHandleProps}
                  />
                )}
              />
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">Aucune formation ajoutée</p>
            )}
          </section>

          {/* Compétences avec Drag & Drop */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Compétences ({skills.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addSkill}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            {skills.length > 0 ? (
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <SortableList
                  items={skills}
                  onReorder={setSkills}
                  keyExtractor={(skill) => skill.id}
                  direction="horizontal"
                  renderItem={(skill, dragHandleProps) => (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      onUpdate={(data) => updateSkill(skill.id, data)}
                      onDelete={() => deleteSkill(skill.id)}
                      dragHandleProps={dragHandleProps}
                    />
                  )}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune compétence ajoutée</p>
            )}
          </section>

          {/* Langues avec Drag & Drop */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Langues ({languages.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addLanguage}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            {languages.length > 0 ? (
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <SortableList
                  items={languages}
                  onReorder={setLanguages}
                  keyExtractor={(lang) => lang.id}
                  direction="horizontal"
                  renderItem={(lang, dragHandleProps) => (
                    <LanguageBadge
                      key={lang.id}
                      language={lang}
                      onUpdate={(data) => updateLanguage(lang.id, data)}
                      onDelete={() => deleteLanguage(lang.id)}
                      dragHandleProps={dragHandleProps}
                    />
                  )}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune langue ajoutée</p>
            )}
          </section>

          {/* Centres d'intérêt avec Drag & Drop */}
          <section className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Centres d'intérêt ({interests.length})
              </h2>
              <Button variant="outline" size="sm" onClick={addInterest}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            {interests.length > 0 ? (
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <SortableList
                  items={interests}
                  onReorder={setInterests}
                  keyExtractor={(interest) => interest.id}
                  direction="horizontal"
                  renderItem={(interest, dragHandleProps) => (
                    <InterestBadge
                      key={interest.id}
                      interest={interest}
                      onUpdate={(data) => updateInterest(interest.id, data)}
                      onDelete={() => deleteInterest(interest.id)}
                      dragHandleProps={dragHandleProps}
                    />
                  )}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucun centre d'intérêt ajouté</p>
            )}
          </section>
        </div>
      ) : (
        /* Preview */
        <div className="bg-gray-100 p-4 md:p-8 rounded-xl">
          <div className="mb-4 flex justify-end">
            <Button onClick={downloadPDF} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </>
              )}
            </Button>
          </div>
          {/* Container avec scroll et centrage pour l'aperçu A4 */}
          <div className="overflow-auto">
            <div className="min-w-fit flex justify-center">
              <div
                ref={cvRef}
                data-cv-container
                style={{
                  width: '21cm',
                  minHeight: '29.7cm',
                  transformOrigin: 'top center',
                }}
              >
                {(() => {
                  const templateKey = (resume.template as TemplateType) || 'MODERN'
                  const TemplateComponent = templates[templateKey] || templates.MODERN
                  return <TemplateComponent data={cvData} />
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialogs de confirmation */}
      <syncProfileDialog.ConfirmDialogComponent />

      {/* Modal de paiement */}
      <CheckoutModal
        open={showCheckoutModal}
        onOpenChange={setShowCheckoutModal}
        resumeId={resume.id}
        resumeTitle={title}
      />
    </div>
  )
}

// Composant ExperienceCard avec Drag Handle
interface ExperienceCardProps {
  experience: ExperienceData
  onUpdate: (data: Partial<ExperienceData>) => void
  onDelete: () => void
  onImproveWithAI?: (description: string, onSuccess: (suggestion: string) => void) => void
  dragHandleProps: DragHandleProps
}

function ExperienceCard({ experience, onUpdate, onDelete, onImproveWithAI, dragHandleProps }: ExperienceCardProps) {
  const [data, setData] = useState(experience)
  const [editing, setEditing] = useState(!experience.company)
  const [improving, setImproving] = useState(false)

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <div className="flex justify-between items-center mb-1">
            <Label>Description</Label>
            {onImproveWithAI && (
              <button
                type="button"
                onClick={() => {
                  if (!data.description?.trim()) {
                    return
                  }
                  setImproving(true)
                  onImproveWithAI(data.description, (suggestion) => {
                    handleChange('description', suggestion)
                    setImproving(false)
                  })
                }}
                disabled={improving || !data.description?.trim()}
                className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 flex items-center gap-1"
              >
                {improving ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    ...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    IA
                  </>
                )}
              </button>
            )}
          </div>
          <textarea
            placeholder="Décrivez vos responsabilités et accomplissements..."
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value || null)}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 min-h-[80px]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={save}>
            <Check className="w-4 h-4 mr-1" />
            Valider
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
            Annuler
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Supprimer
          </Button>
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
        {data.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{data.description}</p>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

// Composant EducationCard avec Drag Handle
interface EducationCardProps {
  education: EducationData
  onUpdate: (data: Partial<EducationData>) => void
  onDelete: () => void
  dragHandleProps: DragHandleProps
}

function EducationCard({ education, onUpdate, onDelete, dragHandleProps }: EducationCardProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={save}>
            <Check className="w-4 h-4 mr-1" />
            Valider
          </Button>
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
        <p className="text-sm text-gray-500">
          {formatDate(data.startDate)} - {data.endDate ? formatDate(data.endDate) : 'En cours'}
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Modifier</Button>
    </div>
  )
}

// Composant SkillBadge avec Drag Handle
interface SkillBadgeProps {
  skill: SkillData
  onUpdate: (data: Partial<SkillData>) => void
  onDelete: () => void
  dragHandleProps: DragHandleProps
}

const skillLevelLabels: Record<SkillLevel, string> = {
  BEGINNER: 'Débutant',
  INTERMEDIATE: 'Intermédiaire',
  ADVANCED: 'Avancé',
  EXPERT: 'Expert',
}

function SkillBadge({ skill, onUpdate, onDelete, dragHandleProps }: SkillBadgeProps) {
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
        <button onClick={save} className="text-green-600 hover:text-green-700 p-1">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-blue-400 hover:text-blue-600 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <span className="text-xs text-blue-600">({skillLevelLabels[data.level]})</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

// Composant LanguageBadge avec Drag Handle
interface LanguageBadgeProps {
  language: LanguageData
  onUpdate: (data: Partial<LanguageData>) => void
  onDelete: () => void
  dragHandleProps: DragHandleProps
}

const languageLevelLabels: Record<LanguageLevel, string> = {
  BEGINNER: 'Débutant',
  INTERMEDIATE: 'Intermédiaire',
  ADVANCED: 'Avancé',
  FLUENT: 'Courant',
  NATIVE: 'Natif',
}

function LanguageBadge({ language, onUpdate, onDelete, dragHandleProps }: LanguageBadgeProps) {
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
        <button onClick={save} className="text-green-600 hover:text-green-700 p-1">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-green-400 hover:text-green-600 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <span className="text-xs text-green-600">({languageLevelLabels[data.level]})</span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

// Composant InterestBadge avec Drag Handle
interface InterestBadgeProps {
  interest: InterestData
  onUpdate: (data: Partial<InterestData>) => void
  onDelete: () => void
  dragHandleProps: DragHandleProps
}

function InterestBadge({ interest, onUpdate, onDelete, dragHandleProps }: InterestBadgeProps) {
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
        <button onClick={save} className="text-green-600 hover:text-green-700 p-1">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-purple-100 text-purple-800 rounded-full px-3 py-1">
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-purple-400 hover:text-purple-600 touch-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <span className="text-xs">⋮⋮</span>
      </button>
      <span className="text-sm cursor-pointer" onClick={() => setEditing(true)}>
        {data.name}
      </span>
      <button onClick={onDelete} className="hover:text-red-500 ml-1">
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}
