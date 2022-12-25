import { useSWRConfig } from 'swr'

import { removeTariff } from 'shared/api/tariffs'

export const useRemoveTariff = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (tariffId: string) => {
    await mutate('/tariffs', removeTariff(tariffId), { rollbackOnError: true })
  }

  return { trigger }
}
