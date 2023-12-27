import { Route } from '@tanstack/react-router'
import { rootRoute } from '~/router'
import { ItemsPage } from './ItemsPage'

export const itemsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/items',
  component: ItemsPage,
})
