import bottleImg from '~/assets/bottle.svg'
import { Button } from '~/components/ui'
import shoppingImg from '~/assets/shopping.svg'
import { cn, isMdScreen } from '~/utils'
import { CancelListModal, ListNameForm, PurchasesByCategories } from './components'
import { useState } from 'react'
import { CreateRounded } from '@mui/icons-material'
import { combineLatest, filter, map, mergeMap, startWith, switchMap } from 'rxjs'
import { db, type ListDocType, type PurchaseDocument } from '~/db'
import groupBy from 'lodash/groupBy'
import { useObservableGetState } from 'observable-hooks'
import { nanoid } from 'nanoid'
import { useNavigate } from '@tanstack/react-router'
import { rootRoute } from '~/router'

export const isActiveListOpenDefault = () => isMdScreen()
export function ActiveList() {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const { isActiveListOpen: isOpen } = rootRoute.useSearch()
  const navigate = useNavigate()

  const data = useActiveList()
  if (data === undefined) return 'Loading...'
  const [activeList, purchasesByCategories] = data
  const hasItems = Object.keys(purchasesByCategories).length !== 0

  if (activeList.name === undefined && !isEditMode) {
    setIsEditMode(true)
  }

  async function deactivateAndCreateNew(newState: Exclude<ListDocType['state'], 'active'>) {
    await activeList.patch({ state: newState })
    await db.lists.insert({ id: nanoid(), state: 'active' })
    await navigate({ search: { isActiveListOpen: false } })
  }

  return (
    <>
      <CancelListModal
        isVisible={isCancelModalVisible}
        onAbort={() => setIsCancelModalVisible(false)}
        onConfirm={async () => {
          await deactivateAndCreateNew('cancelled')
          setIsCancelModalVisible(false)
        }}
      />
      <aside
        className={cn(
          { '-translate-x-full': isOpen === true },
          'fixed left-full top-0 flex h-full w-[calc(100%-4rem)] flex-col bg-orange-100 transition-all duration-200 ease-in-out',
        )}
      >
        <div className='flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-7'>
          <div className='mb-8 flex rounded-3xl bg-[#80485B] px-6 py-3 font-bold'>
            <img src={bottleImg} alt='spice bottle' className='-mt-6 h-32 pr-7' />
            <div>
              <span className='mb-[0.8em] block text-white'>Didn't find what you need?</span>
              <button className='block rounded-xl bg-white px-[1.3em] text-sm leading-[2.5em] shadow'>Add item</button>
            </div>
          </div>
          {(activeList.name || hasItems) && (
            <div className='mb-8 flex items-start justify-between gap-2'>
              <h1 className='break-text text-2xl font-bold'>{activeList.name ?? 'Shopping list'}</h1>
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
            <div className='absolute top-1/2 mt-auto self-center text-xl font-bold'>No items</div>
          )}
        </div>
        <div className='sticky bottom-0 flex w-full justify-center bg-white p-4'>
          {!hasItems && <img src={shoppingImg} className='absolute top-2 max-w-[200px] -translate-y-full' />}
          {isEditMode ? (
            <ListNameForm
              list={activeList}
              onSubmit={async (name) => {
                await activeList.patch({ name, createdAt: activeList.createdAt ? undefined : Date.now() })
                setIsEditMode(false)
              }}
            />
          ) : (
            <>
              <Button variant='transparent' className='mr-2' onClick={() => setIsCancelModalVisible(true)}>
                cancel
              </Button>
              <Button variant='secondary' onClick={() => deactivateAndCreateNew('completed')}>
                Complete
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

function useActiveList() {
  const activeList$ = db.lists.findOne({ selector: { state: 'active' } }).$.pipe(filter(Boolean))
  const purchasesByCategories$ = activeList$.pipe(
    mergeMap((activeList) => db.purchases.find({ selector: { listId: activeList.id } }).$),
    mergeMap((purchases) => combineLatest([...purchases.map(populatePurchase$)]).pipe(startWith([]))),
    map((purchases) => groupBy(purchases, ({ category }) => category.name)),
  )
  return useObservableGetState(combineLatest([activeList$, purchasesByCategories$]), undefined)
}

function populatePurchase$(purchase: PurchaseDocument) {
  return db.items.findOne({ selector: { id: purchase.itemId } }).$.pipe(
    switchMap((item) =>
      db.categories.findOne({ selector: { id: item!.categoryId } }).$.pipe(
        map((category) => ({
          purchase,
          item: item!,
          category: category!,
        })),
      ),
    ),
  )
}
