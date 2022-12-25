import { Outlet, useNavigation } from 'react-router-dom'

import { DefaultLayout } from 'shared/ui/default-layout'
import { LoadingLayout } from 'shared/ui/loading-layout'

const NAVIGATION = [
  {
    path: '/clients',
    name: 'Клиенты'
  },
  {
    path: '/tariffs',
    name: 'Тарифы'
  }
]

export const AuthenticatedRoot = () => {
  const navigation = useNavigation()

  if (navigation.state === 'loading') {
    return <LoadingLayout />
  }

  return (
    <DefaultLayout navigation={NAVIGATION}>
      <Outlet />
    </DefaultLayout>
  )
}
