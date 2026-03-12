import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Briefcase, Shield, FileText } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvStagePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv-stage' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Modèle CV Stage',
  canonicalPath: '/modele-cv-stage',
  hero: {
    badgeIcon: GraduationCap,
    badgeText: 'Pour décrocher ton stage',
    h1Before: 'Modèle de ',
    h1Accent: 'CV Stage',
    h1After: ' Étudiant Gratuit',
    subtitle: 'Décrochez votre stage avec un CV optimisé pour les recruteurs',
    description: 'Créez votre CV de stage en 5 minutes avec l\'aide de l\'IA. Templates modernes adaptés aux étudiants, compatible ATS, export PDF gratuit.',
    primaryCtaText: 'Créer mon CV de stage',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Créer un CV de stage efficace',
    subtitle: 'Un CV de stage ne se construit pas comme un CV classique. Voici ce qui fait la différence.',
    items: [
      {
        icon: GraduationCap,
        title: 'Formation en premier',
        description: 'Quand l\'expérience est limitée, votre formation devient le cœur du CV. Diplôme, établissement, spécialisation — mettez tout en avant.',
      },
      {
        icon: Briefcase,
        title: 'Projets et activités',
        description: 'Chaque projet académique, bénévolat ou activité extra-scolaire compte. Notre IA vous aide à les rédiger de façon percutante.',
      },
      {
        icon: Shield,
        title: 'Compatible ATS',
        description: 'Les grandes entreprises filtrent les CVs automatiquement. Nos templates sont structurés pour passer ces filtres et arriver sur le bureau du recruteur.',
      },
    ],
  },
  section2: {
    title: 'Nos modèles CV stage gratuits',
    subtitle: 'Choisissez le template adapté à votre entreprise cible et à votre profil.',
    items: [
      {
        title: 'Template Stage Modern',
        keyword: 'modèle cv stage moderne',
        description: 'Design épuré et professionnel, idéal pour la majorité des stages en entreprise. Polyvalent et efficace.',
      },
      {
        title: 'Template Stage Minimal',
        keyword: 'cv stage étudiant simple',
        description: 'Format minimaliste pour mettre votre profil en valeur sans distraction visuelle. Parfait pour les entreprises exigeantes.',
      },
      {
        title: 'Template Stage ATS',
        keyword: 'cv stage ats compatible',
        description: 'Optimisé pour les logiciels de tri automatique des grandes entreprises et des portails de recrutement.',
      },
      {
        title: 'Template Stage Classic',
        keyword: 'modèle cv stage bts licence',
        description: 'Format traditionnel pour les stages dans les secteurs formels : finance, conseil, santé, secteur public.',
      },
    ],
  },
  section3: {
    title: 'Créez votre CV de stage en 4 étapes',
    steps: [
      { title: 'Créez votre compte gratuitement', description: 'Inscription en 30 secondes, sans carte bancaire.' },
      { title: 'Choisissez votre template', description: 'Modern, Minimal, ATS ou Classic selon votre entreprise cible.' },
      { title: 'Rédigez avec l\'IA', description: 'Notre IA suggère le contenu optimal : compétences, projets, formulations percutantes.' },
      { title: 'Téléchargez en PDF', description: 'Export gratuit haute qualité, prêt à envoyer avec votre lettre de motivation.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV de stage',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV de stage efficace',
    items: [
      {
        question: 'Comment faire un CV de stage étudiant ?',
        answer: 'Pour un CV de stage, mettez votre formation en tête si vous avez peu d\'expérience. Ajoutez vos projets, compétences techniques et soft skills. Utilisez notre générateur gratuit avec IA pour créer un CV de stage professionnel en 5 minutes.',
      },
      {
        question: 'Quel format de CV choisir pour un stage ?',
        answer: 'Préférez un format Modern ou Minimal pour la majorité des stages. ATS-Friendly pour les grandes entreprises et les portails de recrutement. Une page suffit pour un CV de stage étudiant.',
      },
      {
        question: 'Comment faire un CV de stage sans expérience ?',
        answer: 'Mettez en avant votre formation, vos projets académiques, vos compétences techniques et vos activités extra-scolaires. Notre IA vous aide à valoriser chaque élément même sans expérience professionnelle.',
      },
      {
        question: 'Quelle longueur pour un CV de stage ?',
        answer: 'Un CV de stage étudiant doit tenir sur une seule page A4. Nos templates sont conçus pour respecter cette contrainte automatiquement tout en restant lisibles et professionnels.',
      },
      {
        question: 'Comment personnaliser son CV pour chaque stage ?',
        answer: 'Adaptez votre CV à chaque offre en intégrant les mots-clés de l\'annonce dans vos descriptions. Notre IA vous aide à identifier et intégrer les termes importants pour chaque candidature.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV de stage maintenant',
    description: 'Gratuit, guidé par l\'IA, prêt en 5 minutes. Décrochez le stage que vous visez.',
    ctaText: 'Créer mon CV de stage',
  },
}

export default function ModeleCvStagePage() {
  return <SeoLandingPage config={config} />
}
