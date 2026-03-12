import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvSansExperiencePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-sans-experience' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Sans Expérience',
  canonicalPath: '/cv-sans-experience',
  hero: {
    badgeIcon: GraduationCap,
    badgeText: 'Même sans expérience, vous avez des atouts',
    h1Before: 'Créer un ',
    h1Accent: 'CV Sans Expérience',
    h1After: ' Qui Convainc',
    subtitle: 'Formation, projets, bénévolat — valorisez chaque atout de votre parcours',
    description: 'Créez votre CV sans expérience en 5 minutes avec l\'IA. Notre générateur valorise votre formation, vos projets et vos compétences pour décrocher un stage ou un premier emploi.',
    primaryCtaText: 'Créer mon CV sans expérience',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Vos atouts même sans expérience',
    subtitle: 'L\'expérience professionnelle n\'est pas le seul critère. Voici ce qui vous distingue.',
    items: [
      {
        icon: GraduationCap,
        title: 'La formation d\'abord',
        description: 'Diplôme, spécialisation, établissement, mention — votre formation est votre premier argument professionnel quand l\'expérience est limitée.',
      },
      {
        icon: Briefcase,
        title: 'Projets et bénévolat',
        description: 'Projets académiques, associatifs, personnels, open source : chaque réalisation concrète mérite d\'apparaître sur votre CV.',
      },
      {
        icon: Sparkles,
        title: 'Compétences et soft skills',
        description: 'Langues, outils informatiques, capacités relationnelles, curiosité — autant d\'atouts concrets à valoriser même sans expérience.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV sans expérience',
    subtitle: 'Des templates optimisés pour les profils débutants et étudiants.',
    items: [
      {
        title: 'CV Étudiant Sans Expérience',
        keyword: 'cv étudiant sans expérience gratuit',
        description: 'Format optimisé pour mettre la formation et les projets en avant quand l\'expérience professionnelle est limitée.',
      },
      {
        title: 'CV Stage Sans Expérience',
        keyword: 'cv stage sans expérience',
        description: 'Pour votre premier stage : mettez en avant vos projets, compétences et motivation. Parfait pour les candidatures de stage.',
      },
      {
        title: 'CV Premier Emploi Débutant',
        keyword: 'cv premier emploi sans expérience',
        description: 'Valorisez vos stages, projets et activités pour décrocher votre premier poste même avec peu d\'expérience.',
      },
      {
        title: 'CV Reconversion Débutante',
        keyword: 'cv reconversion sans expérience',
        description: 'Pour changer de secteur : montrez vos compétences transférables et présentez clairement votre projet professionnel.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV sans expérience convaincant',
    tips: [
      'Mettez votre formation en tête de CV — c\'est votre principal atout face aux recruteurs',
      'Incluez tous vos projets : académiques, personnels, open source ou associatifs',
      'Ajoutez le bénévolat et les activités extra-scolaires — ils montrent votre engagement',
      'Détaillez vos compétences techniques : logiciels, langages de programmation, certifications',
      'Rédigez une accroche courte et percutante qui présente votre projet professionnel',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV sans expérience',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV convaincant même sans expérience',
    items: [
      {
        question: 'Comment faire un CV sans expérience ?',
        answer: 'Pour un CV sans expérience, mettez votre formation en tête, ajoutez vos projets académiques et personnels, listez vos compétences techniques et soft skills, et incluez tout bénévolat ou activité extra-scolaire. Notre IA vous guide pour valoriser chaque élément.',
      },
      {
        question: 'Quoi mettre dans un CV sans expérience ?',
        answer: 'Formation (diplômes, cours, certifications), projets (académiques, personnels, open source), compétences (techniques et linguistiques), activités (bénévolat, associations, sport), et une accroche présentant votre projet professionnel.',
      },
      {
        question: 'Comment valoriser un projet personnel dans un CV ?',
        answer: 'Décrivez le contexte, l\'objectif, les technologies utilisées et le résultat obtenu. Par exemple : "Développé une application mobile (React Native) permettant de gérer X, utilisée par Y personnes". Notre IA vous aide à formuler chaque projet de façon percutante.',
      },
      {
        question: 'CV sans expérience : une page ou deux ?',
        answer: 'Sans expérience professionnelle significative, une seule page A4 est recommandée. Nos templates s\'adaptent automatiquement pour que le contenu soit présenté de façon optimale sur une page.',
      },
      {
        question: 'Comment décrocher un stage sans expérience ?',
        answer: 'Ciblez votre CV pour chaque stage, mettez en avant vos compétences spécifiques au poste, montrez votre motivation dans l\'accroche, et accompagnez d\'une lettre de motivation personnalisée. Notre IA vous aide à optimiser chaque candidature.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV sans expérience',
    description: 'L\'IA valorise chaque atout de votre profil. Votre CV professionnel prêt en 5 minutes.',
    ctaText: 'Créer mon CV sans expérience',
  },
}

export default function CvSansExperiencePage() {
  return <SeoLandingPage config={config} />
}
