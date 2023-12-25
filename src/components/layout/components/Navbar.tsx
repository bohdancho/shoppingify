import { Link } from '@tanstack/react-router'
import { FormatListBulletedRounded, InsertChartOutlinedRounded, ReplayRounded } from '@mui/icons-material'

export function Navbar() {
  return (
    <nav className='relative flex w-full flex-col items-center gap-14'>
      <Link to='/' className='text-zink-700 flex h-14 items-center'>
        <FormatListBulletedRounded />
      </Link>
      <Link to='/history' className='text-zink-700 peer flex h-14 items-center'>
        <ReplayRounded />
      </Link>
      <Link to='/statistics' className='text-zink-700 peer flex h-14 items-center'>
        <InsertChartOutlinedRounded />
      </Link>
      <div className='absolute left-0 top-0 h-14 w-[6px] rounded-br rounded-tr bg-amber-500 transition-all ease-out peer-[.active:nth-child(2)]:top-1/2 peer-[.active:nth-child(3)]:top-full peer-[.active:nth-child(2)]:-translate-y-1/2 peer-[.active:nth-child(3)]:-translate-y-full'></div>
    </nav>
  )
}
