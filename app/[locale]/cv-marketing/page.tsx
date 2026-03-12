import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TrendingUp, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvMarketingPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-marketing' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Marketing',
  canonicalPath: '/cv-marketing',
  hero: {
    badgeIcon: TrendingUp,
    badgeText: 'Marketing & Digital',
    h1Before: 'Créer un ',
    h1Accent: 'CV Marketing',
    h1After: ' Gratuit',
    subtitle: 'Responsable marketing, chef de projet digital, community manager — un CV qui met en valeur votre créativité et vos résultats',
    description: 'Créez votre CV marketing gratuit en 5 minutes. Templates adaptés aux profils marketing et digital, optimisés ATS, avec vos KPIs et campagnes en avant.',
    primaryCtaText: 'Créer mon CV marketing',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV marketing',
    subtitle: 'Un CV marketing doit allier créativité et résultats mesurables.',
    items: [
      {
        icon: TrendingUp,
        title: 'KPIs et résultats',
        description: 'Taux de conversion, ROI des campagnes, croissance du trafic, leads générés — les recruteurs marketing veulent des chiffres. Notre IA vous aide à les mettre en valeur.',
      },
      {
        icon: Star,
        title: 'Compétences digitales',
        description: 'SEO, SEA, social media, email marketing, analytics — précisez vos outils (Google Analytics, HubSpot, Meta Ads) et vos domaines d\'expertise pour vous démarquer.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grandes entreprises utilisent des logiciels de tri. Nos templates garantissent que votre CV passe ces filtres tout en restant visuellement attractif.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV marketing gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité marketing.',
    items: [
      {
        title: 'CV Responsable Marketing',
        keyword: 'cv responsable marketing gratuit',
        description: 'Stratégie marketing, management d\'équipe, pilotage du budget, définition de la roadmap. Template adapté aux postes de direction marketing.',
      },
      {
        title: 'CV Chef de Projet Digital',
        keyword: 'cv chef de projet digital gratuit',
        description: 'Gestion de projets web, coordination agences, suivi des KPIs digitaux, optimisation des tunnels de conversion.',
      },
      {
        title: 'CV Community Manager',
        keyword: 'cv community manager gratuit',
        description: 'Animation des réseaux sociaux, création de contenu, gestion des communautés, reportings mensuels et croissance des audiences.',
      },
      {
        title: 'CV Traffic Manager',
        keyword: 'cv traffic manager gratuit',
        description: 'Gestion des campagnes SEA, retargeting, optimisation des dépenses publicitaires, analyse des performances et reporting.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV marketing percutant',
    tips: [
      'Quantifiez vos résultats : taux de conversion, croissance du trafic, ROI des campagnes, leads générés',
      'Listez vos outils maîtrisés : Google Analytics, HubSpot, Salesforce, Meta Ads, Mailchimp...',
      'Précisez votre spécialité : SEO, SEA, email marketing, réseaux sociaux, content marketing',
      'Incluez des exemples de campagnes réussies avec les métriques clés obtenues',
      'Rédigez une accroche qui positionne votre expertise marketing en 2-3 lignes avec vos chiffres',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV marketing',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV marketing efficace',
    items: [
      {
        question: 'Comment faire un bon CV marketing ?',
        answer: 'Un bon CV marketing allie créativité et résultats mesurables. Mettez en avant vos KPIs (taux de conversion, ROI, croissance du trafic), vos outils digitaux maîtrisés et vos réalisations concrètes. Notre IA vous aide à formuler chaque expérience de façon impactante.',
      },
      {
        question: 'Quels outils marketing mettre dans un CV ?',
        answer: 'Google Analytics, Google Ads, Meta Business Manager, HubSpot, Salesforce, Mailchimp, Semrush, Ahrefs, Hootsuite, Adobe Creative Suite selon vos compétences. Précisez votre niveau de maîtrise pour chaque outil.',
      },
      {
        question: 'Quel template CV choisir pour un poste marketing ?',
        answer: 'Le template Modern est idéal pour la plupart des postes marketing : design attractif mais sobre. Pour les postes créatifs (direction artistique, UX), le template Minimal avec une touche de personnalisation. Pour les grandes entreprises : ATS-Friendly.',
      },
      {
        question: 'Comment mettre en valeur des campagnes marketing dans un CV ?',
        answer: 'Décrivez le contexte (secteur, budget), l\'action (type de campagne, canaux utilisés) et le résultat mesurable (+25% de trafic, 150 leads/mois, ROI x3). Notre IA vous aide à structurer chaque expérience avec la méthode STAR.',
      },
      {
        question: 'Comment présenter une reconversion vers le marketing digital ?',
        answer: 'Mettez en avant vos compétences transférables, vos formations (certifications Google, HubSpot), vos projets personnels et vos premières expériences digitales. Notre IA valorise chaque élément pour repositionner votre profil vers le marketing.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV marketing maintenant',
    description: 'Mettez vos compétences et résultats marketing en avant. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV marketing',
  },
}

export default function CvMarketingPage() {
  return <SeoLandingPage config={config} />
}
