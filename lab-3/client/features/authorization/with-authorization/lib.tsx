import type { FC } from 'react'
import React from 'react'

import { useViewer } from '/client/entities/viewer'
import type { User } from '/client/shared/api'
import { useIsAccountsReady } from '/client/shared/lib/meteor-utils'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import type { RolesEnum } from '/imports/entities/roles'

import type { LoadableComponent } from '@loadable/component'
import { Navigate } from 'react-router-dom'

type Props = Record<string, unknown>
type Component = FC<Props> | LoadableComponent<Props>

export type WithAuthorizationOptions = {
  predicate: (roles: RolesEnum[] | null) => boolean
  redirectTo: string
}

export const withAuthorization = (Component: Component, options: WithAuthorizationOptions) => {
  const { predicate, redirectTo } = options

  const WrappedComponent = (props: Record<string, unknown>) => {
    const isAccountsReady = useIsAccountsReady()
    const viewer = useViewer() as User

    const roles = Roles.getRolesForUser(viewer._id)

    if (!isAccountsReady) {
      return <LoadingLayout />
    }

    return predicate(roles as RolesEnum[] | null) ? <Component {...props} /> : <Navigate to={redirectTo} replace />
  }

  WrappedComponent.displayName = 'withAuthorization'

  return WrappedComponent
}
