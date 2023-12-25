import { type VariantProps, cva } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '~/utils'

export const buttonVariants = cva('rounded-xl py-[1.2em] px-[1.5em] font-bold text-sm', {
  variants: {
    variant: { default: 'bg-amber-500 text-white', transparent: 'text-neutral-700 ' },
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
