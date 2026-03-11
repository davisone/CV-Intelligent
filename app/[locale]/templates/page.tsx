'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Header */}
      <header className="border-b border-[#E0D6C8] bg-[#FBF8F4]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#722F37]">
            CV Builder
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#1F1A17] hover:text-[#722F37] transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] font-bold transition-colors"
              style={{ color: '#FFFFFF' }}
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
            <h1 className="text-4xl font-bold text-[#1F1A17] mb-4">Nos Templates de CV</h1>
            <p className="text-xl text-[#6B6560] max-w-2xl mx-auto">
              Choisissez parmi nos templates professionnels et créez votre CV en quelques minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#E0D6C8] shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
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
                  <h3 className="font-semibold text-lg text-[#1F1A17] mb-2">{template.name}</h3>
                  <p className="text-[#6B6560] text-sm mb-4">{template.description}</p>

                  <div className="space-y-2">
                    {template.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#6B6560]">
                        <svg className="w-4 h-4 text-[#722F37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/signup"
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-bold bg-[#722F37] hover:bg-[#8B3A44] rounded-xl transition-colors"
                    style={{ color: '#FFFFFF' }}
                  >
                    Utiliser ce template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-4">Prêt à créer votre CV ?</h2>
                <p className="text-[#FFFFFF]/80 mb-6">
                  Inscrivez-vous gratuitement et commencez à créer votre CV professionnel dès maintenant.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1F1A17] font-bold text-lg rounded-xl hover:bg-[#3D3530] transition-all hover:scale-[1.02]"
                  style={{ color: '#FFFFFF' }}
                >
                  Créer mon CV gratuitement
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0D6C8] py-8">
        <div className="container mx-auto px-4 text-center text-[#6B6560]">
          <p>&copy; {new Date().getFullYear()} CV Builder. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
