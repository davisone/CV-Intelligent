'use client'

import { useEffect, useRef } from 'react'
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
  const currentStepRef = useRef(0)
  const cleanupFnsRef = useRef<(() => void)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(storageKey) === 'done') return

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      allowClose: true,
      onDestroyStarted: () => {
        localStorage.setItem(storageKey, 'done')
        driverObj.destroy()
      },
      steps: steps.map((step, index) => ({
        element: `#${step.id}`,
        popover: {
          title: step.title,
          description: `${step.description}<br><small style="color:#aaa;display:block;margin-top:8px">Cliquez sur l'élément surligné pour continuer</small>`,
          side: step.side,
          align: 'start' as const,
          showButtons: ['close'] as ('close')[],
          closeBtnText: index === steps.length - 1 ? 'Terminer' : 'Passer',
        },
      })),
    })

    const setupHandlers = () => {
      steps.forEach((step, index) => {
        const el = document.getElementById(step.id)
        if (!el) return

        const handler = (e: MouseEvent) => {
          if (currentStepRef.current !== index) return
          e.preventDefault()
          e.stopPropagation()
          if (index === steps.length - 1) {
            driverObj.destroy()
          } else {
            currentStepRef.current = index + 1
            driverObj.moveNext()
          }
        }

        el.addEventListener('click', handler, true)
        cleanupFnsRef.current.push(() => el.removeEventListener('click', handler, true))
      })
    }

    currentStepRef.current = 0
    const timer = setTimeout(() => {
      driverObj.drive()
      setupHandlers()
    }, delay)

    return () => {
      clearTimeout(timer)
      cleanupFnsRef.current.forEach(fn => fn())
      cleanupFnsRef.current = []
    }
  }, [storageKey, steps, delay])

  return null
}
