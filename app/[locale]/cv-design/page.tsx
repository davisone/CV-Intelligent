import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDesignPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-design' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Design',
  canonicalPath: '/cv-design',
  hero: {
    badgeIcon: Sparkles,
    badgeText: 'Design moderne & créatif',
    h1Before: 'Créer un ',
    h1Accent: 'CV Design',
    h1After: ' Gratuit en Ligne',
    subtitle: 'Démarquez-vous avec un CV au design soigné — sans sacrifier la lisibilité',
    description: 'Créez votre CV design gratuit en ligne en 5 minutes. Templates modernes, esthétiques et compatibles ATS pour tous les secteurs.',
    primaryCtaText: 'Créer mon CV design',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Pourquoi choisir un CV design ?',
    subtitle: 'Un CV design bien conçu attire l\'œil sans sacrifier l\'essentiel.',
    items: [
      {
        icon: Sparkles,
        title: 'Première impression mémorable',
        description: 'Un CV design attire l\'œil et laisse une impression durable. Idéal pour les secteurs créatifs, digitaux et tech où se démarquer est valorisé.',
      },
      {
        icon: Shield,
        title: 'ATS-Compatible',
        description: 'Nos templates design sont conçus pour rester parfaitement lisibles par les logiciels ATS tout en étant visuellement attractifs.',
      },
      {
        icon: Star,
        title: 'Adapté à votre secteur',
        description: 'Tech, marketing, communication, design : chaque secteur a ses codes visuels. Nos templates s\'adaptent à votre domaine et votre personnalité.',
      },
    ],
  },
  section2: {
    title: 'Nos templates CV design gratuits',
    subtitle: 'Des designs professionnels pour tous les profils créatifs et digitaux.',
    items: [
      {
        title: 'CV Design Modern',
        keyword: 'cv design moderne gratuit',
        description: 'Notre template phare : couleurs subtiles, hiérarchie visuelle claire, impression professionnelle garantie pour tous les secteurs.',
      },
      {
        title: 'CV Design Créatif',
        keyword: 'cv design créatif étudiant',
        description: 'Pour les profils créatifs qui veulent se démarquer tout en restant professionnels. Idéal pour les agences et startups.',
      },
      {
        title: 'CV Design Minimaliste',
        keyword: 'cv design minimaliste gratuit',
        description: 'Le design épuré par excellence : chaque élément a sa raison d\'être. Élégance et efficacité réunies.',
      },
      {
        title: 'CV Design Tech',
        keyword: 'cv design développeur informatique',
        description: 'Optimisé pour les profils tech et développeurs qui veulent un CV moderne, impactant et facilement lisible par les recruteurs IT.',
      },
    ],
  },
  section3: {
    title: '5 règles pour un CV design réussi',
    tips: [
      'Choisissez 1 à 2 couleurs maximum pour rester sobre et professionnel',
      'Utilisez une typographie claire — beauté et lisibilité ne s\'opposent pas',
      'Structurez l\'espace visuellement : colonnes, sections bien délimitées, icônes légères',
      'Vérifiez toujours le rendu PDF — l\'aperçu écran peut différer légèrement',
      'Restez compatible ATS : évitez les tableaux dans des images ou les zones de texte non sélectionnables',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV design',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV design professionnel',
    items: [
      {
        question: 'Qu\'est-ce qu\'un CV design ?',
        answer: 'Un CV design est un curriculum vitae qui utilise des éléments visuels (couleurs, typographie travaillée, mise en page structurée) pour se démarquer tout en restant lisible et professionnel. Il va au-delà du simple format texte sans pour autant sacrifier la clarté.',
      },
      {
        question: 'Comment créer un CV design gratuit en ligne ?',
        answer: 'Créez un compte gratuit, choisissez l\'un de nos templates design, personnalisez couleurs et contenu avec l\'aide de l\'IA, et téléchargez en PDF. Tout le processus prend moins de 5 minutes.',
      },
      {
        question: 'Un CV design est-il compatible ATS ?',
        answer: 'Oui, nos templates design sont spécialement conçus pour être à la fois beaux et compatibles ATS. Nous évitons les éléments qui posent problème aux logiciels de tri (images non sélectionnables, tableaux complexes) tout en maintenant un design soigné.',
      },
      {
        question: 'CV design ou CV simple : lequel choisir ?',
        answer: 'Choisissez un CV design pour les secteurs créatifs, tech, marketing ou startup. Optez pour un CV simple pour les secteurs plus conservateurs (finance, santé, administration). En cas de doute, le template Modern est un excellent compromis.',
      },
      {
        question: 'Quels secteurs favorisent un CV design ?',
        answer: 'Les secteurs qui apprécient le plus les CVs design sont : les agences créatives, les startups et scale-ups, les entreprises tech, le marketing digital, la communication, le design lui-même et l\'e-commerce.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV design maintenant',
    description: 'Moderne, esthétique, professionnel. Votre CV design prêt en 5 minutes.',
    ctaText: 'Créer mon CV design',
  },
}

export default function CvDesignPage() {
  return <SeoLandingPage config={config} />
}
