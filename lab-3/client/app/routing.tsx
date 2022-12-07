import React from 'react'

import { withAuth } from '/client/features/auth/lib'

import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const IndexPage = withAuth(loadable(() => import('/client/pages')))
const LoginPage = loadable(() => import('/client/pages/login'))
const RolesPage = withAuth(loadable(() => import('/client/pages/admin/roles')))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'admin',
    children: [
      {
        path: 'roles',
        element: <RolesPage />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
