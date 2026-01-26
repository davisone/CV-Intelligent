'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

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
  const [resumes, setResumes] = useState(initialResumes)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null)

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
        toast.success('CV supprimé')
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch {
      toast.error('Erreur serveur')
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
        toast.success('CV dupliqué avec succès')
        router.refresh()
      } else {
        toast.error(data.error || 'Erreur lors de la duplication')
      }
    } catch {
      toast.error('Erreur serveur')
    } finally {
      setDuplicatingId(null)
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
      <div className="text-center py-16 bg-white rounded-xl border">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Aucun CV pour le moment
        </h2>
        <p className="text-gray-500 mb-6">
          Créez votre premier CV en quelques clics
        </p>
        <Link href="/dashboard/templates">
          <Button>Créer un CV</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex justify-end">
        <Link href="/dashboard/templates">
          <Button>+ Nouveau CV</Button>
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
              <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                {resume.title}
              </h3>

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
                Modifié le {formatDate(resume.updatedAt)}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/dashboard/resumes/${resume.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Modifier
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleDuplicate(resume.id)}
                  disabled={duplicatingId === resume.id}
                  title="Dupliquer"
                >
                  {duplicatingId === resume.id ? '...' : '📋'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDeleteDialog(resume.id)}
                  disabled={deletingId === resume.id}
                  title="Supprimer"
                >
                  {deletingId === resume.id ? '...' : 'Supprimer'}
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
        title="Supprimer le CV"
        description="Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  )
}
