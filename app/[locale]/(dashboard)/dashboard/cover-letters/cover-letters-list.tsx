'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { PenLine, Trash2, Plus, Loader2, FileText } from '@/components/ui/icons'

interface Resume {
  id: string
  title: string
  isPaid: boolean
}

interface CoverLetter {
  id: string
  title: string
  jobTitle: string | null
  company: string | null
  updatedAt: Date
  isAIPaid: boolean
  resume: Resume
}

interface Props {
  initialCoverLetters: CoverLetter[]
  resumes: Resume[]
}

export function CoverLettersList({ initialCoverLetters, resumes }: Props) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('dashboard.coverLetters')
  const tCommon = useTranslations('common')

  const [coverLetters, setCoverLetters] = useState(initialCoverLetters)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (resumes.length === 0) {
      toast.error('Créez d\'abord un CV avant d\'ajouter une lettre de motivation')
      return
    }
    setCreating(true)
    try {
      const res = await fetch('/api/cover-letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId: resumes[0]!.id,
          title: t('createTitle'),
          content: '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/${locale}/dashboard/cover-letters/${data.data.id}/edit`)
    } catch {
      toast.error(t('serverError'))
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/cover-letters/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setCoverLetters(prev => prev.filter(cl => cl.id !== id))
      toast.success(t('deleteSuccess'))
    } catch {
      toast.error(t('deleteError'))
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreate} disabled={creating} className="bg-[#722F37] hover:bg-[#5a252c] text-white">
          {creating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
          {t('new')}
        </Button>
      </div>

      {coverLetters.length === 0 ? (
        <div className="text-center py-16">
          <PenLine className="w-12 h-12 text-[#722F37]/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1F1A17] mb-2">{t('empty')}</h3>
          <p className="text-[#6B6560] text-sm">{t('emptySubtitle')}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coverLetters.map(cl => (
            <div
              key={cl.id}
              className="bg-white border border-[#E0D6C8] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1F1A17] truncate">{cl.title}</h3>
                  {(cl.jobTitle || cl.company) && (
                    <p className="text-sm text-[#6B6560] truncate mt-0.5">
                      {[cl.jobTitle, cl.company].filter(Boolean).join(' — ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#6B6560]">
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{cl.resume.title}</span>
              </div>

              <p className="text-xs text-[#9B9590]">
                {t('updatedAt', { date: new Date(cl.updatedAt).toLocaleDateString(locale) })}
              </p>

              <div className="flex gap-2 mt-auto pt-2">
                <Link
                  href={`/dashboard/cover-letters/${cl.id}/edit`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full border-[#722F37]/30 text-[#722F37] hover:bg-[#722F37]/5">
                    <PenLine className="w-3.5 h-3.5 mr-1.5" />
                    {t('edit')}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(cl.id)}
                  className="border-red-200 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={open => { if (!open) setDeleteId(null) }}
        onConfirm={() => { if (deleteId) handleDelete(deleteId) }}
        title={t('deleteConfirm')}
        description={t('deleteWarning')}
        confirmLabel={t('delete')}
        cancelLabel={tCommon('cancel')}
        variant="destructive"
      />
    </>
  )
}
