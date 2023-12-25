import './App.css'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, resetDatabase } from './db'

export function App() {
  const items = useLiveQuery(() => db.items.toArray())
  return (
    <div className='h-screen w-screen bg-slate-800 text-center text-white'>
      <h1>Vite + React</h1>
      <div className='card'>it works!</div>
      <button onClick={resetDatabase}>reset</button>
      {items?.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  )
}
