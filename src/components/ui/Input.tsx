import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '~/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          'rounded-l-xl border-2 border-amber-500 px-5 outline-none focus:placeholder-transparent',
          className,
        )}
      />
    )
  },
)
