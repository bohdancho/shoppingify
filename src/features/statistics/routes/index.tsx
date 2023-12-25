import { Route } from '@tanstack/react-router'
import { rootRoute } from '~/router'

export const statisticsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/statistics',
  component: () => {
    return <div className='p-2'>Statistics route</div>
  },
})
