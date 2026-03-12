import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Briefcase, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvCommercialPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-commercial' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Commercial',
  canonicalPath: '/cv-commercial',
  hero: {
    badgeIcon: Briefcase,
    badgeText: 'Commerce & Vente',
    h1Before: 'Créer un ',
    h1Accent: 'CV Commercial',
    h1After: ' Gratuit',
    subtitle: 'Commercial, technico-commercial, attaché commercial — un CV qui met en valeur vos performances',
    description: 'Créez votre CV commercial gratuit en 5 minutes. Templates adaptés aux profils vente et commerce, optimisés ATS, avec vos chiffres et résultats en avant.',
    primaryCtaText: 'Créer mon CV commercial',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV commercial',
    subtitle: 'Un CV commercial doit mettre vos performances chiffrées au premier plan.',
    items: [
      {
        icon: Star,
        title: 'Résultats chiffrés',
        description: 'CA généré, taux de conversion, nombre de clients, objectifs atteints — les recruteurs commerciaux veulent des chiffres. Notre IA vous aide à les mettre en valeur.',
      },
      {
        icon: Briefcase,
        title: 'Secteurs et clients',
        description: 'Type de clientèle (B2B, B2C, grands comptes, PME), secteurs couverts, zone géographique — des informations clés pour les recruteurs du commerce.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grandes entreprises et cabinets de recrutement commercial utilisent des logiciels de tri. Nos templates garantissent que votre CV passe ces filtres.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV commercial gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité commerciale.',
    items: [
      {
        title: 'CV Commercial B2B',
        keyword: 'cv commercial b2b gratuit',
        description: 'Spécialisé vente entreprises : grands comptes, cycle de vente long, négociation, gestion de portefeuille clients.',
      },
      {
        title: 'CV Technico-Commercial',
        keyword: 'cv technico-commercial gratuit',
        description: 'Double compétence technique et commerciale : expertise produit, argumentation technique, accompagnement avant-vente.',
      },
      {
        title: 'CV Attaché Commercial',
        keyword: 'cv attaché commercial gratuit',
        description: 'Prospection terrain, fidélisation, reporting, gestion de secteur. Template adapté aux postes de représentant commercial.',
      },
      {
        title: 'CV Responsable Commercial',
        keyword: 'cv responsable commercial gratuit',
        description: 'Management d\'équipe commerciale, définition de stratégie, pilotage des objectifs et développement de la force de vente.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV commercial percutant',
    tips: [
      'Quantifiez systématiquement vos résultats : CA, taux de conversion, nombre de clients, croissance',
      'Précisez le type de vente : B2B, B2C, grands comptes, PME, vente directe, indirecte',
      'Mentionnez votre zone géographique et les secteurs couverts',
      'Incluez vos outils CRM maîtrisés : Salesforce, HubSpot, Pipedrive...',
      'Rédigez une accroche qui présente votre profil commercial en 2-3 lignes avec vos chiffres clés',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV commercial',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV commercial efficace',
    items: [
      {
        question: 'Comment faire un bon CV commercial ?',
        answer: 'Un bon CV commercial met les résultats chiffrés en avant : CA généré, objectifs dépassés, nombre de clients. Précisez le type de vente (B2B/B2C), les secteurs couverts et vos outils CRM. Notre IA vous aide à formuler chaque expérience de façon percutante.',
      },
      {
        question: 'Quels chiffres mettre dans un CV commercial ?',
        answer: 'CA réalisé ou dépassé, taux d\'atteinte des objectifs, nombre de clients gérés, taux de fidélisation, taux de conversion prospects/clients, croissance du portefeuille. Tous ces indicateurs démontrent concrètement votre valeur.',
      },
      {
        question: 'Quel template CV choisir pour un poste commercial ?',
        answer: 'Le template Modern est idéal pour la majorité des postes commerciaux. Classic pour les secteurs plus formels (banque, assurance, industrie). ATS-Friendly pour les grandes entreprises et les groupes avec portails RH.',
      },
      {
        question: 'Que mettre dans l\'accroche d\'un CV commercial ?',
        answer: 'Votre spécialité commerciale, votre secteur d\'expertise, vos années d\'expérience et 1-2 chiffres clés. Exemple : "Commercial B2B avec 5 ans d\'expérience dans le SaaS, ayant généré 1,2M€ de CA en 2025 avec un taux de rétention client de 92%."',
      },
      {
        question: 'Comment mettre en valeur une progression commerciale dans un CV ?',
        answer: 'Montrez l\'évolution de vos performances d\'une année sur l\'autre. Si vous avez évolué en responsabilités (commercial → chef des ventes), valorisez cette progression. Notre IA vous aide à structurer votre parcours pour montrer votre développement.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV commercial maintenant',
    description: 'Mettez vos performances commerciales en avant. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV commercial',
  },
}

export default function CvCommercialPage() {
  return <SeoLandingPage config={config} />
}
