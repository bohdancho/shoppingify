import { CloseRounded } from '@mui/icons-material'
import { Button } from '~/components/ui'
import { cn } from '~/utils'

export function CancelListModal({
  isVisible,
  onConfirm,
  onAbort,
}: {
  isVisible: boolean
  onConfirm: () => void
  onAbort: () => void
}) {
  return (
    <div
      className={cn(
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
        'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-4 backdrop-brightness-75 transition',
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onAbort()
        }
      }}
    >
      <div className='relative max-w-[500px] rounded-3xl bg-white p-7'>
        <button className='absolute right-2 top-2' onClick={onAbort}>
          <CloseRounded />
        </button>
        <h2 className='mb-4'>Are you sure you want to cancel this list?</h2>
        <div className='flex justify-end gap-2'>
          <Button variant='transparent' onClick={onAbort}>
            don't cancel
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  )
}
