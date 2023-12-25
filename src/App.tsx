import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import { router } from './router'

export const acme = 1
export function App() {
  return <RouterProvider router={router} />
}
