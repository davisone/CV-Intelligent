import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, CheckCircle2, Lightbulb, FileText, Sparkles, Target, Clock, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Comment Faire un CV en 2026 | Guide Complet pour Créer son CV',
  description: 'Comment faire un CV ? Guide complet et gratuit pour créer son CV professionnel : structure, conseils, exemples de CV et modèles. Apprenez à rédiger un CV qui décroche des entretiens.',
  keywords: [
    'comment faire un cv', 'comment créer un cv', 'comment rédiger un cv',
    'faire un cv', 'faire son cv', 'créer un cv', 'créer son cv', 'rédiger un cv',
    'cv conseils', 'structure cv', 'mise en page cv',
    'cv professionnel', 'cv gratuit', 'modèle cv', 'exemple cv', 'exemple de cv',
    'cv étudiant', 'premier cv', 'cv sans expérience', 'cv alternance', 'cv stage',
    'aide pour faire un cv', 'guide cv',
  ],
  alternates: {
    canonical: '/guide',
  },
  openGraph: {
    title: 'Comment Faire un CV en 2026 | Guide Complet Gratuit',
    description: 'Guide complet pour créer un CV professionnel. Structure, conseils, exemples et générateur gratuit avec IA.',
    type: 'article',
  },
}

const steps = [
  {
    icon: Target,
    title: 'Définir son objectif',
    description: 'Identifiez le poste visé et adaptez votre CV en conséquence. Chaque CV doit être personnalisé pour l\'offre d\'emploi.',
  },
  {
    icon: FileText,
    title: 'Choisir le bon format',
    description: 'CV chronologique, fonctionnel ou mixte ? Le format chronologique inversé est le plus recommandé et le mieux accepté par les ATS.',
  },
  {
    icon: Sparkles,
    title: 'Rédiger un titre accrocheur',
    description: 'Votre titre doit résumer votre profil en une ligne : métier, spécialité, années d\'expérience.',
  },
  {
    icon: CheckCircle2,
    title: 'Détailler les expériences',
    description: 'Pour chaque poste : entreprise, dates, missions et résultats chiffrés. Utilisez des verbes d\'action.',
  },
  {
    icon: Lightbulb,
    title: 'Mettre en avant les compétences',
    description: 'Listez vos compétences techniques et soft skills pertinentes pour le poste visé.',
  },
  {
    icon: Download,
    title: 'Exporter et envoyer',
    description: 'Téléchargez votre CV en PDF pour conserver la mise en page. Nommez le fichier professionnellement.',
  },
]

const tips = [
  'Limitez votre CV à une ou deux pages maximum',
  'Utilisez une police lisible (Arial, Calibri, Helvetica)',
  'Évitez les fautes d\'orthographe à tout prix',
  'Incluez des mots-clés de l\'offre d\'emploi',
  'Ajoutez une photo professionnelle (optionnel en France)',
  'Mettez vos coordonnées à jour',
  'Quantifiez vos réalisations avec des chiffres',
  'Adaptez chaque CV à l\'offre d\'emploi',
]

export default function GuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'Comment faire un CV', url: `${baseUrl}/guide` },
        ]}
      />

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
              Créer mon CV gratuit
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <FileText className="w-4 h-4" />
              Guide complet 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Comment faire un <span className="text-[#722F37]">CV parfait</span> ?
            </h1>
            <p className="text-lg text-[#6B6560] mb-8 max-w-2xl mx-auto">
              Découvrez notre guide complet pour créer un CV professionnel qui attire l&apos;attention des recruteurs.
              Conseils, structure, exemples et générateur gratuit avec IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV maintenant
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#etapes"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors"
              >
                Lire le guide
              </a>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section id="etapes" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Les 6 étapes pour créer un CV professionnel
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Suivez ces étapes pour rédiger un CV qui vous démarque des autres candidats
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-[#722F37]" />
                      <h3 className="text-xl font-bold text-[#1F1A17]">{step.title}</h3>
                    </div>
                    <p className="text-[#6B6560]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                8 conseils pour un CV réussi
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Structure Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Structure idéale d&apos;un CV
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              Un CV bien structuré facilite la lecture pour les recruteurs
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
                <h3 className="text-lg font-bold text-[#1F1A17] mb-4">En-tête</h3>
                <ul className="space-y-2 text-[#6B6560]">
                  <li>• Prénom et Nom</li>
                  <li>• Titre professionnel</li>
                  <li>• Coordonnées (email, téléphone)</li>
                  <li>• Ville de résidence</li>
                  <li>• LinkedIn (optionnel)</li>
                </ul>
              </div>

              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
                <h3 className="text-lg font-bold text-[#1F1A17] mb-4">Profil / Résumé</h3>
                <ul className="space-y-2 text-[#6B6560]">
                  <li>• 3-4 lignes maximum</li>
                  <li>• Vos points forts</li>
                  <li>• Votre valeur ajoutée</li>
                  <li>• Objectif professionnel</li>
                </ul>
              </div>

              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
                <h3 className="text-lg font-bold text-[#1F1A17] mb-4">Expériences</h3>
                <ul className="space-y-2 text-[#6B6560]">
                  <li>• Ordre chronologique inversé</li>
                  <li>• Poste, entreprise, dates</li>
                  <li>• Missions principales</li>
                  <li>• Résultats chiffrés</li>
                </ul>
              </div>

              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
                <h3 className="text-lg font-bold text-[#1F1A17] mb-4">Formation & Compétences</h3>
                <ul className="space-y-2 text-[#6B6560]">
                  <li>• Diplômes obtenus</li>
                  <li>• Établissements, années</li>
                  <li>• Compétences techniques</li>
                  <li>• Langues et niveaux</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#F3EDE5] rounded-3xl border border-[#E0D6C8] p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#722F37]" />
                <span className="text-sm text-[#722F37] font-medium">5 minutes seulement</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">
                Prêt à créer votre CV ?
              </h2>
              <p className="text-[#6B6560] mb-8 max-w-xl mx-auto">
                Utilisez notre générateur de CV gratuit avec intelligence artificielle.
                Créez un CV professionnel en quelques minutes, sans compétences en design.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#722F37] hover:bg-[#8B3A44] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-[#8A7F72]">
                Gratuit • Sans carte bancaire • Export PDF
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
