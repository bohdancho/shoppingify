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
    category: fruitsId,
    name: 'Avocado',
    note: 'The avocado (Persea americana) is a medium-sized, evergreen tree in the laurel family (Lauraceae). It is native to the Americas and was first domesticated in Mesoamerica more than 5,000 years ago',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Banana',
    note: 'Bananas are one of the most popular fruits worldwide. They are a good source of essential nutrients.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Apple',
    note: 'Apples are a rich source of antioxidants and dietary fiber.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Orange',
    note: 'Oranges are known for their high vitamin C content and citrusy flavor.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Tomato',
    note: 'Tomatoes are versatile and are used in various culinary dishes.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Strawberries',
    note: 'Strawberries are delicious berries rich in vitamin C.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Watermelon',
    note: 'Watermelon is a hydrating and refreshing fruit.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Mango',
    note: 'Mangoes are tropical fruits with a sweet and juicy taste.',
  },
  {
    id: nanoid(),
    category: fruitsId,
    name: 'Pineapple',
    note: 'Pineapple is a tropical fruit known for its sweet and tangy flavor.',
  },

  { id: nanoid(), category: meatId, name: 'Chicken leg box', note: 'Chicken legs are a popular cut of poultry.' },
  { id: nanoid(), category: meatId, name: 'Chicken breast', note: 'Chicken breast is a lean source of protein.' },
  {
    id: nanoid(),
    category: meatId,
    name: 'Salmon fillets',
    note: 'Salmon is rich in omega-3 fatty acids and protein.',
  },
  {
    id: nanoid(),
    category: meatId,
    name: 'Tuna steaks',
    note: 'Tuna steaks are a nutritious and delicious seafood option.',
  },
  { id: nanoid(), category: meatId, name: 'Shrimp', note: 'Shrimp are versatile shellfish used in various recipes.' },
  {
    id: nanoid(),
    category: meatId,
    name: 'Salmon burgers',
    note: 'Salmon burgers are a tasty alternative to traditional beef burgers.',
  },

  { id: nanoid(), category: beveragesId, name: 'Water', note: 'Staying hydrated is essential for overall health.' },
  {
    id: nanoid(),
    category: beveragesId,
    name: 'Coffee',
    note: 'Coffee is a popular caffeinated beverage enjoyed worldwide.',
  },
  {
    id: nanoid(),
    category: beveragesId,
    name: 'Tea',
    note: 'Tea is a soothing and diverse beverage with various flavors.',
  },
  {
    id: nanoid(),
    category: beveragesId,
    name: 'Orange juice',
    note: 'Orange juice is a refreshing and vitamin C-rich drink.',
  },
  { id: nanoid(), category: beveragesId, name: 'Soda', note: 'Soda is a carbonated beverage with various flavors.' },
  {
    id: nanoid(),
    category: beveragesId,
    name: 'Beer',
    note: 'Beer is an alcoholic beverage enjoyed in many cultures.',
  },
  {
    id: nanoid(),
    category: beveragesId,
    name: 'Wine',
    note: 'Wine is a classic alcoholic beverage with a wide range of varieties.',
  },
  { id: nanoid(), category: beveragesId, name: 'Milk', note: 'Milk is a nutritious dairy product rich in calcium.' },
  {
    id: nanoid(),
    category: beveragesId,
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
    // name: 'Grocery List',
    state: 'active',
    createdAt: Date.now() - MONTH_MS * 0.1,
  },
] satisfies ListDocType[]

const purchases = [
  { id: nanoid(), list: lists[0].id, item: items[2].id, amount: 2, isCompleted: true },
  { id: nanoid(), list: lists[0].id, item: items[10].id, amount: 3, isCompleted: true },
  { id: nanoid(), list: lists[0].id, item: items[22].id, amount: 1, isCompleted: true },

  { id: nanoid(), list: lists[0].id, item: items[2].id, amount: 2, isCompleted: true },
  { id: nanoid(), list: lists[0].id, item: items[5].id, amount: 1, isCompleted: false },
  { id: nanoid(), list: lists[0].id, item: items[15].id, amount: 2, isCompleted: true },
  { id: nanoid(), list: lists[0].id, item: items[8].id, amount: 1, isCompleted: true },
  { id: nanoid(), list: lists[0].id, item: items[14].id, amount: 2, isCompleted: false },

  { id: nanoid(), list: lists[1].id, item: items[18].id, amount: 4, isCompleted: true },
  { id: nanoid(), list: lists[1].id, item: items[5].id, amount: 1, isCompleted: true },
  { id: nanoid(), list: lists[1].id, item: items[1].id, amount: 3, isCompleted: true },
  { id: nanoid(), list: lists[1].id, item: items[20].id, amount: 2, isCompleted: true },

  { id: nanoid(), list: lists[2].id, item: items[6].id, amount: 4, isCompleted: true },
  { id: nanoid(), list: lists[2].id, item: items[14].id, amount: 2, isCompleted: true },

  { id: nanoid(), list: lists[3].id, item: items[12].id, amount: 2, isCompleted: false },
  { id: nanoid(), list: lists[3].id, item: items[22].id, amount: 1, isCompleted: false },
  { id: nanoid(), list: lists[3].id, item: items[20].id, amount: 3, isCompleted: false },
  { id: nanoid(), list: lists[3].id, item: items[19].id, amount: 1, isCompleted: false },
  { id: nanoid(), list: lists[3].id, item: items[15].id, amount: 2, isCompleted: false },
  { id: nanoid(), list: lists[3].id, item: items[21].id, amount: 2, isCompleted: false },
] satisfies PurchaseDocType[]
