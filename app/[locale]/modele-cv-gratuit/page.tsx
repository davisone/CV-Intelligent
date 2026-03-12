// app/[locale]/modele-cv-gratuit/page.tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvGratuitPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv-gratuit' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
    },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Modèle CV Gratuit',
  canonicalPath: '/modele-cv-gratuit',

  hero: {
    badgeIcon: FileText,
    badgeText: 'Modèles 100% gratuits',
    h1Before: 'Modèle de ',
    h1Accent: 'CV Gratuit',
    h1After: ' à Télécharger en PDF',
    subtitle: 'Modern, minimaliste, ATS — tous nos templates sont gratuits',
    description: 'Choisissez parmi nos modèles de CV gratuits et créez votre CV professionnel en 5 minutes. Export PDF instantané, sans carte bancaire.',
    primaryCtaText: 'Choisir mon modèle gratuit',
    secondaryCtaText: 'Voir tous les templates',
    secondaryCtaHref: '/templates',
  },

  section1: {
    title: 'Pourquoi nos modèles CV sont différents',
    items: [
      {
        icon: Sparkles,
        title: 'Tous gratuits, vraiment',
        description: 'Pas de piège ni d\'abonnement surprise. Téléchargez en PDF gratuitement dès que vous êtes prêt.',
      },
      {
        icon: Shield,
        title: 'Optimisés ATS',
        description: 'Chaque template est structuré pour passer les systèmes de tri automatique des recruteurs.',
      },
      {
        icon: Star,
        title: 'Design professionnel',
        description: 'Conçus pour être modernes et intemporels, adaptés à tous les secteurs : tech, commerce, santé, éducation.',
      },
    ],
  },

  section2: {
    title: 'Nos modèles CV gratuits',
    items: [
      {
        title: 'Template Modern',
        keyword: 'modèle cv moderne gratuit',
        description: 'Notre modèle phare : design épuré avec une touche de couleur. Idéal pour la majorité des secteurs, du junior au senior.',
      },
      {
        title: 'Template Minimal',
        keyword: 'modèle cv minimaliste gratuit pdf',
        description: 'Le plus épuré : fond blanc, typographie claire. Parfait pour les profils exigeants et les secteurs conservateurs.',
      },
      {
        title: 'Template ATS-Friendly',
        keyword: 'modèle cv ats gratuit',
        description: 'Optimisé pour les logiciels de tri automatique : structure simple, texte parfaitement parsé par tous les ATS.',
      },
      {
        title: 'Template Classic',
        keyword: 'modèle cv classique gratuit',
        description: 'Le format traditionnel remis au goût du jour. Convient à tous les profils, particulièrement les milieux formels.',
      },
    ],
  },

  section3: {
    title: 'Créez votre CV gratuit en 4 étapes',
    steps: [
      {
        title: 'Créez votre compte gratuitement',
        description: 'Inscription en 30 secondes, sans carte bancaire.',
      },
      {
        title: 'Choisissez votre modèle CV',
        description: 'Modern, Minimal, ATS-Friendly ou Classic selon votre profil.',
      },
      {
        title: "Remplissez avec l'aide de l'IA",
        description: 'Notre IA optimise votre contenu : formulations, mots-clés, structure.',
      },
      {
        title: 'Téléchargez en PDF gratuit',
        description: 'Export instantané en haute qualité, prêt à envoyer aux recruteurs.',
      },
    ],
  },

  faq: {
    title: 'Questions fréquentes sur les modèles CV gratuits',
    subtitle: 'Tout ce que vous devez savoir pour télécharger et utiliser nos templates CV',
    items: [
      {
        question: 'Nos modèles CV sont-ils vraiment gratuits ?',
        answer: 'Oui, le template Modern est entièrement gratuit, export PDF inclus. Pas de carte bancaire requise, pas de frais cachés.',
      },
      {
        question: 'Quel modèle CV choisir ?',
        answer: 'Minimal ou Modern pour la majorité des secteurs, ATS-Friendly pour les grandes entreprises et les postes tech, Classic pour les milieux formels et traditionnels.',
      },
      {
        question: 'Comment télécharger un modèle CV en PDF gratuitement ?',
        answer: "Créez un compte gratuit, choisissez votre template, remplissez votre contenu avec l'aide de l'IA, puis téléchargez en PDF en un clic.",
      },
      {
        question: 'Les modèles CV sont-ils compatibles ATS ?',
        answer: 'Oui, tous nos templates sont structurés pour être parsés correctement par les logiciels de tri automatique utilisés par les recruteurs.',
      },
      {
        question: 'Peut-on personnaliser les couleurs et la police ?',
        answer: "Oui, chaque template est entièrement personnalisable dans l'éditeur : couleurs, polices, mise en page — tout s'adapte à votre profil.",
      },
    ],
  },

  finalCta: {
    title: 'Choisissez votre modèle CV gratuit',
    description: 'Gratuit, instantané, professionnel. Votre CV prêt en 5 minutes.',
    ctaText: 'Choisir mon modèle gratuit',
  },
}

export default function ModeleCvGratuitPage() {
  return <SeoLandingPage config={config} />
}
