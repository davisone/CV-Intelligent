import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/helpers'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-[#404040] bg-[#1A1A1A] px-3 py-2 text-sm text-[#E5E5E5]',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#E5E5E5]',
            'placeholder:text-[#737373]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:border-[#C9A227]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }