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

export interface TourLabels {
  next: string
  prev: string
  done: string
}

interface OnboardingTourProps {
  storageKey: string
  steps: TourStep[]
  delay?: number
  labels?: TourLabels
  waitForLocalStorageKey?: string
}

export function OnboardingTour({ storageKey, steps, delay = 700, labels, waitForLocalStorageKey }: OnboardingTourProps) {
  const nextBtn = labels?.next ?? 'Suivant →'
  const prevBtn = labels?.prev ?? '← Précédent'
  const doneBtn = labels?.done ?? 'Terminer'

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(storageKey) === 'done') return

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      allowClose: true,
      nextBtnText: nextBtn,
      prevBtnText: prevBtn,
      doneBtnText: doneBtn,
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

    let timer: ReturnType<typeof setTimeout> | null = null
    let interval: ReturnType<typeof setInterval> | null = null

    function launchAfterDelay() {
      timer = setTimeout(() => driverObj.drive(), delay)
    }

    // Si une popup doit être fermée en premier, on attend qu'elle le soit
    if (waitForLocalStorageKey && !localStorage.getItem(waitForLocalStorageKey)) {
      interval = setInterval(() => {
        if (localStorage.getItem(waitForLocalStorageKey)) {
          clearInterval(interval!)
          interval = null
          launchAfterDelay()
        }
      }, 300)
    } else {
      launchAfterDelay()
    }

    return () => {
      if (timer) clearTimeout(timer)
      if (interval) clearInterval(interval)
      driverObj.destroy()
    }
  }, [storageKey, steps, delay, nextBtn, prevBtn, doneBtn, waitForLocalStorageKey])

  return null
}
