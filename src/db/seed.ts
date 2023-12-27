import { nanoid } from 'nanoid'
import { type Database } from './db'
import type { ItemDocType, ListDocType, PurchaseDocType } from './schemas'

export async function seedDb(db: Database) {
  await db.items.bulkInsert(items)
  await db.categories.bulkInsert([
    { id: fruitsId, name: 'Fruits and vegetables' },
    { id: meatId, name: 'Meat and fish' },
    { id: beveragesId, name: 'Beverages' },
  ])
  await db.lists.bulkInsert(lists)
  await db.purchases.bulkInsert(purchases)
}

const fruitsId = nanoid()
const meatId = nanoid()
const beveragesId = nanoid()

const items = [
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Avocado',
    note: 'The avocado (Persea americana) is a medium-sized, evergreen tree in the laurel family (Lauraceae). It is native to the Americas and was first domesticated in Mesoamerica more than 5,000 years ago',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Banana',
    note: 'Bananas are one of the most popular fruits worldwide. They are a good source of essential nutrients.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Apple',
    note: 'Apples are a rich source of antioxidants and dietary fiber.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Orange',
    note: 'Oranges are known for their high vitamin C content and citrusy flavor.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Tomato',
    note: 'Tomatoes are versatile and are used in various culinary dishes.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Strawberries',
    note: 'Strawberries are delicious berries rich in vitamin C.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Watermelon',
    note: 'Watermelon is a hydrating and refreshing fruit.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Mango',
    note: 'Mangoes are tropical fruits with a sweet and juicy taste.',
  },
  {
    id: nanoid(),
    categoryId: fruitsId,
    name: 'Pineapple',
    note: 'Pineapple is a tropical fruit known for its sweet and tangy flavor.',
  },

  { id: nanoid(), categoryId: meatId, name: 'Chicken leg box', note: 'Chicken legs are a popular cut of poultry.' },
  { id: nanoid(), categoryId: meatId, name: 'Chicken breast', note: 'Chicken breast is a lean source of protein.' },
  {
    id: nanoid(),
    categoryId: meatId,
    name: 'Salmon fillets',
    note: 'Salmon is rich in omega-3 fatty acids and protein.',
  },
  {
    id: nanoid(),
    categoryId: meatId,
    name: 'Tuna steaks',
    note: 'Tuna steaks are a nutritious and delicious seafood option.',
  },
  { id: nanoid(), categoryId: meatId, name: 'Shrimp', note: 'Shrimp are versatile shellfish used in various recipes.' },
  {
    id: nanoid(),
    categoryId: meatId,
    name: 'Salmon burgers',
    note: 'Salmon burgers are a tasty alternative to traditional beef burgers.',
  },

  { id: nanoid(), categoryId: beveragesId, name: 'Water', note: 'Staying hydrated is essential for overall health.' },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Coffee',
    note: 'Coffee is a popular caffeinated beverage enjoyed worldwide.',
  },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Tea',
    note: 'Tea is a soothing and diverse beverage with various flavors.',
  },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Orange juice',
    note: 'Orange juice is a refreshing and vitamin C-rich drink.',
  },
  { id: nanoid(), categoryId: beveragesId, name: 'Soda', note: 'Soda is a carbonated beverage with various flavors.' },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Beer',
    note: 'Beer is an alcoholic beverage enjoyed in many cultures.',
  },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Wine',
    note: 'Wine is a classic alcoholic beverage with a wide range of varieties.',
  },
  { id: nanoid(), categoryId: beveragesId, name: 'Milk', note: 'Milk is a nutritious dairy product rich in calcium.' },
  {
    id: nanoid(),
    categoryId: beveragesId,
    name: 'Smoothies',
    note: 'Smoothies are blended beverages made with fruits and other ingredients.',
  },
] satisfies ItemDocType[]

const MONTH_MS = 1000 * 60 * 60 * 24 * 30
const lists = [
  {
    id: nanoid(),
    name: 'Grocery List',
    state: 'cancelled',
    createdAt: Date.now() - MONTH_MS,
  },
  {
    id: nanoid(),
    name: 'Board game week 2',
    state: 'completed',
    createdAt: Date.now() - MONTH_MS * 1.5,
  },
  {
    id: nanoid(),
    name: "Eero's farewall party",
    state: 'completed',
    createdAt: Date.now() - MONTH_MS * 0.2,
  },
  {
    id: nanoid(),
    name: 'Grocery List',
    state: 'cancelled',
    createdAt: Date.now() - MONTH_MS * 0.1,
  },
  { id: nanoid(), state: 'active' },
] satisfies ListDocType[]

const purchases = [
  { id: nanoid(), listId: lists[0].id, itemId: items[2].id, amount: 2, isCompleted: true },
  { id: nanoid(), listId: lists[0].id, itemId: items[10].id, amount: 3, isCompleted: true },
  { id: nanoid(), listId: lists[0].id, itemId: items[22].id, amount: 1, isCompleted: true },

  { id: nanoid(), listId: lists[0].id, itemId: items[2].id, amount: 2, isCompleted: true },
  { id: nanoid(), listId: lists[0].id, itemId: items[5].id, amount: 1, isCompleted: false },
  { id: nanoid(), listId: lists[0].id, itemId: items[15].id, amount: 2, isCompleted: true },
  { id: nanoid(), listId: lists[0].id, itemId: items[8].id, amount: 1, isCompleted: true },
  { id: nanoid(), listId: lists[0].id, itemId: items[14].id, amount: 2, isCompleted: false },

  { id: nanoid(), listId: lists[1].id, itemId: items[18].id, amount: 4, isCompleted: true },
  { id: nanoid(), listId: lists[1].id, itemId: items[5].id, amount: 1, isCompleted: true },
  { id: nanoid(), listId: lists[1].id, itemId: items[1].id, amount: 3, isCompleted: true },
  { id: nanoid(), listId: lists[1].id, itemId: items[20].id, amount: 2, isCompleted: true },

  { id: nanoid(), listId: lists[2].id, itemId: items[6].id, amount: 4, isCompleted: true },
  { id: nanoid(), listId: lists[2].id, itemId: items[14].id, amount: 2, isCompleted: true },

  { id: nanoid(), listId: lists[3].id, itemId: items[12].id, amount: 2, isCompleted: false },
  { id: nanoid(), listId: lists[3].id, itemId: items[22].id, amount: 1, isCompleted: false },
  { id: nanoid(), listId: lists[3].id, itemId: items[20].id, amount: 3, isCompleted: false },
  { id: nanoid(), listId: lists[3].id, itemId: items[19].id, amount: 1, isCompleted: false },
  { id: nanoid(), listId: lists[3].id, itemId: items[15].id, amount: 2, isCompleted: false },
  { id: nanoid(), listId: lists[3].id, itemId: items[21].id, amount: 2, isCompleted: false },
] satisfies PurchaseDocType[]
