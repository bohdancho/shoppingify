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

export type ItemInList = {
  id?: number
  itemId: number
  listId: number
  amount: number
  isBought: boolean
}
