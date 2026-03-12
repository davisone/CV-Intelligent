import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Shield, FileText, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvSimplePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-simple' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Simple',
  canonicalPath: '/cv-simple',
  hero: {
    badgeIcon: FileText,
    badgeText: 'Sobre et efficace',
    h1Before: 'Créer un ',
    h1Accent: 'CV Simple',
    h1After: ' Gratuit en PDF',
    subtitle: 'Un CV simple, c\'est souvent le plus efficace — lisible, professionnel, sans fioritures',
    description: 'Créez votre CV simple gratuit en ligne et téléchargez en PDF en 5 minutes. Modèles épurés, clairs et compatibles ATS pour tous les secteurs.',
    primaryCtaText: 'Créer mon CV simple',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Pourquoi choisir un CV simple ?',
    subtitle: 'La simplicité est une force, pas un manque d\'ambition.',
    items: [
      {
        icon: Shield,
        title: 'Lecture immédiate',
        description: 'Un recruteur passe 7 secondes sur un CV. Le format simple garantit que vos informations clés sont vues en premier, sans distraction.',
      },
      {
        icon: FileText,
        title: 'Compatible tous secteurs',
        description: 'Un CV simple convient à tous les métiers et tous les niveaux d\'expérience, du junior au senior, de la tech au secteur public.',
      },
      {
        icon: Sparkles,
        title: 'Optimisé ATS',
        description: 'Les formats simples sont les mieux parsés par les logiciels de tri automatique. Vos informations arrivent intactes au recruteur.',
      },
    ],
  },
  section2: {
    title: 'Nos modèles CV simples gratuits',
    subtitle: 'Quatre déclinaisons sobres et professionnelles pour tous les profils.',
    items: [
      {
        title: 'CV Simple Modern',
        keyword: 'cv simple moderne gratuit',
        description: 'Épuré avec une légère touche de couleur. Le meilleur compromis entre simplicité et modernité pour 2026.',
      },
      {
        title: 'CV Simple Minimal',
        keyword: 'cv simple minimaliste gratuit pdf',
        description: 'Le plus sobre : fond blanc, typographie nette. Idéal pour les profils exigeants et les secteurs conservateurs.',
      },
      {
        title: 'CV Simple ATS',
        keyword: 'cv simple ats gratuit',
        description: 'Structure ultra-classique optimisée pour les logiciels de tri automatique des grandes entreprises.',
      },
      {
        title: 'CV Simple Classic',
        keyword: 'cv simple classique gratuit',
        description: 'Format traditionnel éprouvé, reconnu par tous les recruteurs, adapté à tous les secteurs.',
      },
    ],
  },
  section3: {
    title: '5 règles pour un CV simple réussi',
    tips: [
      'Limitez-vous à une page pour les profils juniors et deux pages maximum pour les seniors',
      'Utilisez une police lisible : Arial, Calibri ou Open Sans en taille 10-12',
      'Structurez en sections claires : Expériences, Formation, Compétences, Langues',
      'Rédigez des bullets courts (1-2 lignes) avec des verbes d\'action au présent',
      'Laissez des marges suffisantes — un CV aéré est plus agréable à lire et plus professionnel',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV simple',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV simple et efficace',
    items: [
      {
        question: 'Qu\'est-ce qu\'un CV simple ?',
        answer: 'Un CV simple est un curriculum vitae au format épuré, sans éléments décoratifs superflus. Il met l\'accent sur la lisibilité et la clarté de l\'information. C\'est le format le plus universel et le plus apprécié des recruteurs.',
      },
      {
        question: 'Comment créer un CV simple gratuitement ?',
        answer: 'Créez un compte gratuit sur notre plateforme, choisissez un de nos templates simples, remplissez votre contenu avec l\'aide de l\'IA, et téléchargez en PDF gratuitement. Tout le processus prend moins de 5 minutes.',
      },
      {
        question: 'CV simple ou CV design : lequel choisir ?',
        answer: 'Choisissez un CV simple pour les secteurs traditionnels (finance, conseil, secteur public, santé) ou si vous n\'êtes pas sûr du ton attendu. Optez pour un CV design pour les secteurs créatifs ou digitaux où se démarquer est valorisé.',
      },
      {
        question: 'Comment télécharger un CV simple en PDF gratuitement ?',
        answer: 'Sur notre plateforme, l\'export PDF est inclus gratuitement avec le template Modern. Choisissez votre template, complétez votre CV, et cliquez sur "Télécharger en PDF". Le fichier est prêt en quelques secondes.',
      },
      {
        question: 'Un CV simple est-il compatible ATS ?',
        answer: 'Oui, c\'est même l\'un de ses principaux avantages. Les formats simples sont les mieux lus par les logiciels ATS car ils utilisent une structure HTML/PDF claire sans tableaux complexes ni zones de texte dans des images.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV simple maintenant',
    description: 'Sobre, lisible, professionnel. Votre CV simple prêt en 5 minutes.',
    ctaText: 'Créer mon CV simple',
  },
}

export default function CvSimplePage() {
  return <SeoLandingPage config={config} />
}
