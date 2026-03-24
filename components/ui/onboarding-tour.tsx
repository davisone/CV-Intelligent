'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export interface TourStep {
  id: string
  title: string
  description: string
  side: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Si true, le clic navigue réellement vers la page de l'élément.
   * La progression est sauvegardée en sessionStorage pour reprendre après navigation.
   */
  navigate?: boolean
}

interface OnboardingTourProps {
  storageKey: string
  steps: TourStep[]
  delay?: number
}

export function OnboardingTour({ storageKey, steps, delay = 700 }: OnboardingTourProps) {
  const pathname = usePathname()
  const cleanupFnsRef = useRef<(() => void)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(storageKey) === 'done') return

    const resumeKey = `${storageKey}_resume`
    const raw = sessionStorage.getItem(resumeKey)
    const savedStep = raw !== null ? parseInt(raw, 10) : 0
    const startStep = isNaN(savedStep) ? 0 : Math.min(savedStep, steps.length - 1)

    // Vérifier que l'élément de départ existe sur cette page
    const startStepDef = steps[startStep]
    if (!startStepDef) return
    const startEl = document.getElementById(startStepDef.id)
    if (!startEl) return

    const activeSteps = steps.slice(startStep)
    let currentLocalStep = 0

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      allowClose: true,
      onDestroyStarted: () => {
        sessionStorage.removeItem(resumeKey)
        localStorage.setItem(storageKey, 'done')
        driverObj.destroy()
      },
      steps: activeSteps.map((step, index) => ({
        element: `#${step.id}`,
        popover: {
          title: step.title,
          description: `${step.description}<br><small style="color:#aaa;display:block;margin-top:8px">Cliquez sur l'élément surligné pour continuer</small>`,
          side: step.side,
          align: 'start' as const,
          showButtons: ['close'] as ('close')[],
          closeBtnText: startStep + index === steps.length - 1 ? 'Terminer' : 'Passer',
        },
      })),
    })

    const setupHandlers = () => {
      activeSteps.forEach((step, index) => {
        const el = document.getElementById(step.id)
        if (!el) return

        const handler = (e: MouseEvent) => {
          if (currentLocalStep !== index) return

          if (step.navigate) {
            // Mettre à jour la progression avant la navigation
            const originalNextStep = startStep + index + 1
            if (originalNextStep < steps.length) {
              sessionStorage.setItem(resumeKey, String(originalNextStep))
            } else {
              sessionStorage.removeItem(resumeKey)
              localStorage.setItem(storageKey, 'done')
            }
            driverObj.destroy()
            // Ne pas bloquer le clic — la navigation se fait naturellement
            return
          }

          // Étape non-navigante : intercepter et avancer
          e.preventDefault()
          e.stopPropagation()
          if (index === activeSteps.length - 1) {
            driverObj.destroy()
          } else {
            currentLocalStep = index + 1
            driverObj.moveNext()
          }
        }

        el.addEventListener('click', handler, true)
        cleanupFnsRef.current.push(() => el.removeEventListener('click', handler, true))
      })
    }

    const timer = setTimeout(() => {
      driverObj.drive()
      setupHandlers()
    }, delay)

    return () => {
      clearTimeout(timer)
      cleanupFnsRef.current.forEach(fn => fn())
      cleanupFnsRef.current = []
      driverObj.destroy()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, delay, pathname])

  return null
}
