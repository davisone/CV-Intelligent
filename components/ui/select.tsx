import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/helpers'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            'flex h-10 w-full rounded-lg border border-[#E0D6C8] bg-[#FBF8F4] px-3 py-2 text-sm text-[#1F1A17]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:border-[#722F37]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            'appearance-none cursor-pointer',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
