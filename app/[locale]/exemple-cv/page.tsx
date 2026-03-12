import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.exempleCvPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/exemple-cv' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Exemple de CV',
  canonicalPath: '/exemple-cv',
  hero: {
    badgeIcon: FileText,
    badgeText: 'Exemples concrets et professionnels',
    h1Before: '',
    h1Accent: 'Exemple de CV',
    h1After: ' Gratuit à Télécharger',
    subtitle: 'Des exemples de CV concrets pour tous les profils — étudiant, professionnel, débutant',
    description: 'Consultez nos exemples de CV gratuits et créez le vôtre en 5 minutes. Exemples réels pour tous les secteurs et niveaux d\'expérience, export PDF.',
    primaryCtaText: 'Créer mon CV gratuit',
    secondaryCtaText: 'Voir tous les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Des exemples de CV pour chaque profil',
    subtitle: 'S\'inspirer d\'exemples concrets est la meilleure façon de créer un CV efficace.',
    items: [
      {
        icon: FileText,
        title: 'Exemples réels',
        description: 'Nos exemples de CV sont basés sur des profils réels et optimisés par des experts en recrutement pour maximiser l\'impact.',
      },
      {
        icon: Sparkles,
        title: 'Guidé par l\'IA',
        description: 'Notre IA analyse les exemples les plus efficaces et vous aide à rédiger votre propre CV en vous inspirant des meilleures pratiques.',
      },
      {
        icon: Star,
        title: 'Tous secteurs',
        description: 'Tech, commerce, santé, marketing, ingénierie, éducation — des exemples adaptés à chaque domaine professionnel.',
      },
    ],
  },
  section2: {
    title: 'Exemples de CV par profil',
    subtitle: 'Des modèles concrets adaptés à chaque situation professionnelle.',
    items: [
      {
        title: 'Exemple CV Professionnel',
        keyword: 'exemple cv professionnel gratuit',
        description: 'CV professionnel pour cadres et confirmés : structure expériences-compétences-formation, mise en valeur des réalisations concrètes.',
      },
      {
        title: 'Exemple CV Étudiant',
        keyword: 'exemple cv étudiant gratuit',
        description: 'CV étudiant sans expérience ou avec stages : formation en avant, projets académiques, compétences et activités extra-scolaires.',
      },
      {
        title: 'Exemple CV Développeur',
        keyword: 'exemple cv développeur gratuit',
        description: 'CV développeur avec section compétences techniques détaillée, projets GitHub, stack précise et expériences en entreprise.',
      },
      {
        title: 'Exemple CV Commercial',
        keyword: 'exemple cv commercial gratuit',
        description: 'CV commercial avec chiffres de vente, secteurs couverts, types de clients et réalisations quantifiées pour convaincre.',
      },
    ],
  },
  section3: {
    title: '5 éléments d\'un exemple de CV réussi',
    tips: [
      'Une accroche professionnelle en 2-3 lignes qui résume votre profil et votre valeur ajoutée',
      'Des expériences décrites avec des résultats concrets et quantifiés quand c\'est possible',
      'Une section compétences structurée par catégories (techniques, langues, outils)',
      'La formation avec établissement, diplôme et année — en tête si vous êtes junior',
      'Une mise en page aérée et lisible qui donne envie de lire jusqu\'au bout',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur les exemples de CV',
    subtitle: 'Tout ce qu\'il faut savoir pour utiliser nos exemples efficacement',
    items: [
      {
        question: 'Comment utiliser un exemple de CV ?',
        answer: 'Un exemple de CV sert de référence pour la structure, le ton et le niveau de détail attendu. Ne le copiez pas mot pour mot — adaptez-le à votre parcours. Notre IA vous aide à rédiger votre propre contenu en vous inspirant des meilleures pratiques.',
      },
      {
        question: 'Quel exemple de CV choisir pour mon profil ?',
        answer: 'Choisissez l\'exemple qui correspond le mieux à votre niveau d\'expérience (étudiant, junior, confirmé) et à votre secteur. Notre générateur propose des exemples adaptés à des dizaines de profils et métiers.',
      },
      {
        question: 'Les exemples de CV sont-ils à jour pour 2026 ?',
        answer: 'Oui, tous nos exemples de CV sont mis à jour régulièrement pour refléter les tendances actuelles du recrutement. En 2026, les recruteurs valorisent les CVs concis, orientés résultats et compatibles ATS.',
      },
      {
        question: 'Peut-on télécharger un exemple de CV en PDF ?',
        answer: 'Oui. Créez un compte gratuit, choisissez votre exemple de CV, personnalisez-le avec vos informations, et téléchargez en PDF instantanément. Le template Modern est entièrement gratuit.',
      },
      {
        question: 'Comment adapter un exemple de CV à une offre d\'emploi ?',
        answer: 'Identifiez les mots-clés de l\'offre et intégrez-les dans votre CV. Adaptez votre accroche et vos descriptions d\'expérience pour correspondre au poste visé. Notre IA analyse l\'offre et suggère les optimisations à faire.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV basé sur nos exemples',
    description: 'Inspirez-vous des meilleurs exemples et créez un CV qui se démarque en 5 minutes.',
    ctaText: 'Créer mon CV maintenant',
  },
}

export default function ExempleCvPage() {
  return <SeoLandingPage config={config} />
}
