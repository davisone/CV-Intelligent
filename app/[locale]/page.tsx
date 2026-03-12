import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Footer } from '@/components/layout/footer'
import { WebsiteJsonLd, OrganizationJsonLd, FAQJsonLd, LocalBusinessJsonLd, PersonJsonLd, SoftwareApplicationJsonLd } from '@/components/seo/json-ld'
import { Sparkles, BarChart3, Palette, FileText, Zap, Shield, ArrowRight, Check, MapPin, GraduationCap, Briefcase, Trophy, Code2 } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/',
    },
  }
}

const faqQuestions = [
  {
    question: 'Comment faire un CV gratuit en ligne ?',
    answer: 'Avec CV Builder, créer un CV gratuit est simple : inscrivez-vous gratuitement, choisissez un template professionnel, remplissez vos informations et laissez notre IA optimiser votre contenu. Vous pouvez télécharger votre CV en PDF en moins de 5 minutes, entièrement gratuitement.',
  },
  {
    question: 'Comment créer son CV rapidement ?',
    answer: 'Pour créer son CV rapidement : 1) Inscrivez-vous sur CV Builder, 2) Choisissez parmi nos modèles de CV modernes, 3) Remplissez vos informations, 4) Laissez l\'IA améliorer votre contenu, 5) Téléchargez votre CV en PDF. La création de CV prend moins de 5 minutes !',
  },
  {
    question: 'CV Builder est-il vraiment gratuit ?',
    answer: 'Oui, CV Builder propose la création de CV gratuite avec le template Modern. Vous pouvez créer, éditer et télécharger votre CV en PDF sans frais. Des templates premium sont également disponibles pour plus de personnalisation.',
  },
  {
    question: 'Comment fonctionne le générateur de CV avec IA ?',
    answer: 'Notre générateur de CV avec intelligence artificielle analyse votre parcours professionnel et vos compétences pour suggérer des améliorations automatiques. L\'IA optimise la formulation de vos expériences, propose des mots-clés pertinents pour les recruteurs et améliore la structure de votre CV.',
  },
  {
    question: 'Qu\'est-ce que l\'optimisation ATS pour CV ?',
    answer: 'L\'optimisation ATS permet à votre CV de passer les filtres automatiques des recruteurs. CV Builder formate votre CV pour être compatible avec ces systèmes, utilise les bons mots-clés et structure votre contenu pour maximiser vos chances d\'être sélectionné.',
  },
  {
    question: 'Comment faire un CV étudiant ou un premier CV ?',
    answer: 'Pour faire un CV étudiant ou un premier CV sans expérience, CV Builder vous guide étape par étape. L\'IA vous aide à mettre en valeur vos formations, stages, compétences et centres d\'intérêt. Idéal pour un CV alternance, un CV stage ou votre tout premier CV.',
  },
  {
    question: 'Peut-on télécharger son CV en PDF gratuitement ?',
    answer: 'Oui, vous pouvez télécharger votre CV en PDF gratuitement avec CV Builder. Le CV est généré en haute qualité, prêt à être envoyé aux recruteurs ou téléchargé sur les sites d\'emploi.',
  },
  {
    question: 'Comment rédiger un CV professionnel ?',
    answer: 'Pour rédiger un CV professionnel, concentrez-vous sur une mise en page claire, des expériences bien décrites avec des résultats concrets, et les bons mots-clés pour votre secteur. CV Builder vous accompagne avec des modèles de CV professionnels et une IA qui optimise votre contenu automatiquement.',
  },
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <PersonJsonLd />
      <SoftwareApplicationJsonLd />
      <FAQJsonLd questions={faqQuestions} />

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
              {tNav('login')}
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] font-bold transition-colors"
              style={{ color: '#FFFFFF' }}
            >
              {tNav('startFree')}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Bento Style */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Main Hero Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#F3EDE5] to-[#FBF8F4] p-8 md:p-12 rounded-3xl border border-[#E0D6C8] relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#722F37]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
                  <Sparkles className="w-4 h-4" />
                  {t('badge')}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F1A17] mb-6 leading-tight">
                  Créer son <span className="text-[#722F37]">{t('hero.titleAccent')}</span> en ligne
                  <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">{t('hero.subtitle')}</span>
                </h1>
                <p className="text-lg text-[#6B6560] mb-8 max-w-xl">
                  {t('hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                    style={{ color: '#FFFFFF' }}
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/templates"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] hover:border-[#722F37] transition-colors"
                  >
                    {t('hero.seeTemplates')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-sm font-medium text-[#6B6560] mb-6">{t('stats.why')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">98%</p>
                      <p className="text-xs text-[#6B6560]">{t('stats.atsScore')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">5 min</p>
                      <p className="text-xs text-[#6B6560]">{t('stats.avgTime')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">5+</p>
                      <p className="text-xs text-[#6B6560]">{t('stats.templates')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#E0D6C8]">
                <div className="flex items-center gap-2 text-sm text-[#6B6560]">
                  <MapPin className="w-4 h-4 text-[#722F37]" />
                  <span>{t('stats.madeIn')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4">
              {t('features.title')}
            </h2>
            <p className="text-[#6B6560] max-w-xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#722F37] to-[#5A252C] p-8 rounded-3xl group hover:scale-[1.02] transition-all shadow-lg">
              <div className="w-14 h-14 bg-[#FFFFFF]/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3">{t('features.ai.title')}</h3>
              <p className="text-[#FFFFFF]/80">
                {t('features.ai.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{t('features.ats.title')}</h3>
              <p className="text-sm text-[#6B6560]">
                {t('features.ats.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Palette className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{t('features.templates.title')}</h3>
              <p className="text-sm text-[#6B6560]">
                {t('features.templates.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Zap className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{t('features.export.title')}</h3>
              <p className="text-sm text-[#6B6560]">
                {t('features.export.description')}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Shield className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{t('features.secure.title')}</h3>
              <p className="text-sm text-[#6B6560]">
                {t('features.secure.description')}
              </p>
            </div>

            {/* Feature 6 - Large */}
            <div className="md:col-span-2 bg-[#F3EDE5] p-8 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all shadow-md">
              <h3 className="text-lg font-bold text-[#1F1A17] mb-4">{t('features.howItWorks.title')}</h3>
              <div className="grid grid-cols-4 gap-4">
                <StepItem number={1} label={t('features.howItWorks.step1')} />
                <StepItem number={2} label={t('features.howItWorks.step2')} />
                <StepItem number={3} label={t('features.howItWorks.step3')} />
                <StepItem number={4} label={t('features.howItWorks.step4')} />
              </div>
            </div>
          </div>
        </section>

        {/* Section Profils */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4">
              Un générateur de CV pour chaque profil
            </h2>
            <p className="text-[#6B6560] max-w-xl mx-auto">
              Étudiant, en reconversion, développeur ou cadre — notre IA s&apos;adapte à votre parcours
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Carte 1 - CV Étudiant */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">CV Étudiant & Sans Expérience</h3>
              <p className="text-sm text-[#6B6560] mb-4">
                CV stage, CV alternance, CV premier emploi — l&apos;IA valorise votre formation et vos projets.
              </p>
              <Link
                href="/cv-etudiant"
                className="text-sm font-medium text-[#722F37] hover:underline inline-flex items-center gap-1"
              >
                En savoir plus <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Carte 2 - CV Alternance/Stage */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Briefcase className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">CV Alternance & Stage</h3>
              <p className="text-sm text-[#6B6560] mb-4">
                Valorisez votre double profil étudiant-professionnel et convainquez les entreprises d&apos;accueil.
              </p>
              <Link
                href="/signup"
                className="text-sm font-medium text-[#722F37] hover:underline inline-flex items-center gap-1"
              >
                Créer mon CV <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Carte 3 - CV Professionnel/Cadre */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Trophy className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">CV Professionnel & Cadre</h3>
              <p className="text-sm text-[#6B6560] mb-4">
                CV cadre, CV manager, CV reconversion — mettez en avant vos réalisations et compétences clés.
              </p>
              <Link
                href="/signup"
                className="text-sm font-medium text-[#722F37] hover:underline inline-flex items-center gap-1"
              >
                Créer mon CV <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Carte 4 - CV Développeur/IT */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Code2 className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">CV Développeur & IT</h3>
              <p className="text-sm text-[#6B6560] mb-4">
                CV développeur, CV ingénieur, CV data — optimisé pour les postes tech avec stack, projets GitHub.
              </p>
              <Link
                href="/signup"
                className="text-sm font-medium text-[#722F37] hover:underline inline-flex items-center gap-1"
              >
                Créer mon CV <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-[#FFFFFF]/80 mb-8 max-w-xl mx-auto">
                {t('cta.description')}
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1F1A17] text-[#FFFFFF] font-bold text-lg rounded-xl hover:bg-[#3D3530] transition-all hover:scale-[1.02]"
              >
                {t('cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StepItem({ number, label }: { number: number; label: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-[#722F37] text-[#FFFFFF] rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
        {number}
      </div>
      <p className="text-xs text-[#6B6560]">{label}</p>
    </div>
  )
}
