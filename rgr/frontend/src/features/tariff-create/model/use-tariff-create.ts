import { useSWRConfig } from 'swr'

import type { CreateTariffPayload } from 'shared/api/tariffs'
import { createTariff } from 'shared/api/tariffs'

export const useTariffCreate = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (payload: CreateTariffPayload) => {
    await mutate('/tariffs', createTariff(payload), { rollbackOnError: true })
  }

  return { trigger }
}
