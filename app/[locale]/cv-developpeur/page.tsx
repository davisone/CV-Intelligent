import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, Briefcase, Code2, Github, CheckCircle2, FileText, Shield, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDeveloppeurPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-developpeur' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

// Points différenciants du CV développeur
const differentiators = [
  {
    icon: Code2,
    title: 'Stack technique claire',
    description:
      'Langages, frameworks, outils — votre stack doit être lisible en 5 secondes. Notre IA vous aide à présenter vos compétences techniques de manière structurée et impactante.',
  },
  {
    icon: Github,
    title: 'GitHub et projets personnels',
    description:
      'Rien ne vaut un projet concret pour convaincre un recruteur tech. Ajoutez vos dépôts GitHub, vos projets perso et vos contributions open source directement dans votre CV.',
  },
  {
    icon: Briefcase,
    title: 'Projets et réalisations',
    description:
      'Décrivez vos projets avec les technologies utilisées, les problèmes résolus et les résultats obtenus. Notre IA vous aide à formuler des descriptions percutantes orientées impact.',
  },
  {
    icon: Shield,
    title: 'Soft skills tech',
    description:
      "Au-delà du code : esprit d'équipe, méthodes agiles, communication technique. Ces compétences sont de plus en plus recherchées et font la différence sur un CV de développeur.",
  },
]

// Types de CV développeur
const cvTypes = [
  {
    title: 'CV Développeur Junior',
    keyword: 'cv développeur junior',
    description:
      'Votre premier poste de dev : mettez en avant vos projets perso, vos formations (école, bootcamp, autodidacte) et vos compétences. Même sans expérience pro, un bon CV junior convainc.',
  },
  {
    title: 'CV Développeur Web Junior',
    keyword: 'cv développeur web junior',
    description:
      'Frontend, backend ou fullstack : structurez votre stack (React, Vue, Node, PHP...), vos projets web et vos déploiements. Notre IA vous aide à présenter chaque projet avec impact.',
  },
  {
    title: 'CV Développeur Informatique & Alternance',
    keyword: 'cv alternance informatique',
    description:
      "Pour les alternances et stages en développement ou IT : combinez vos compétences techniques et votre formation. Mentionnez vos dates d'alternance et votre stack maîtrisée.",
  },
]

// Conseils pour un CV développeur réussi
const tips = [
  'Listez votre stack par catégorie : langages, frameworks, BDD, DevOps, outils',
  'Ajoutez un lien vers votre GitHub ou portfolio en haut du CV',
  'Décrivez chaque projet avec les technos utilisées et le résultat concret',
  'Mentionnez vos contributions open source, même petites — elles montrent votre implication',
  'Adaptez les mots-clés techniques à l\'offre d\'emploi pour passer les filtres ATS',
]

// Questions fréquentes sur le CV développeur
const faqItems = [
  {
    question: 'Comment faire un CV développeur junior sans expérience ?',
    answer:
      'Un CV développeur junior sans expérience doit miser sur vos projets personnels, vos formations (école, bootcamp, auto-formation), et votre stack technique. Ajoutez un lien GitHub et décrivez chaque projet avec les technologies utilisées et les fonctionnalités développées. Notre IA vous aide à formuler des descriptions impactantes.',
  },
  {
    question: 'Quel exemple de CV pour un développeur web junior ?',
    answer:
      'Un bon CV de développeur web junior liste clairement la stack (HTML/CSS, JavaScript, React ou Vue, Node.js...), présente 2-3 projets avec liens, et mentionne les formations suivies. Le template Modern ou ATS-Friendly de CV Builder est particulièrement adapté aux profils techniques.',
  },
  {
    question: 'Quelles compétences mettre dans un CV développeur ?',
    answer:
      "Dans un CV développeur, listez : langages (JavaScript, Python, PHP...), frameworks (React, Vue, Laravel...), bases de données (MySQL, PostgreSQL, MongoDB...), outils DevOps (Git, Docker, CI/CD), et méthodes de travail (Agile, Scrum). Ajoutez vos soft skills tech : esprit d'équipe, résolution de problèmes, communication.",
  },
  {
    question: 'Quel template CV choisir pour un développeur ?',
    answer:
      'Pour un développeur, privilégiez le template ATS-Friendly pour les grandes entreprises et ESN, ou Modern pour les startups et agences web. Ces deux templates mettent bien en avant les compétences techniques et passent les filtres automatiques des recruteurs. Le template Minimal convient aussi pour les profils plus seniors.',
  },
]

export default function CvDeveloppeurPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV Développeur', url: `${baseUrl}/cv-developpeur` },
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
              <Code2 className="w-4 h-4" />
              Pour les développeurs juniors et alternants
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              Créer un <span className="text-[#722F37]">CV Développeur</span> Gratuit en Ligne
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              Junior, web, informatique, alternance — un CV tech optimisé ATS pour décrocher votre poste
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              Notre générateur de CV avec intelligence artificielle vous aide à créer un CV développeur
              professionnel en 5 minutes. Listez votre stack, vos projets GitHub et vos compétences
              techniques pour convaincre les recruteurs et passer les filtres ATS.
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                Créer mon CV développeur
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

        {/* Section : Ce qu'un CV développeur doit contenir */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Ce qu&apos;un CV développeur doit contenir
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Un CV développeur ne se construit pas comme un CV classique. Il met en avant vos compétences
              techniques, vos projets concrets et votre stack pour convaincre en quelques secondes.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
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

        {/* Section : Choisissez votre profil développeur */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              Choisissez votre profil développeur
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Junior, web, alternance ou stage IT — chaque profil a ses spécificités. Choisissez le vôtre
              et laissez notre IA vous guider pour rédiger un CV qui correspond exactement à votre situation.
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
                5 conseils pour un CV développeur réussi
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
              Questions fréquentes sur le CV développeur
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour créer un CV développeur efficace
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
                Créez votre CV développeur maintenant
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Gratuit, rapide, et guidé par l&apos;IA. En 5 minutes, votre CV tech est prêt à être envoyé.
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
