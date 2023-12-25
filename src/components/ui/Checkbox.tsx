import { CheckRounded } from '@mui/icons-material'
import clsx from 'clsx'

export function Checkbox({ className, checked }: { className?: string; checked: boolean }) {
  return (
    <span className={clsx('relative block', className)}>
      <input
        checked={checked}
        type='checkbox'
        className='peer block h-6 w-6 cursor-pointer appearance-none rounded border-2 border-amber-500 bg-transparent checked:border-amber-500'
      />
      <span className='pointer-events-none absolute -top-px left-0 block h-full w-full scale-[80%] opacity-0 transition-opacity peer-checked:opacity-100'>
        <CheckRounded className='inline-block text-amber-500' />
      </span>
    </span>
  )
}
