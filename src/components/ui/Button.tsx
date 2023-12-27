import { type VariantProps, cva } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '~/utils'

export const buttonVariants = cva('rounded-xl py-[1em] px-[1.5em] min-w-[5.5em] text-center font-bold text-sm', {
  variants: {
    variant: {
      default: 'bg-amber-500 text-white',
      secondary: 'bg-cyan-300 text-white',
      danger: 'bg-rose-500 text-white',
      transparent: '',
    },
  },
  defaultVariants: { variant: 'default' },
})

export function Button({
  className,
  children,
  variant,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  )
}
