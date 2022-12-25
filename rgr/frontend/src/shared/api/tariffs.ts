import { fetcher } from './fetcher'
import type { Tariff } from './types'

export type GetTariffsResult = {
  tariffs: Tariff[]
}

export type CreateTariffPayload = Omit<Tariff, 'id'>

export type UpdateTariffPayload = Partial<CreateTariffPayload>

export const createTariff = (payload: CreateTariffPayload) =>
  fetcher('/tariffs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const updateTariff = (tariffId: string, payload: UpdateTariffPayload) =>
  fetcher(`/tariffs/${tariffId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const removeTariff = (tariffId: string) =>
  fetcher(`/tariffs/${tariffId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
