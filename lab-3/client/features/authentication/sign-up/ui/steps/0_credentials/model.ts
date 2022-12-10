import type { SignUpPayload } from '/client/shared/api'

import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { object, ref, string } from 'yup'

export const FIELD_NAME_USERNAME = 'username'
export const FIELD_NAME_EMAIL = 'email'
export const FIELD_NAME_PASSWORD = 'password'
export const FIELD_NAME_PASSWORD_REPEAT = 'passwordRepeat'

const schema = object({
  [FIELD_NAME_USERNAME]: string()
    .required('Имя пользователя обязательно')
    .min(2, 'Минимум — 2 символа')
    .max(24, 'Максимум — 24 символа')
    .matches(/[_a-zA-Z0-9-]+/, 'Только латинские символы и цифры')
    .trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_EMAIL]: string()
    .required('Электронная почта обязательна')
    .email('Электронная почта указана неверно')
    .trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_PASSWORD]: string()
    .required('Пароль обязателен')
    .min(6, 'Минимальная длина пароля — 6 символов')
    .max(50, 'Максимальная длина пароля — 50 символов')
    .trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_PASSWORD_REPEAT]: string()
    .required('Подтвердите пароль')
    .oneOf([ref(FIELD_NAME_PASSWORD)], 'Введённые пароли должны совпадать')
})

export type RawPayload = InferType<typeof schema>
export type Payload = Omit<RawPayload, 'passwordRepeat'>

export const transformPayload = (payload: RawPayload): Payload => ({
  [FIELD_NAME_USERNAME]: payload[FIELD_NAME_USERNAME],
  [FIELD_NAME_EMAIL]: payload[FIELD_NAME_EMAIL],
  [FIELD_NAME_PASSWORD]: payload[FIELD_NAME_PASSWORD]
})

export const resolver = yupResolver(schema)

export const getDefaultValues = (state: Partial<SignUpPayload>) => ({
  [FIELD_NAME_USERNAME]: state[FIELD_NAME_USERNAME] ?? '',
  [FIELD_NAME_EMAIL]: state[FIELD_NAME_EMAIL] ?? '',
  [FIELD_NAME_PASSWORD]: state[FIELD_NAME_PASSWORD] ?? '',
  [FIELD_NAME_PASSWORD_REPEAT]: state[FIELD_NAME_PASSWORD] ?? ''
})
