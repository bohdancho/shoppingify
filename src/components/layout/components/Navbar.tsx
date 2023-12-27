import { Link } from '@tanstack/react-router'
import { FormatListBulletedRounded, InsertChartOutlinedRounded, ReplayRounded } from '@mui/icons-material'

export function Navbar() {
  return (
    <nav className='relative flex w-full flex-col items-center gap-8'>
      <Link
        search={{ isActiveListOpen: false }}
        activeOptions={{ includeSearch: false }}
        to='/items'
        className='flex h-16 w-16 items-center justify-center text-zinc-700 [&.active]:pointer-events-none'
      >
        <FormatListBulletedRounded />
      </Link>
      <Link
        search={{ isActiveListOpen: false }}
        activeOptions={{ includeSearch: false }}
        to='/history'
        className='peer flex h-16 w-16 items-center justify-center text-zinc-700 [&.active]:pointer-events-none'
      >
        <ReplayRounded />
      </Link>
      <Link
        search={{ isActiveListOpen: false }}
        activeOptions={{ includeSearch: false }}
        to='/statistics'
        className='peer flex h-16 w-16 items-center justify-center text-zinc-700 [&.active]:pointer-events-none'
      >
        <InsertChartOutlinedRounded />
      </Link>
      <div className='pointer-events-none absolute left-0 top-0 h-14 w-[6px] rounded-br rounded-tr bg-amber-500 transition-all ease-out peer-[.active:nth-child(2)]:top-1/2 peer-[.active:nth-child(3)]:top-full peer-[.active:nth-child(2)]:-translate-y-1/2 peer-[.active:nth-child(3)]:-translate-y-full'></div>
    </nav>
  )
}
