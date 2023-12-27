import { useNavigate } from '@tanstack/react-router'
import { Navbar } from './components/Navbar'
import { ShoppingCartRounded } from '@mui/icons-material'
import logo from '~/assets/logo.svg'
import { switchMap, filter } from 'rxjs'
import { useObservableGetState } from 'observable-hooks'
import { db } from '~/db'
import { type ReactNode } from 'react'
import { ActiveList } from '~/features/ActiveList'

export function Layout({ children }: { children: ReactNode }) {
  const activePurchasesCount = useActivePurchasesCount()
  const navigate = useNavigate()

  return (
    <div className='flex'>
      <aside className='sticky top-0 flex h-dvh flex-col items-center justify-between bg-white py-4'>
        <img src={logo} alt='shoppingify logo' />
        <Navbar />
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
          {activePurchasesCount !== 0 && (
            <div className='absolute -right-1 -top-1 w-5 rounded bg-rose-500 text-xs leading-5 text-white'>
              {activePurchasesCount}
            </div>
          )}
          <ShoppingCartRounded className='z-10' />
        </button>
      </aside>
      <main className='flex-1'>{children}</main>
      <ActiveList />
    </div>
  )
}

function useActivePurchasesCount() {
  const count$ = db.lists.findOne({ selector: { state: 'active' } }).$.pipe(
    filter(Boolean),
    switchMap((activeList) => db.purchases.count({ selector: { list: activeList.id, isCompleted: false } }).$),
  )
  return useObservableGetState(count$, undefined)
}
