import { type ReactNode } from 'react'
import logo from '~/assets/logo.svg'
import { ActiveList } from '~/features/ActiveList'
import { Navbar } from './components/Navbar'
import { ToggleActiveListButton } from './components'
import { rootRoute } from '~/router'
import { cn } from '~/utils'

export function Layout({ children }: { children: ReactNode }) {
  const { isActiveListOpen } = rootRoute.useSearch()

  return (
    <div className='flex'>
      <aside className='sticky top-0 flex h-dvh flex-col items-center justify-between overflow-y-clip bg-white py-4'>
        <img src={logo} alt='shoppingify logo' />
        <Navbar />
        <ToggleActiveListButton />
      </aside>
      <main className={cn({ 'h-dvh overflow-y-hidden': isActiveListOpen }, 'flex-1')}>{children}</main>
      <ActiveList />
    </div>
  )
}
