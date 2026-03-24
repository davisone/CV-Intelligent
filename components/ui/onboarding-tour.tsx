'use client'

import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

interface OnboardingTourProps {
  show: boolean
}

export function OnboardingTour({ show }: OnboardingTourProps) {
  useEffect(() => {
    if (!show) return

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Suivant →',
      prevBtnText: '← Précédent',
      doneBtnText: 'Terminer',
      allowClose: true,
      onDestroyStarted: async () => {
        await fetch('/api/user/complete-onboarding', { method: 'POST' })
        driverObj.destroy()
      },
      steps: [
        {
          element: '#onboarding-create-cv',
          popover: {
            title: 'Créer votre premier CV',
            description: 'Cliquez ici pour créer un nouveau CV. Choisissez parmi nos templates professionnels et personnalisez-le à votre image.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#onboarding-profile',
          popover: {
            title: 'Votre profil maître',
            description: 'Remplissez votre profil une seule fois pour pré-remplir automatiquement tous vos CVs.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#onboarding-templates',
          popover: {
            title: 'Choisir un template',
            description: 'Parcourez nos templates professionnels pour trouver celui qui correspond à votre style et votre secteur.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#onboarding-my-resumes',
          popover: {
            title: 'Vos CVs',
            description: 'Retrouvez tous vos CVs ici. Dupliquez-les, renommez-les et partagez-les directement avec les recruteurs.',
            side: 'right',
            align: 'start',
          },
        },
      ],
    })

    const timer = setTimeout(() => driverObj.drive(), 600)
    return () => clearTimeout(timer)
  }, [show])

  return null
}
