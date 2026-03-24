'use client'

import { OnboardingTour, type TourStep } from '@/components/ui/onboarding-tour'

// Les steps spécifiques au dashboard (onboarding-create-cv, onboarding-templates) viennent
// en premier car ils n'existent que sur la page dashboard.
// Les liens sidebar (profile, my-resumes, whats-new) viennent ensuite — ils existent sur
// toutes les pages dashboard via la sidebar, et naviguent réellement vers la page cible.
const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    id: 'onboarding-create-cv',
    title: '👋 Bienvenue !',
    description: '<b>Cliquez ici</b> pour créer votre premier CV avec l\'un de nos templates professionnels.',
    side: 'bottom',
  },
  {
    id: 'onboarding-templates',
    title: 'Choisir un template',
    description: '<b>Cliquez ici</b> pour parcourir nos 5 templates : Moderne, Classique, ATS, Minimaliste et Créatif.',
    side: 'bottom',
    navigate: true,
  },
  {
    id: 'onboarding-profile',
    title: 'Votre profil maître',
    description: '<b>Cliquez sur Mon profil</b> pour renseigner vos informations une seule fois — elles pré-rempliront automatiquement tous vos futurs CVs.',
    side: 'right',
    navigate: true,
  },
  {
    id: 'onboarding-my-resumes',
    title: 'Vos CVs',
    description: '<b>Cliquez sur Mes CVs</b> pour accéder à vos CVs, les dupliquer, les renommer et les partager avec les recruteurs.',
    side: 'right',
    navigate: true,
  },
  {
    id: 'onboarding-whats-new',
    title: 'Nouveautés',
    description: '<b>Cliquez ici</b> pour découvrir les dernières mises à jour. Un badge vous avertira à chaque nouvelle version.',
    side: 'right',
    navigate: true,
  },
]

export function DashboardOnboardingTour() {
  return <OnboardingTour storageKey="tour_v1_dashboard" steps={DASHBOARD_TOUR_STEPS} />
}
