import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Wrench, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvIngenieurPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-ingenieur' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Ingénieur',
  canonicalPath: '/cv-ingenieur',
  hero: {
    badgeIcon: Wrench,
    badgeText: 'Ingénierie & Technique',
    h1Before: 'Créer un ',
    h1Accent: 'CV Ingénieur',
    h1After: ' Gratuit',
    subtitle: 'Ingénieur informatique, génie civil, mécanique, électronique — un CV qui valorise vos compétences techniques et vos projets',
    description: 'Créez votre CV d\'ingénieur gratuit en 5 minutes. Templates adaptés aux profils ingénieurs, optimisés ATS, avec vos compétences techniques et projets en avant.',
    primaryCtaText: 'Créer mon CV ingénieur',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV ingénieur',
    subtitle: 'Un CV ingénieur doit mettre en avant expertise technique et réalisations concrètes.',
    items: [
      {
        icon: Wrench,
        title: 'Compétences techniques',
        description: 'Langages, outils, logiciels, normes — précisez votre stack technique et votre niveau de maîtrise. Une section compétences structurée est essentielle pour un profil ingénieur.',
      },
      {
        icon: Star,
        title: 'Projets et réalisations',
        description: 'Décrivez vos projets techniques avec leur contexte, les technologies utilisées et les résultats obtenus. Budget géré, délais respectés, innovations apportées — les recruteurs veulent des faits.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grandes entreprises industrielles et ESN utilisent des logiciels de tri. Nos templates garantissent que vos compétences techniques sont correctement parsées par ces systèmes.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV ingénieur gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité de l\'ingénierie.',
    items: [
      {
        title: 'CV Ingénieur Informatique',
        keyword: 'cv ingénieur informatique gratuit',
        description: 'Développement logiciel, architecture système, DevOps, cybersécurité — template avec section compétences techniques détaillée et projets.',
      },
      {
        title: 'CV Ingénieur Génie Civil',
        keyword: 'cv ingénieur génie civil gratuit',
        description: 'Construction, BTP, infrastructures — template valorisant vos chantiers, certifications et maîtrise des normes et réglementations.',
      },
      {
        title: 'CV Ingénieur Mécanique',
        keyword: 'cv ingénieur mécanique gratuit',
        description: 'Conception, CAO, simulation, industrialisation — template avec projets de R&D, logiciels maîtrisés (SolidWorks, CATIA) et réalisations.',
      },
      {
        title: 'CV Ingénieur Chef de Projet',
        keyword: 'cv ingénieur chef de projet gratuit',
        description: 'Management de projets techniques, coordination équipes, suivi budgets et délais, gestion des risques et livrables.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV ingénieur percutant',
    tips: [
      'Structurez vos compétences techniques par catégories (langages, outils, logiciels, normes)',
      'Décrivez chaque projet avec contexte, technologies utilisées et résultats mesurables',
      'Mentionnez vos certifications et habilitations spécifiques à votre domaine',
      'Incluez vos diplômes d\'ingénieur avec le nom de l\'école et la spécialité',
      'Précisez votre niveau d\'anglais : essentiel dans l\'industrie et les ESN internationales',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV ingénieur',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV ingénieur efficace',
    items: [
      {
        question: 'Comment faire un bon CV d\'ingénieur ?',
        answer: 'Un bon CV d\'ingénieur met en avant vos compétences techniques structurées, vos projets concrets avec les technologies utilisées et les résultats obtenus. Mentionnez vos diplômes d\'ingénieur, certifications et votre niveau d\'anglais. Notre IA vous aide à valoriser chaque expérience.',
      },
      {
        question: 'Quelles compétences techniques mettre dans un CV ingénieur ?',
        answer: 'Listez vos compétences par catégories : langages de programmation, frameworks, outils de développement, logiciels métier (CAO, simulation), normes et certifications. Précisez votre niveau de maîtrise pour chaque compétence.',
      },
      {
        question: 'Comment présenter ses projets dans un CV ingénieur ?',
        answer: 'Pour chaque projet : contexte et enjeux, technologies et méthodes utilisées, votre rôle, et résultats mesurables (délais, budget, performance technique). Notre IA vous aide à structurer chaque projet de façon concise et impactante.',
      },
      {
        question: 'Quel template CV choisir pour un ingénieur ?',
        answer: 'Le template ATS-Friendly est recommandé pour les grandes ESN et industriels. Modern pour la plupart des candidatures. Classic pour les entreprises et secteurs traditionnels (aéronautique, défense, énergie).',
      },
      {
        question: 'Comment valoriser son école d\'ingénieur dans un CV ?',
        answer: 'Mettez le nom complet de l\'école, la spécialisation et l\'année. Si vous êtes junior, placez la formation en tête. Mentionnez les projets significatifs réalisés pendant la formation, vos stages et votre classement si honorable.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV ingénieur maintenant',
    description: 'Valorisez votre expertise technique et vos projets. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV ingénieur',
  },
}

export default function CvIngenieurPage() {
  return <SeoLandingPage config={config} />
}
