import { Link } from '@tanstack/react-router'
import { FormatListBulletedRounded, InsertChartOutlinedRounded, ReplayRounded } from '@mui/icons-material'
import { type CSSProperties, useRef, useState, type MouseEvent, useLayoutEffect } from 'react'

export function Navbar() {
  const wrapperRef = useRef<HTMLElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>()

  useLayoutEffect(() => handleIndicator(), [])

  function handleIndicator(event?: MouseEvent<HTMLAnchorElement>) {
    const wrapper = wrapperRef.current!
    const link = event?.currentTarget ?? wrapper.querySelector<HTMLAnchorElement>('a.active')!
    setIndicatorStyle({
      top: link.offsetTop,
    })
  }

  return (
    <nav className='relative flex w-full flex-col items-center gap-8' ref={wrapperRef}>
      {(
        [
          { to: '/items', Icon: FormatListBulletedRounded },
          { to: '/history', Icon: ReplayRounded },
          { to: '/statistics', Icon: InsertChartOutlinedRounded },
        ] as const
      ).map(({ to, Icon }) => (
        <Link
          key={to}
          search={{ isActiveListOpen: false }}
          activeOptions={{ includeSearch: false }}
          to={to}
          className='flex h-14 w-16 items-center justify-center text-zinc-700 [&.active]:pointer-events-none'
          onClick={handleIndicator}
        >
          {<Icon />}
        </Link>
      ))}
      <div
        style={indicatorStyle}
        className='pointer-events-none absolute left-0 h-14 w-[6px] rounded-br rounded-tr bg-amber-500 transition-all duration-200 ease-out'
      ></div>
    </nav>
  )
}
