import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Heart, Star, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvInfirmierPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-infirmier' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Infirmier',
  canonicalPath: '/cv-infirmier',
  hero: {
    badgeIcon: Heart,
    badgeText: 'Santé & Soins',
    h1Before: 'Créer un ',
    h1Accent: 'CV Infirmier',
    h1After: ' Gratuit',
    subtitle: 'Infirmier, aide-soignant, cadre de santé — un CV adapté au secteur hospitalier et médico-social',
    description: 'Créez votre CV infirmier gratuit en 5 minutes. Templates adaptés aux profils soignants, valorisant vos services, spécialisations et formations. Export PDF.',
    primaryCtaText: 'Créer mon CV infirmier',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les spécificités du CV infirmier',
    subtitle: 'Le secteur de la santé a ses propres codes en matière de recrutement.',
    items: [
      {
        icon: Heart,
        title: 'Diplômes et spécialisations',
        description: 'Diplôme d\'État, spécialisation (réanimation, pédiatrie, bloc opératoire, psychiatrie), formations continues — précisez vos qualifications pour cibler les services correspondants.',
      },
      {
        icon: Star,
        title: 'Services et établissements',
        description: 'CHU, clinique, EHPAD, HAD, libéral — l\'expérience dans différents types d\'établissements et services est un atout majeur que nos templates mettent en valeur.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les grands hôpitaux et groupes de cliniques utilisent des logiciels de recrutement. Nos templates garantissent une lecture parfaite de votre dossier par ces systèmes.',
      },
    ],
  },
  section2: {
    title: 'Modèles CV infirmier gratuits',
    subtitle: 'Des templates adaptés à chaque spécialité et secteur de soins.',
    items: [
      {
        title: 'CV Infirmier DE',
        keyword: 'cv infirmier diplômé état gratuit',
        description: 'Infirmier diplômé d\'État : services, spécialités, formations complémentaires, compétences cliniques et qualités relationnelles.',
      },
      {
        title: 'CV Aide-Soignant',
        keyword: 'cv aide-soignant gratuit',
        description: 'DEAS, services, établissements, soins de base, accompagnement du patient — template valorisant votre rôle essentiel dans l\'équipe soignante.',
      },
      {
        title: 'CV Infirmier Spécialisé',
        keyword: 'cv infirmier spécialisé gratuit',
        description: 'IADE, IBODE, infirmier de bloc, de réanimation — template mettant en avant votre spécialisation et vos compétences techniques avancées.',
      },
      {
        title: 'CV Cadre de Santé',
        keyword: 'cv cadre de santé gratuit',
        description: 'Management d\'équipe soignante, organisation des soins, gestion des plannings, formation des équipes et amélioration de la qualité des soins.',
      },
    ],
  },
  section3: {
    title: '5 conseils pour un CV infirmier percutant',
    tips: [
      'Mentionnez clairement vos diplômes : Diplôme d\'État, spécialisations, DU et formations continues',
      'Précisez les services et types d\'établissements : CHU, clinique, EHPAD, HAD, exercice libéral',
      'Listez vos compétences techniques : soins spécifiques, dispositifs médicaux, logiciels de soins',
      'Incluez vos soft skills essentiels en santé : empathie, rigueur, esprit d\'équipe, gestion du stress',
      'Adaptez votre CV au poste visé en mettant en avant l\'expérience dans le service concerné',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV infirmier',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV infirmier efficace',
    items: [
      {
        question: 'Comment faire un bon CV infirmier ?',
        answer: 'Un bon CV infirmier met en avant vos diplômes (Diplôme d\'État, spécialisations), vos expériences dans différents services et établissements, vos compétences techniques et vos qualités relationnelles. Notre IA vous aide à valoriser chaque expérience professionnelle.',
      },
      {
        question: 'Que mettre dans un CV d\'infirmier débutant ?',
        answer: 'Mettez votre Diplôme d\'État en tête, détaillez vos stages (services, établissements, durée, compétences acquises), ajoutez vos formations complémentaires et vos qualités personnelles. Notre IA valorise chaque stage comme une vraie expérience professionnelle.',
      },
      {
        question: 'Quel template CV choisir pour un infirmier ?',
        answer: 'Le template Classic est adapté aux établissements hospitaliers traditionnels. Modern pour les cliniques privées et groupes de santé. ATS-Friendly pour les grandes structures avec portail de candidature en ligne.',
      },
      {
        question: 'Comment présenter son exercice libéral dans un CV infirmier ?',
        answer: 'Précisez le secteur géographique couvert, le type d\'actes réalisés, le nombre de patients, les conventions avec les établissements. Mettez en avant l\'autonomie, l\'organisation et les compétences de gestion que cela implique.',
      },
      {
        question: 'Les recruteurs en santé demandent-ils un CV adapté ?',
        answer: 'Oui, les directions des soins et DRH hospitaliers cherchent des informations précises : diplômes, services, établissements, compétences spécifiques. Nos templates sont structurés pour présenter clairement ces informations dès le premier coup d\'œil.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV infirmier maintenant',
    description: 'Valorisez votre parcours soignant et vos spécialisations. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV infirmier',
  },
}

export default function CvInfirmierPage() {
  return <SeoLandingPage config={config} />
}
