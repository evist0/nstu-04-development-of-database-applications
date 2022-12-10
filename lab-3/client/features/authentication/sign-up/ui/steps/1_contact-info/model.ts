import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

export const FIELD_NAME_USERNAME = 'username'
export const FIELD_NAME_EMAIL = 'email'
export const FIELD_NAME_PASSWORD = 'password'
export const FIELD_NAME_PASSWORD_REPEAT = 'passwordRepeat'

const schema = object({
  [FIELD_NAME_USERNAME]: string().required(),
  [FIELD_NAME_EMAIL]: string().required(),
  [FIELD_NAME_PASSWORD]: string().required(),
  [FIELD_NAME_PASSWORD_REPEAT]: string().required()
})

export const resolver = yupResolver(schema)
