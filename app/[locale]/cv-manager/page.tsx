import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvManagerPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-manager' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Manager',
  canonicalPath: '/cv-manager',
  hero: {
    badgeIcon: Users,
    badgeText: 'Management & Leadership',
    h1Before: 'Créer un ',
    h1Accent: 'CV Manager',
    h1After: ' Gratuit',
    subtitle: 'Manager, responsable d\'équipe, chef de service — un CV qui valorise votre leadership et vos résultats collectifs',
    description: 'Créez votre CV manager gratuit en 5 minutes. Templates adaptés aux profils management, optimisés ATS, mettant en avant vos compétences en leadership et vos indicateurs de performance.',
    primaryCtaText: 'Créer mon CV manager',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV manager',
    subtitle: 'Un bon CV manager démontre votre capacité à faire réussir une équipe, pas seulement à performer individuellement.',
    items: [
      {
        icon: Users,
        title: 'Leadership et équipe',
        description: 'Taille d\'équipe managée, profils, turnover réduit, montée en compétences — les recruteurs évaluent votre capacité à fédérer et développer des collaborateurs.',
      },
      {
        icon: Star,
        title: 'Résultats collectifs',
        description: 'Objectifs atteints, croissance du chiffre, amélioration de la productivité, projets livrés — montrez l\'impact concret de votre management sur les performances de l\'équipe.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grandes entreprises filtrent les candidatures avec des logiciels de tri. Nos templates garantissent que vos compétences managériales sont parfaitement identifiées.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV manager gratuits',
    subtitle: 'Des templates adaptés à chaque type de management.',
    items: [
      {
        title: 'CV Manager Opérationnel',
        keyword: 'cv manager opérationnel gratuit',
        description: 'Management d\'équipe terrain, pilotage des opérations, gestion des plannings, coordination des activités quotidiennes et reporting des résultats.',
      },
      {
        title: 'CV Responsable d\'Équipe',
        keyword: 'cv responsable équipe gratuit',
        description: 'Animation d\'équipe, entretiens annuels, montée en compétences, gestion des conflits et maintien d\'un bon climat social dans l\'équipe.',
      },
      {
        title: 'CV Manager de Transition',
        keyword: 'cv manager transition gratuit',
        description: 'Conduite du changement, restructuration, transformation organisationnelle — valorisez votre expérience de manager en situation de transformation.',
      },
      {
        title: 'CV Directeur / Manager Senior',
        keyword: 'cv directeur manager gratuit',
        description: 'Direction d\'un service ou d\'une BU, management de managers, stratégie et définition des objectifs, pilotage des budgets et des ressources.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV manager percutant',
    tips: [
      'Précisez toujours la taille de l\'équipe managée et sa composition (profils, séniorité)',
      'Quantifiez vos résultats collectifs : chiffre d\'affaires, taux de satisfaction, productivité, turnover',
      'Décrivez votre style de management : participatif, coaching, directif selon le contexte',
      'Mentionnez vos expériences de conduite du changement ou de transformation',
      'Incluez vos formations au management : école de commerce, certifications leadership, coaching',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV manager',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV manager efficace',
    items: [
      {
        question: 'Comment faire un bon CV manager ?',
        answer: 'Un bon CV manager met en avant la taille et les résultats des équipes managées, les performances collectives atteintes et votre style de leadership. Chaque expérience doit montrer l\'impact de votre management, pas seulement vos responsabilités. Notre IA vous aide à formuler cela.',
      },
      {
        question: 'Comment passer de collaborateur à manager dans un CV ?',
        answer: 'Mettez en avant toutes vos expériences d\'encadrement, même informelles : coordination de projet, tutorat de stagiaires, leadership de groupe. Notre IA vous aide à valoriser ces expériences comme des prémices de compétences managériales.',
      },
      {
        question: 'Quel template CV choisir pour un manager ?',
        answer: 'Le template Modern convient à la majorité des postes management dans les secteurs dynamiques (tech, retail, services). Classic pour les fonctions managériales dans des environnements formels (banque, industrie, administration).',
      },
      {
        question: 'Quelles compétences managériales mettre dans un CV ?',
        answer: 'Leadership, conduite du changement, gestion des conflits, développement des talents, pilotage par les KPIs, communication transversale, prise de décision sous pression. Notre IA vous aide à identifier celles qui correspondent le mieux au poste visé.',
      },
      {
        question: 'Comment valoriser un management à distance dans un CV ?',
        answer: 'Précisez que vous avez managé une équipe distribuée ou en télétravail, les outils utilisés (Teams, Slack, Asana), la fréquence de contact et les résultats obtenus malgré la distance. C\'est une compétence de plus en plus valorisée.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV manager maintenant',
    description: 'Valorisez votre leadership et les succès de vos équipes. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV manager',
  },
}

export default function CvManagerPage() {
  return <SeoLandingPage config={config} />
}
