import React from 'react'

import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AuthenticatedRoot } from './authenticated-root'
import { UnauthenticatedRoot } from './unauthenticated-root'

const UsersPage = loadable(() => import('/client/pages/users'))
const TariffsPage = loadable(() => import('/client/pages/tariffs'))
const DepositsPage = loadable(() => import('/client/pages/deposits'))

const SignInPage = loadable(() => import('/client/pages/authentication/sign-in'))

const NotFoundPage = loadable(() => import('/client/pages/404'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoot />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/users'} replace />
      },
      {
        path: 'users',
        element: <UsersPage />
      },
      {
        path: 'tariffs',
        element: <TariffsPage />
      },
      {
        path: 'deposits',
        element: <DepositsPage />
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
