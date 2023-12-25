import Dexie, { type Table } from 'dexie'
import type { Category, FullPurchase, Item, List, Purchase } from './types'
import { populate } from './populate'

export class ShoppingifyDB extends Dexie {
  categories!: Table<Category, number>
  items!: Table<Item, number>
  lists!: Table<List, number>
  purchases!: Table<Purchase, number>
  constructor() {
    super('ShoppingifyDB')
    this.version(1).stores({
      categories: '++id',
      items: '++id, categoryId',
      lists: '++id, state',
      purchases: '++id, itemId, listId',
    })
  }

  async getActiveListPurchasesByCategories() {
    return this.transaction('r', this.lists, this.items, this.categories, this.purchases, async () => {
      const activeList = await this.lists.get({ state: 'active' })
      if (!activeList) {
        throw Error('no active list')
      }

      const purchases = await this.purchases.where({ listId: activeList.id }).toArray()
      const fullPurchases = await Promise.all(purchases.map((purchase) => this.getFullPurchase(purchase)))

      const fullPurchasesByCategories: Record<string, FullPurchase[]> = {}
      fullPurchases.forEach((fullPurchase) => {
        const categoryName = fullPurchase.category.name
        if (!fullPurchasesByCategories[categoryName]) {
          fullPurchasesByCategories[categoryName] = []
        }
        fullPurchasesByCategories[categoryName].push(fullPurchase)
      })
      return fullPurchasesByCategories
    })
  }

  async getFullPurchase(purchase: Purchase): Promise<FullPurchase> {
    return db.transaction('r', this.lists, this.items, this.purchases, this.categories, async () => {
      const item = await this.items.get(purchase.itemId)
      if (!item) throw Error('no item found')
      const category = await this.categories.get(item.categoryId)
      if (!category) throw Error('no category found')
      const list = await this.lists.get(purchase.listId)
      if (!list) throw Error('no list found')
      return { ...purchase, category, item, list }
    })
  }
}

export const db = new ShoppingifyDB()

db.on('populate', populate)

export function resetDatabase() {
  return db.transaction('rw', db.categories, db.items, db.lists, db.purchases, async () => {
    await Promise.all(db.tables.map((table) => table.clear()))
    await populate()
  })
}
