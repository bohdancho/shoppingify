import { db, type CategoryDocument, type ItemDocType } from '~/db'
import { AddRounded, RemoveRounded } from '@mui/icons-material'
import { nanoid } from 'nanoid'
import { useRxQuery } from 'rxdb-hooks'

export function Category({ category }: { category: CategoryDocument }) {
  const { result: items } = useRxQuery(db.items.find({ selector: { categoryId: category.id } }))

  return (
    <ul className='grid grid-cols-[repeat(auto-fill,minmax(min(140px,40%),1fr))] items-start gap-x-2 gap-y-6'>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  )
}

function Item({ item }: { item: ItemDocType }) {
  const {
    result: [activeList],
  } = useRxQuery(db.lists.findOne({ selector: { state: 'active' } }))
  const {
    result: [purchase],
  } = useRxQuery(db.purchases.find({ selector: { listId: activeList?.id, itemId: item.id } }))

  return (
    <li className='flex items-start justify-between text-wrap rounded-xl bg-white p-3 shadow'>
      <span className='mr-1 text-sm'>{item.name}</span>
      {purchase ? (
        <button onClick={() => purchase.remove()}>
          <RemoveRounded className='text-stone-300' />
        </button>
      ) : (
        <button
          onClick={() =>
            db.purchases.insert({
              id: nanoid(),
              itemId: item.id,
              listId: activeList.id,
              amount: 1,
              isCompleted: false,
            })
          }
        >
          <AddRounded className='text-stone-300' />
        </button>
      )}
    </li>
  )
}
