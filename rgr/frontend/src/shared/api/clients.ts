import { fetcher } from './fetcher'
import type { Client } from './types'

export type GetClientsResult = {
  clients: Client[]
}

export type CreateClientPayload = Omit<Client, 'id' | 'accounts'>

export type UpdateClientPayload = Partial<CreateClientPayload>

export type CreateAccountPayload = {
  clientId: string
  tariffId: string
}

export type RemoveAccountPayload = {
  accountId: string
}

export const createClient = (payload: CreateClientPayload) =>
  fetcher('/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const updateClient = (clientId: string, payload: UpdateClientPayload) =>
  fetcher(`/clients/${clientId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const removeClient = (clientId: string) =>
  fetcher(`/clients/${clientId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const createAccount = (payload: CreateAccountPayload) =>
  fetcher('/clients/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const removeAccount = (payload: RemoveAccountPayload) =>
  fetcher('/clients/account', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
