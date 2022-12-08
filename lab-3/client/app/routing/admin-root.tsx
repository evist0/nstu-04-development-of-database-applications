import React from 'react'

import { withAuthorization } from '/client/features/authorization/with-authorization'
import type { WithAuthorizationOptions } from '/client/features/authorization/with-authorization/lib'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import { RolesEnum } from '/common/entities/roles'

import { Outlet, useNavigation } from 'react-router-dom'

const isAdminPredicate: WithAuthorizationOptions['predicate'] = (roles) =>
  roles ? roles.some((role) => role === RolesEnum.Admin) : false

export const AdminRoot = withAuthorization(
  () => {
    const navigation = useNavigation()

    // TODO: вынести проверку loading, т.к. она используется аж в трёх местах
    if (navigation.state === 'loading') {
      return <LoadingLayout />
    }

    return <Outlet />
  },
  { predicate: isAdminPredicate, redirectTo: '/404' }
)
