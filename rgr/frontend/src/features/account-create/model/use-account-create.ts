import { useSWRConfig } from 'swr'

import type { CreateAccountPayload } from 'shared/api/clients'
import { createAccount } from 'shared/api/clients'

export const useAccountCreate = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (payload: CreateAccountPayload) => {
    await mutate(`/clients/${payload.clientId}`, createAccount(payload), { rollbackOnError: true })
  }

  return { trigger }
}
