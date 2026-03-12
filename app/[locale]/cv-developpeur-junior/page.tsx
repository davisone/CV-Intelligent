import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Briefcase, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvDeveloppeurJuniorPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-developpeur-junior' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Développeur Junior',
  canonicalPath: '/cv-developpeur-junior',
  hero: {
    badgeIcon: FileText,
    badgeText: 'Tech & Web',
    h1Before: 'Créer un ',
    h1Accent: 'CV Développeur Junior',
    h1After: ' Gratuit',
    subtitle: 'Frontend, Backend, Full Stack — un CV développeur junior qui met en valeur vos skills',
    description: 'Créez votre CV de développeur junior en 5 minutes. Templates modernes adaptés aux profils tech, optimisés ATS pour les recruteurs IT.',
    primaryCtaText: 'Créer mon CV développeur',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV développeur junior',
    subtitle: 'Un CV dev junior doit mettre en avant vos skills techniques et vos projets concrets.',
    items: [
      {
        icon: FileText,
        title: 'Stack technique en avant',
        description: 'Langages, frameworks, outils, base de données — listez précisément vos compétences techniques dans une section dédiée bien structurée.',
      },
      {
        icon: Briefcase,
        title: 'Projets et GitHub',
        description: 'En tant que junior, vos projets personnels et open source sont aussi importants que vos expériences. Liez-les à votre portfolio GitHub.',
      },
      {
        icon: Shield,
        title: 'Optimisé recruteurs IT',
        description: 'Les recruteurs tech recherchent des mots-clés précis (React, Node.js, Python...). Notre IA les intègre naturellement dans votre CV.',
      },
    ],
  },
  section2: {
    title: 'Exemples de CV développeur junior',
    subtitle: 'Des templates adaptés à chaque spécialisation tech.',
    items: [
      {
        title: 'CV Dev Frontend Junior',
        keyword: 'cv développeur frontend junior',
        description: 'Spécialisé React, Vue, Angular — mettez en avant vos projets web et vos compétences en UI/UX et JavaScript moderne.',
      },
      {
        title: 'CV Dev Backend Junior',
        keyword: 'cv développeur backend junior',
        description: 'Node.js, Python, Java, PHP — valorisez vos API, bases de données et compétences en architecture serveur.',
      },
      {
        title: 'CV Dev Full Stack Junior',
        keyword: 'cv développeur full stack junior',
        description: 'Les recruteurs recherchent les profils full stack. Montrez votre maîtrise des deux côtés : client et serveur.',
      },
      {
        title: 'CV Dev Web Junior',
        keyword: 'exemple cv développeur web junior',
        description: 'Template généraliste pour les développeurs web juniors en recherche de premier poste ou alternance en entreprise.',
      },
    ],
  },
  section3: {
    title: 'Créez votre CV développeur en 4 étapes',
    steps: [
      { title: 'Choisissez votre spécialité', description: 'Frontend, Backend, Full Stack, Mobile — choisissez le template adapté à votre stack.' },
      { title: 'Listez vos compétences techniques', description: 'Notre IA vous aide à structurer vos skills en niveaux : débutant, intermédiaire, avancé.' },
      { title: 'Valorisez vos projets', description: 'Ajoutez vos projets GitHub, portfolio et contributions open source directement dans votre CV.' },
      { title: 'Téléchargez en PDF', description: 'Export professionnel optimisé pour les portails de recrutement tech et les ATS IT.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV développeur junior',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV dev junior efficace',
    items: [
      {
        question: 'Comment faire un CV de développeur junior ?',
        answer: 'Pour un CV de développeur junior, structurez une section compétences techniques précise (langages, frameworks, outils), listez vos projets avec les technologies utilisées, et ajoutez votre lien GitHub. Notre IA vous aide à rédiger des descriptions percutantes pour chaque expérience.',
      },
      {
        question: 'Quelles compétences mettre dans un CV développeur junior ?',
        answer: 'Listez vos langages de programmation (JavaScript, Python, Java...), vos frameworks (React, Vue, Django, Spring...), vos outils (Git, Docker, VS Code...) et vos bases de données (PostgreSQL, MongoDB...). Indiquez votre niveau pour chaque technologie.',
      },
      {
        question: 'Comment valoriser des projets personnels dans un CV dev ?',
        answer: 'Décrivez chaque projet avec : technologies utilisées, problème résolu, résultat concret. Ajoutez le lien GitHub ou l\'URL de la démo. Notre IA vous aide à formuler des descriptions techniques qui attirent l\'attention des recruteurs IT.',
      },
      {
        question: 'Faut-il mettre GitHub sur son CV de développeur ?',
        answer: 'Oui, absolument. Pour un développeur junior, GitHub est votre portfolio. Ajoutez votre URL GitHub en haut de votre CV avec vos autres coordonnées. Assurez-vous que vos repos publics sont bien documentés avec un README.',
      },
      {
        question: 'Quel template CV choisir pour un développeur junior ?',
        answer: 'Optez pour un template Modern ou ATS-Friendly pour la majorité des entreprises tech. Le template Modern est idéal pour les startups et agences. ATS-Friendly pour les grandes entreprises et ESN (anciennement SSII) avec des portails de candidature automatisés.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV développeur junior',
    description: 'Mettez en valeur vos skills tech et projets. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV développeur',
  },
}

export default function CvDeveloppeurJuniorPage() {
  return <SeoLandingPage config={config} />
}
