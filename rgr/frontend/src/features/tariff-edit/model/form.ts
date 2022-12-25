import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { number, object, string } from 'yup'

import type { Tariff } from 'shared/api/types'

export const FIELD_NAME_NAME = 'name'
export const FIELD_NAME_ANNUAL = 'annual'
export const FIELD_NAME_TERM = 'term'

const schema = object({
  [FIELD_NAME_NAME]: string()
    .required('Это поле обязательно')
    .min(3, 'Минимум — 3 символа')
    .max(100, 'Максимум — 100 символов')
    .matches(/[а-яА-Я -]+/, 'Только русские символы')
    .trim('Без пробелов в начале и в конце'),
  [FIELD_NAME_ANNUAL]: number().required('Это поле обязательно'),
  [FIELD_NAME_TERM]: number().required('Это поле обязательно')
})

export type Payload = InferType<typeof schema>

export const resolver = yupResolver(schema)

export const getDefaultValues = (tariff: Tariff): Payload => ({
  [FIELD_NAME_NAME]: tariff.name,
  [FIELD_NAME_ANNUAL]: tariff.annual,
  [FIELD_NAME_TERM]: tariff.term
})
