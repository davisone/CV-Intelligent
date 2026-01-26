'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseAutoSaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<void>
  delay?: number
  enabled?: boolean
}

interface UseAutoSaveReturn {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  saveNow: () => Promise<void>
  markAsSaved: () => void
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 3000,
  enabled = true,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const dataRef = useRef(data)
  const initialDataRef = useRef<string>(JSON.stringify(data))
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(true)

  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!hasUnsavedChanges) return

    setIsSaving(true)
    try {
      await onSave(dataRef.current)
      if (isMountedRef.current) {
        setLastSaved(new Date())
        setHasUnsavedChanges(false)
        initialDataRef.current = JSON.stringify(dataRef.current)
      }
    } catch (error) {
      console.error('[AutoSave] Save failed:', error)
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false)
      }
    }
  }, [onSave, hasUnsavedChanges])

  const markAsSaved = useCallback(() => {
    setLastSaved(new Date())
    setHasUnsavedChanges(false)
    initialDataRef.current = JSON.stringify(dataRef.current)
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    dataRef.current = data

    const currentDataStr = JSON.stringify(data)
    const hasChanges = currentDataStr !== initialDataRef.current

    if (hasChanges !== hasUnsavedChanges) {
      setHasUnsavedChanges(hasChanges)
    }

    if (!enabled || !hasChanges) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return

      setIsSaving(true)
      try {
        await onSave(data)
        if (isMountedRef.current) {
          setLastSaved(new Date())
          setHasUnsavedChanges(false)
          initialDataRef.current = JSON.stringify(data)
        }
      } catch (error) {
        console.error('[AutoSave] Save failed:', error)
      } finally {
        if (isMountedRef.current) {
          setIsSaving(false)
        }
      }
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, onSave, delay, enabled, hasUnsavedChanges])

  return {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    saveNow,
    markAsSaved,
  }
}
