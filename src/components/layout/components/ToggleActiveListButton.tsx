import { ShoppingCartRounded } from '@mui/icons-material'
import { useNavigate } from '@tanstack/react-router'
import { useObservableGetState } from 'observable-hooks'
import { filter, switchMap, startWith, pairwise } from 'rxjs'
import { db } from '~/db'

export function ToggleActiveListButton() {
  const navigate = useNavigate()
  const [, activePurchasesCount] = useActivePurchasesCount()

  return (
    <button
      className='relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white'
      onClick={() =>
        navigate({
          search: (prev) => ({
            isActiveListOpen: !prev.isActiveListOpen,
          }),
        })
      }
    >
      <ShoppingCartRounded className='z-10' />
      <div className='absolute -right-1 -top-1 w-5 rounded bg-rose-500 text-xs leading-5 text-white'>
        {!!activePurchasesCount && activePurchasesCount}
      </div>
    </button>
  )
}

function useActivePurchasesCount() {
  const count$ = db.lists.findOne({ selector: { state: 'active' } }).$.pipe(
    filter(Boolean),
    switchMap((activeList) => db.purchases.count({ selector: { listId: activeList.id, isCompleted: false } }).$),
    startWith(null),
    pairwise(),
  )
  return useObservableGetState(count$, [null, null])
}
