import { AddRounded, DeleteOutlineRounded, RemoveRounded } from '@mui/icons-material'
import { useState } from 'react'
import { Checkbox } from '~/components/ui'
import { db } from '~/db'
import type { Purchase, PopulatedPurchase } from '~/db/types'
import { cn } from '~/utils'

export function PurchasesByCategories({
  purchasesByCategories,
  isEditMode,
}: {
  purchasesByCategories: Record<string, PopulatedPurchase[]>
  isEditMode: boolean
}) {
  const [editingPurchaseId, setEditingPurchaseId] = useState<number | null>(null)
  if (!isEditMode && editingPurchaseId !== null) {
    setEditingPurchaseId(null)
  }

  return (
    <ul>
      {Object.entries(purchasesByCategories).map(([categoryName, purchases]) => (
        <li key={categoryName} className='mb-10 last:mb-0'>
          <h2 className='text-sm text-zinc-500'>{categoryName}</h2>
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id} className='mt-2 flex items-center justify-between'>
                {isEditMode ? (
                  <span className='text-sm'>{purchase.item.name}</span>
                ) : (
                  <label className='flex cursor-pointer items-center'>
                    <Checkbox
                      className='peer mr-3'
                      checked={purchase.isCompleted}
                      onChange={(event) => db.purchases.update(purchase.id!, { isCompleted: event.target.checked })}
                    />
                    <span className='text-sm peer-has-[:checked]:line-through'>{purchase.item.name}</span>
                  </label>
                )}
                {purchase.id === editingPurchaseId ? (
                  <div className='flex rounded-xl bg-white'>
                    <button className='mr-2 rounded-xl bg-amber-500 px-[10px] pr-2'>
                      <DeleteOutlineRounded className='text-white' onClick={() => db.purchases.delete(purchase.id!)} />
                    </button>
                    <button>
                      <RemoveRounded
                        className='text-amber-500'
                        onClick={() =>
                          purchase.amount > 1
                            ? db.purchases.update(purchase, { amount: purchase.amount - 1 })
                            : db.purchases.delete(purchase.id!)
                        }
                      />
                    </button>
                    <AmountBadge
                      className='mx-1 my-2 cursor-pointer self-center'
                      purchase={purchase}
                      onClick={() => isEditMode && setEditingPurchaseId(null)}
                    />
                    <button className='pr-1'>
                      <AddRounded
                        className='text-amber-500'
                        onClick={() => db.purchases.update(purchase, { amount: purchase.amount + 1 })}
                      />
                    </button>
                  </div>
                ) : (
                  <AmountBadge
                    className={cn({ 'cursor-pointer': isEditMode }, 'my-2')}
                    purchase={purchase}
                    onClick={() => isEditMode && setEditingPurchaseId(purchase.id!)}
                  />
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function AmountBadge({ purchase, onClick, className }: { purchase: Purchase; onClick: () => void; className: string }) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'min-w-[68px] rounded-3xl border-2 border-amber-500 text-center text-xs leading-8 text-amber-500',
        className,
      )}
    >
      {purchase.amount} pcs
    </span>
  )
}
