import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import { router } from './router'
import { db } from './rxdb/db'

export function App() {
  void db.categories.find().exec().then(console.log)
  return <RouterProvider router={router} />
}
