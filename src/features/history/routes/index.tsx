import { Route } from '@tanstack/react-router'
import { rootRoute } from '~/router'
import { HistoryPage } from './HistoryPage'

export const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
})
