import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Palette, Star, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvGraphistePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-graphiste' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Graphiste',
  canonicalPath: '/cv-graphiste',
  hero: {
    badgeIcon: Palette,
    badgeText: 'Design & Création',
    h1Before: 'Créer un ',
    h1Accent: 'CV Graphiste',
    h1After: ' Gratuit',
    subtitle: 'Graphiste, designer, UI/UX designer — un CV qui allie identité visuelle et contenu percutant',
    description: 'Créez votre CV graphiste gratuit en 5 minutes. Templates adaptés aux profils créatifs, mettant en avant vos logiciels, votre portfolio et vos réalisations. Export PDF.',
    primaryCtaText: 'Créer mon CV graphiste',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV graphiste',
    subtitle: 'Le CV d\'un graphiste est lui-même une vitrine de son sens du design et de sa rigueur.',
    items: [
      {
        icon: Palette,
        title: 'Portfolio et réalisations',
        description: 'Lien vers votre portfolio Behance, Dribbble ou site personnel — incontournable pour un profil créatif. Notre IA vous aide à décrire chaque projet avec les bons mots.',
      },
      {
        icon: Star,
        title: 'Logiciels maîtrisés',
        description: 'Suite Adobe (Photoshop, Illustrator, InDesign, After Effects), Figma, Sketch, Canva, Procreate — précisez votre niveau d\'expertise sur chaque outil créatif.',
      },
      {
        icon: Sparkles,
        title: 'Design et ATS compatible',
        description: 'Un CV graphiste peut être plus créatif visuellement, mais doit rester lisible par les ATS. Nos templates trouvent l\'équilibre parfait entre originalité et compatibilité.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV graphiste gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité du design.',
    items: [
      {
        title: 'CV Graphiste Print & Web',
        keyword: 'cv graphiste print web gratuit',
        description: 'Identité visuelle, branding, print (flyers, affiches, plaquettes), web (bannières, emailings) — template mettant en avant votre polyvalence créative.',
      },
      {
        title: 'CV UI/UX Designer',
        keyword: 'cv ui ux designer gratuit',
        description: 'Design d\'interfaces, prototypage (Figma, Adobe XD), user research, design system — template valorisant vos compétences en expérience utilisateur.',
      },
      {
        title: 'CV Motion Designer',
        keyword: 'cv motion designer gratuit',
        description: 'Animation, vidéo, After Effects, motion graphics — template dédié aux profils motion et vidéo avec mise en avant de vos projets animés.',
      },
      {
        title: 'CV Directeur Artistique',
        keyword: 'cv directeur artistique gratuit',
        description: 'Direction créative, management d\'équipe créative, brief client, supervision de production — template valorisant votre vision créative et votre expérience en direction.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV graphiste percutant',
    tips: [
      'Incluez toujours un lien vers votre portfolio : Behance, Dribbble, site personnel ou PDF de travaux',
      'Listez vos logiciels avec votre niveau de maîtrise : expert, avancé, intermédiaire',
      'Décrivez vos projets avec : client/contexte, mission créative et impact (visibilité, résultats)',
      'Mentionnez vos spécialités : print, web, motion, packaging, branding, illustration',
      'Soignez la mise en page de votre CV : il doit refléter votre sens du design et de la lisibilité',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV graphiste',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV graphiste efficace',
    items: [
      {
        question: 'Comment faire un bon CV graphiste ?',
        answer: 'Un bon CV graphiste combine une mise en page soignée, un contenu clair et un lien vers votre portfolio. Listez vos logiciels, vos spécialités créatives et décrivez vos projets avec leur contexte et impact. Notre IA optimise chaque formulation.',
      },
      {
        question: 'Faut-il un CV original pour un poste de graphiste ?',
        answer: 'Un peu de personnalité visuelle est apprécié mais ne doit pas nuire à la lisibilité. Évitez les mises en page trop complexes qui bloqueront les ATS. Nos templates trouvent l\'équilibre parfait entre originalité et compatibilité professionnelle.',
      },
      {
        question: 'Quels logiciels mettre dans un CV graphiste ?',
        answer: 'Suite Adobe (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, XD), Figma, Sketch, Canva, Procreate. Pour les UI/UX : Figma est incontournable. Pour le motion : After Effects et Premiere Pro.',
      },
      {
        question: 'Comment présenter son portfolio dans un CV graphiste ?',
        answer: 'Ajoutez l\'URL de votre portfolio dans vos coordonnées en haut du CV. Choisissez un lien court et professionnel. Dans vos expériences, vous pouvez mentionner des projets spécifiques avec leur titre pour orienter le recruteur vers les travaux les plus pertinents.',
      },
      {
        question: 'Comment valoriser une expérience en freelance dans un CV graphiste ?',
        answer: 'Traitez votre activité freelance comme une expérience à part entière : précisez les types de clients, les missions réalisées (identité visuelle, site web, motion) et les projets les plus significatifs. Notre IA vous aide à en faire un atout plutôt qu\'une anomalie.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV graphiste maintenant',
    description: 'Mettez en avant votre créativité et votre portfolio. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV graphiste',
  },
}

export default function CvGraphistePage() {
  return <SeoLandingPage config={config} />
}
