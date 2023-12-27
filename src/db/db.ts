import {
  addRxPlugin,
  createRxDatabase,
  isRxDatabaseFirstTimeInstantiated,
  removeRxDatabase,
  type RxDatabase,
} from 'rxdb'
import {
  categorySchema,
  type CategoryCollection,
  type ItemCollection,
  type ListCollection,
  type PurchaseCollection,
  itemSchema,
  listSchema,
  purchaseSchema,
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

const dbName = 'shoppingify-db'
export const db: Database = await createRxDatabase<DatabaseCollections>({
  name: dbName,
  storage: getRxStorageDexie(),
  ignoreDuplicate: import.meta.env.DEV,
})

try {
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
      schema: purchaseSchema,
    },
  })
} catch (err) {
  await removeRxDatabase(dbName, getRxStorageDexie())
  location.reload()
}

if (await isRxDatabaseFirstTimeInstantiated(db as unknown as RxDatabase)) {
  await seedDb(db)
}
