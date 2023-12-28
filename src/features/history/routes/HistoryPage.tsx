import { useObservableGetState } from 'observable-hooks'
import { map } from 'rxjs'
import { type ListDocument, db } from '~/db'
import dayjs from 'dayjs'
import { EventNoteRounded, KeyboardArrowRightRounded } from '@mui/icons-material'
import { cn } from '~/utils'
import { Link } from '@tanstack/react-router'

export function HistoryPage() {
  const history = useHistory()
  return (
    <>
      <h1 className='mb-7 text-xl'>Shopping history</h1>
      <ul>
        {history?.map(({ monthYear, lists }) => (
          <li className='mb-7 last:mb-0' key={monthYear}>
            <h2 className='mb-4 text-xs'>{monthYear}</h2>
            <ul>
              {lists.map((list) => (
                <li className='mb-6 grid grid-cols-[1fr_min-content_min-content] items-start gap-y-1 rounded-xl bg-white p-3 shadow last:mb-0'>
                  <span className='text-sm'>{list.name}</span>
                  <div className='row-start-2 text-stone-300'>
                    <EventNoteRounded className='mr-1' />
                    <span className='mr-2 whitespace-nowrap text-xs'>
                      {dayjs(list.createdAt).format('ddd D.M.YYYY')}
                    </span>
                  </div>
                  <div
                    className={cn(
                      {
                        'border-cyan-300 text-cyan-300': list.state === 'completed',
                        'border-rose-500 text-rose-500': list.state === 'cancelled',
                      },
                      'mx-1 min-w-[10.3ch] rounded-lg border px-[.5em] text-center text-xs leading-[1.9em]',
                    )}
                  >
                    {list.state}
                  </div>
                  <Link className='flex items-start'>
                    <KeyboardArrowRightRounded className='text-amber-500' />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

function useHistory() {
  const history$ = db.lists.find({ selector: { state: { $not: 'active' } }, sort: [{ createdAt: 'desc' }] }).$.pipe(
    map((lists) => {
      const history: { monthYear: string; lists: ListDocument[] }[] = []
      lists.forEach((list) => {
        if (!list.createdAt) throw Error('All lists that are not active must have a creation date')
        const monthYear = dayjs(list.createdAt).format('MMMM YYYY')
        const last = history.at(-1)
        if (last && last.monthYear === monthYear) {
          last.lists.push(list)
          return
        }
        history.push({ monthYear, lists: [list] })
      })
      return history
    }),
  )
  return useObservableGetState(history$, undefined)
}
