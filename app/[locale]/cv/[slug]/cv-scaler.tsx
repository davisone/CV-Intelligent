'use client'

import { useEffect, useRef } from 'react'

export function CvScaler({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const cvWidth = 794
    const screenWidth = window.innerWidth
    if (screenWidth < cvWidth) {
      const scale = screenWidth / cvWidth
      el.style.transform = `scale(${scale})`
      el.style.transformOrigin = 'top center'
      el.style.marginBottom = `${(scale - 1) * el.offsetHeight}px`
    }
  }, [])

  return (
    <div ref={wrapperRef} data-cv-container style={{ width: '794px' }}>
      {children}
    </div>
  )
}
