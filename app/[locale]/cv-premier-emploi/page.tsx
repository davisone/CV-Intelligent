import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Briefcase, Sparkles, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvPremierEmploiPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-premier-emploi' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Premier Emploi',
  canonicalPath: '/cv-premier-emploi',
  hero: {
    badgeIcon: Star,
    badgeText: 'Votre carrière commence ici',
    h1Before: 'Créer un ',
    h1Accent: 'CV Premier Emploi',
    h1After: ' Gratuit',
    subtitle: 'De l\'étudiant au professionnel — décrochez votre premier CDI ou CDD',
    description: 'Créez votre CV de premier emploi en 5 minutes. Valorisez vos stages, formations et compétences pour convaincre votre premier employeur.',
    primaryCtaText: 'Créer mon premier CV',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Réussir son CV de premier emploi',
    subtitle: 'Sans expérience longue, chaque détail de votre parcours devient un atout.',
    items: [
      {
        icon: GraduationCap,
        title: 'Valoriser sa formation',
        description: 'Votre diplôme est votre premier atout. Mettez-le en avant avec les mentions, spécialisations et projets marquants de votre cursus.',
      },
      {
        icon: Briefcase,
        title: 'Capitaliser sur les stages',
        description: 'Chaque stage est une expérience professionnelle réelle. Notre IA vous aide à en extraire les accomplissements concrets et les compétences acquises.',
      },
      {
        icon: Sparkles,
        title: 'Soft skills et projets',
        description: 'Pour un premier emploi, les soft skills et les projets personnels sont aussi importants que l\'expérience. Montrez qui vous êtes.',
      },
    ],
  },
  section2: {
    title: 'Exemples de CV premier emploi',
    subtitle: 'Choisissez le template adapté à votre secteur cible pour votre premier poste.',
    items: [
      {
        title: 'CV Premier Emploi Moderne',
        keyword: 'exemple cv premier emploi moderne',
        description: 'Design contemporain pour les secteurs dynamiques : tech, marketing, communication, e-commerce.',
      },
      {
        title: 'CV Premier Emploi Simple',
        keyword: 'cv simple pour premier emploi',
        description: 'Format épuré et lisible, idéal pour tous les secteurs et tous les profils de jeunes diplômés.',
      },
      {
        title: 'CV Premier Emploi ATS',
        keyword: 'cv premier emploi ats compatible',
        description: 'Optimisé pour les grandes entreprises et les portails de recrutement automatisés.',
      },
      {
        title: 'CV Premier Emploi Classic',
        keyword: 'cv classique premier emploi',
        description: 'Format traditionnel pour les secteurs formels : finance, conseil, secteur public, grands groupes.',
      },
    ],
  },
  section3: {
    title: 'Décrochez votre premier emploi en 4 étapes',
    steps: [
      { title: 'Choisissez votre template', description: 'Sélectionnez le modèle adapté à votre secteur cible.' },
      { title: 'Structurez votre parcours', description: 'Notre IA vous guide pour présenter stages, formations et projets de façon percutante.' },
      { title: 'Optimisez pour les ATS', description: 'Intégrez les bons mots-clés pour passer les filtres automatiques des recruteurs.' },
      { title: 'Téléchargez et postulez', description: 'Export PDF gratuit, prêt à envoyer à vos premiers recruteurs.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV de premier emploi',
    subtitle: 'Tout ce qu\'il faut savoir pour décrocher son premier poste',
    items: [
      {
        question: 'Comment faire un CV de premier emploi ?',
        answer: 'Pour un CV de premier emploi, mettez votre formation et vos stages en avant. Ajoutez vos projets personnels, compétences techniques et soft skills. Notre IA vous guide pour rédiger chaque section de façon professionnelle.',
      },
      {
        question: 'Comment valoriser ses stages dans un CV de premier emploi ?',
        answer: 'Décrivez chaque stage avec des résultats concrets : "développé une fonctionnalité utilisée par X clients", "augmenté le taux de conversion de Y%". Notre IA vous aide à transformer vos expériences en accomplissements percutants.',
      },
      {
        question: 'Quel template choisir pour un premier emploi ?',
        answer: 'Le template Modern convient à la majorité des secteurs. ATS-Friendly pour les grandes entreprises. Classic pour les secteurs formels (banque, conseil, secteur public). Évitez les designs très créatifs sauf pour les métiers artistiques.',
      },
      {
        question: 'CV de premier emploi : une page ou deux ?',
        answer: 'Pour un premier emploi, une page A4 est recommandée si vous avez peu d\'expérience. Deux pages sont acceptables si vous avez plusieurs stages significatifs. Nos templates s\'adaptent automatiquement.',
      },
      {
        question: 'Comment optimiser son CV pour les ATS en tant que débutant ?',
        answer: 'Intégrez les mots-clés de l\'offre d\'emploi dans vos descriptions. Utilisez des intitulés de poste reconnus. Notre IA analyse l\'offre et suggère les termes à intégrer pour maximiser votre score ATS.',
      },
    ],
  },
  finalCta: {
    title: 'Décrochez votre premier emploi',
    description: 'Valorisez chaque expérience, même limitée. Votre CV professionnel prêt en 5 minutes.',
    ctaText: 'Créer mon premier CV',
  },
}

export default function CvPremierEmploiPage() {
  return <SeoLandingPage config={config} />
}
