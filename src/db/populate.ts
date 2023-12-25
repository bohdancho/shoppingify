import { db } from '.'

export async function populate() {
  const fruitsAndVegetablesId = await db.categories.add({ name: 'Fruits and vegetables' })
  const meatAndFishId = await db.categories.add({ name: 'Meat and fish' })
  const beveragesId = await db.categories.add({ name: 'Beverages' })

  const itemsIds = await db.items.bulkAdd(
    [
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Avocado',
        note: 'The avocado (Persea americana) is a medium-sized, evergreen tree in the laurel family (Lauraceae). It is native to the Americas and was first domesticated in Mesoamerica more than 5,000 years ago',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Banana',
        note: 'Bananas are one of the most popular fruits worldwide. They are a good source of essential nutrients.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Apple',
        note: 'Apples are a rich source of antioxidants and dietary fiber.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Orange',
        note: 'Oranges are known for their high vitamin C content and citrusy flavor.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Tomato',
        note: 'Tomatoes are versatile and are used in various culinary dishes.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Potato',
        note: 'Potatoes are a staple food and are rich in carbohydrates.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Onion',
        note: 'Onions add flavor to many dishes and are a good source of vitamins.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Garlic',
        note: 'Garlic is known for its distinct flavor and potential health benefits.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Cucumber',
        note: 'Cucumbers are low in calories and a good source of hydration.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Lettuce',
        note: 'Lettuce is a leafy green vegetable commonly used in salads.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Carrot',
        note: 'Carrots are rich in beta-carotene and are good for eye health.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Broccoli',
        note: 'Broccoli is a nutritious vegetable with high fiber content.',
      },
      { categoryId: fruitsAndVegetablesId, name: 'Grapes', note: 'Grapes are sweet and packed with antioxidants.' },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Strawberries',
        note: 'Strawberries are delicious berries rich in vitamin C.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Watermelon',
        note: 'Watermelon is a hydrating and refreshing fruit.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Mango',
        note: 'Mangoes are tropical fruits with a sweet and juicy taste.',
      },
      {
        categoryId: fruitsAndVegetablesId,
        name: 'Pineapple',
        note: 'Pineapple is a tropical fruit known for its sweet and tangy flavor.',
      },

      { categoryId: meatAndFishId, name: 'Chicken leg box', note: 'Chicken legs are a popular cut of poultry.' },
      { categoryId: meatAndFishId, name: 'Chicken breast', note: 'Chicken breast is a lean source of protein.' },
      { categoryId: meatAndFishId, name: 'Salmon fillets', note: 'Salmon is rich in omega-3 fatty acids and protein.' },
      {
        categoryId: meatAndFishId,
        name: 'Tuna steaks',
        note: 'Tuna steaks are a nutritious and delicious seafood option.',
      },
      { categoryId: meatAndFishId, name: 'Shrimp', note: 'Shrimp are versatile shellfish used in various recipes.' },
      {
        categoryId: meatAndFishId,
        name: 'Salmon burgers',
        note: 'Salmon burgers are a tasty alternative to traditional beef burgers.',
      },

      { categoryId: beveragesId, name: 'Water', note: 'Staying hydrated is essential for overall health.' },
      { categoryId: beveragesId, name: 'Coffee', note: 'Coffee is a popular caffeinated beverage enjoyed worldwide.' },
      { categoryId: beveragesId, name: 'Tea', note: 'Tea is a soothing and diverse beverage with various flavors.' },
      { categoryId: beveragesId, name: 'Orange juice', note: 'Orange juice is a refreshing and vitamin C-rich drink.' },
      { categoryId: beveragesId, name: 'Soda', note: 'Soda is a carbonated beverage with various flavors.' },
      { categoryId: beveragesId, name: 'Beer', note: 'Beer is an alcoholic beverage enjoyed in many cultures.' },
      {
        categoryId: beveragesId,
        name: 'Wine',
        note: 'Wine is a classic alcoholic beverage with a wide range of varieties.',
      },
      { categoryId: beveragesId, name: 'Milk', note: 'Milk is a nutritious dairy product rich in calcium.' },
      {
        categoryId: beveragesId,
        name: 'Smoothies',
        note: 'Smoothies are blended beverages made with fruits and other ingredients.',
      },
    ],
    { allKeys: true },
  )

  const MONTH_MS = 1000 * 60 * 60 * 24 * 30
  const listsIds = await db.lists.bulkAdd(
    [
      {
        name: 'Grocery List',
        state: 'cancelled',
        creationDate: Date.now() - MONTH_MS,
      },
      {
        name: 'Board game week 2',
        state: 'completed',
        creationDate: Date.now() - MONTH_MS * 1.5,
      },
      {
        name: "Eero's farewall party",
        state: 'completed',
        creationDate: Date.now() - MONTH_MS * 0.2,
      },
      {
        // name: 'Grocery List',
        state: 'active',
        creationDate: Date.now() - MONTH_MS * 0.1,
      },
    ],
    { allKeys: true },
  )

  await db.purchases.bulkAdd([
    { listId: listsIds[0], itemId: itemsIds[2], amount: 2, isCompleted: true },
    { listId: listsIds[0], itemId: itemsIds[10], amount: 3, isCompleted: true },
    { listId: listsIds[0], itemId: itemsIds[22], amount: 1, isCompleted: true },

    { listId: listsIds[0], itemId: itemsIds[2], amount: 2, isCompleted: true },
    { listId: listsIds[0], itemId: itemsIds[5], amount: 1, isCompleted: false },
    { listId: listsIds[0], itemId: itemsIds[15], amount: 2, isCompleted: true },
    { listId: listsIds[0], itemId: itemsIds[8], amount: 1, isCompleted: true },
    { listId: listsIds[0], itemId: itemsIds[14], amount: 2, isCompleted: false },

    { listId: listsIds[1], itemId: itemsIds[18], amount: 4, isCompleted: true },
    { listId: listsIds[1], itemId: itemsIds[5], amount: 1, isCompleted: true },
    { listId: listsIds[1], itemId: itemsIds[1], amount: 3, isCompleted: true },
    { listId: listsIds[1], itemId: itemsIds[20], amount: 2, isCompleted: true },

    { listId: listsIds[2], itemId: itemsIds[28], amount: 4, isCompleted: true },
    { listId: listsIds[2], itemId: itemsIds[14], amount: 2, isCompleted: true },

    { listId: listsIds[3], itemId: itemsIds[12], amount: 2, isCompleted: true },
    { listId: listsIds[3], itemId: itemsIds[30], amount: 1, isCompleted: false },
    { listId: listsIds[3], itemId: itemsIds[20], amount: 3, isCompleted: false },
    { listId: listsIds[3], itemId: itemsIds[19], amount: 1, isCompleted: true },
    { listId: listsIds[3], itemId: itemsIds[15], amount: 2, isCompleted: false },
    { listId: listsIds[3], itemId: itemsIds[27], amount: 2, isCompleted: true },
  ])
}
