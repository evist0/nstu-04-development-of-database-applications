import { yupResolver } from '@hookform/resolvers/yup'
import type { InferType } from 'yup'
import { object } from 'yup'

export const FIELD_NAME_TARIFF = 'tariff'

const schema = object({
  [FIELD_NAME_TARIFF]: object().nullable(true).required('Это поле обязательно')
})

export type RawPayload = InferType<typeof schema>

export type Payload = { tariffId: string }

export const transformPayload = (rawPayload: RawPayload): Payload => ({
  tariffId: rawPayload.tariff.id ?? ''
})

export const resolver = yupResolver(schema)

export const defaultValues: RawPayload = {
  [FIELD_NAME_TARIFF]: null
} as unknown as RawPayload
