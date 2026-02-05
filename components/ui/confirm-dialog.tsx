'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils/helpers'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void | Promise<void>
  isLoading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'default',
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = async () => {
    setIsConfirming(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setIsConfirming(false)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isConfirming && !isLoading) {
        onOpenChange(false)
      }
    },
    [onOpenChange, isConfirming, isLoading]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isConfirming && !isLoading && onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          'relative z-50 w-full max-w-md rounded-xl bg-[#FBF8F4] p-6 shadow-xl',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-[#1F1A17]"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="mt-2 text-sm text-[#6B6560]"
        >
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isConfirming || isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            isLoading={isConfirming || isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface UseConfirmDialogOptions {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
}

interface UseConfirmDialogReturn {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
  confirm: () => Promise<boolean>
  ConfirmDialogComponent: React.FC
}

export function useConfirmDialog(
  options: UseConfirmDialogOptions
): UseConfirmDialogReturn {
  const [isOpen, setIsOpen] = useState(false)
  const resolveRef = useRef<((value: boolean) => void) | undefined>(undefined)

  const openDialog = useCallback(() => setIsOpen(true), [])
  const closeDialog = useCallback(() => setIsOpen(false), [])

  const confirm = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve
      setIsOpen(true)
    })
  }, [])

  const handleConfirm = useCallback(() => {
    resolveRef.current?.(true)
    setIsOpen(false)
  }, [])

  const handleCancel = useCallback((open: boolean) => {
    if (!open) {
      resolveRef.current?.(false)
      setIsOpen(false)
    }
  }, [])

  const ConfirmDialogComponent: React.FC = () =>
    isOpen ? (
      <ConfirmDialog
        open={isOpen}
        onOpenChange={handleCancel}
        title={options.title}
        description={options.description}
        confirmLabel={options.confirmLabel}
        cancelLabel={options.cancelLabel}
        variant={options.variant}
        onConfirm={handleConfirm}
      />
    ) : null

  return {
    isOpen,
    openDialog,
    closeDialog,
    confirm,
    ConfirmDialogComponent,
  }
}
