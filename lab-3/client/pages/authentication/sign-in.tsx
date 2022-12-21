import type { FC } from 'react'
import React from 'react'

import { SignInForm } from '/client/features/authentication/sign-in'
import { LOCATION_STATE_REDIRECT } from '/client/features/authentication/with-authentication'
import { AuthLayout } from '/client/shared/ui/auth-layout'

import { useLocation, useNavigate } from 'react-router-dom'

const SignInPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onSuccess = () => {
    const redirect = location.state[LOCATION_STATE_REDIRECT]

    if (redirect) {
      navigate(redirect)
    }
  }

  return <AuthLayout content={<SignInForm onSuccess={onSuccess} />} />
}

export default SignInPage
