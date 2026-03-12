import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { UserCheck, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvRhPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-rh' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV RH',
  canonicalPath: '/cv-rh',
  hero: {
    badgeIcon: UserCheck,
    badgeText: 'Ressources Humaines',
    h1Before: 'Créer un ',
    h1Accent: 'CV Ressources Humaines',
    h1After: ' Gratuit',
    subtitle: 'Chargé RH, responsable recrutement, DRH — un CV qui met en valeur votre expertise humaine et organisationnelle',
    description: 'Créez votre CV RH gratuit en 5 minutes. Templates adaptés aux profils ressources humaines, optimisés ATS, avec vos compétences recrutement et droit social en avant.',
    primaryCtaText: 'Créer mon CV RH',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV RH',
    subtitle: 'Un CV RH doit démontrer à la fois vos compétences humaines et votre maîtrise des aspects réglementaires.',
    items: [
      {
        icon: UserCheck,
        title: 'Recrutement et talents',
        description: 'Volume de recrutements gérés, sourcing, entretiens, intégration — précisez vos résultats en recrutement : délai moyen, taux de rétention à 6 mois, profils recrutés.',
      },
      {
        icon: Star,
        title: 'Droit social et paie',
        description: 'Connaissance du droit du travail, gestion de la paie, relations avec les IRP, négociations sociales — des compétences techniques essentielles à valoriser.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Ironie du sort : les RH utilisent des ATS pour trier les CV ! Nos templates garantissent que votre dossier passe ces filtres avant d\'arriver à un recruteur.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV RH gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité des ressources humaines.',
    items: [
      {
        title: 'CV Chargé de Recrutement',
        keyword: 'cv chargé recrutement gratuit',
        description: 'Sourcing, job boards, approche directe (LinkedIn Recruiter), entretiens, intégration — template mettant en avant vos volumes et résultats recrutement.',
      },
      {
        title: 'CV Responsable RH',
        keyword: 'cv responsable ressources humaines gratuit',
        description: 'Généraliste RH : recrutement, formation, paie, relations sociales, politique RH. Template valorisant votre polyvalence et votre rôle de business partner.',
      },
      {
        title: 'CV Gestionnaire de Paie',
        keyword: 'cv gestionnaire de paie gratuit',
        description: 'Traitement des bulletins, DSN, charges sociales, logiciels de paie (Sage, ADP, Silae) — template structuré pour les profils paie et administration du personnel.',
      },
      {
        title: 'CV DRH / Directeur RH',
        keyword: 'cv directeur ressources humaines gratuit',
        description: 'Stratégie RH, politique de rémunération, GPEC, dialogue social, transformation organisationnelle — template valorisant votre vision et votre impact stratégique.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV RH percutant',
    tips: [
      'Quantifiez vos résultats recrutement : nombre de postes pourvus, délai moyen, coût par recrutement',
      'Précisez vos logiciels SIRH : ADP, Workday, SAP SuccessFactors, Cegid, Silae, LinkedIn Recruiter',
      'Mentionnez vos connaissances en droit social : conventions collectives, accords d\'entreprise, IRP',
      'Incluez vos formations spécialisées : licence RH, master MGRH, CIFFOP, titre professionnel',
      'Valorisez vos projets transversaux : GPEC, égalité professionnelle, qualité de vie au travail',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV RH',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV ressources humaines efficace',
    items: [
      {
        question: 'Comment faire un bon CV RH ?',
        answer: 'Un bon CV RH combine compétences humaines (recrutement, management, communication) et expertise technique (droit social, SIRH, paie). Quantifiez vos réalisations : recrutements réalisés, projets RH menés, économies générées.',
      },
      {
        question: 'Quels outils RH mentionner dans un CV ?',
        answer: 'SIRH (Workday, SAP SuccessFactors, ADP, Cegid), logiciels de paie (Sage Paie, Silae, Pegase), ATS (Greenhouse, Lever, Taleo), LinkedIn Recruiter, outils de formation (LMS). Ne listez que ceux que vous maîtrisez vraiment.',
      },
      {
        question: 'Comment valoriser une expérience en cabinet RH ou de recrutement ?',
        answer: 'Précisez les secteurs couverts, les types de profils recrutés, le volume de mandats gérés et les méthodes utilisées (chasse, cooptation, jobboards). Notre IA vous aide à formuler chaque mission de façon impactante.',
      },
      {
        question: 'Quel template CV choisir pour un profil RH ?',
        answer: 'Modern pour les environnements dynamiques (start-up, scale-up, conseil RH). Classic pour les grandes entreprises et secteurs traditionnels. ATS-Friendly pour les candidatures sur portails de recrutement.',
      },
      {
        question: 'Comment faire un CV RH sans expérience ?',
        answer: 'Mettez votre formation RH en tête, détaillez vos stages (missions, volumes, résultats), ajoutez vos projets académiques et associations. Notre IA valorise chaque expérience pour démontrer votre potentiel RH.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV RH maintenant',
    description: 'Valorisez votre expertise humaine et vos compétences RH. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV RH',
  },
}

export default function CvRhPage() {
  return <SeoLandingPage config={config} />
}
