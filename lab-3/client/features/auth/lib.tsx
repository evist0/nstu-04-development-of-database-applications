import type { FC } from 'react'
import React from 'react'

import { useViewer } from '/client/entities/viewer'
import { useIsAccountsReady } from '/client/shared/lib/meteor-utils'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import type { LoadableComponent } from '@loadable/component'
import { Navigate, useLocation } from 'react-router-dom'

type Props = Record<string, unknown>
type Component = FC<Props> | LoadableComponent<Props>

export const LOCATION_STATE_REDIRECT = 'redirect'

export const withAuth = (Component: Component, loginRedirect = '/login') => {
  const WrappedComponent = (props: Record<string, unknown>) => {
    const isAccountsReady = useIsAccountsReady()
    const viewer = useViewer()
    const location = useLocation()

    if (!isAccountsReady) {
      return <LoadingLayout />
    }

    if (!viewer) {
      return <Navigate to={loginRedirect} state={{ [LOCATION_STATE_REDIRECT]: location }} replace />
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = 'withAuth'

  return WrappedComponent
}
