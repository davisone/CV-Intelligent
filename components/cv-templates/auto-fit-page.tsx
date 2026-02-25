'use client'

import { useRef, useEffect, type ReactNode } from 'react'

// Ratio hauteur/largeur d'une page A4
const A4_RATIO = 29.7 / 21

export const AutoFitPage = ({ children }: { children: ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const content = wrapper.firstElementChild as HTMLElement
    if (!content) return

    // Calculer la hauteur A4 en pixels à partir de la largeur réelle du contenu
    const pageWidth = content.offsetWidth
    const pageHeight = pageWidth * A4_RATIO
    const contentHeight = content.scrollHeight

    if (contentHeight > pageHeight + 2) {
      // Zoom minimum de 0.65 pour garder la lisibilité
      const scale = Math.max(pageHeight / contentHeight, 0.65)
      // Compenser la réduction de largeur causée par le zoom
      content.style.width = `${pageWidth / scale}px`
      content.style.zoom = `${scale}`
    }

    // Signal pour Puppeteer que le scaling est terminé
    wrapper.setAttribute('data-auto-fit-ready', 'true')
  }, [])

  return <div ref={wrapperRef}>{children}</div>
}
