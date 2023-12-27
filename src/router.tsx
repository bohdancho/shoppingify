import { NotFoundRoute, Outlet, RootRoute, Route, Router, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Layout } from './components/layout'
import { itemsRoute } from './features/items'
import { historyRoute } from './features/history'
import { statisticsRoute } from './features/statistics'

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
      {import.meta.env.DEV && <TanStackRouterDevtools position='top-right' />}
    </>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ navigate }) => void navigate({ to: '/items', replace: true }),
})
const routeTree = rootRoute.addChildren([indexRoute, itemsRoute, historyRoute, statisticsRoute])
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: ({ navigate }) => void navigate({ to: '/' }),
})

export const router = new Router({ routeTree, notFoundRoute })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
