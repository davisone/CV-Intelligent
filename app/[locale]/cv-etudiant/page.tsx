import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, GraduationCap, Briefcase, CheckCircle2, FileText, Sparkles, Shield } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvEtudiantPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-etudiant' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

// Points différenciants du CV étudiant
const differentiators = [
  {
    icon: GraduationCap,
    title: 'Mettre en avant les formations',
    description:
      'Quand l\'expérience est limitée, la formation et les compétences deviennent le cœur du CV. Diplômes, établissements, mentions — tout compte.',
  },
  {
    icon: Briefcase,
    title: 'Valoriser les stages et projets',
    description:
      'Chaque stage, projet universitaire ou activité associative compte. Notre IA vous aide à rédiger des descriptions percutantes pour chaque expérience.',
  },
  {
    icon: Shield,
    title: 'Optimisé pour les ATS',
    description:
      'Les recruteurs utilisent des logiciels de tri automatique : notre IA vous aide à passer ce filtre en intégrant les bons mots-clés dans votre CV.',
  },
]

// Types de CV étudiants
const cvTypes = [
  {
    title: 'CV de Stage',
    keyword: 'cv stage',
    description:
      'Mettez en avant vos formations, compétences et motivations pour décrocher votre stage idéal. Indiquez les dates de disponibilité et votre niveau d\'études.',
  },
  {
    title: 'CV d\'Alternance',
    keyword: 'cv alternance',
    description:
      'Valorisez votre double profil : étudiant et futur professionnel en entreprise. Montrez que vous êtes capable de combiner cours et missions terrain.',
  },
  {
    title: 'CV Premier Emploi',
    keyword: 'cv premier emploi',
    description:
      'Votre premier CDI/CDD : structurez votre parcours pour convaincre dès le premier coup d\'œil. Mettez en avant vos projets et vos réalisations concrètes.',
  },
  {
    title: 'CV Sans Expérience',
    keyword: 'cv sans expérience',
    description:
      'Même sans expérience professionnelle, vous avez des atouts : formations, projets universitaires, bénévolat, compétences techniques et linguistiques.',
  },
]

// Conseils pour un CV étudiant réussi
const tips = [
  'Mettez votre formation en tête de CV si vous avez peu d\'expérience',
  'Incluez tous vos stages, même courts (1 semaine ou plus)',
  'Ajoutez vos projets universitaires et personnels',
  'Indiquez vos compétences informatiques et linguistiques',
  'Personnalisez chaque CV pour l\'offre visée',
]

// Questions fréquentes sur le CV étudiant
const faqItems = [
  {
    question: 'Comment faire un CV étudiant ?',
    answer:
      'Pour créer un CV étudiant, mettez votre formation en premier si vous avez peu d\'expérience. Ajoutez vos stages, projets et compétences. Utilisez notre générateur de CV gratuit avec IA pour créer un CV professionnel en 5 minutes, même sans expérience.',
  },
  {
    question: 'Comment faire un CV sans expérience ?',
    answer:
      'Un CV sans expérience mise sur la formation, les compétences, les projets personnels, le bénévolat et les activités extrascolaires. Notre IA vous aide à valoriser chaque aspect de votre parcours pour créer un CV convaincant.',
  },
  {
    question: 'Comment créer un CV pour une alternance ?',
    answer:
      'Pour un CV d\'alternance, montrez que vous êtes à la fois bon étudiant et futur professionnel. Valorisez vos compétences, votre projet professionnel, et expliquez pourquoi ce rythme vous correspond. Ajoutez les dates de disponibilité de votre alternance.',
  },
  {
    question: 'Quel modèle de CV choisir pour un étudiant ?',
    answer:
      'Pour un CV étudiant, privilégiez un modèle moderne et épuré : Modern ou Minimal pour la plupart des secteurs, ATS-Friendly pour les grandes entreprises. Évitez les templates trop créatifs sauf pour les métiers artistiques.',
  },
]

export default function CvEtudiantPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV Étudiant', url: `${baseUrl}/cv-etudiant` },
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
              <GraduationCap className="w-4 h-4" />
              Pour les étudiants et jeunes diplômés
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Créer un <span className="text-[#722F37]">CV Étudiant</span> Gratuit en Ligne
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              Stage, alternance, premier emploi — un CV optimisé pour démarrer votre carrière
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              Notre générateur de CV avec intelligence artificielle vous guide pas à pas pour créer
              un CV étudiant professionnel en 5 minutes. Même sans expérience, valorisez votre
              formation, vos projets et vos compétences.
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV étudiant
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

        {/* Section : Pourquoi un CV étudiant spécifique ? */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Pourquoi votre CV étudiant est différent ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Un CV étudiant ne se construit pas comme un CV de cadre. Il suit ses propres règles
              et met en avant ce qui vous distingue à ce stade de votre parcours.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {differentiators.map((item, index) => (
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

        {/* Section : Quel type de CV étudiant créer ? */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Quel type de CV étudiant créer ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Chaque situation appelle un CV différent. Choisissez le vôtre et laissez notre IA
              vous guider pour le rédiger.
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

        {/* Section conseils (fond bordeaux) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                5 conseils pour un CV étudiant réussi
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
              Questions fréquentes sur le CV étudiant
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour créer un CV étudiant efficace
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
                Créez votre CV étudiant maintenant
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Gratuit, rapide, et guidé par l&apos;IA. En 5 minutes, votre CV est prêt à être envoyé.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/60">
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
