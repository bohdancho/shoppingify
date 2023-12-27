import { Route } from '@tanstack/react-router'
import { rootRoute } from '~/router'

export const itemsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/items',
  component: () => {
    return <div className='p-2'>Items route</div>
  },
})
