import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, Download, FileText, Check, Shield, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvPdfPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-pdf' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

// Avantages du format PDF
const pdfAdvantages = [
  {
    icon: FileText,
    title: 'Format universel',
    description:
      'Le PDF s\'affiche identiquement sur tous les appareils, systèmes et logiciels de recrutement. Aucune surprise à l\'ouverture.',
  },
  {
    icon: Shield,
    title: 'Mise en page préservée',
    description:
      'Contrairement au Word ou ODT, le PDF conserve votre design à la perfection. Polices, espacements, couleurs — tout reste intact.',
  },
  {
    icon: Check,
    title: 'Format standard des recruteurs',
    description:
      '95% des recruteurs demandent un CV en PDF : c\'est le format professionnel de référence, attendu par les cabinets et les ATS.',
  },
]

// Étapes pour exporter son CV en PDF
const exportSteps = [
  {
    title: 'Créez un compte gratuitement sur CV Builder',
    description: 'Inscription en 30 secondes, sans carte bancaire. Votre espace de création est immédiatement disponible.',
  },
  {
    title: 'Choisissez votre template de CV',
    description: 'Modern, Classic, ATS, Minimal ou Creative — sélectionnez le modèle adapté à votre profil et au poste visé.',
  },
  {
    title: 'Remplissez vos informations',
    description: 'Laissez notre IA vous guider et optimiser votre contenu : formulations, mots-clés, structure — tout est suggéré.',
  },
  {
    title: 'Cliquez sur "Télécharger PDF"',
    description: 'Votre CV est généré instantanément en haute qualité. Téléchargement immédiat, prêt à envoyer.',
  },
]

// Questions fréquentes sur le CV en PDF
const faqItems = [
  {
    question: 'Peut-on télécharger son CV en PDF gratuitement ?',
    answer:
      'Oui, CV Builder permet de télécharger votre CV en PDF gratuitement avec le template Modern. Le PDF est généré en haute qualité et prêt à être envoyé aux recruteurs ou téléchargé sur les sites d\'emploi.',
  },
  {
    question: 'Quel format choisir pour son CV : PDF ou Word ?',
    answer:
      'Le PDF est toujours préférable pour un CV. Il préserve la mise en page, est lisible sur tous les appareils et est demandé par la grande majorité des recruteurs. Word peut être modifié accidentellement et s\'affiche différemment selon les versions.',
  },
  {
    question: 'Comment générer son CV en PDF en ligne ?',
    answer:
      'Avec CV Builder : créez un compte gratuit, choisissez votre template, remplissez vos informations avec l\'aide de l\'IA, puis cliquez sur \'Télécharger PDF\'. Le PDF est généré instantanément, sans logiciel à installer.',
  },
  {
    question: 'Le CV PDF est-il compatible avec les ATS ?',
    answer:
      'Oui, nos CVs PDF sont optimisés pour les systèmes de suivi des candidatures (ATS). Notre template ATS-Friendly est particulièrement conçu pour être parsé correctement par ces logiciels, en utilisant une structure claire et des polices standards.',
  },
]

export default function CvPdfPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV PDF', url: `${baseUrl}/cv-pdf` },
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <Download className="w-4 h-4" />
              Export PDF haute qualité
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Créer et Télécharger son{' '}
              <span className="text-[#722F37]">CV en PDF</span>
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              Format universel, mise en page parfaite, téléchargement instantané — gratuit
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              Notre générateur de CV avec intelligence artificielle crée votre CV en PDF haute qualité
              en quelques minutes. Compatible avec tous les recruteurs, tous les ATS, tous les appareils.
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV PDF gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors"
              >
                Comment faire un CV ?
              </Link>
            </div>
          </div>
        </section>

        {/* Section avantages du PDF */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Pourquoi le PDF est le meilleur format pour un CV ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Le format de votre CV peut faire la différence avant même que le recruteur le lise
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {pdfAdvantages.map((item, index) => (
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

        {/* Section étapes pour exporter en PDF */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Comment télécharger son CV en PDF avec CV Builder ?
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              4 étapes simples pour obtenir un CV PDF professionnel en quelques minutes
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

        {/* Section caractéristiques du PDF (fond crème accentué) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F3EDE5] rounded-3xl border border-[#E0D6C8] p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#722F37]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-8 text-center">
                Un PDF professionnel généré en quelques secondes
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    Haute résolution, prêt pour l&apos;impression et l&apos;envoi
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    Compatible avec tous les ATS (systèmes de tri des recruteurs)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    Nommage automatique du fichier (Prénom-Nom-CV.pdf)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Questions fréquentes sur le CV en PDF
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur le format PDF pour votre CV
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
                Téléchargez votre CV en PDF maintenant
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Gratuit, instantané, professionnel. Votre CV PDF prêt en 5 minutes.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
              >
                Créer mon CV gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/80">
                Gratuit • Sans carte bancaire • PDF haute qualité
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
