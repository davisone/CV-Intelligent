import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ClipboardList, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvChefDeProjetPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-chef-de-projet' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Chef de Projet',
  canonicalPath: '/cv-chef-de-projet',
  hero: {
    badgeIcon: ClipboardList,
    badgeText: 'Gestion de Projet',
    h1Before: 'Créer un ',
    h1Accent: 'CV Chef de Projet',
    h1After: ' Gratuit',
    subtitle: 'Chef de projet IT, marketing, construction — un CV qui démontre votre capacité à livrer dans les délais et le budget',
    description: 'Créez votre CV chef de projet gratuit en 5 minutes. Templates adaptés à la gestion de projet, mettant en valeur vos livrables, méthodologies et certifications. Export PDF.',
    primaryCtaText: 'Créer mon CV chef de projet',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV chef de projet',
    subtitle: 'Un CV chef de projet doit démontrer votre capacité à coordonner, livrer et gérer les risques.',
    items: [
      {
        icon: ClipboardList,
        title: 'Projets et livrables',
        description: 'Budget géré, délais respectés, équipes coordonnées, livrables produits — chaque projet doit être décrit avec ses enjeux, contraintes et résultats concrets.',
      },
      {
        icon: Star,
        title: 'Méthodologies',
        description: 'Agile, Scrum, Kanban, Prince2, PMI, cycle en V — précisez les méthodologies maîtrisées et certifications obtenues. Ce sont des critères de sélection essentiels.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les DSI, directions marketing et grandes entreprises utilisent des ATS. Nos templates intègrent les mots-clés de la gestion de projet pour passer ces filtres.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV chef de projet gratuits',
    subtitle: 'Des templates adaptés à chaque domaine de la gestion de projet.',
    items: [
      {
        title: 'CV Chef de Projet IT',
        keyword: 'cv chef de projet informatique gratuit',
        description: 'Projets SI, développement logiciel, migration, transformation digitale — template valorisant vos compétences techniques et vos certifications (PMP, Scrum Master).',
      },
      {
        title: 'CV Chef de Projet Marketing',
        keyword: 'cv chef de projet marketing gratuit',
        description: 'Lancement de produits, campagnes multicanal, coordination agences, gestion des budgets marketing et suivi des KPIs de performance.',
      },
      {
        title: 'CV Chef de Projet Construction',
        keyword: 'cv chef de projet construction gratuit',
        description: 'Maîtrise d\'œuvre, coordination des corps de métier, suivi des chantiers, respect des normes et gestion des sous-traitants.',
      },
      {
        title: 'CV Project Manager Senior',
        keyword: 'cv project manager senior gratuit',
        description: 'Portfolio de projets complexes, management de chefs de projet, gouvernance de programme, reporting au comité de direction.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV chef de projet percutant',
    tips: [
      'Décrivez chaque projet avec : budget, durée, taille d\'équipe, méthodologie et résultat livré',
      'Listez vos certifications : PMP, Prince2, PSM I/II, Scrum Master, CAPM',
      'Précisez vos outils de gestion de projet : Jira, Confluence, MS Project, Trello, Asana',
      'Montrez votre capacité à gérer les risques : décrivez une situation où vous avez évité un dérapage',
      'Quantifiez l\'impact de vos projets : économies réalisées, délais tenus, satisfaction client',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV chef de projet',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV chef de projet efficace',
    items: [
      {
        question: 'Comment faire un bon CV chef de projet ?',
        answer: 'Un bon CV chef de projet présente vos projets avec leurs enjeux, budgets, délais et résultats. Mentionnez vos certifications (PMP, Scrum), vos méthodologies et vos outils. Notre IA vous aide à structurer chaque projet de façon impactante.',
      },
      {
        question: 'Quelles certifications mettre dans un CV chef de projet ?',
        answer: 'PMP (PMI), Prince2 Foundation/Practitioner, PSM I/II (Scrum), CAPM, SAFe Agile, ITIL pour les projets IT. Ces certifications sont souvent requises dans les offres d\'emploi chef de projet.',
      },
      {
        question: 'Comment présenter ses projets dans un CV ?',
        answer: 'Pour chaque projet : nom/contexte, budget géré, durée, taille d\'équipe, méthodologie utilisée, défis rencontrés et résultats obtenus. Notre IA vous aide à condenser ces informations en 2-3 lignes percutantes.',
      },
      {
        question: 'Quel template CV choisir pour un chef de projet ?',
        answer: 'Modern pour les secteurs dynamiques (tech, digital, conseil). ATS-Friendly pour les grandes entreprises avec portails RH. Classic pour les environnements plus formels (industrie, BTP, administration publique).',
      },
      {
        question: 'Comment valoriser une première expérience chef de projet ?',
        answer: 'Mettez en avant tous les projets gérés, même en tant que coordinateur ou contributeur principal. Décrivez votre rôle, les parties prenantes impliquées et les livrables produits. Notre IA valorise chaque expérience comme une compétence projet.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV chef de projet maintenant',
    description: 'Valorisez vos projets, certifications et compétences en gestion. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV chef de projet',
  },
}

export default function CvChefDeProjetPage() {
  return <SeoLandingPage config={config} />
}
