import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Modèle de CV',
  canonicalPath: '/modele-cv',
  hero: {
    badgeIcon: FileText,
    badgeText: 'Templates gratuits 2026',
    h1Before: '',
    h1Accent: 'Modèle de CV',
    h1After: ' Gratuit à Télécharger',
    subtitle: 'Choisissez parmi nos templates CV modernes, minimalistes et professionnels',
    description: 'Téléchargez un modèle de CV gratuit et créez votre CV professionnel en 5 minutes. Export PDF instantané, sans carte bancaire, optimisé ATS.',
    primaryCtaText: 'Choisir mon modèle CV',
    secondaryCtaText: 'Voir tous les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Pourquoi choisir nos modèles de CV ?',
    subtitle: 'Des templates conçus pour maximiser vos chances d\'être rappelé.',
    items: [
      {
        icon: Sparkles,
        title: '100% gratuits',
        description: 'Nos modèles de CV sont entièrement gratuits. Pas de frais cachés, pas d\'abonnement surprise. Téléchargez en PDF dès que vous êtes prêt.',
      },
      {
        icon: Shield,
        title: 'Optimisés ATS',
        description: 'Chaque template est structuré pour passer les systèmes de tri automatique utilisés par les recruteurs des grandes entreprises.',
      },
      {
        icon: Star,
        title: 'Design professionnel',
        description: 'Conçus par des experts en recrutement et design, nos modèles sont modernes, intemporels et adaptés à tous les secteurs.',
      },
    ],
  },
  section2: {
    title: 'Nos modèles de CV gratuits',
    subtitle: 'Un template pour chaque profil et chaque secteur.',
    items: [
      {
        title: 'Modèle CV Modern',
        keyword: 'modèle cv moderne gratuit',
        description: 'Notre template le plus populaire. Design épuré, couleur subtile, compatible ATS. Idéal pour la majorité des candidatures.',
      },
      {
        title: 'Modèle CV Minimal',
        keyword: 'modèle cv minimaliste gratuit pdf',
        description: 'Le plus sobre et le plus lisible. Fond blanc, typographie claire. Parfait pour les profils exigeants.',
      },
      {
        title: 'Modèle CV ATS-Friendly',
        keyword: 'modèle cv ats gratuit',
        description: 'Structure optimisée pour les logiciels de tri automatique. Garantit que vos informations arrivent intactes au recruteur.',
      },
      {
        title: 'Modèle CV Classic',
        keyword: 'modèle cv classique gratuit',
        description: 'Le format traditionnel remis au goût du jour. Convient à tous les profils, particulièrement aux milieux formels.',
      },
    ],
  },
  section3: {
    title: 'Créez votre CV avec nos modèles en 4 étapes',
    steps: [
      { title: 'Choisissez votre modèle', description: 'Modern, Minimal, ATS ou Classic — sélectionnez le template adapté à votre secteur.' },
      { title: 'Personnalisez avec l\'IA', description: 'Notre IA optimise votre contenu : formulations, mots-clés, structure pour un impact maximal.' },
      { title: 'Adaptez couleurs et polices', description: 'Personnalisez chaque modèle selon vos préférences dans notre éditeur intuitif.' },
      { title: 'Téléchargez en PDF gratuit', description: 'Export haute qualité instantané, prêt à envoyer à vos recruteurs.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur les modèles de CV',
    subtitle: 'Tout ce qu\'il faut savoir pour choisir et utiliser nos templates',
    items: [
      {
        question: 'Quel modèle de CV choisir ?',
        answer: 'Pour la plupart des secteurs, le modèle Modern est le plus polyvalent. Choisissez Minimal pour les secteurs exigeants, ATS-Friendly pour les grandes entreprises avec portails de recrutement, et Classic pour les milieux formels (banque, administration, droit).',
      },
      {
        question: 'Les modèles de CV sont-ils vraiment gratuits ?',
        answer: 'Oui, le template Modern est entièrement gratuit incluant l\'export PDF. Pas de carte bancaire requise, pas de frais cachés. Les templates Premium sont disponibles avec un abonnement optionnel.',
      },
      {
        question: 'Comment personnaliser un modèle de CV ?',
        answer: 'Dans notre éditeur, vous pouvez modifier les couleurs, polices, sections et mise en page de chaque template. Notre IA vous aide à rédiger le contenu optimisé pour chaque section.',
      },
      {
        question: 'Les modèles sont-ils compatibles ATS ?',
        answer: 'Oui, tous nos templates sont testés pour être compatibles avec les principaux logiciels ATS (Workday, Taleo, Greenhouse, Lever). La structure HTML/PDF garantit une lecture parfaite par ces systèmes.',
      },
      {
        question: 'Peut-on utiliser un modèle de CV pour plusieurs candidatures ?',
        answer: 'Absolument. Créez votre CV de base, puis dupliquez-le et adaptez-le pour chaque offre d\'emploi en intégrant les mots-clés spécifiques. Notre IA vous aide à personnaliser rapidement chaque version.',
      },
    ],
  },
  finalCta: {
    title: 'Choisissez votre modèle de CV maintenant',
    description: 'Gratuit, personnalisable, professionnel. Votre CV prêt en 5 minutes.',
    ctaText: 'Choisir mon modèle CV',
  },
}

export default function ModeleCvPage() {
  return <SeoLandingPage config={config} />
}
