import { create } from 'zustand'
import type { Item, List, Purchase } from './types'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { SEED } from './seed'

export type AppState = {
  items: Item[]
  lists: List[]
  purchases: Purchase[]
  getActivePurchasesCount: () => number
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (_set, get) => ({
        ...SEED,
        getActivePurchasesCount: () => {
          const activeList = get().lists.find(({ state }) => state === 'active')
          if (!activeList) return 0
          return get().purchases.filter(({ listId }) => listId === activeList.id).length
        },
      }),
      {
        storage: createJSONStorage(() => localStorage),
        name: 'appStore',
      },
    ),
    { enabled: import.meta.env.DEV },
  ),
)
