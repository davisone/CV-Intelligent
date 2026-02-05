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
            'flex h-10 w-full rounded-lg border border-[#E0D6C8] bg-[#FBF8F4] px-3 py-2 text-sm text-[#1F1A17]',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#1F1A17]',
            'placeholder:text-[#8A7F72]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:border-[#722F37]',
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