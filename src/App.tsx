import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import { router } from './router'
import { db } from './rxdb/db'

export function App() {
  void db.categories.find().exec().then(console.log)
  return (
    <>
      <button
        onClick={async () => {
          await db.categories.insert({ name: String(Date.now()), items: [] })
        }}
      >
        btn
      </button>
      <RouterProvider router={router} />
    </>
  )
}
