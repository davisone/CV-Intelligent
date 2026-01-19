'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ResumeWithRelations } from '@/types/resume'

interface ResumeEditorProps {
  resume: ResumeWithRelations
}

export function ResumeEditor({ resume }: ResumeEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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
  })

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
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      toast.success('CV sauvegardé !')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Éditer le CV</h1>
          <p className="text-muted-foreground mt-1">
            Modifiez les informations de votre CV
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Retour
          </Button>
          <Button onClick={handleSave} isLoading={isLoading}>
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Titre */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Titre du CV</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du CV"
          />
        </CardContent>
      </Card>

      {/* Informations personnelles */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prénom</Label>
              <Input
                value={personalInfo.firstName}
                onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                placeholder="Jean"
              />
            </div>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                value={personalInfo.lastName}
                onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                placeholder="Dupont"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                placeholder="jean@exemple.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ville</Label>
              <Input
                value={personalInfo.city}
                onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                placeholder="Paris"
              />
            </div>
            <div className="space-y-2">
              <Label>Pays</Label>
              <Input
                value={personalInfo.country}
                onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                placeholder="France"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input
                value={personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input
                value={personalInfo.github}
                onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Résumé professionnel</Label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              placeholder="Décrivez votre profil en quelques phrases..."
            />
          </div>
        </CardContent>
      </Card>

      {/* TODO: Ajouter les sections Expériences, Formations, Compétences */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sections à venir</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Les sections suivantes seront bientôt disponibles :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Expériences professionnelles</li>
            <li>Formations</li>
            <li>Compétences</li>
            <li>Langues</li>
            <li>Projets</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
        <Button onClick={handleSave} isLoading={isLoading}>
          Sauvegarder
        </Button>
      </div>
    </div>
  )
}