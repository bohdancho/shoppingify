import { CheckRounded } from '@mui/icons-material'
import { type InputHTMLAttributes } from 'react'
import { cn } from '~/utils'

export function Checkbox({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <span className={cn('relative block', className)}>
      <input
        {...props}
        type='checkbox'
        className='peer block h-6 w-6 cursor-pointer appearance-none rounded border-2 border-amber-500 bg-transparent checked:border-amber-500'
      />
      <span className='pointer-events-none absolute -top-px left-0 block h-full w-full scale-[80%] opacity-0 transition-opacity peer-checked:opacity-100'>
        <CheckRounded className='inline-block text-amber-500' />
      </span>
    </span>
  )
}
