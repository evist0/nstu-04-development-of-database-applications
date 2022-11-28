import { LoginForm } from '/client/features/login'
import { AuthLayout } from '/client/shared/ui/auth-layout'

const LoginPage = () => <AuthLayout content={<LoginForm />} />

export default LoginPage
