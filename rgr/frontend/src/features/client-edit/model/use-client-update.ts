import { useSWRConfig } from 'swr'

import type { UpdateClientPayload } from 'shared/api/clients'
import { updateClient } from 'shared/api/clients'

export const useClientUpdate = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (clientId: string, payload: UpdateClientPayload) => {
    await mutate('/clients', updateClient(clientId, payload), { rollbackOnError: true })
  }

  return { trigger }
}
