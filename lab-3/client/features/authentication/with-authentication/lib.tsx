import type { FC } from 'react'
import React from 'react'

import { useViewer } from '/client/entities/viewer'
import type { User } from '/client/shared/api'
import { useIsAccountsReady } from '/client/shared/lib/meteor-utils'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import type { LoadableComponent } from '@loadable/component'
import { Navigate, useLocation } from 'react-router-dom'

type Props = Record<string, unknown>
type Component = FC<Props> | LoadableComponent<Props>

export const LOCATION_STATE_REDIRECT = 'redirect'

type Options = {
  predicate: (user: User | null) => boolean
  redirectTo: string
}

export const withAuthenticationPredicateRedirect = (Component: Component, options: Options) => {
  const { predicate, redirectTo } = options

  const WrappedComponent = (props: Record<string, unknown>) => {
    const isAccountsReady = useIsAccountsReady()
    const viewer = useViewer()
    const location = useLocation()

    if (!isAccountsReady) {
      return <LoadingLayout />
    }

    return predicate(viewer) ? (
      <Component {...props} />
    ) : (
      <Navigate to={redirectTo} state={{ [LOCATION_STATE_REDIRECT]: location }} replace />
    )
  }

  WrappedComponent.displayName = 'withAuthentication'

  return WrappedComponent
}

export const withAuthentication = (Component: Component, options: Pick<Options, 'redirectTo'>) => {
  const requireAuthenticated: Options['predicate'] = (viewer) => !!viewer

  return withAuthenticationPredicateRedirect(Component, {
    predicate: requireAuthenticated,
    ...(options || {})
  })
}

export const withoutAuthentication = (Component: Component, options: Pick<Options, 'redirectTo'>) => {
  const requireNonAuthenticated: Options['predicate'] = (viewer) => !viewer

  return withAuthenticationPredicateRedirect(Component, {
    predicate: requireNonAuthenticated,
    ...(options || {})
  })
}
