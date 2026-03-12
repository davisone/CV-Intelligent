import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Truck, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvLogistiquePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-logistique' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Logistique',
  canonicalPath: '/cv-logistique',
  hero: {
    badgeIcon: Truck,
    badgeText: 'Logistique & Supply Chain',
    h1Before: 'Créer un ',
    h1Accent: 'CV Logistique',
    h1After: ' Gratuit',
    subtitle: 'Responsable logistique, supply chain manager, gestionnaire de stocks — un CV qui valorise votre expertise opérationnelle',
    description: 'Créez votre CV logistique gratuit en 5 minutes. Templates adaptés aux profils supply chain et logistique, optimisés ATS, avec vos KPIs et réalisations en avant.',
    primaryCtaText: 'Créer mon CV logistique',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV logistique',
    subtitle: 'Un CV logistique doit démontrer votre maîtrise des flux, des stocks et de l\'optimisation des coûts.',
    items: [
      {
        icon: Truck,
        title: 'Volumes et KPIs',
        description: 'Volume de flux gérés, taux de service, taux de rupture, coût logistique — les recruteurs logistique veulent des chiffres concrets sur les périmètres que vous avez gérés.',
      },
      {
        icon: Star,
        title: 'Outils et systèmes',
        description: 'WMS, ERP (SAP, Oracle), TMS, EDI — précisez les systèmes d\'information logistique que vous maîtrisez, c\'est souvent un critère décisif dans les offres.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grands groupes industriels, retailers et prestataires logistiques utilisent des ATS. Nos templates garantissent que vos compétences opérationnelles sont bien identifiées.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV logistique gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité de la supply chain.',
    items: [
      {
        title: 'CV Responsable Logistique',
        keyword: 'cv responsable logistique gratuit',
        description: 'Pilotage des opérations d\'entrepôt, management d\'équipe, optimisation des flux, suivi des KPIs et amélioration continue des processus logistiques.',
      },
      {
        title: 'CV Supply Chain Manager',
        keyword: 'cv supply chain manager gratuit',
        description: 'Gestion des approvisionnements, planification de la demande, coordination fournisseurs, optimisation des stocks et des coûts logistiques.',
      },
      {
        title: 'CV Gestionnaire de Stocks',
        keyword: 'cv gestionnaire stocks gratuit',
        description: 'Gestion des inventaires, optimisation des niveaux de stock, suivi des entrées/sorties, réduction des ruptures et des surstocks.',
      },
      {
        title: 'CV Responsable Transport',
        keyword: 'cv responsable transport gratuit',
        description: 'Gestion des transporteurs, optimisation des tournées, suivi des livraisons, négociation des contrats de transport et réduction des coûts.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV logistique percutant',
    tips: [
      'Quantifiez votre périmètre : surface d\'entrepôt, volume de références, nombre de préparations/jour',
      'Mentionnez vos logiciels WMS/ERP maîtrisés : SAP, Oracle, Reflex, Generix, Manhattan',
      'Incluez vos certifications logistique : APICS CPIM, CSCP, permis cariste, habilitations',
      'Valorisez vos projets d\'amélioration : réduction des coûts, amélioration du taux de service, lean',
      'Précisez le secteur d\'activité : retail, e-commerce, industrie, agroalimentaire, pharmaceutique',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV logistique',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV supply chain efficace',
    items: [
      {
        question: 'Comment faire un bon CV logistique ?',
        answer: 'Un bon CV logistique quantifie les périmètres gérés (volumes, surfaces, équipes), mentionne les logiciels WMS/ERP maîtrisés et met en avant les améliorations apportées (taux de service, réduction des coûts). Notre IA vous aide à formuler chaque expérience.',
      },
      {
        question: 'Quels logiciels logistique mentionner dans un CV ?',
        answer: 'WMS (Reflex, Generix, Manhattan, SAP WM/EWM), ERP (SAP, Oracle, JD Edwards), TMS, EDI. Précisez si vous avez participé à des projets d\'implémentation ou de migration — c\'est très valorisé.',
      },
      {
        question: 'Comment valoriser des projets lean/amélioration continue dans un CV logistique ?',
        answer: 'Décrivez le problème, votre approche (Kaizen, 5S, VSM) et les résultats mesurables : réduction du taux de rupture, économies générées, amélioration du taux de service. Notre IA vous aide à structurer ces réalisations.',
      },
      {
        question: 'Quel template CV choisir pour la logistique ?',
        answer: 'ATS-Friendly pour les grands groupes industriels et distributeurs. Modern pour les entreprises e-commerce et start-up de la supply chain. Classic pour les secteurs plus traditionnels (agroalimentaire, industrie lourde).',
      },
      {
        question: 'Comment faire un CV logistique sans diplôme en supply chain ?',
        answer: 'Mettez en avant votre expérience terrain, vos certifications (APICS, permis cariste), vos formations continues et vos résultats concrets. En logistique, l\'expérience pratique et les résultats comptent autant que le diplôme. Notre IA valorise chaque atout.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV logistique maintenant',
    description: 'Valorisez votre expertise supply chain et vos performances opérationnelles. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV logistique',
  },
}

export default function CvLogistiquePage() {
  return <SeoLandingPage config={config} />
}
