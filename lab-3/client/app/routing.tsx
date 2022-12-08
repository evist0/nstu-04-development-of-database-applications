import React from 'react'

import { withAuthentication } from '/client/features/authentication/with-authentication'

import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const IndexPage = withAuthentication(loadable(() => import('/client/pages')))
const RolesPage = withAuthentication(loadable(() => import('/client/pages/admin/roles')))
const SignInPage = loadable(() => import('/client/pages/sign-in'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: 'admin',
    children: [
      {
        path: 'roles',
        element: <RolesPage />
      }
    ]
  },
  {
    path: 'sign-in',
    element: <SignInPage />
  }
]

export const router = createBrowserRouter(routes)
