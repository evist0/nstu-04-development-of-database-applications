import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { object, string } from 'yup'

import type { CreateClientPayload } from 'shared/api/types'

import { parseFio } from './lib'

export const FIELD_NAME_FIO = 'fio'
export const FIELD_NAME_PHONE = 'phone'
export const FIELD_NAME_PASSPORT = 'passport'
export const FIELD_NAME_ADDRESS = 'address'

const schema = object({
  [FIELD_NAME_FIO]: string()
    .required('Это поле обязательно')
    .min(3, 'Минимум — 3 символа')
    .max(100, 'Максимум — 100 символов')
    .matches(/[а-яА-Я -]+/, 'Только русские символы')
    .matches(/[а-яА-Я -]+ [а-яА-Я -]+/, 'Введите фамилию')
    .trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_PHONE]: string().required('Телефон обязателен').trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_PASSPORT]: string().required('Паспорт обязателен').trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_ADDRESS]: string()
    .required('Адрес обязателен')
    .min(3, 'Минимум — 3 символа')
    .max(200, 'Максимум — 200 символов')
    .trim('Без пробелов в начале и в конце')
})

export type RawPayload = InferType<typeof schema>

export type Payload = Omit<RawPayload, 'fio'> & {
  name: string
  surname: string
  patronymic: string
}

export const transformPayload = (payload: RawPayload): Payload => {
  const parsedFio = parseFio(payload[FIELD_NAME_FIO])

  return {
    ...parsedFio,
    [FIELD_NAME_PHONE]: payload[FIELD_NAME_PHONE],
    [FIELD_NAME_PASSPORT]: payload[FIELD_NAME_PASSPORT],
    [FIELD_NAME_ADDRESS]: payload[FIELD_NAME_ADDRESS]
  }
}

export const resolver = yupResolver(schema)

export const getDefaultValues = (client: Partial<CreateClientPayload>): RawPayload => {
  const DEFAULT_PHONE = '+7 ('

  const name = client['name'] ?? ''
  const surname = client['surname'] ?? ''
  const patronymic = client['patronymic'] ?? ''

  const fio = `${surname} ${name} ${patronymic}`

  return {
    [FIELD_NAME_FIO]: fio,
    [FIELD_NAME_PHONE]: client[FIELD_NAME_PHONE] ?? DEFAULT_PHONE,
    [FIELD_NAME_PASSPORT]: client[FIELD_NAME_PASSPORT] ?? '',
    [FIELD_NAME_ADDRESS]: client[FIELD_NAME_ADDRESS] ?? ''
  }
}
