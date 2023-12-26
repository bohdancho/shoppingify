import { addRxPlugin, createRxDatabase, isRxDatabaseFirstTimeInstantiated, type RxDatabase } from 'rxdb'
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
import { seedDb } from './seed'

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

export const db: Database = await createRxDatabase<DatabaseCollections>({
  name: 'mydb',
  storage: getRxStorageDexie(),
  ignoreDuplicate: import.meta.env.DEV,
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

if (await isRxDatabaseFirstTimeInstantiated(db as unknown as RxDatabase)) {
  seedDb(db)
}
