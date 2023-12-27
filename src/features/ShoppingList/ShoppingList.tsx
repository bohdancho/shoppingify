import bottleImg from '~/assets/bottle.svg'
import { Button } from '~/components/ui'
import shoppingImg from '~/assets/shopping.svg'
import { cn } from '~/utils'
import { CancelListModal, ListNameForm, PurchasesByCategories } from './components'
import { useState } from 'react'
import { CreateRounded } from '@mui/icons-material'
import { combineLatest, map, mergeMap, startWith, switchMap } from 'rxjs'
import { db, type PurchaseDocument } from '~/db'
import groupBy from 'lodash/groupBy'
import { useObservableGetState } from 'observable-hooks'
import { nanoid } from 'nanoid'
import { useNavigate } from '@tanstack/react-router'
import { rootRoute } from '~/router'

export function ShoppingList() {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const { isActiveListOpen: isOpen } = rootRoute.useSearch()
  const navigate = useNavigate()

  const data = useShoppingList()
  if (data === undefined) return 'Loading...'
  const [activeList, purchasesByCategories] = data
  const hasItems = Object.keys(purchasesByCategories).length !== 0

  if (activeList.name === undefined && !isEditMode) {
    setIsEditMode(true)
  }

  return (
    <>
      <CancelListModal
        isVisible={isCancelModalVisible}
        onAbort={() => setIsCancelModalVisible(false)}
        onConfirm={async () => {
          await activeList.patch({ state: 'cancelled' })
          setIsCancelModalVisible(false)
          await navigate({ search: { isActiveListOpen: false } })
        }}
      />
      <aside
        className={cn(
          { '-translate-x-full': isOpen === true },
          'fixed left-full top-0 flex h-full w-[calc(100%-4rem)] flex-col bg-orange-100 transition-all duration-200 ease-in-out',
        )}
      >
        <div className='flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-7'>
          <div className='mb-8 flex rounded-3xl bg-[#80485B] px-6 py-3 font-bold text-white'>
            <img src={bottleImg} alt='spice bottle' className='-mt-6 h-32 pr-7' />
            <div>
              <span className='mb-[0.8em] block'>Didn't find what you need?</span>
              <button className='block rounded-xl bg-white px-[1.3em] text-sm leading-[2.5em] text-neutral-700 shadow'>
                Add item
              </button>
            </div>
          </div>
          {(activeList.name || hasItems) && (
            <div className='mb-8 flex items-start justify-between'>
              <h1 className='text-2xl font-bold text-neutral-700'>{activeList.name ?? 'Shopping list'}</h1>
              {!isEditMode && (
                <button className='h-8' onClick={() => setIsEditMode(true)}>
                  <CreateRounded />
                </button>
              )}
            </div>
          )}
          {hasItems ? (
            <PurchasesByCategories purchasesByCategories={purchasesByCategories} isEditMode={isEditMode} />
          ) : (
            <div className='absolute top-1/2 mt-auto self-center text-xl font-bold text-neutral-700'>No items</div>
          )}
        </div>
        <div className='sticky bottom-0 flex w-full justify-center bg-white p-4'>
          {!hasItems && <img src={shoppingImg} className='absolute top-2 max-w-[200px] -translate-y-full' />}
          {isEditMode ? (
            <ListNameForm
              list={activeList}
              onSubmit={async (name) => {
                await activeList.patch({ name })
                setIsEditMode(false)
              }}
            />
          ) : (
            <>
              <Button variant='transparent' className='mr-2' onClick={() => setIsCancelModalVisible(true)}>
                cancel
              </Button>
              <Button
                variant='secondary'
                onClick={async () => {
                  await activeList.patch({ state: 'completed' })
                  await navigate({ search: { isActiveListOpen: false } })
                }}
              >
                Complete
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

function populatePurchase$(purchase: PurchaseDocument) {
  return db.items.findOne({ selector: { id: purchase.item } }).$.pipe(
    switchMap((item) =>
      db.categories.findOne({ selector: { id: item?.category } }).$.pipe(
        map((category) => ({
          purchase,
          item: item!,
          category: category!,
        })),
      ),
    ),
  )
}

function useShoppingList() {
  const activeList$ = db.lists
    .findOne({ selector: { state: 'active' } })
    .$.pipe(
      switchMap(async (activeList) =>
        activeList ? activeList : await db.lists.insert({ id: nanoid(), state: 'active', createdAt: Date.now() }),
      ),
    )
  const purchasesByCategories$ = activeList$.pipe(
    mergeMap((activeList) => db.purchases.find({ selector: { list: activeList.id } }).$),
    mergeMap((purchases) => combineLatest([...purchases.map(populatePurchase$)]).pipe(startWith([]))),
    map((purchases) => groupBy(purchases, ({ category }) => category.name)),
  )
  return useObservableGetState(combineLatest([activeList$, purchasesByCategories$]), undefined)
}
