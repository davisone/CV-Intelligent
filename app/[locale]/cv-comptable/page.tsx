import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Calculator, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvComptablePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-comptable' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Comptable',
  canonicalPath: '/cv-comptable',
  hero: {
    badgeIcon: Calculator,
    badgeText: 'Finance & Comptabilité',
    h1Before: 'Créer un ',
    h1Accent: 'CV Comptable',
    h1After: ' Gratuit',
    subtitle: 'Comptable, expert-comptable, contrôleur de gestion — un CV rigoureux qui met en valeur votre expertise financière',
    description: 'Créez votre CV comptable gratuit en 5 minutes. Templates adaptés aux profils finance et comptabilité, optimisés ATS, avec vos compétences techniques et logiciels en avant.',
    primaryCtaText: 'Créer mon CV comptable',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV comptable',
    subtitle: 'Un CV comptable doit inspirer confiance et mettre en avant rigueur et expertise technique.',
    items: [
      {
        icon: Calculator,
        title: 'Compétences techniques',
        description: 'Maîtrise des normes comptables (PCG, IFRS), logiciels (SAP, Sage, Cegid, Excel), déclarations fiscales — précisez vos outils et votre niveau d\'expertise pour chaque domaine.',
      },
      {
        icon: Star,
        title: 'Périmètre et volume',
        description: 'Taille de l\'entreprise, chiffre d\'affaires géré, nombre de comptes, volume de factures — des indicateurs concrets qui permettent aux recruteurs d\'évaluer votre niveau d\'expérience.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les cabinets d\'expertise et grandes entreprises utilisent des logiciels de recrutement. Nos templates garantissent que vos qualifications comptables sont parfaitement lues par ces systèmes.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV comptable gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité comptable et financière.',
    items: [
      {
        title: 'CV Comptable Général',
        keyword: 'cv comptable général gratuit',
        description: 'Tenue des comptes, clôtures mensuelles et annuelles, déclarations fiscales, rapprochements bancaires. Template structuré pour mettre en avant vos missions comptables.',
      },
      {
        title: 'CV Expert-Comptable',
        keyword: 'cv expert-comptable gratuit',
        description: 'Expertise comptable, commissariat aux comptes, conseil fiscal, gestion d\'un portefeuille clients. Template valorisant votre titre et vos missions à haute valeur ajoutée.',
      },
      {
        title: 'CV Contrôleur de Gestion',
        keyword: 'cv contrôleur de gestion gratuit',
        description: 'Reporting, tableaux de bord, analyse des écarts, budgets et prévisions. Template mettant en avant vos capacités d\'analyse et votre rôle de conseil interne.',
      },
      {
        title: 'CV Responsable Comptable',
        keyword: 'cv responsable comptable gratuit',
        description: 'Management d\'équipe comptable, supervision des clôtures, relations avec l\'expert-comptable, pilotage de la trésorerie et optimisation des processus.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV comptable percutant',
    tips: [
      'Listez précisément vos logiciels comptables maîtrisés : SAP, Sage, Cegid, Oracle, Excel (niveau avancé)',
      'Précisez le périmètre : taille de l\'entreprise, volume de comptes gérés, CA de l\'entité',
      'Mentionnez les normes comptables maîtrisées : PCG, IFRS, US GAAP selon votre expérience',
      'Incluez vos diplômes comptables : DCG, DSCG, DEC, licence ou master CCA',
      'Valorisez vos missions de clôture : mensuelle, trimestrielle, annuelle — signe de responsabilité',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV comptable',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV comptable efficace',
    items: [
      {
        question: 'Comment faire un bon CV comptable ?',
        answer: 'Un bon CV comptable met en avant vos logiciels maîtrisés, les normes comptables que vous appliquez, le périmètre des entreprises où vous avez travaillé et vos missions de clôture. Notre IA vous aide à structurer chaque expérience de façon précise et convaincante.',
      },
      {
        question: 'Quels logiciels comptables mentionner dans un CV ?',
        answer: 'SAP FI/CO, Sage 100/1000, Cegid, Oracle Financials, Microsoft Excel (avancé/VBA), Power BI, Quadratus, ACD — listez uniquement ceux que vous maîtrisez vraiment avec le niveau d\'utilisation.',
      },
      {
        question: 'Quel template CV choisir pour un comptable ?',
        answer: 'Le template Classic est idéal pour les cabinets d\'expertise et les secteurs formels (banque, assurance). Modern pour les PME et ETI. ATS-Friendly pour les grands groupes avec portails de recrutement en ligne.',
      },
      {
        question: 'Comment valoriser une expérience en cabinet comptable ?',
        answer: 'Précisez la taille du cabinet, le nombre de dossiers gérés, les secteurs d\'activité des clients, les missions réalisées (tenue, révision, déclarations). Notre IA vous aide à formuler chaque mission avec le bon vocabulaire métier.',
      },
      {
        question: 'Faut-il mettre ses diplômes comptables en tête de CV ?',
        answer: 'Pour les juniors (DCG/DSCG en cours ou récent), oui — mettez la formation en tête. Pour les profils expérimentés, les expériences passent en premier. Le diplôme reste toujours clairement visible dans la section Formation.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV comptable maintenant',
    description: 'Valorisez votre expertise financière et vos compétences techniques. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV comptable',
  },
}

export default function CvComptablePage() {
  return <SeoLandingPage config={config} />
}
