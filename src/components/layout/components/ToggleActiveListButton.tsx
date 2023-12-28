import { ShoppingCartRounded } from '@mui/icons-material'
import { useNavigate } from '@tanstack/react-router'
import { useObservableGetState } from 'observable-hooks'
import { type RefObject, useEffect, useRef } from 'react'
import { filter, switchMap, startWith, pairwise } from 'rxjs'
import { db } from '~/db'

export function ToggleActiveListButton() {
  const navigate = useNavigate()
  const [prevActivePurchasesCount, activePurchasesCount] = useActivePurchasesCount()
  const buttonRef = useRef<HTMLButtonElement>(null)
  useAnimateNotification(buttonRef, prevActivePurchasesCount, activePurchasesCount)

  return (
    <button
      ref={buttonRef}
      className='relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white'
      onClick={() =>
        navigate({
          search: (prev) => ({
            isActiveListOpen: !prev.isActiveListOpen,
          }),
        })
      }
    >
      <div className='absolute -right-1 -top-1 z-10 w-5 rounded bg-rose-500 text-xs leading-5 text-white'>
        {!!activePurchasesCount && activePurchasesCount}
      </div>
      <ShoppingCartRounded className='z-20' />
    </button>
  )
}

function useAnimateNotification(buttonRef: RefObject<HTMLButtonElement>, prevCount?: number, count?: number) {
  useEffect(() => {
    if (!prevCount || !count || prevCount === count) return

    const notification = document.createElement('div')
    notification.setAttribute(
      'class',
      'pointer-events-none absolute top-0 left-0 w-full h-full bg-amber-500 rounded-full animate-ping',
    )
    const ANIMATION_DURATION = 1000
    notification.style.setProperty('animation', `ping ${ANIMATION_DURATION}ms cubic-bezier(0, 0, 0.2, 1)`)

    buttonRef.current?.appendChild(notification)
    setTimeout(() => notification.remove(), ANIMATION_DURATION)
  }, [prevCount, count, buttonRef])
}

function useActivePurchasesCount() {
  const count$ = db.lists.findOne({ selector: { state: 'active' } }).$.pipe(
    filter(Boolean),
    switchMap((activeList) => db.purchases.count({ selector: { listId: activeList.id, isCompleted: false } }).$),
    startWith(undefined),
    pairwise(),
  )
  return useObservableGetState(count$, [undefined, undefined])
}
