import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FileText, Sparkles, Shield } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.commentFaireUnCvPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/comment-faire-un-cv' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'Comment Faire un CV',
  canonicalPath: '/comment-faire-un-cv',
  hero: {
    badgeIcon: FileText,
    badgeText: 'Guide complet 2026',
    h1Before: '',
    h1Accent: 'Comment Faire un CV',
    h1After: ' Professionnel en 2026',
    subtitle: 'Tout ce qu\'il faut savoir pour créer un CV qui décroche des entretiens',
    description: 'Notre guide complet vous explique comment faire un CV professionnel étape par étape. Structure, contenu, mise en page — puis créez le vôtre avec l\'IA en 5 minutes.',
    primaryCtaText: 'Créer mon CV maintenant',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les 3 piliers d\'un bon CV',
    subtitle: 'Un CV efficace repose sur trois éléments fondamentaux que notre générateur optimise automatiquement.',
    items: [
      {
        icon: FileText,
        title: 'Structure claire',
        description: 'Un CV bien structuré guide l\'œil du recruteur. Sections dans le bon ordre, hiérarchie visuelle cohérente, informations clés immédiatement visibles.',
      },
      {
        icon: Sparkles,
        title: 'Contenu percutant',
        description: 'Chaque phrase doit apporter de la valeur. Résultats concrets, verbes d\'action, mots-clés du secteur — notre IA optimise chaque formulation.',
      },
      {
        icon: Shield,
        title: 'Compatible ATS',
        description: '90% des grandes entreprises utilisent des logiciels de tri automatique. Votre CV doit être structuré pour passer ce filtre avant d\'arriver au recruteur.',
      },
    ],
  },
  section2: {
    title: 'Comment faire un CV selon votre profil',
    subtitle: 'Les règles varient selon votre niveau d\'expérience et votre secteur.',
    items: [
      {
        title: 'CV Étudiant / Débutant',
        keyword: 'comment faire un cv étudiant',
        description: 'Formation en tête, projets académiques, stages courts, bénévolat et compétences. Notre IA valorise chaque élément même sans expérience.',
      },
      {
        title: 'CV Professionnel Confirmé',
        keyword: 'comment faire un cv professionnel',
        description: 'Expériences en avant avec résultats chiffrés, compétences clés, formation en bas. Accent sur les réalisations concrètes et l\'impact.',
      },
      {
        title: 'CV Sans Expérience',
        keyword: 'comment faire un cv sans expérience',
        description: 'Misez sur la formation, les projets personnels, les soft skills et les activités extra-professionnelles. Montrez votre potentiel et votre motivation.',
      },
      {
        title: 'CV de Reconversion',
        keyword: 'comment faire un cv reconversion',
        description: 'Identifiez vos compétences transférables, réorganisez votre parcours autour du nouveau secteur visé, rédigez une accroche qui explique votre transition.',
      },
    ],
  },
  section3: {
    title: 'Comment faire un bon CV : les 5 règles d\'or',
    tips: [
      'Adaptez votre CV à chaque offre en intégrant les mots-clés de l\'annonce dans vos descriptions',
      'Quantifiez vos résultats quand c\'est possible : "augmenté le CA de 20%", "géré une équipe de 5 personnes"',
      'Limitez à 1 page pour les juniors et 2 pages maximum pour les profils expérimentés',
      'Relisez attentivement : une faute d\'orthographe peut éliminer une candidature',
      'Exportez en PDF pour garantir que la mise en page reste intacte chez tous les recruteurs',
    ],
  },
  faq: {
    title: 'Questions fréquentes sur comment faire un CV',
    subtitle: 'Les réponses aux questions les plus posées sur la création de CV',
    items: [
      {
        question: 'Comment faire un CV rapidement ?',
        answer: 'Avec notre générateur de CV, créez un CV professionnel en 5 minutes. Choisissez un template, remplissez vos informations guidé par l\'IA, et téléchargez en PDF. L\'IA optimise automatiquement vos formulations et votre structure.',
      },
      {
        question: 'Quelles sont les sections obligatoires d\'un CV ?',
        answer: 'Un CV doit contenir : coordonnées, accroche professionnelle (optionnelle mais recommandée), expériences professionnelles, formation, et compétences. Selon votre profil, ajoutez langues, certifications, projets ou centres d\'intérêt.',
      },
      {
        question: 'Comment faire un CV sans expérience professionnelle ?',
        answer: 'Mettez votre formation en tête, ajoutez tous vos projets (académiques, personnels, associatifs), listez vos compétences techniques et soft skills, et incluez vos activités extra-scolaires. Notre IA valorise chaque élément de votre parcours.',
      },
      {
        question: 'Quel logiciel utiliser pour faire un CV ?',
        answer: 'Notre générateur de CV en ligne est la solution la plus simple et la plus efficace. Contrairement à Word ou Canva, nos templates sont optimisés ATS, exportent parfaitement en PDF, et notre IA vous aide à rédiger chaque section.',
      },
      {
        question: 'Combien de pages doit faire un bon CV ?',
        answer: 'Pour un étudiant ou junior : 1 page. Pour un professionnel avec 5-10 ans d\'expérience : 1-2 pages. Pour les seniors avec un parcours riche : 2 pages maximum. Nos templates s\'adaptent automatiquement à votre contenu.',
      },
    ],
  },
  finalCta: {
    title: 'Créez votre CV maintenant',
    description: 'Appliquez tous ces conseils directement avec notre générateur guidé par l\'IA. Votre CV prêt en 5 minutes.',
    ctaText: 'Créer mon CV gratuitement',
  },
}

export default function CommentFaireUnCvPage() {
  return <SeoLandingPage config={config} />
}
