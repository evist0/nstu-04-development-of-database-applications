import { useSWRConfig } from 'swr'

import { removeClient } from 'shared/api/clients'

export const useClientRemove = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (clientId: string) => {
    await mutate('/clients', removeClient(clientId), { rollbackOnError: true })
  }

  return { trigger }
}
