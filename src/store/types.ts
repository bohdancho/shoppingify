export const CATEGORIES = ['Fruits and vegetables', 'Meat and fish', 'Beverages'] as const
export type Category = (typeof CATEGORIES)[number]

export type Item = {
  id: string
  category: Category
  name: string
  note?: string
  imageUrl?: string
}

export type ListState = 'active' | 'cancelled' | 'completed'
export type List = {
  id: string
  createdAt: number
  name?: string
  state: ListState
}

export type Purchase = {
  itemId: string
  listId: string
  amount: number
  isCompleted: boolean
}
