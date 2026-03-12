import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, Eye, Shield, Clock, Minimize2, CheckCircle2, FileText, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvMinimalistePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-minimaliste' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

// Pourquoi choisir un CV minimaliste
const reasons = [
  {
    icon: Eye,
    title: 'Clarté et lisibilité',
    description:
      'Un CV minimaliste va à l\'essentiel : le recruteur trouve l\'information en 6 secondes. Pas de fioriture, pas de surcharge — juste ce qui compte vraiment.',
  },
  {
    icon: Shield,
    title: 'Compatible ATS',
    description:
      'Les designs chargés perturbent les logiciels de tri automatique. Un CV épuré avec une structure claire est parsé sans erreur par tous les ATS.',
  },
  {
    icon: Clock,
    title: 'Intemporel et universel',
    description:
      'Le style minimaliste convient à tous les secteurs et reste toujours d\'actualité. Un recruteur de 2026 comme de 2030 lira votre CV sans être distrait par le style.',
  },
]

// Types de CV minimalistes et modernes
const cvTypes = [
  {
    title: 'CV Minimaliste',
    keyword: 'modèle cv minimaliste gratuit',
    description:
      'Fond blanc, typographie claire, mise en page aérée. Notre template Minimal est conçu pour mettre votre contenu en avant sans aucune distraction visuelle.',
  },
  {
    title: 'CV Moderne Gratuit',
    keyword: 'cv moderne gratuit pdf',
    description:
      'Une touche de couleur sobre, des sections bien délimitées : le CV moderne allie professionnalisme et design contemporain. Parfait pour la plupart des secteurs en 2026.',
  },
  {
    title: 'CV Simple Étudiant PDF',
    keyword: 'cv simple étudiant pdf gratuit',
    description:
      'Premier emploi, stage ou alternance : un CV simple et bien structuré suffit pour convaincre. Concentrez-vous sur votre contenu — notre template fait le reste.',
  },
  {
    title: 'CV Design Gratuit',
    keyword: 'cv design gratuit étudiant',
    description:
      'Un peu plus de personnalité sans sacrifier la lisibilité. Notre template Creative ajoute une touche visuelle unique tout en restant professionnel et compatible ATS.',
  },
]

// Étapes pour créer son CV minimaliste
const exportSteps = [
  {
    title: 'Créez un compte gratuitement',
    description: 'Inscription en 30 secondes, sans carte bancaire. Votre espace de création est immédiatement disponible.',
  },
  {
    title: 'Choisissez un template minimaliste',
    description: 'Modern, Minimal, ATS-Friendly ou Creative — sélectionnez le design qui correspond à votre profil et au poste visé.',
  },
  {
    title: 'Remplissez vos informations',
    description: 'Notre IA vous guide et optimise votre contenu : formulations, mots-clés, structure — tout est suggéré automatiquement.',
  },
  {
    title: 'Téléchargez votre CV en PDF',
    description: 'Votre CV minimaliste est généré instantanément en haute qualité. Téléchargement immédiat, prêt à envoyer.',
  },
]

// Conseils pour un CV minimaliste efficace
const tips = [
  'Limitez-vous à une seule police de caractères pour tout le CV',
  'Utilisez les blancs : un CV aéré se lit beaucoup mieux qu\'un CV chargé',
  'Une page suffit pour la plupart des profils juniors et étudiants',
  'Évitez les barres de compétences visuelles — préférez les listes textuelles, plus lisibles par les ATS',
  'Choisissez 1 couleur d\'accent maximum — notre template gère ça automatiquement',
]

// Questions fréquentes sur le CV minimaliste
const faqItems = [
  {
    question: 'CV minimaliste ou CV créatif : lequel choisir ?',
    answer:
      'Choisissez un CV minimaliste pour la majorité des secteurs : finance, IT, commerce, administration. Le CV créatif convient aux métiers artistiques (graphisme, communication, design). En cas de doute, le minimaliste est toujours le choix le plus sûr — il passe tous les filtres ATS et convient à tous les recruteurs.',
  },
  {
    question: 'Quel est le meilleur template CV pour un débutant ?',
    answer:
      'Pour un débutant, le template Minimal ou Modern est idéal : structure claire, sections bien définies, facile à remplir. Notre IA vous guide pour valoriser votre formation et vos compétences même sans expérience professionnelle. Export PDF instantané, sans logiciel à installer.',
  },
  {
    question: 'Comment créer un CV simple pour un premier emploi ?',
    answer:
      'Pour votre premier emploi, créez un compte gratuit sur CV Builder, choisissez le template Minimal ou Modern, remplissez vos informations avec l\'aide de notre IA, et téléchargez votre CV en PDF. En 5 minutes, vous avez un CV professionnel prêt à envoyer — même sans expérience.',
  },
  {
    question: 'Existe-t-il un CV moderne gratuit en PDF ?',
    answer:
      'Oui, CV Builder propose des templates CV modernes gratuits en PDF : Modern, Minimal, et ATS-Friendly sont disponibles gratuitement. Créez un compte, remplissez vos informations, et téléchargez votre CV PDF instantanément. Aucune carte bancaire requise.',
  },
  {
    question: 'Comment créer un CV simple pour un job étudiant ?',
    answer:
      'Pour un job étudiant, un CV d\'une page suffit : formation, compétences, disponibilités et une ou deux expériences. Notre template Minimal est parfait pour ce type de CV. Créez-le gratuitement sur CV Builder en 5 minutes, exportez-le en PDF et envoyez-le directement.',
  },
]

