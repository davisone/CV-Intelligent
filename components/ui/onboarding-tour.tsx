'use client'

import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export interface TourStep {
  id: string
  title: string
  description: string
  side: 'top' | 'bottom' | 'left' | 'right'
}

interface OnboardingTourProps {
  storageKey: string
  steps: TourStep[]
  delay?: number
}

export function OnboardingTour({ storageKey, steps, delay = 700 }: OnboardingTourProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(storageKey) === 'done') return

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      allowClose: true,
      nextBtnText: 'Suivant →',
      prevBtnText: '← Précédent',
      doneBtnText: 'Terminer',
      onDestroyStarted: () => {
        localStorage.setItem(storageKey, 'done')
        driverObj.destroy()
      },
      steps: steps.map(step => ({
        element: `#${step.id}`,
        popover: {
          title: step.title,
          description: step.description,
          side: step.side,
          align: 'start' as const,
        },
      })),
    })

    const timer = setTimeout(() => driverObj.drive(), delay)
    return () => {
      clearTimeout(timer)
      driverObj.destroy()
    }
  }, [storageKey, steps, delay])

  return null
}
