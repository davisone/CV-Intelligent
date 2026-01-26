import { cn } from '@/lib/utils/helpers'
import { Sparkles } from 'lucide-react'

interface PriceBadgeProps {
  variant: 'free' | 'pro'
  className?: string
  size?: 'sm' | 'md'
}

export function PriceBadge({ variant, className, size = 'md' }: PriceBadgeProps) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
  }

  if (variant === 'free') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full font-medium',
          'bg-green-100 text-green-700',
          sizeClasses[size],
          className
        )}
      >
        GRATUIT
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700',
        sizeClasses[size],
        className
      )}
    >
      <Sparkles className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
      PRO
    </span>
  )
}
