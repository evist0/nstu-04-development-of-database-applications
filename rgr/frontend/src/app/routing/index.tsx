import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AuthenticatedRoot } from './authenticated-root'

const ClientsPage = loadable(() => import('pages/clients'))
const TariffsPage = loadable(() => import('pages/tariffs'))

const NotFoundPage = loadable(() => import('pages/404'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoot />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/clients'} replace />
      },
      {
        path: 'clients',
        element: <ClientsPage />
      },
      {
        path: 'tariffs',
        element: <TariffsPage />
      }
    ]
  },
  {
    path: '404',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <Navigate to={'/404'} replace />
  }
]

export const router = createBrowserRouter(routes)
