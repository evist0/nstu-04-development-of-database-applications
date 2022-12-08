import type { FC } from 'react'
import React from 'react'

import { SignUpForm } from '/client/features/authentication/sign-up'
import { AuthLayout } from '/client/shared/ui/auth-layout'

import { useNavigate } from 'react-router-dom'

const SignUpPage: FC = () => {
  const navigate = useNavigate()

  const onSuccess = () => {
    navigate('/')
  }

  return <AuthLayout content={<SignUpForm onSuccess={onSuccess} />} />
}

export default SignUpPage
