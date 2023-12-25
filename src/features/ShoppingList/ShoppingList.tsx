import { useLiveQuery } from 'dexie-react-hooks'
import bottleImg from '~/assets/bottle.svg'
import { Checkbox } from '~/components/ui'
import { Button } from '~/components/ui/Button'
import { db } from '~/db'
import { type FullPurchase } from '~/db/types'
import { cn } from '~/utils'

export function ShoppingList({ isVisible }: { isVisible: boolean }) {
  const fullPurchasesByCategories = useLiveQuery(async () => await db.getActiveListPurchasesByCategories())
  if (!fullPurchasesByCategories) return 'Loading...'
  return (
    <aside
      className={cn(
        { '-translate-x-full': isVisible },
        'fixed left-full top-0 h-full w-[calc(100%-4rem)] overflow-y-scroll bg-orange-100 transition-all duration-200 ease-in-out',
      )}
    >
      <div className='px-4 pb-1 pt-7'>
        <div className='mb-8 flex rounded-3xl bg-[#80485B] px-6 py-3 font-bold text-white'>
          <img src={bottleImg} alt='spice bottle' className='-mt-6 h-32 pr-7' />
          <div>
            <span className='mb-[0.8em] block'>Didn't find what you need?</span>
            <button className='block rounded-xl bg-white px-[1.3em] text-sm leading-[2.5em] text-neutral-700 shadow'>
              Add item
            </button>
          </div>
        </div>
        <h1 className='mb-8 text-2xl font-bold text-neutral-700'>Shopping list</h1>

        <ul>
          {Object.entries(fullPurchasesByCategories).map(([categoryName, fullPurchases]) => (
            <li key={categoryName} className='mb-10 last:mb-0'>
              <h2 className='text-sm text-zinc-500'>{categoryName}</h2>
              <ul>
                {fullPurchases.map((fullPurchase) => (
                  <li key={fullPurchase.id} className='mt-6 flex items-center justify-between'>
                    <label className='flex cursor-pointer items-center'>
                      <Checkbox
                        className='peer mr-3'
                        checked={fullPurchase.isCompleted}
                        onChange={(event) =>
                          db.purchases.update(fullPurchase.id!, { isCompleted: event.target.checked })
                        }
                      />
                      <span className='text-sm peer-has-[:checked]:line-through'>{fullPurchase.item.name}</span>
                    </label>
                    <span className='w-[68px] rounded-3xl border-2 border-amber-500 text-center text-xs leading-8 text-amber-500'>
                      {fullPurchase.amount} pcs
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className='sticky bottom-0 flex w-full justify-center gap-2 bg-white p-4'>
        <Button
          variant='transparent'
          onClick={() => db.lists.update(fullPurchasesByCategories[0][0].listId, { state: 'completed' })}
        >
          cancel
        </Button>
        <Button onClick={() => db.lists.update(fullPurchasesByCategories[0][0].listId, { state: 'cancelled' })}>
          Complete
        </Button>
      </div>
    </aside>
  )
}
