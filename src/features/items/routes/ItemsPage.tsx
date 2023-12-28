import { db } from '~/db'
import { useRxQuery } from 'rxdb-hooks'
import { Category } from '../components'

export function ItemsPage() {
  const { result: categories } = useRxQuery(db.categories.find())

  return (
    <>
      <h1 className='mb-7 text-xl'>
        <span className='text-amber-500'>Shoppingify</span> allows you to take your shopping list wherever you go
      </h1>
      <ul>
        {categories?.map((category) => (
          <li className='mb-7 last:mb-0' key={category.id}>
            <h2 className='mb-4 text-lg'>{category.name}</h2>
            <Category category={category} />
          </li>
        ))}
      </ul>
    </>
  )
}
