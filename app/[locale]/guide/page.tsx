import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, CheckCircle2, Lightbulb, FileText, Sparkles, Target, Clock, Download, BarChart3, Zap } from 'lucide-react'

const guideFaqQuestions = [
  {
    question: 'Comment faire un CV étudiant ?',
    answer: 'Pour faire un CV étudiant, placez votre formation en premier si vous avez peu d\'expérience professionnelle. Ajoutez tous vos stages, projets, activités associatives et compétences. Utilisez notre générateur de CV gratuit avec IA pour créer un CV étudiant professionnel en 5 minutes.',
  },
  {
    question: 'Comment faire un CV sans expérience ?',
    answer: 'Un CV sans expérience mise sur la formation, les projets personnels, le bénévolat, les compétences techniques et les soft skills. L\'IA de CV Builder vous aide à valoriser chaque élément de votre parcours pour créer un CV convaincant, même pour un premier emploi.',
  },
  {
    question: 'Comment créer un CV pour une alternance ?',
    answer: 'Pour un CV d\'alternance, montrez votre double profil : étudiant sérieux et futur professionnel motivé. Précisez le rythme de votre alternance et vos dates de disponibilité. Valorisez vos compétences, votre projet professionnel et vos expériences, même courtes.',
  },
  {
    question: 'Comment optimiser son CV pour les ATS ?',
    answer: 'Pour passer les filtres ATS, utilisez les mots-clés de l\'offre d\'emploi dans votre CV, évitez les tableaux et colonnes complexes, choisissez une police standard et structurez clairement vos sections. Le score ATS de CV Builder vous indique en temps réel votre taux de compatibilité.',
  },
  {
    question: 'Quel format de CV choisir ?',
    answer: 'Le format PDF est toujours recommandé pour envoyer un CV : il préserve la mise en page et est lisible sur tous les appareils. Pour la structure, le format chronologique inversé (expériences récentes en premier) est le plus adapté et le mieux accepté par les recruteurs.',
  },
  {
    question: 'Comment télécharger son CV en PDF ?',
    answer: 'Avec CV Builder, télécharger son CV en PDF est simple : créez votre CV, cliquez sur "Télécharger PDF" et votre CV est généré instantanément en haute qualité. Le PDF est gratuit avec le template Modern et optimisé pour l\'impression et l\'envoi par email.',
  },
  {
    question: 'Comment créer un CV avec l\'IA ?',
    answer: 'Créer un CV avec l\'IA sur CV Builder : inscrivez-vous gratuitement, remplissez vos informations, puis cliquez sur "Suggestion IA" pour chaque section. L\'intelligence artificielle reformule vos expériences, propose des mots-clés pertinents et optimise la structure de votre CV.',
  },
  {
    question: 'Combien de temps pour créer un CV ?',
    answer: 'Avec CV Builder et notre générateur de CV avec IA, vous pouvez créer un CV professionnel en 5 minutes. Si vous remplissez toutes les sections en détail, comptez 15 à 30 minutes pour un CV complet et optimisé.',
  },
  {
    question: 'Quel modèle de CV choisir ?',
    answer: 'Le choix du modèle de CV dépend de votre secteur : Modern pour la plupart des métiers, Classic pour les secteurs traditionnels (banque, droit, finance), ATS-Friendly pour les grandes entreprises, Minimal pour les métiers créatifs sobres, Creative pour les graphistes et UX designers.',
  },
  {
    question: 'CV chronologique ou fonctionnel ?',
    answer: 'Le CV chronologique inversé (expériences de la plus récente à la plus ancienne) est recommandé dans la grande majorité des cas. Le CV fonctionnel (organisé par compétences) est utile en cas de reconversion ou de longues périodes d\'inactivité, mais est moins apprécié des recruteurs.',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.guidePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/guide' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
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
      <FAQJsonLd questions={guideFaqQuestions} />

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

        {/* Section CV selon votre profil */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Créer un CV selon votre profil
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              Les conseils varient selon votre situation : étudiant, jeune diplômé ou professionnel expérimenté
            </p>

            <div className="space-y-6">

              {/* CV Étudiant */}
              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors">
                <h3 className="text-xl font-bold text-[#1F1A17] mb-3">
                  CV Étudiant, CV Stage et CV Alternance
                </h3>
                <p className="text-[#6B6560] mb-4">
                  Pour un <strong>CV étudiant</strong>, un <strong>CV de stage</strong> ou un <strong>CV d&apos;alternance</strong>,
                  mettez votre formation en tête de CV. Ajoutez tous vos stages, projets universitaires, activités
                  associatives et compétences. Notre IA vous aide à valoriser chaque expérience, même courte.
                </p>
                <Link
                  href="/cv-etudiant"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#722F37] hover:underline"
                >
                  Guide CV étudiant complet <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* CV Sans expérience */}
              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors">
                <h3 className="text-xl font-bold text-[#1F1A17] mb-3">
                  CV Sans Expérience et Premier CV
                </h3>
                <p className="text-[#6B6560] mb-4">
                  Créer un <strong>CV sans expérience</strong> est possible : misez sur vos formations, compétences,
                  projets personnels, bénévolat et centres d&apos;intérêt. Pour un <strong>CV premier emploi</strong> ou
                  un <strong>CV jeune diplômé</strong>, l&apos;honnêteté et la motivation compensent le manque d&apos;expérience.
                </p>
                <Link
                  href="/cv-etudiant"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#722F37] hover:underline"
                >
                  Créer un CV sans expérience <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* CV Professionnel */}
              <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors">
                <h3 className="text-xl font-bold text-[#1F1A17] mb-3">
                  CV Professionnel, CV Cadre et CV Développeur
                </h3>
                <p className="text-[#6B6560] mb-4">
                  Pour un <strong>CV professionnel</strong> ou un <strong>CV cadre</strong>, mettez en avant vos
                  réalisations chiffrées, votre leadership et votre valeur ajoutée. Pour un <strong>CV développeur</strong>
                  ou un CV IT, incluez votre stack technique, vos projets GitHub et vos contributions open source.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#722F37] hover:underline"
                >
                  Créer mon CV professionnel <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Section CV avec l'IA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Créer son CV avec l&apos;Intelligence Artificielle
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Notre <strong className="text-white">générateur de CV avec IA</strong> analyse votre parcours
                  et optimise automatiquement votre contenu pour maximiser vos chances de décrocher un entretien.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-2xl p-5">
                  <Sparkles className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-bold text-white mb-2">Suggestions IA</h3>
                  <p className="text-white/70 text-sm">
                    L&apos;IA reformule vos expériences avec des verbes d&apos;action percutants et des mots-clés optimisés ATS.
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5">
                  <BarChart3 className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-bold text-white mb-2">Score ATS automatique</h3>
                  <p className="text-white/70 text-sm">
                    Mesurez la compatibilité de votre CV avec les systèmes de tri automatique des recruteurs.
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5">
                  <Zap className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-bold text-white mb-2">CV optimisé en 5 min</h3>
                  <p className="text-white/70 text-sm">
                    De 0 à un <strong className="text-white">CV avec IA</strong> professionnel et prêt à envoyer en moins de 5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ étendue */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Questions fréquentes sur la création de CV
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              Tout ce que vous devez savoir pour créer un CV parfait
            </p>
            <div className="space-y-4">
              {guideFaqQuestions.map((item, index) => (
                <div key={index} className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors">
                  <h3 className="font-bold text-[#1F1A17] mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#722F37] flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
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
