import { Checkbox } from '~/components/ui'
import { db } from '~/db'
import { type PopulatedPurchase } from '~/db/types'

export function PurchasesByCategories({
  purchasesByCategories,
}: {
  purchasesByCategories: Record<string, PopulatedPurchase[]>
}) {
  return (
    <ul>
      {Object.entries(purchasesByCategories).map(([categoryName, purchases]) => (
        <li key={categoryName} className='mb-10 last:mb-0'>
          <h2 className='text-sm text-zinc-500'>{categoryName}</h2>
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id} className='mt-6 flex items-center justify-between'>
                <label className='flex cursor-pointer items-center'>
                  <Checkbox
                    className='peer mr-3'
                    checked={purchase.isCompleted}
                    onChange={(event) => db.purchases.update(purchase.id!, { isCompleted: event.target.checked })}
                  />
                  <span className='text-sm peer-has-[:checked]:line-through'>{purchase.item.name}</span>
                </label>
                <span className='w-[68px] rounded-3xl border-2 border-amber-500 text-center text-xs leading-8 text-amber-500'>
                  {purchase.amount} pcs
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
