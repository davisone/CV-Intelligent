'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { RichTextEditor, type RichTextEditorRef } from '@/components/ui/rich-text-editor'
import { ArrowLeft, Save, Sparkles, FileDown, Loader2 } from '@/components/ui/icons'
import { COVER_LETTER_AI_PRICING } from '@/lib/config/pricing'
import { ReviewPromptModal } from '@/components/review-prompt'

interface Resume {
  id: string
  title: string
  isPaid: boolean
}

interface CoverLetter {
  id: string
  title: string
  content: string
  jobTitle: string | null
  company: string | null
  resumeId: string
  isAIPaid: boolean
  aiGenerationsUsed: number
  resume: Resume
}

interface Props {
  coverLetter: CoverLetter
  resumes: Resume[]
  aiJustUnlocked: boolean
}

export function CoverLetterEditor({ coverLetter, resumes, aiJustUnlocked }: Props) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('dashboard.coverLetters')

  const [title, setTitle] = useState(coverLetter.title)
  const [content, setContent] = useState(coverLetter.content)
  const [jobTitle, setJobTitle] = useState(coverLetter.jobTitle ?? '')
  const [company, setCompany] = useState(coverLetter.company ?? '')
  const [resumeId, setResumeId] = useState(coverLetter.resumeId)

  const [saving, setSaving] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [showReviewPrompt, setShowReviewPrompt] = useState(false)
  const [isAIPaid, setIsAIPaid] = useState(coverLetter.isAIPaid)
  const [aiGenerationsUsed, setAiGenerationsUsed] = useState(coverLetter.aiGenerationsUsed)
  const aiGenerationsRemaining = COVER_LETTER_AI_PRICING.maxGenerations - aiGenerationsUsed

  const editorRef = useRef<RichTextEditorRef>(null)
  const selectedResume = resumes.find(r => r.id === resumeId)
  const aiIsFree = selectedResume?.isPaid || isAIPaid

  // Si IA vient d'être débloquée, marquer comme payé et générer auto
  useEffect(() => {
    if (aiJustUnlocked && !isAIPaid) {
      setIsAIPaid(true)
      toast.success(t('generateAISuccess'))
    }
  }, [aiJustUnlocked, isAIPaid, t])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch(`/api/cover-letters/${coverLetter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, jobTitle: jobTitle || null, company: company || null, resumeId }),
      })
      if (!res.ok) throw new Error()
      toast.success(t('saveSuccess'))
      router.refresh()
    } catch {
      toast.error(t('saveError'))
    } finally {
      setSaving(false)
    }
  }

  async function handleGenerateAI() {
    if (!resumeId) {
      toast.error(t('noResumeSelected'))
      return
    }

    // Sauvegarder d'abord pour avoir jobTitle/company à jour
    await handleSave()

    if (!aiIsFree) {
      // Lancer le checkout Stripe
      setGeneratingAI(true)
      try {
        const res = await fetch(`/api/cover-letters/${coverLetter.id}/ai-checkout`, {
          method: 'POST',
        })
        const data = await res.json()
        if (data.free) {
          setIsAIPaid(true)
          await triggerGeneration()
        } else if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error()
        }
      } catch {
        toast.error(t('generateAIError'))
        setGeneratingAI(false)
      }
      return
    }

    await triggerGeneration()
  }

  async function triggerGeneration() {
    setGeneratingAI(true)
    try {
      const res = await fetch(`/api/cover-letters/${coverLetter.id}/generate`, {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setContent(data.data.content)
      editorRef.current?.setContent(data.data.content)
      setAiGenerationsUsed(data.data.aiGenerationsUsed)
      toast.success(t('generateAISuccess'))
    } catch {
      toast.error(t('generateAIError'))
    } finally {
      setGeneratingAI(false)
    }
  }

  async function handleExportPdf() {
    setExportingPdf(true)
    try {
      // Sauvegarder avant export
      await handleSave()
      const res = await fetch(`/api/cover-letters/${coverLetter.id}/pdf`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/\s+/g, '_')}_lettre.pdf`
      a.click()
      URL.revokeObjectURL(url)
      setShowReviewPrompt(true)
    } catch {
      toast.error(t('exportPdfError'))
    } finally {
      setExportingPdf(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/cover-letters">
          <Button variant="ghost" size="sm" className="text-[#6B6560] hover:text-[#1F1A17]">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            {t('backToList')}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1F1A17] flex-1">{t('editTitle')}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="border-[#E0D6C8]"
          >
            {exportingPdf ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <FileDown className="w-4 h-4 mr-1.5" />}
            {exportingPdf ? t('exportPdfLoading') : t('exportPdf')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#722F37] hover:bg-[#5a252c] text-white"
            size="sm"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
            {t('save')}
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Métadonnées */}
        <div className="bg-white border border-[#E0D6C8] rounded-xl p-5 space-y-4">
          <div>
            <Label htmlFor="title">{t('titleLabel')}</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">{t('jobTitleLabel')}</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder={t('jobTitlePlaceholder')}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="company">{t('companyLabel')}</Label>
              <Input
                id="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder={t('companyPlaceholder')}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="resume">{t('resumeLabel')}</Label>
            <Select
              id="resume"
              value={resumeId}
              onChange={e => setResumeId(e.target.value)}
              className="mt-1.5 w-full"
            >
              {resumes.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Éditeur de contenu */}
        <div className="bg-white border border-[#E0D6C8] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <Label>{t('contentLabel')}</Label>
            <div className="flex items-center gap-2">
              {(aiIsFree || isAIPaid) && aiGenerationsRemaining > 0 && (
                <span className="text-xs text-[#6B6560]">
                  {aiGenerationsRemaining}/{COVER_LETTER_AI_PRICING.maxGenerations} génération{aiGenerationsRemaining > 1 ? 's' : ''} restante{aiGenerationsRemaining > 1 ? 's' : ''}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateAI}
                disabled={generatingAI || !resumeId || aiGenerationsRemaining <= 0}
                className="border-[#722F37]/30 text-[#722F37] hover:bg-[#722F37]/5 disabled:opacity-50"
              >
                {generatingAI
                  ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  : <Sparkles className="w-4 h-4 mr-1.5" />
                }
                {generatingAI
                  ? t('generateAILoading')
                  : aiGenerationsRemaining <= 0
                    ? 'Limite atteinte'
                    : aiIsFree
                      ? t('generateAIFree')
                      : t('generateAIPaid', { price: COVER_LETTER_AI_PRICING.displayPrice })
                }
              </Button>
            </div>
          </div>
          <RichTextEditor
            ref={editorRef}
            content={content}
            onChange={setContent}
            placeholder={t('contentPlaceholder')}
          />
        </div>
      </div>
      {showReviewPrompt && (
        <ReviewPromptModal onClose={() => setShowReviewPrompt(false)} />
      )}
    </div>
  )
}
