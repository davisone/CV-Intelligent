import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Scale, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvJuristePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-juriste' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Juriste',
  canonicalPath: '/cv-juriste',
  hero: {
    badgeIcon: Scale,
    badgeText: 'Droit & Juridique',
    h1Before: 'Créer un ',
    h1Accent: 'CV Juriste',
    h1After: ' Gratuit',
    subtitle: 'Juriste d\'entreprise, avocat, paralégal — un CV rigoureux qui met en valeur votre expertise juridique et vos domaines de spécialisation',
    description: 'Créez votre CV juriste gratuit en 5 minutes. Templates adaptés aux profils juridiques, optimisés ATS, avec vos spécialités et expériences en contentieux ou conseil.',
    primaryCtaText: 'Créer mon CV juriste',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV juriste',
    subtitle: 'Un CV juridique doit refléter rigueur, précision et expertise dans des domaines clairement identifiés.',
    items: [
      {
        icon: Scale,
        title: 'Domaines de droit',
        description: 'Droit des sociétés, droit social, droit commercial, propriété intellectuelle, contentieux, fiscalité — précisez vos spécialités pour cibler les offres adaptées à votre profil.',
      },
      {
        icon: Star,
        title: 'Type de pratique',
        description: 'Conseil ou contentieux, droit des affaires ou droit public, cabinet ou direction juridique d\'entreprise — chaque recruteur cherche un profil précis.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grandes directions juridiques et cabinets utilisent des ATS. Nos templates intègrent les mots-clés juridiques pour garantir que votre dossier passe ces filtres.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV juriste gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité et type de pratique juridique.',
    items: [
      {
        title: 'CV Juriste d\'Entreprise',
        keyword: 'cv juriste entreprise gratuit',
        description: 'Direction juridique, contrats commerciaux, conformité, M&A, accompagnement des opérationnels — template pour les profils in-house en entreprise.',
      },
      {
        title: 'CV Juriste Droit des Affaires',
        keyword: 'cv juriste droit affaires gratuit',
        description: 'Droit des sociétés, fusions-acquisitions, contrats, due diligence — template adapté aux profils corporate en cabinet ou en entreprise.',
      },
      {
        title: 'CV Juriste Droit Social',
        keyword: 'cv juriste droit social gratuit',
        description: 'Relations individuelles et collectives, contentieux prud\'homal, négociation d\'accords d\'entreprise, conseil aux RH.',
      },
      {
        title: 'CV Avocat / Collaborateur',
        keyword: 'cv avocat collaborateur gratuit',
        description: 'Conseil et contentieux, gestion de dossiers, plaidoiries, rédaction de contrats — template adapté aux collaborateurs d\'avocat en cabinet.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV juriste percutant',
    tips: [
      'Précisez clairement vos domaines de spécialisation juridique en tête de CV ou dans l\'accroche',
      'Mentionnez vos diplômes avec la spécialité : Master 2 Droit des Affaires, DJCE, CAPA',
      'Distinguez vos expériences en conseil et en contentieux selon votre orientation professionnelle',
      'Valorisez les dossiers significatifs (sans violer la confidentialité) : type d\'opération, enjeux',
      'Incluez votre niveau d\'anglais juridique : essentiel pour les postes en droit international ou corporate',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV juriste',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV juridique efficace',
    items: [
      {
        question: 'Comment faire un bon CV juriste ?',
        answer: 'Un bon CV juriste présente clairement vos domaines de spécialisation, vos diplômes (Master 2, DJCE, CAPA), vos expériences en cabinet et/ou en entreprise, et vos principales missions. Distinguez conseil et contentieux selon votre orientation.',
      },
      {
        question: 'Quels diplômes mettre en avant dans un CV juriste ?',
        answer: 'Master 2 en droit (précisez la spécialité), DJCE (diplôme de juriste conseil d\'entreprise), CAPA (pour les avocats), LL.M. (pour les profils internationaux). Le nom de l\'université et la mention sont importants dans le secteur juridique.',
      },
      {
        question: 'Comment présenter ses dossiers dans un CV juridique ?',
        answer: 'Décrivez le type d\'opération ou de litige (sans nommer les clients), les enjeux juridiques, votre rôle et la conclusion. Exemple : "Accompagnement d\'une acquisition de PME industrielle (3M€) : due diligence juridique, négociation du protocole, closing." Notre IA vous aide à formuler cela.',
      },
      {
        question: 'Quel template CV choisir pour un juriste ?',
        answer: 'Le template Classic est recommandé pour les cabinets d\'avocats et directions juridiques traditionnelles. Modern pour les entreprises tech ou les structures plus innovantes. Évitez les templates trop créatifs qui seraient mal perçus dans le monde juridique.',
      },
      {
        question: 'Comment passer du cabinet à l\'entreprise dans un CV juriste ?',
        answer: 'Mettez en avant les missions proches du conseil in-house : rédaction de contrats, accompagnement opérationnel, conformité. Notre IA vous aide à repositionner votre expérience cabinet pour convaincre des directions juridiques d\'entreprise.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV juriste maintenant',
    description: 'Valorisez votre expertise juridique et vos spécialisations. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV juriste',
  },
}

export default function CvJuristePage() {
  return <SeoLandingPage config={config} />
}
