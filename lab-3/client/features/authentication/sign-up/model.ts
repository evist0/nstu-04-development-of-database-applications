import type { CreateUser } from '/client/shared/api'

import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { object, string } from 'yup'

export const FIELD_NAME_USERNAME = 'username'
export const FIELD_NAME_EMAIL = 'email'
export const FIELD_NAME_PASSWORD = 'password'
export const FIELD_NAME_NAME = 'name'
export const FIELD_NAME_SURNAME = 'surname'
export const FIELD_NAME_PATRONYMIC = 'patronymic'
export const FIELD_NAME_PASSPORT = 'passport'
export const FIELD_NAME_ADDRESS = 'address'
export const FIELD_NAME_PHONE = 'phone'

const schema = object({
  [FIELD_NAME_USERNAME]: string().required('Это поле необходимо'),
  [FIELD_NAME_EMAIL]: string().required('Это поле необходимо'),
  [FIELD_NAME_PASSWORD]: string().required('Это поле необходимо'),
  [FIELD_NAME_NAME]: string().required('Это поле необходимо'),
  [FIELD_NAME_SURNAME]: string().required('Это поле необходимо'),
  [FIELD_NAME_PATRONYMIC]: string().required('Это поле необходимо'),
  [FIELD_NAME_PASSPORT]: string().required('Это поле необходимо'),
  [FIELD_NAME_ADDRESS]: string().required('Это поле необходимо'),
  [FIELD_NAME_PHONE]: string().required('Это поле необходимо')
})

export type SignUpData = InferType<typeof schema>

export const defaultValues: SignUpData = {
  [FIELD_NAME_USERNAME]: '',
  [FIELD_NAME_EMAIL]: '',
  [FIELD_NAME_PASSWORD]: '',
  [FIELD_NAME_NAME]: '',
  [FIELD_NAME_SURNAME]: '',
  [FIELD_NAME_PATRONYMIC]: '',
  [FIELD_NAME_PASSPORT]: '',
  [FIELD_NAME_ADDRESS]: '',
  [FIELD_NAME_PHONE]: ''
}

export const resolver = yupResolver(schema)

export const transformPayload = (payload: SignUpData): CreateUser => {
  return {
    [FIELD_NAME_USERNAME]: payload[FIELD_NAME_USERNAME],
    [FIELD_NAME_EMAIL]: payload[FIELD_NAME_EMAIL],
    [FIELD_NAME_PASSWORD]: payload[FIELD_NAME_PASSWORD],
    profile: {
      [FIELD_NAME_NAME]: payload[FIELD_NAME_NAME],
      [FIELD_NAME_SURNAME]: payload[FIELD_NAME_SURNAME],
      [FIELD_NAME_PATRONYMIC]: payload[FIELD_NAME_PATRONYMIC],
      [FIELD_NAME_PASSPORT]: payload[FIELD_NAME_PASSPORT],
      [FIELD_NAME_ADDRESS]: payload[FIELD_NAME_ADDRESS],
      [FIELD_NAME_PHONE]: payload[FIELD_NAME_PHONE]
    }
  }
}
