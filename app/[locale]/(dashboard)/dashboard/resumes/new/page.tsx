'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TemplateType } from '@prisma/client'

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: 'MODERN', name: 'Modern', description: 'Design épuré et contemporain' },
  { id: 'CLASSIC', name: 'Classic', description: 'Style traditionnel et professionnel' },
  { id: 'ATS', name: 'ATS', description: 'Optimisé pour les systèmes de recrutement' },
]

export default function NewResumePage() {
  const router = useRouter()
  const t = useTranslations('dashboard.resumes')
  const tCommon = useTranslations('common')
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('MODERN')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Le titre est requis')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          template: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création')
      }

      toast.success('CV créé avec succès !')
      router.push(`/dashboard/resumes/${data.data.id}/edit`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue'
      toast.error(message)
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('new')}</h1>
        <p className="text-muted-foreground mt-1">
          Choisissez un titre et un template pour commencer
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">Titre du CV</Label>
              <Input
                id="title"
                placeholder="Ex: CV Développeur Full-Stack 2024"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setError('')
                }}
                error={error}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Template</CardTitle>
            <CardDescription>
              Sélectionnez le style visuel de votre CV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                  disabled={isLoading}
                >
                  <div className="h-24 bg-gray-100 rounded mb-3 flex items-center justify-center text-2xl">
                    {template.id === 'MODERN' && '🎨'}
                    {template.id === 'CLASSIC' && '📋'}
                    {template.id === 'ATS' && '🤖'}
                  </div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            {tCommon('cancel')}
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Créer le CV
          </Button>
        </div>
      </form>
    </div>
  )
}