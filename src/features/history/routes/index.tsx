import { Route } from '@tanstack/react-router'
import { rootRoute } from '~/router'

export const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: () => {
    return <div className='p-2'>History route</div>
  },
})
