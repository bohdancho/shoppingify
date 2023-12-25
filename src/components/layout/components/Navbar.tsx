import { Link } from '@tanstack/react-router'
import { FormatListBulletedRounded, InsertChartOutlinedRounded, ReplayRounded } from '@mui/icons-material'

export function Navbar({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className='relative flex w-full flex-col items-center gap-14'>
      <Link
        to='/'
        className='text-zink-700 flex h-16 w-16 items-center justify-center [&.active]:pointer-events-none'
        onClick={onNavigate}
      >
        <FormatListBulletedRounded />
      </Link>
      <Link
        to='/history'
        className='text-zink-700 peer flex h-16 w-16 items-center justify-center [&.active]:pointer-events-none'
        onClick={onNavigate}
      >
        <ReplayRounded />
      </Link>
      <Link
        to='/statistics'
        className='text-zink-700 peer flex h-16 w-16 items-center justify-center [&.active]:pointer-events-none'
        onClick={onNavigate}
      >
        <InsertChartOutlinedRounded />
      </Link>
      <div className='pointer-events-none absolute left-0 top-0 h-14 w-[6px] rounded-br rounded-tr bg-amber-500 transition-all ease-out peer-[.active:nth-child(2)]:top-1/2 peer-[.active:nth-child(3)]:top-full peer-[.active:nth-child(2)]:-translate-y-1/2 peer-[.active:nth-child(3)]:-translate-y-full'></div>
    </nav>
  )
}
