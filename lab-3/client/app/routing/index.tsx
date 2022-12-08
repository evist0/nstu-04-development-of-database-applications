import React from 'react'

import { AdminRoot } from '/client/app/routing/admin-root'

import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import { AuthenticatedRoot } from './authenticated-root'
import { UnauthenticatedRoot } from './unauthenticated-root'

const RolesPage = loadable(() => import('/client/pages/admin/roles'))

const IndexPage = loadable(() => import('/client/pages'))

const SignInPage = loadable(() => import('/client/pages/sign-in'))
const SignUpPage = loadable(() => import('/client/pages/sign-up'))

const NotFoundPage = loadable(() => import('/client/pages/404'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoot />,
    children: [
      {
        path: '/',
        element: <IndexPage />
      },
      {
        path: 'admin',
        element: <AdminRoot />,
        children: [
          {
            path: 'roles',
            element: <RolesPage />
          }
        ]
      }
    ]
  },
  {
    path: 'authentication',
    element: <UnauthenticatedRoot />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />
      },
      {
        path: 'sign-up',
        element: <SignUpPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]

export const router = createBrowserRouter(routes)
