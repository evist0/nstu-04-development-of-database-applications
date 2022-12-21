import React from 'react'

import { SignOutButton } from '/client/features/authentication/sign-out'
import { withAuthentication } from '/client/features/authentication/with-authentication'
import { DefaultLayout } from '/client/shared/ui/default-layout'
import { LoadingLayout } from '/client/shared/ui/loading-layout'

import { Outlet, useNavigation } from 'react-router-dom'

const NAVIGATION = [
  {
    path: '/users',
    name: 'Пользователи'
  },
  {
    path: '/tariffs',
    name: 'Тарифы'
  },
  {
    path: '/deposits',
    name: 'Счета'
  }
]

export const AuthenticatedRoot = withAuthentication(
  () => {
    const navigation = useNavigation()

    if (navigation.state === 'loading') {
      return <LoadingLayout />
    }

    return (
      <DefaultLayout profile={<SignOutButton />} navigation={NAVIGATION}>
        <Outlet />
      </DefaultLayout>
    )
  },
  { redirectTo: '/authentication/sign-in' }
)
