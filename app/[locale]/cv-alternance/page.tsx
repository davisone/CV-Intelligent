import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, Briefcase, Calendar, CheckCircle2, FileText, Shield, Sparkles, Users } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvAlternancePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-alternance' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

// Points différenciants du CV alternance
const differentiators = [
  {
    icon: Users,
    title: 'Double profil étudiant-professionnel',
    description:
      "L'alternance, c'est être à la fois étudiant et salarié. Votre CV doit montrer que vous maîtrisez ce double rythme et que vous êtes prêt à alterner cours et missions terrain.",
  },
  {
    icon: Calendar,
    title: 'Dates de disponibilité claires',
    description:
      "Précisez dans votre CV votre rythme d'alternance (3j entreprise / 2j école, etc.) et vos dates de début et de fin. C'est une information clé pour l'employeur.",
  },
  {
    icon: Shield,
    title: "Optimisé ATS pour l'alternance",
    description:
      "Les grandes entreprises filtrent les candidatures automatiquement. Notre IA intègre les bons mots-clés pour que votre CV d'alternance passe ces filtres.",
  },
]

// Types de CV alternance
const cvTypes = [
  {
    title: 'CV Alternance Généraliste',
    keyword: 'cv alternance étudiant',
    description:
      'Pour toute alternance en entreprise : valorisez votre formation, vos compétences transversales et votre projet professionnel. Mentionnez votre rythme et vos dates.',
  },
  {
    title: 'CV de Stage Étudiant',
    keyword: 'cv stage étudiant',
    description:
      "Pour un stage court ou long : mettez en avant vos formations, vos projets, et ce que vous apporterez à l'équipe. Nos modèles sont adaptés aux étudiants de tous niveaux.",
  },
  {
    title: 'CV Alternance Informatique',
    keyword: 'cv alternance informatique',
    description:
      'Pour les alternances en développement, data, cybersécurité ou systèmes : listez vos langages, frameworks et projets techniques. Notre IA vous aide à structurer vos compétences tech.',
  },
]

// Conseils pour un CV d'alternance réussi
const tips = [
  "Indiquez votre rythme d'alternance et vos dates de disponibilité dès l'en-tête",
  'Mettez votre formation en avant : école, niveau, spécialité',
  'Listez vos projets scolaires et personnels comme des expériences à part entière',
  'Adaptez votre CV à chaque offre en personnalisant les mots-clés',
  "Expliquez brièvement votre projet professionnel dans l'accroche ou le titre",
]

// Questions fréquentes sur le CV d'alternance
const faqItems = [
  {
    question: 'Comment faire un CV pour une alternance sans expérience ?',
    answer:
      "Pour une alternance sans expérience, misez sur votre formation, vos compétences et vos projets scolaires ou personnels. Indiquez votre rythme d'alternance et vos dates de disponibilité. Notre générateur de CV gratuit avec IA vous aide à valoriser chaque atout, même sans parcours professionnel.",
  },
  {
    question: "Quelle différence entre un CV de stage et un CV d'alternance ?",
    answer:
      "Un CV de stage est souvent plus court (stage de quelques semaines à quelques mois) et met l'accent sur la découverte d'un métier. Un CV d'alternance insiste sur votre projet professionnel, votre rythme école/entreprise, et votre capacité à être opérationnel rapidement. Les deux doivent mentionner vos dates de disponibilité.",
  },
  {
    question: "Comment faire un CV d'alternance en informatique ?",
    answer:
      "Pour un CV d'alternance en informatique, listez vos langages de programmation, frameworks, outils DevOps et projets techniques. Mentionnez les technologies vues en cours et vos projets personnels sur GitHub. Notre IA vous aide à structurer vos compétences techniques de manière claire et percutante.",
  },
  {
    question: 'Quel modèle de CV choisir pour une alternance ?',
    answer:
      "Pour une alternance, choisissez un modèle moderne et épuré : Modern ou Minimal pour la majorité des secteurs. Pour l'informatique, ATS-Friendly est idéal car il met bien en avant les compétences techniques. Évitez les templates trop colorés qui pourraient distraire du contenu.",
  },
]

export default function CvAlternancePage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV Alternance', url: `${baseUrl}/cv-alternance` },
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
              <Briefcase className="w-4 h-4" />
              Pour les alternants et stagiaires
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Créer un <span className="text-[#722F37]">CV pour une Alternance</span> ou un Stage
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              Alternance, stage, informatique — un CV qui montre votre double profil étudiant-professionnel
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              Notre générateur de CV avec intelligence artificielle vous guide pour créer un CV
              d&apos;alternance ou de stage professionnel en 5 minutes. Valorisez votre formation,
              votre rythme d&apos;alternance et vos compétences pour convaincre les recruteurs.
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV d&apos;alternance
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

        {/* Section : Pourquoi un CV d'alternance est différent ? */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Pourquoi un CV d&apos;alternance est différent ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Un CV d&apos;alternance ne se construit pas comme un CV classique. Il suit ses propres
              règles et met en avant ce qui vous distingue en tant qu&apos;alternant ou stagiaire.
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

        {/* Section : Choisissez votre type de CV alternance */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Choisissez votre type de CV alternance
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
                5 conseils pour un CV d&apos;alternance réussi
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
              Questions fréquentes sur le CV d&apos;alternance
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour créer un CV d&apos;alternance efficace
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
                Créez votre CV d&apos;alternance maintenant
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
