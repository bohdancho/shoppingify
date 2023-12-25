import { type ReactNode } from '@tanstack/react-router'
import { Navbar } from './components/Navbar'
import { ShoppingCartRounded } from '@mui/icons-material'
import logo from '~/assets/logo.svg'
import { useState } from 'react'
import { ShoppingList } from '~/features/ShoppingList'

export function Layout({ children }: { children: ReactNode }) {
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(true)

  return (
    <div>
      <aside className='fixed flex  h-full w-16 flex-col items-center justify-between py-4'>
        <img src={logo} alt='shoppingify logo' />
        <Navbar onNavigate={() => setIsShoppingListVisible(false)} />
        <button
          className='relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white'
          onClick={() => setIsShoppingListVisible((prev) => !prev)}
        >
          <div className='absolute -right-1 -top-1 w-5 rounded bg-rose-500 text-xs leading-5 text-white'>3</div>
          <ShoppingCartRounded className='z-10' />
        </button>
      </aside>
      <div className='pl-16'>{children}</div>
      <ShoppingList isVisible={isShoppingListVisible} />
    </div>
  )
}
