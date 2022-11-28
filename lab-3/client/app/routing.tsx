import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const Index = loadable(() => import('/client/pages'))
const Login = loadable(() => import('/client/pages/login'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: 'login',
    element: <Login />
  }
]

export const router = createBrowserRouter(routes)