export default function CvMinimalistePage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV Minimaliste', url: `${baseUrl}/cv-minimaliste` },
        ]}
      />
      <FAQJsonLd questions={faqItems} />

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
        {/* Section Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge de catégorie */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <Minimize2 className="w-4 h-4" />
              Minimaliste, moderne et simple
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Créer un <span className="text-[#722F37]">CV Minimaliste</span> Gratuit en PDF
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              Simple, épuré, moderne — des templates CV gratuits pour tous les profils
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              Téléchargez un modèle CV minimaliste gratuit en PDF. Notre générateur avec intelligence
              artificielle vous propose des templates CV modernes, simples et design. Créez votre CV
              en ligne en 5 minutes, export PDF instantané — gratuit, sans inscription obligatoire.
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV minimaliste gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors"
              >
                Voir les templates
              </Link>
            </div>
          </div>
        </section>

        {/* Section : Pourquoi choisir un CV minimaliste ? */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Pourquoi choisir un CV minimaliste ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              La simplicité n&apos;est pas un manque d&apos;ambition — c&apos;est une stratégie. Voici pourquoi le CV
              minimaliste est le choix le plus efficace pour décrocher un entretien.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{item.title}</h3>
                  <p className="text-[#6B6560] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section : Nos templates CV minimalistes et modernes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Nos templates CV minimalistes et modernes
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Choisissez le template qui correspond à votre profil et au poste visé. Chaque modèle
              est optimisé pour les ATS et personnalisable en quelques clics.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {cvTypes.map((type, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1F1A17]">{type.title}</h3>
                    <span className="text-xs px-2 py-1 bg-[#722F37]/10 text-[#722F37] rounded-full font-medium shrink-0 ml-2">
                      {type.keyword}
                    </span>
                  </div>
                  <p className="text-[#6B6560] text-sm mb-4">{type.description}</p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1 text-sm text-[#722F37] font-medium hover:gap-2 transition-all"
                  >
                    Créer ce CV
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section spéciale : CV simple pour premier emploi et job étudiant */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F3EDE5] rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-6 text-center">
                CV simple pour premier emploi et job étudiant
              </h2>
              <p className="text-[#6B6560] max-w-2xl mx-auto text-center mb-6">
                Vous cherchez votre premier emploi, un job étudiant ou un contrat saisonnier ? Un CV
                simple et bien présenté est votre meilleur atout. Inutile d&apos;un design complexe : un
                template épuré met en avant vos compétences, votre formation et vos disponibilités.
                Notre générateur vous guide pas à pas pour créer un CV simple professionnel en moins
                de 5 minutes, même sans aucune expérience.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 text-sm text-[#722F37] font-medium hover:gap-2 transition-all"
                >
                  Créer mon CV simple gratuit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Comment créer votre CV minimaliste en 4 étapes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Comment créer votre CV minimaliste en 4 étapes
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              4 étapes simples pour obtenir un CV minimaliste professionnel en quelques minutes
            </p>

            <div className="space-y-6">
              {exportSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F1A17] mb-2">{step.title}</h3>
                    <p className="text-[#6B6560]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section conseils (fond bordeaux) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Nos conseils pour un CV minimaliste efficace
              </h2>
              <div className="space-y-4 max-w-2xl mx-auto">
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

        {/* Section FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Questions fréquentes sur le CV minimaliste
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour créer un CV minimaliste efficace
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8]"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#722F37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{item.question}</h3>
                      <p className="text-[#6B6560]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA finale (fond bordeaux) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Créez votre CV minimaliste maintenant
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Gratuit, instantané, épuré. Votre CV minimaliste PDF prêt en 5 minutes.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/80">
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
