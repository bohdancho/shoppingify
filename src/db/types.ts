export type Category = {
  id?: number
  name: string
}

export type Item = {
  id?: number
  categoryId: number
  name: string
  note?: string
  imageUrl?: string
}

export type List = {
  id?: number
  title: string
  state: 'active' | 'cancelled' | 'completed'
  creationDate: number
}

export type Purchase = {
  id?: number
  itemId: number
  listId: number
  amount: number
  isCompleted: boolean
}
export type FullPurchase = Purchase & { category: Category; item: Item; list: List }