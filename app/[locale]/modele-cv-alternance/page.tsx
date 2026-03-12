import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GraduationCap, Briefcase, Shield, Star } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.modeleCvAlternancePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/modele-cv-alternance' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Modèle CV Alternance',
  canonicalPath: '/modele-cv-alternance',
  hero: {
    badgeIcon: GraduationCap,
    badgeText: 'Pour décrocher votre alternance',
    h1Before: 'Modèle ',
    h1Accent: 'CV Alternance',
    h1After: ' Gratuit à Télécharger',
    subtitle: 'Apprentissage, contrat pro, alternance BTS/Licence/Master — un CV qui convainc entreprises et écoles',
    description: 'Téléchargez un modèle CV alternance gratuit en PDF. Templates optimisés pour l\'alternance, compatibles ATS, créés avec l\'aide de l\'IA en 5 minutes.',
    primaryCtaText: 'Créer mon CV alternance',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Réussir son CV d\'alternance',
    subtitle: 'Un CV d\'alternance s\'adresse à la fois à l\'entreprise et à l\'école. Voici les clés.',
    items: [
      {
        icon: GraduationCap,
        title: 'Double profil à valoriser',
        description: 'L\'alternance combine étude et travail. Montrez que vous êtes à la fois un bon étudiant et un futur professionnel efficace en entreprise.',
      },
      {
        icon: Briefcase,
        title: 'Expériences et projets',
        description: 'Stages, jobs étudiants, projets académiques — chaque expérience renforce votre candidature en alternance. Notre IA les valorise tous.',
      },
      {
        icon: Shield,
        title: 'Optimisé ATS',
        description: 'Les portails de recrutement des grandes entreprises filtrent automatiquement. Nos templates sont structurés pour passer ces filtres efficacement.',
      },
    ],
  },
  section2: {
    title: 'Nos modèles CV alternance gratuits',
    subtitle: 'Des templates adaptés à chaque niveau de formation et secteur d\'alternance.',
    items: [
      {
        title: 'CV Alternance BTS',
        keyword: 'modèle cv alternance bts gratuit',
        description: 'Format adapté aux candidatures en alternance BTS : structure claire, compétences techniques mises en avant selon votre filière.',
      },
      {
        title: 'CV Alternance Licence/Bachelor',
        keyword: 'cv alternance licence gratuit',
        description: 'Pour les alternances en Licence Pro ou Bachelor : valorisez votre double compétence théorique et pratique.',
      },
      {
        title: 'CV Alternance Master',
        keyword: 'modèle cv alternance master',
        description: 'Niveau Bac+4/Bac+5 : montrez votre maturité professionnelle et vos compétences avancées pour des postes à responsabilités.',
      },
      {
        title: 'CV Alternance Informatique',
        keyword: 'modèle cv alternance informatique',
        description: 'Spécialement adapté aux alternances en développement, data, cybersécurité et systèmes. Stack technique bien mis en valeur.',
      },
    ],
  },
  section3: {
    title: 'Créez votre CV d\'alternance en 4 étapes',
    steps: [
      { title: 'Créez votre compte', description: 'Inscription gratuite en 30 secondes, sans carte bancaire.' },
      { title: 'Choisissez votre template', description: 'Modern, Minimal, ATS ou Classic selon votre secteur et votre niveau de formation.' },
      { title: 'Remplissez avec l\'IA', description: 'Notre IA optimise votre contenu pour plaire à la fois aux recruteurs et aux responsables pédagogiques.' },
      { title: 'Téléchargez en PDF', description: 'Export haute qualité, prêt à envoyer aux entreprises et à votre école.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV d\'alternance',
    subtitle: 'Tout ce qu\'il faut savoir pour décrocher votre contrat d\'alternance',
    items: [
      {
        question: 'Comment faire un CV pour une alternance ?',
        answer: 'Pour un CV d\'alternance, montrez que vous êtes à la fois un bon étudiant et un futur collaborateur efficace. Précisez votre rythme d\'alternance (ex: 3 jours entreprise / 2 jours école), vos dates de disponibilité et votre formation. Valorisez stages, projets et compétences.',
      },
      {
        question: 'Que mettre dans un CV d\'alternance ?',
        answer: 'Incluez : formation en cours avec le rythme d\'alternance et les dates, expériences (stages, jobs), compétences techniques et soft skills, projets académiques ou personnels, et une accroche présentant votre projet professionnel en lien avec l\'alternance visée.',
      },
      {
        question: 'Quel modèle de CV choisir pour une alternance ?',
        answer: 'Le template Modern convient à la majorité des alternances. ATS-Friendly pour les grandes entreprises et les groupes qui utilisent des portails de recrutement. Classic pour les secteurs formels (banque, assurance, secteur public).',
      },
      {
        question: 'Comment différencier son CV d\'alternance d\'un CV classique ?',
        answer: 'Mentionnez clairement votre rythme d\'alternance, votre école et votre formation. Ajoutez une section sur votre projet professionnel qui montre le lien entre votre formation et le poste visé. Notre IA vous aide à rédiger une accroche percutante pour chaque candidature.',
      },
      {
        question: 'Les CV d\'alternance sont-ils compatibles ATS ?',
        answer: 'Oui, tous nos templates sont optimisés pour les logiciels de tri automatique utilisés par les grandes entreprises et les portails de recrutement. La structure claire et le texte bien parsé garantissent que votre CV arrive bien au recruteur.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV d\'alternance maintenant',
    description: 'Gratuit, optimisé pour l\'alternance, prêt en 5 minutes.',
    ctaText: 'Créer mon CV alternance',
  },
}

export default function ModeleCvAlternancePage() {
  return <SeoLandingPage config={config} />
}
