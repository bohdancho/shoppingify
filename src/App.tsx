import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import { router } from './router'

export function App() {
  return <RouterProvider router={router} />
}
