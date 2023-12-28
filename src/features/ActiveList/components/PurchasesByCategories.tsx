import { AddRounded, DeleteOutlineRounded, RemoveRounded } from '@mui/icons-material'
import { useState } from 'react'
import { Checkbox } from '~/components/ui'
import type { ItemDocument, PurchaseDocument } from '~/db'
import { cn } from '~/utils'

export function PurchasesByCategories({
  purchasesByCategories,
  isEditMode,
}: {
  purchasesByCategories: Record<string, { purchase: PurchaseDocument; item: ItemDocument }[]>
  isEditMode: boolean
}) {
  const [editingPurchaseId, setEditingPurchaseId] = useState<string>()
  if (!isEditMode && editingPurchaseId !== undefined) {
    setEditingPurchaseId(undefined)
  }

  return (
    <ul>
      {Object.entries(purchasesByCategories).map(([categoryName, purchases]) => (
        <li key={categoryName} className='mb-10 last:mb-0'>
          <h2 className='text-sm text-zinc-500'>{categoryName}</h2>
          <ul>
            {purchases.map(({ purchase, item }) => (
              <li key={purchase.id} className='mt-2 flex items-center justify-between'>
                {isEditMode ? (
                  <span className='text-sm'>{item.name}</span>
                ) : (
                  <label className='flex cursor-pointer items-center'>
                    <Checkbox
                      className='peer mr-3'
                      checked={purchase.isCompleted}
                      onChange={(event) => purchase.patch({ isCompleted: event.target.checked })}
                    />
                    <span className='text-sm peer-has-[:checked]:line-through'>{item.name}</span>
                  </label>
                )}
                {purchase.id === editingPurchaseId ? (
                  <div className='flex rounded-xl bg-white'>
                    <button className='mr-2 rounded-xl bg-amber-500 px-[10px] pr-2'>
                      <DeleteOutlineRounded onClick={() => purchase.remove()} className='text-white' />
                    </button>
                    <button>
                      <RemoveRounded
                        className='text-amber-500'
                        onClick={() =>
                          purchase.amount > 1 ? purchase.patch({ amount: purchase.amount - 1 }) : purchase.remove()
                        }
                      />
                    </button>
                    <AmountBadge
                      className='mx-1 my-2 cursor-pointer self-center'
                      amount={purchase.amount}
                      onClick={() => isEditMode && setEditingPurchaseId(undefined)}
                    />
                    <button className='pr-1'>
                      <AddRounded
                        className='text-amber-500'
                        onClick={() => purchase.patch({ amount: purchase.amount + 1 })}
                      />
                    </button>
                  </div>
                ) : (
                  <AmountBadge
                    className={cn({ 'cursor-pointer': isEditMode }, 'my-2')}
                    amount={purchase.amount}
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

function AmountBadge({ amount, onClick, className }: { amount: number; onClick: () => void; className: string }) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'min-w-[68px] rounded-3xl border-2 border-amber-500 text-center text-xs leading-8 text-amber-500',
        className,
      )}
    >
      {amount} pcs
    </span>
  )
}
