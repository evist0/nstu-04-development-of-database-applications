import React from 'react'
import { AuthLayout } from '/client/shared/ui/auth-layout';
import { LoginForm } from '/client/features/login'

const LoginPage = () => <AuthLayout content={<LoginForm/>}/>

export default LoginPage