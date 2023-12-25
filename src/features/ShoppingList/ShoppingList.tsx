import clsx from 'clsx'
import { useLiveQuery } from 'dexie-react-hooks'
import bottleImg from '~/assets/bottle.svg'
import { Checkbox } from '~/components/ui'
import { db } from '~/db'

export function ShoppingList({ isVisible }: { isVisible: boolean }) {
  const fullPurchasesByCategories = useLiveQuery(async () => await db.getActiveListPurchasesByCategories())
  return (
    <aside
      className={clsx(
        { '-translate-x-full': isVisible },
        'fixed left-full top-0 h-full w-[calc(100%-4rem)] overflow-y-scroll bg-orange-100 px-4 pb-1 pt-7 transition-all duration-200 ease-in-out',
      )}
    >
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
        {fullPurchasesByCategories &&
          Object.entries(fullPurchasesByCategories).map(([categoryName, fullPurchases]) => (
            <li key={categoryName} className='mb-10 last:mb-0'>
              <h2 className='text-sm text-zinc-500'>{categoryName}</h2>
              <ul>
                {fullPurchases.map((fullPurchase) => (
                  <li key={fullPurchase.id} className='mt-6 flex items-center justify-between'>
                    <label className='flex cursor-pointer items-center'>
                      <Checkbox className='peer mr-3' checked={true} />
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
    </aside>
  )
}
