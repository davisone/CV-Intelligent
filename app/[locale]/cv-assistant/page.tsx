import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Inbox, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvAssistantPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-assistant' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Assistant',
  canonicalPath: '/cv-assistant',
  hero: {
    badgeIcon: Inbox,
    badgeText: 'Administration & Assistanat',
    h1Before: 'Créer un ',
    h1Accent: 'CV Assistant',
    h1After: ' Gratuit',
    subtitle: 'Assistant administratif, assistant de direction, office manager — un CV qui valorise votre polyvalence et votre sens de l\'organisation',
    description: 'Créez votre CV assistant gratuit en 5 minutes. Templates adaptés aux profils administratifs et assistanat, optimisés ATS, avec vos compétences organisationnelles en avant.',
    primaryCtaText: 'Créer mon CV assistant',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV assistant',
    subtitle: 'Un bon CV assistant démontre votre polyvalence, votre organisation et votre discrétion.',
    items: [
      {
        icon: Inbox,
        title: 'Organisation et gestion',
        description: 'Gestion d\'agendas complexes, organisation de réunions et déplacements, suivi des dossiers — précisez le niveau de responsabilité et le profil des personnes assistées.',
      },
      {
        icon: Star,
        title: 'Outils bureautiques',
        description: 'Maîtrise de la suite Office (Word, Excel, PowerPoint, Outlook), outils collaboratifs (Teams, SharePoint), logiciels métier — essentiels pour tout poste d\'assistanat.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les PME comme les grands groupes utilisent des ATS pour les postes administratifs. Nos templates garantissent que vos compétences sont bien identifiées par ces systèmes.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV assistant gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité de l\'assistanat.',
    items: [
      {
        title: 'CV Assistant Administratif',
        keyword: 'cv assistant administratif gratuit',
        description: 'Accueil, gestion du courrier, saisie de données, classement, facturation — template valorisant votre rigueur et vos compétences administratives.',
      },
      {
        title: 'CV Assistant de Direction',
        keyword: 'cv assistant de direction gratuit',
        description: 'Support de direction générale, gestion d\'agenda de dirigeants, organisation de comités, préparation de supports — template adapté aux postes à haute confidentialité.',
      },
      {
        title: 'CV Office Manager',
        keyword: 'cv office manager gratuit',
        description: 'Gestion des locaux et prestataires, coordination administrative, onboarding des nouveaux, budget fournitures — template mettant en avant votre rôle pivot dans l\'entreprise.',
      },
      {
        title: 'CV Assistant Commercial',
        keyword: 'cv assistant commercial gratuit',
        description: 'Support aux équipes commerciales, gestion des commandes, suivi clients, tableaux de bord — template orienté relation client et efficacité commerciale.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV assistant percutant',
    tips: [
      'Précisez le niveau hiérarchique des personnes assistées : DG, directeur, équipe de 10 personnes',
      'Listez précisément vos outils bureautiques et votre niveau : Excel avancé, PowerPoint, SAP, CRM',
      'Mentionnez vos langues : l\'anglais est souvent requis pour les postes assistant de direction',
      'Valorisez votre sens des priorités : gérer plusieurs interlocuteurs simultanément est une compétence clé',
      'Incluez votre formation : BTS assistant manager, secrétariat, licence pro administration',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV assistant',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV assistant efficace',
    items: [
      {
        question: 'Comment faire un bon CV assistant administratif ?',
        answer: 'Un bon CV assistant met en avant vos outils maîtrisés (Office, logiciels métier), le niveau des personnes assistées, vos missions principales et votre capacité à gérer plusieurs tâches simultanément. Notre IA vous aide à structurer chaque expérience.',
      },
      {
        question: 'Quelle différence entre CV assistant administratif et assistant de direction ?',
        answer: 'L\'assistant de direction assiste un ou des dirigeants avec un niveau de confidentialité élevé. L\'assistant administratif gère les tâches administratives courantes. Adaptez votre CV selon le poste : mettez en avant la discrétionpour la direction, la polyvalence pour l\'administratif.',
      },
      {
        question: 'Quels logiciels mentionner dans un CV assistant ?',
        answer: 'Suite Microsoft Office (Word, Excel avancé, PowerPoint, Outlook), Teams, SharePoint, SAP, Sage, logiciels de gestion documentaire, CRM (Salesforce, HubSpot). Précisez votre niveau de maîtrise pour chaque outil.',
      },
      {
        question: 'Quel template CV choisir pour un poste assistant ?',
        answer: 'Le template Classic est parfait pour les postes administratifs et d\'assistanat dans tous les secteurs. Modern pour les entreprises plus dynamiques. Évitez les templates trop créatifs qui pourraient sembler peu professionnels.',
      },
      {
        question: 'Comment valoriser la polyvalence dans un CV assistant ?',
        answer: 'Listez toutes vos missions en montrant leur diversité (administratif, commercial, RH, communication). Notre IA vous aide à organiser ces missions de façon claire et à montrer que votre polyvalence est une vraie force, pas un manque de spécialisation.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV assistant maintenant',
    description: 'Valorisez votre organisation, polyvalence et maîtrise des outils. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV assistant',
  },
}

export default function CvAssistantPage() {
  return <SeoLandingPage config={config} />
}
