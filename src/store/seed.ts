import { nanoid } from 'nanoid'
import type { AppState } from '.'
import type { List, Item, Purchase } from './types'

const items: Item[] = [
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Avocado',
    note: 'The avocado (Persea americana) is a medium-sized, evergreen tree in the laurel family (Lauraceae). It is native to the Americas and was first domesticated in Mesoamerica more than 5,000 years ago',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Banana',
    note: 'Bananas are one of the most popular fruits worldwide. They are a good source of essential nutrients.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Apple',
    note: 'Apples are a rich source of antioxidants and dietary fiber.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Orange',
    note: 'Oranges are known for their high vitamin C content and citrusy flavor.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Tomato',
    note: 'Tomatoes are versatile and are used in various culinary dishes.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Potato',
    note: 'Potatoes are a staple food and are rich in carbohydrates.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Onion',
    note: 'Onions add flavor to many dishes and are a good source of vitamins.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Garlic',
    note: 'Garlic is known for its distinct flavor and potential health benefits.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Cucumber',
    note: 'Cucumbers are low in calories and a good source of hydration.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Lettuce',
    note: 'Lettuce is a leafy green vegetable commonly used in salads.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Carrot',
    note: 'Carrots are rich in beta-carotene and are good for eye health.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Broccoli',
    note: 'Broccoli is a nutritious vegetable with high fiber content.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Grapes',
    note: 'Grapes are sweet and packed with antioxidants.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Strawberries',
    note: 'Strawberries are delicious berries rich in vitamin C.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Watermelon',
    note: 'Watermelon is a hydrating and refreshing fruit.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Mango',
    note: 'Mangoes are tropical fruits with a sweet and juicy taste.',
  },
  {
    id: nanoid(),
    category: 'Fruits and vegetables',
    name: 'Pineapple',
    note: 'Pineapple is a tropical fruit known for its sweet and tangy flavor.',
  },

  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Chicken leg box',
    note: 'Chicken legs are a popular cut of poultry.',
  },
  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Chicken breast',
    note: 'Chicken breast is a lean source of protein.',
  },
  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Salmon fillets',
    note: 'Salmon is rich in omega-3 fatty acids and protein.',
  },
  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Tuna steaks',
    note: 'Tuna steaks are a nutritious and delicious seafood option.',
  },
  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Shrimp',
    note: 'Shrimp are versatile shellfish used in various recipes.',
  },
  {
    id: nanoid(),
    category: 'Meat and fish',
    name: 'Salmon burgers',
    note: 'Salmon burgers are a tasty alternative to traditional beef burgers.',
  },

  { id: nanoid(), category: 'Beverages', name: 'Water', note: 'Staying hydrated is essential for overall health.' },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Coffee',
    note: 'Coffee is a popular caffeinated beverage enjoyed worldwide.',
  },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Tea',
    note: 'Tea is a soothing and diverse beverage with various flavors.',
  },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Orange juice',
    note: 'Orange juice is a refreshing and vitamin C-rich drink.',
  },
  { id: nanoid(), category: 'Beverages', name: 'Soda', note: 'Soda is a carbonated beverage with various flavors.' },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Beer',
    note: 'Beer is an alcoholic beverage enjoyed in many cultures.',
  },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Wine',
    note: 'Wine is a classic alcoholic beverage with a wide range of varieties.',
  },
  { id: nanoid(), category: 'Beverages', name: 'Milk', note: 'Milk is a nutritious dairy product rich in calcium.' },
  {
    id: nanoid(),
    category: 'Beverages',
    name: 'Smoothies',
    note: 'Smoothies are blended beverages made with fruits and other ingredients.',
  },
]

const MONTH_MS = 1000 * 60 * 60 * 24 * 30

const lists: List[] = [
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
    state: 'active',
    createdAt: Date.now() - MONTH_MS * 0.1,
  },
]

const purchases: Purchase[] = [
  { listId: lists[0].id, itemId: items[2].id, amount: 2, isCompleted: true },
  { listId: lists[0].id, itemId: items[10].id, amount: 3, isCompleted: true },
  { listId: lists[0].id, itemId: items[22].id, amount: 1, isCompleted: true },

  { listId: lists[0].id, itemId: items[2].id, amount: 2, isCompleted: true },
  { listId: lists[0].id, itemId: items[5].id, amount: 1, isCompleted: false },
  { listId: lists[0].id, itemId: items[15].id, amount: 2, isCompleted: true },
  { listId: lists[0].id, itemId: items[8].id, amount: 1, isCompleted: true },
  { listId: lists[0].id, itemId: items[14].id, amount: 2, isCompleted: false },

  { listId: lists[1].id, itemId: items[18].id, amount: 4, isCompleted: true },
  { listId: lists[1].id, itemId: items[5].id, amount: 1, isCompleted: true },
  { listId: lists[1].id, itemId: items[1].id, amount: 3, isCompleted: true },
  { listId: lists[1].id, itemId: items[20].id, amount: 2, isCompleted: true },

  { listId: lists[2].id, itemId: items[28].id, amount: 4, isCompleted: true },
  { listId: lists[2].id, itemId: items[14].id, amount: 2, isCompleted: true },

  { listId: lists[3].id, itemId: items[12].id, amount: 2, isCompleted: true },
  { listId: lists[3].id, itemId: items[30].id, amount: 1, isCompleted: false },
  { listId: lists[3].id, itemId: items[20].id, amount: 3, isCompleted: false },
  { listId: lists[3].id, itemId: items[19].id, amount: 1, isCompleted: true },
  { listId: lists[3].id, itemId: items[15].id, amount: 2, isCompleted: false },
  { listId: lists[3].id, itemId: items[27].id, amount: 2, isCompleted: true },
]

export const SEED: AppState = {
  items,
  lists,
  purchases,
}
