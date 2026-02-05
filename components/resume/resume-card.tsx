'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils/helpers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { TemplateType } from '@prisma/client'

interface ResumeCardProps {
  id: string
  title: string
  template: TemplateType
  updatedAt: Date
  onDelete?: (id: string) => void
}

const templateLabels: Record<TemplateType, string> = {
  MODERN: 'Modern',
  CLASSIC: 'Classic',
  ATS: 'ATS',
  MINIMAL: 'Minimal',
  CREATIVE: 'Creative',
}

export function ResumeCard({ id, title, template, updatedAt, onDelete }: ResumeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Impossible de supprimer')
      }

      toast.success('CV supprimé')
      onDelete?.(id)
    } catch {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="hover:shadow-lg hover:border-[#722F37]/50 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg truncate">{title}</CardTitle>
          <span className="text-xs bg-[#722F37]/10 text-[#722F37] px-2 py-1 rounded border border-[#722F37]/20">
            {templateLabels[template]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-[#6B6560]">
          Modifié le {formatDate(updatedAt, { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/dashboard/resumes/${id}/edit`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            Modifier
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '...' : 'Supprimer'}
        </Button>
      </CardFooter>
    </Card>
  )
}