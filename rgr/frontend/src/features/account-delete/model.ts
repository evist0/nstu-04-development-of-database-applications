import { useSWRConfig } from 'swr'

import type { RemoveAccountPayload } from 'shared/api/clients'
import { removeAccount } from 'shared/api/clients'

export const useRemoveAccount = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (clientId: string, payload: RemoveAccountPayload) => {
    await mutate(`/clients/${clientId}`, removeAccount(payload), { rollbackOnError: true })
  }

  return { trigger }
}
