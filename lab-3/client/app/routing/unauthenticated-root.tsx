import React from 'react'

import { withoutAuthentication } from '/client/features/authentication/with-authentication'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import { Outlet, useNavigation } from 'react-router-dom'

export const UnauthenticatedRoot = withoutAuthentication(
  () => {
    const navigation = useNavigation()

    if (navigation.state === 'loading') {
      return <LoadingLayout />
    }

    return <Outlet />
  },
  { redirectTo: '/' }
)
