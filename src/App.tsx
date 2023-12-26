import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import { router } from './router'
import { Evolu } from './db/evolu'

export function App() {
  return (
    <>
      <Evolu />
      <RouterProvider router={router} />
    </>
  )
}
