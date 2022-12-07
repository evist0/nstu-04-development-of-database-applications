import type { FC } from 'react'
import React from 'react'

import { LoginForm } from '/client/features/auth'
import { LOCATION_STATE_REDIRECT } from '/client/features/auth/lib'
import { AuthLayout } from '/client/shared/ui/auth-layout'

import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  redirectAfter?: string
}
const LoginPage: FC<Props> = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onLogin = () => {
    const redirect = location.state[LOCATION_STATE_REDIRECT]

    if (redirect) {
      navigate(redirect)
    }
  }

  return <AuthLayout content={<LoginForm onLogin={onLogin} />} />
}

export default LoginPage
