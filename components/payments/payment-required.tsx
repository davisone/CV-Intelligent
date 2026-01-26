'use client'

import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRICING } from '@/lib/config/pricing'
import { cn } from '@/lib/utils/helpers'

interface PaymentRequiredProps {
  onUnlock: () => void
  className?: string
  variant?: 'banner' | 'inline' | 'compact'
  message?: string
}

export function PaymentRequired({
  onUnlock,
  className,
  variant = 'banner',
  message = 'Cette fonctionnalité nécessite un CV premium',
}: PaymentRequiredProps) {
  if (variant === 'compact') {
    return (
      <button
        onClick={onUnlock}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 text-xs rounded-md',
          'bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors',
          className
        )}
      >
        <Lock className="h-3 w-3" />
        <span>PRO</span>
      </button>
    )
  }

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200',
          className
        )}
      >
        <Lock className="h-5 w-5 text-amber-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-800">{message}</p>
        </div>
        <Button size="sm" onClick={onUnlock}>
          Débloquer
        </Button>
      </div>
    )
  }

  // Banner variant (default)
  return (
    <div
      className={cn(
        'rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-6',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Fonctionnalité Premium
          </h3>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
          <div className="mt-4 flex items-center gap-4">
            <Button onClick={onUnlock}>
              Débloquer pour {PRICING.displayPrice}
            </Button>
            <span className="text-sm text-gray-500">Paiement unique</span>
          </div>
        </div>
      </div>
    </div>
  )
}
