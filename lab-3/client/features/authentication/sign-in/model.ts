import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { object, string } from 'yup'

export const FIELD_NAME_USERNAME = 'username'
export const FIELD_NAME_PASSWORD = 'password'

const schema = object({
  [FIELD_NAME_USERNAME]: string().required('Введите имя пользователя'),
  [FIELD_NAME_PASSWORD]: string().required('Введите пароль')
})

export type SignInData = InferType<typeof schema>

export const defaultValues: SignInData = {
  [FIELD_NAME_USERNAME]: '',
  [FIELD_NAME_PASSWORD]: ''
}

export const resolver = yupResolver(schema)
