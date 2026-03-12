import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RefreshCw, Star, Sparkles } from 'lucide-react'
import { SeoLandingPage, type SeoLandingConfig } from '@/components/seo/seo-landing-page'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvReconversionPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/cv-reconversion' },
    openGraph: { title: t('title'), description: t('description'), type: 'article' },
  }
}

const config: SeoLandingConfig = {
  breadcrumbName: 'CV Reconversion',
  canonicalPath: '/cv-reconversion',
  hero: {
    badgeIcon: RefreshCw,
    badgeText: 'Reconversion professionnelle',
    h1Before: 'Créer un ',
    h1Accent: 'CV Reconversion',
    h1After: ' Professionnelle',
    subtitle: 'Changer de secteur ou de métier — un CV qui valorise vos compétences transférables et explique votre transition',
    description: 'Créez votre CV de reconversion professionnelle gratuit. Notre IA identifie vos compétences transférables et restructure votre parcours pour convaincre dans votre nouveau secteur.',
    primaryCtaText: 'Créer mon CV reconversion',
    secondaryCtaText: 'Voir les templates',
    secondaryCtaHref: '/templates',
  },
  section1: {
    title: 'Les clés d\'un CV de reconversion réussi',
    subtitle: 'Un CV de reconversion demande une approche différente pour convaincre des recruteurs sceptiques.',
    items: [
      {
        icon: RefreshCw,
        title: 'Compétences transférables',
        description: 'Management, communication, rigueur, analyse — de nombreuses compétences sont précieuses dans tous les secteurs. Notre IA identifie et valorise vos atouts transférables.',
      },
      {
        icon: Sparkles,
        title: 'Accroche percutante',
        description: 'Une reconversion se justifie et s\'explique. Votre accroche professionnelle doit présenter votre nouveau projet, votre motivation et ce que vous apportez de différent.',
      },
      {
        icon: Star,
        title: 'Formation et montée en compétences',
        description: 'Formations, certifications, projets personnels dans le nouveau domaine — montrez votre investissement dans la transition et votre montée en compétences.',
      },
    ],
  },
  section2: {
    title: 'CV reconversion par secteur cible',
    subtitle: 'Des templates adaptés selon votre secteur de destination.',
    items: [
      {
        title: 'Reconversion vers le Digital',
        keyword: 'cv reconversion développeur web gratuit',
        description: 'Bootcamp, formations en ligne, projets GitHub — valorisez votre apprentissage technique et vos premières réalisations pour décrocher votre premier poste dans la tech.',
      },
      {
        title: 'Reconversion vers le Commerce',
        keyword: 'cv reconversion commerciale gratuit',
        description: 'Mettez en avant vos compétences relationnelles, votre goût du challenge et vos expériences de négociation ou de service client dans votre précédent secteur.',
      },
      {
        title: 'Reconversion vers les RH',
        keyword: 'cv reconversion ressources humaines gratuit',
        description: 'Formation RH, SIRH, droit du travail, recrutement — structurez votre CV pour montrer vos compétences humaines et organisationnelles transférables vers les RH.',
      },
      {
        title: 'Reconversion vers la Formation',
        keyword: 'cv reconversion formateur gratuit',
        description: 'Expertise métier, pédagogie, transmission — valorisez votre expérience professionnelle comme atout pour devenir formateur ou consultant dans votre ancien domaine.',
      },
    ],
  },
  section3: {
    title: 'Réussir son CV de reconversion en 4 étapes',
    steps: [
      { title: 'Identifiez vos compétences transférables', description: 'Listez tout ce que vous savez faire : management, communication, analyse, organisation. Notre IA vous aide à identifier ce qui est valorisable dans votre nouveau secteur.' },
      { title: 'Rédigez une accroche de reconversion', description: 'Expliquez votre transition en 2-3 lignes : pourquoi ce changement, ce que vous apportez, votre projet professionnel. Soyez positif et proactif.' },
      { title: 'Mettez en avant vos nouvelles compétences', description: 'Formations, certifications, projets personnels, bénévolat dans le nouveau secteur — montrez votre investissement et votre progression.' },
      { title: 'Adaptez à chaque offre', description: 'Personnalisez votre CV selon le poste : mettez en avant les compétences les plus pertinentes. Notre IA analyse l\'offre et suggère les optimisations.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes sur le CV de reconversion',
    subtitle: 'Tout ce qu\'il faut savoir pour réussir son CV de changement de carrière',
    items: [
      {
        question: 'Comment faire un CV de reconversion professionnelle ?',
        answer: 'Un CV de reconversion met en avant vos compétences transférables, votre formation dans le nouveau domaine et une accroche expliquant votre projet. Notre IA restructure votre parcours pour convaincre les recruteurs du nouveau secteur visé.',
      },
      {
        question: 'Faut-il mentionner sa reconversion dans le CV ?',
        answer: 'Oui, une accroche professionnelle bien rédigée expliquant votre reconversion rassure les recruteurs plutôt que de les inquiéter. Présentez votre projet positivement, montrez votre investissement et ce que vous apportez de différent.',
      },
      {
        question: 'Quelles compétences mettre en avant en reconversion ?',
        answer: 'Les compétences transversales : management, communication, analyse, résolution de problèmes, organisation. Plus les compétences spécifiques acquises lors de votre formation de reconversion. Notre IA vous aide à identifier et formuler vos atouts.',
      },
      {
        question: 'Quel template CV choisir pour une reconversion ?',
        answer: 'Le template Modern est idéal car il permet de mettre en avant les compétences plutôt que de suivre un ordre chronologique strict. Sa flexibilité convient parfaitement aux profils atypiques en reconversion.',
      },
      {
        question: 'Comment valoriser un parcours atypique dans un CV ?',
        answer: 'Adoptez une structure fonctionnelle ou hybride qui met les compétences en avant. Regroupez les expériences par type de compétences plutôt que chronologiquement. Notre IA peut restructurer intelligemment votre parcours selon le poste visé.',
      },
    ],
  },
  finalCta: {
    title: 'Réussisez votre reconversion professionnelle',
    description: 'Notre IA valorise vos compétences transférables et optimise votre CV pour votre nouveau secteur.',
    ctaText: 'Créer mon CV reconversion',
  },
}

export default function CvReconversionPage() {
  return <SeoLandingPage config={config} />
}
