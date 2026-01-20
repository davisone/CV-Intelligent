'use client'

import Link from 'next/link'
import { useState } from 'react'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Design épuré avec une touche de couleur',
    color: 'from-blue-500 to-blue-600',
    features: ['En-tête coloré', 'Mise en page moderne', 'Icônes sociales'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Format traditionnel et professionnel',
    color: 'from-gray-600 to-gray-700',
    features: ['Structure classique', 'Sobre et élégant', 'Polyvalent'],
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Optimisé pour les systèmes de tri automatique',
    color: 'from-green-500 to-green-600',
    features: ['100% compatible ATS', 'Sans colonnes', 'Texte simple'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simplicité et élégance',
    color: 'from-slate-500 to-slate-600',
    features: ['Design minimaliste', 'Beaucoup d\'espace', 'Focus sur le contenu'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Pour les profils créatifs et audacieux',
    color: 'from-pink-500 to-purple-600',
    features: ['Sidebar colorée', 'Photo de profil', 'Design unique'],
  },
]

export default function PublicTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ResumeForge
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nos Templates de CV</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez parmi nos templates professionnels et créez votre CV en quelques minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Preview Header */}
                <div className={`h-32 bg-gradient-to-br ${template.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <span className="text-white text-lg font-semibold">{template.name}</span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                  <div className="space-y-2">
                    {template.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/signup"
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Utiliser ce template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Prêt à créer votre CV ?</h2>
              <p className="text-muted-foreground mb-6">
                Inscrivez-vous gratuitement et commencez à créer votre CV professionnel dès maintenant.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Créer mon CV gratuitement
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ResumeForge. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}