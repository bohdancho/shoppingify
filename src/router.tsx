import { Outlet, RootRoute, Router } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Layout } from './components/layout/Layout'
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

const indexRoute = itemsRoute
const routeTree = rootRoute.addChildren([indexRoute, historyRoute, statisticsRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
