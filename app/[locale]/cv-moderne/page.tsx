import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvModernePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-moderne' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Moderne',
  canonicalPath: '/cv-moderne',
  hero: {
    badgeIcon: Sparkles,
    badgeText: 'Templates modernes 2026',
    h1Before: 'Créer un ',
    h1Accent: 'CV Moderne',
    h1After: ' Gratuit en PDF',
    subtitle: 'Un CV aux codes visuels actuels — épuré, impactant, professionnel',
    description: 'Créez votre CV moderne gratuit en 5 minutes. Téléchargez en PDF, optimisé ATS, adapté à tous les secteurs en 2026.',
    primaryCtaText: 'Créer mon CV moderne',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les atouts d\'un CV moderne',
    subtitle: 'Modernité ne signifie pas inaccessible — nos templates modernes allient esthétique et efficacité.',
    items: [
      {
        icon: Sparkles,
        title: 'Design actuel 2026',
        description: 'Un CV moderne utilise les codes visuels de 2026 : espaces aérés, typographie contemporaine et hiérarchie visuelle claire.',
      },
      {
        icon: Shield,
        title: 'Compatible ATS',
        description: 'Moderne ne veut pas dire illisible pour les robots. Tous nos templates modernes sont optimisés pour les logiciels de tri automatique.',
      },
      {
        icon: Star,
        title: 'Polyvalent',
        description: 'Un CV moderne convient à la grande majorité des secteurs : tech, finance, marketing, commerce, santé et éducation.',
      },
    ],
  },
  section2: {
    title: 'Nos templates CV modernes gratuits',
    subtitle: 'Quatre déclinaisons modernes pour tous les profils et secteurs.',
    items: [
      {
        title: 'CV Modern Pro',
        keyword: 'cv moderne professionnel gratuit',
        description: 'Notre template le plus populaire : design épuré, couleur subtile, impact maximal pour tous les secteurs.',
      },
      {
        title: 'CV Modern Étudiant',
        keyword: 'cv moderne étudiant gratuit pdf',
        description: 'Adapté aux profils juniors : formation mise en avant, compétences bien valorisées, design actuel.',
      },
      {
        title: 'CV Modern Minimaliste',
        keyword: 'cv moderne minimaliste gratuit',
        description: 'L\'alliance parfaite entre modernité et sobriété. Idéal pour les profils exigeants qui veulent se distinguer discrètement.',
      },
      {
        title: 'CV Modern ATS',
        keyword: 'cv moderne ats compatible',
        description: 'Design moderne optimisé pour les portails de recrutement des grandes entreprises et des cabinets de recrutement.',
      },
    ],
  },
  section3: {
    title: 'Créez votre CV moderne en 4 étapes',
    steps: [
      { title: 'Créez votre compte', description: 'Inscription gratuite en 30 secondes, sans carte bancaire.' },
      { title: 'Choisissez votre template moderne', description: '4 designs modernes adaptés à votre profil et à votre secteur.' },
      { title: 'Remplissez avec l\'IA', description: 'Notre IA optimise formulations, mots-clés et structure pour un impact maximal.' },
      { title: 'Téléchargez en PDF', description: 'Export haute qualité, prêt à envoyer à vos recruteurs.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV moderne',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV moderne efficace',
    items: [
      {
        question: 'Qu\'est-ce qu\'un CV moderne ?',
        answer: 'Un CV moderne est un curriculum vitae qui adopte les codes visuels et structurels actuels : mise en page épurée, typographie contemporaine, hiérarchie visuelle claire. En 2026, un CV moderne se distingue par sa lisibilité et son aspect professionnel sans être austère.',
      },
      {
        question: 'Comment créer un CV moderne gratuitement ?',
        answer: 'Sur notre plateforme, créez un compte gratuit, choisissez l\'un de nos templates modernes, personnalisez le contenu avec l\'aide de l\'IA, et téléchargez en PDF gratuitement. Le template Modern est entièrement gratuit.',
      },
      {
        question: 'Un CV moderne est-il compatible ATS ?',
        answer: 'Oui, nos templates modernes sont conçus pour être à la fois beaux et compatibles ATS. Nous n\'utilisons pas d\'éléments qui poserait problème aux logiciels de tri automatique tout en maintenant un design contemporain.',
      },
      {
        question: 'Quel template CV moderne choisir en 2026 ?',
        answer: 'Le template Modern Pro convient à la majorité des secteurs. Modern Étudiant est idéal si vous avez peu d\'expérience. Modern Minimaliste pour les secteurs exigeants. Modern ATS pour les grandes entreprises avec des portails de recrutement.',
      },
      {
        question: 'CV moderne ou CV classique : lequel choisir ?',
        answer: 'En 2026, le CV moderne est recommandé pour la plupart des candidatures. Le CV classique reste préférable dans certains secteurs très formels (administration publique, banque traditionnelle). En cas de doute, notre template Modern est le meilleur compromis.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV moderne maintenant',
    description: 'Moderne, optimisé, professionnel. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV moderne',
  },
}

export default function CvModernePage() {
  return <SeoLandingPage config={config} />
}
