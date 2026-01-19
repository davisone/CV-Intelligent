'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const templates = [
  {
    id: 'MODERN',
    name: 'Modern',
    description: 'Design épuré avec une mise en page contemporaine. Idéal pour les métiers créatifs et tech.',
    color: 'from-blue-500 to-purple-600',
    icon: '🎨',
    features: ['Design coloré', 'Sections visuelles', 'Photo de profil'],
  },
  {
    id: 'CLASSIC',
    name: 'Classic',
    description: 'Style traditionnel et professionnel. Parfait pour les secteurs conventionnels.',
    color: 'from-gray-600 to-gray-800',
    icon: '📋',
    features: ['Sobre et élégant', 'Lecture facile', 'Formel'],
  },
  {
    id: 'ATS',
    name: 'ATS-Friendly',
    description: 'Optimisé pour les systèmes de recrutement automatisés. Maximise vos chances d\'être sélectionné.',
    color: 'from-green-500 to-teal-600',
    icon: '🤖',
    features: ['Compatible ATS', 'Mots-clés optimisés', 'Format simple'],
  },
  {
    id: 'MINIMAL',
    name: 'Minimal',
    description: 'Minimaliste et efficace. Laissez votre contenu parler de lui-même.',
    color: 'from-slate-400 to-slate-600',
    icon: '✨',
    features: ['Ultra-simple', 'Beaucoup d\'espace', 'Focus contenu'],
  },
  {
    id: 'CREATIVE',
    name: 'Creative',
    description: 'Audacieux et original. Démarquez-vous avec un design unique.',
    color: 'from-pink-500 to-orange-500',
    icon: '🚀',
    features: ['Design unique', 'Infographies', 'Personnalisable'],
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    setShowModal(true)
  }

  const handleCreateCV = async () => {
    if (!title.trim()) {
      toast.error('Veuillez entrer un titre')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          template: selectedTemplate,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('CV créé avec succès !')
        router.push(`/dashboard/resumes/${data.data.id}/edit`)
      } else {
        toast.error(data.error || 'Erreur lors de la création')
      }
    } catch {
      toast.error('Erreur serveur')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-500 mt-1">
          Choisissez un template pour créer votre CV
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Preview Header */}
            <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
              <span className="text-5xl">{template.icon}</span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {template.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={() => handleSelectTemplate(template.id)}
              >
                Utiliser ce template
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Créer un CV avec le template {templates.find(t => t.id === selectedTemplate)?.name}
            </h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Titre du CV
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: CV Développeur 2024"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false)
                  setTitle('')
                }}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateCV}
                isLoading={isLoading}
              >
                Créer le CV
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
