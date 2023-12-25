import { useLiveQuery } from 'dexie-react-hooks'
import bottleImg from '~/assets/bottle.svg'
import { Button } from '~/components/ui/Button'
import shoppingImg from '~/assets/shopping.svg'
import { db } from '~/db'
import { cn } from '~/utils'
import { CancelListModal, PurchasesByCategories } from './components'
import { useState } from 'react'

export function ShoppingList({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const data = useLiveQuery(async () => await db.getShoppingList())
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  if (data === undefined) return 'Loading...'

  const hasItems = Object.keys(data.purchasesByCategories).length !== 0
  return (
    <>
      <CancelListModal
        isVisible={isCancelModalVisible}
        onAbort={() => setIsCancelModalVisible(false)}
        onConfirm={async () => {
          await db.changeListState(data.activeList.id!, 'cancelled')
          setIsCancelModalVisible(false)
          onClose()
        }}
      />
      <aside
        className={cn(
          { '-translate-x-full': isVisible },
          'fixed left-full top-0 flex h-full w-[calc(100%-4rem)] flex-col bg-orange-100 transition-all duration-200 ease-in-out',
        )}
      >
        <div className='flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-7'>
          <div className='mb-8 flex rounded-3xl bg-[#80485B] px-6 py-3 font-bold text-white'>
            <img src={bottleImg} alt='spice bottle' className='-mt-6 h-32 pr-7' />
            <div>
              <span className='mb-[0.8em] block'>Didn't find what you need?</span>
              <button className='block rounded-xl bg-white px-[1.3em] text-sm leading-[2.5em] text-neutral-700 shadow'>
                Add item
              </button>
            </div>
          </div>
          {hasItems ? (
            <>
              <h1 className='mb-8 text-2xl font-bold text-neutral-700'>Shopping list</h1>
              <PurchasesByCategories purchasesByCategories={data.purchasesByCategories} />
            </>
          ) : (
            <>
              <div className='mt-[50%] self-center text-xl font-bold text-neutral-700'>No items</div>
            </>
          )}
        </div>
        <div className='sticky bottom-0 flex w-full justify-center gap-2 bg-white p-4'>
          {!hasItems && <img src={shoppingImg} className='absolute top-2 max-w-[200px] -translate-y-full' />}
          <Button variant='transparent' onClick={() => setIsCancelModalVisible(true)}>
            cancel
          </Button>
          <Button
            variant='secondary'
            onClick={async () => {
              await db.changeListState(data.activeList.id!, 'completed')
              onClose()
            }}
          >
            Complete
          </Button>
        </div>
      </aside>
    </>
  )
}
