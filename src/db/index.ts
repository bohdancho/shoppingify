import Dexie, { type Table } from 'dexie'
import type { Category, Item, List, ItemInList } from './types'
import { populate } from './populate'

export class ShoppingifyDB extends Dexie {
  categories!: Table<Category, number>
  items!: Table<Item, number>
  lists!: Table<List, number>
  itemsInLists!: Table<ItemInList, number>
  constructor() {
    super('ShoppingifyDB')
    this.version(1).stores({
      categories: '++id',
      items: '++id, categoryId',
      lists: '++id',
      itemsInLists: '++id, itemId, listId',
    })
  }
}

export const db = new ShoppingifyDB()

db.on('populate', populate)

export function resetDatabase() {
  return db.transaction('rw', db.categories, db.items, db.lists, db.itemsInLists, async () => {
    await Promise.all(db.tables.map((table) => table.clear()))
    await populate()
  })
}
