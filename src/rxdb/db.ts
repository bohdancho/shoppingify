import { addRxPlugin, createRxDatabase, type RxDatabase } from 'rxdb'
import {
  categorySchema,
  type CategoryCollection,
  type ItemCollection,
  type ListCollection,
  type PurchaseCollection,
  itemSchema,
  listSchema,
} from './schemas'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

export type DatabaseCollections = {
  categories: CategoryCollection
  items: ItemCollection
  lists: ListCollection
  purchases: PurchaseCollection
}
export type Database = RxDatabase<DatabaseCollections>

if (import.meta.env.DEV) {
  await import('rxdb/plugins/dev-mode').then((module) => addRxPlugin(module.RxDBDevModePlugin))
}

console.log('create')
export const db: Database = await createRxDatabase<DatabaseCollections>({
  name: 'mydb',
  storage: getRxStorageDexie(),
  ignoreDuplicate: true,
})

await db.addCollections({
  categories: {
    schema: categorySchema,
  },
  items: {
    schema: itemSchema,
  },
  lists: {
    schema: listSchema,
  },
  purchases: {
    schema: categorySchema,
  },
})
