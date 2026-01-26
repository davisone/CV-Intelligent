'use client'

import { useEffect, useCallback } from 'react'

interface UseUnsavedChangesWarningOptions {
  hasUnsavedChanges: boolean
  message?: string
}

export function useUnsavedChangesWarning({
  hasUnsavedChanges,
  message = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?',
}: UseUnsavedChangesWarningOptions): void {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = message
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges, message])
}

export function confirmNavigation(hasUnsavedChanges: boolean): boolean {
  if (!hasUnsavedChanges) return true
  return window.confirm(
    'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?'
  )
}
