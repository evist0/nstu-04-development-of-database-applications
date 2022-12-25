import { useSWRConfig } from 'swr'

import type { CreateClientPayload } from 'shared/api/clients'
import { createClient } from 'shared/api/clients'

export const useClientCreate = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (payload: CreateClientPayload) => {
    await mutate('/clients', createClient(payload), { rollbackOnError: true })
  }

  return { trigger }
}
