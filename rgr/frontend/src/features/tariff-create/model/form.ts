import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { number, object, string } from 'yup'

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

export const defaultValues = {
  [FIELD_NAME_NAME]: '',
  [FIELD_NAME_ANNUAL]: 0,
  [FIELD_NAME_TERM]: 0
}
