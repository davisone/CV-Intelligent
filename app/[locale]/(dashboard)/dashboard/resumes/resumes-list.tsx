'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { FileText, Copy, Trash2, Plus, Loader2 } from '@/components/ui/icons'

interface Resume {
  id: string
  title: string
  template: string
  updatedAt: Date
  personalInfo: {
    firstName: string
    lastName: string
  } | null
  _count: {
    experiences: number
    educations: number
    skills: number
    languages: number
    interests: number
  }
}

const templateNames: Record<string, string> = {
  MODERN: 'Modern',
  CLASSIC: 'Classic',
  ATS: 'ATS-Friendly',
  MINIMAL: 'Minimal',
  CREATIVE: 'Creative',
}

const templateColors: Record<string, string> = {
  MODERN: 'bg-blue-500',
  CLASSIC: 'bg-gray-600',
  ATS: 'bg-green-500',
  MINIMAL: 'bg-slate-400',
  CREATIVE: 'bg-pink-500',
}

export function ResumesList({ initialResumes }: { initialResumes: Resume[] }) {
  const router = useRouter()
  const t = useTranslations('dashboard.resumes')
  const tCommon = useTranslations('common')
  const [resumes, setResumes] = useState(initialResumes)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null)
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [editingTitleValue, setEditingTitleValue] = useState('')

  const openDeleteDialog = (id: string) => {
    setResumeToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!resumeToDelete) return

    const id = resumeToDelete
    setDeletingId(id)
    setDeleteDialogOpen(false)

    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' })

      if (res.ok) {
        setResumes(prev => prev.filter(r => r.id !== id))
        toast.success(t('deleteSuccess'))
      } else {
        toast.error(t('deleteError'))
      }
    } catch {
      toast.error(t('serverError'))
    } finally {
      setDeletingId(null)
      setResumeToDelete(null)
    }
  }

  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id)
    try {
      const res = await fetch(`/api/resumes/${id}/duplicate`, { method: 'POST' })
      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(t('duplicateSuccess'))
        router.refresh()
      } else {
        toast.error(data.error || t('duplicateError'))
      }
    } catch {
      toast.error(t('serverError'))
    } finally {
      setDuplicatingId(null)
    }
  }

  const startEditingTitle = (resume: Resume) => {
    setEditingTitleId(resume.id)
    setEditingTitleValue(resume.title)
  }

  const saveTitle = async (id: string) => {
    const newTitle = editingTitleValue.trim()
    setEditingTitleId(null)

    const currentResume = resumes.find(r => r.id === id)
    if (!newTitle || newTitle === currentResume?.title) return

    setResumes(prev => prev.map(r => r.id === id ? { ...r, title: newTitle } : r))

    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      })

      if (res.ok) {
        toast.success(t('renameSuccess'))
      } else {
        setResumes(prev => prev.map(r => r.id === id ? { ...r, title: currentResume!.title } : r))
        toast.error(t('renameError'))
      }
    } catch {
      setResumes(prev => prev.map(r => r.id === id ? { ...r, title: currentResume!.title } : r))
      toast.error(t('serverError'))
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8]">
        <EmptyState
          title={t('empty')}
          description={t('emptySubtitle')}
          actionLabel={t('new')}
          actionHref="/dashboard/templates"
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex justify-end">
        <Link href="/dashboard/templates">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t('new')}
          </Button>
        </Link>
      </div>

      {/* Resumes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Template indicator */}
            <div className={`h-2 ${templateColors[resume.template] || 'bg-gray-400'}`} />

            <div className="p-5">
              {/* Title */}
              {editingTitleId === resume.id ? (
                <input
                  autoFocus
                  className="font-semibold text-gray-900 text-lg mb-1 w-full border-b border-[#722F37] outline-none bg-transparent"
                  value={editingTitleValue}
                  onChange={e => setEditingTitleValue(e.target.value)}
                  onBlur={() => saveTitle(resume.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveTitle(resume.id)
                    if (e.key === 'Escape') setEditingTitleId(null)
                  }}
                />
              ) : (
                <h3
                  className="font-semibold text-gray-900 text-lg mb-1 truncate cursor-pointer hover:text-[#722F37] transition-colors"
                  onClick={() => startEditingTitle(resume)}
                  title="Cliquer pour renommer"
                >
                  {resume.title}
                </h3>
              )}

              {/* Name if available */}
              {resume.personalInfo && (
                <p className="text-gray-600 text-sm mb-2">
                  {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                </p>
              )}

              {/* Template badge */}
              <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mb-3">
                {templateNames[resume.template] || resume.template}
              </span>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                <span>{resume._count.experiences} exp.</span>
                <span>{resume._count.educations} form.</span>
                <span>{resume._count.skills} comp.</span>
                <span>{resume._count.languages} lang.</span>
                <span>{resume._count.interests} int.</span>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mb-4">
                {t('updatedAt', { date: formatDate(resume.updatedAt) })}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/dashboard/resumes/${resume.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    {t('edit')}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleDuplicate(resume.id)}
                  disabled={duplicatingId === resume.id}
                  title={t('duplicate')}
                  className="px-3"
                >
                  {duplicatingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDeleteDialog(resume.id)}
                  disabled={deletingId === resume.id}
                  title={t('delete')}
                  className="px-3"
                >
                  {deletingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog de confirmation de suppression */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t('deleteConfirm')}
        description={t('deleteWarning')}
        confirmLabel={t('delete')}
        cancelLabel={tCommon('cancel')}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  )
}
