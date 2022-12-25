import { useSWRConfig } from 'swr'

import type { UpdateTariffPayload } from 'shared/api/tariffs'
import { updateTariff } from 'shared/api/tariffs'

export const useTariffUpdate = () => {
  const { mutate } = useSWRConfig()

  const trigger = async (tariffId: string, payload: UpdateTariffPayload) => {
    await mutate('/tariffs', updateTariff(tariffId, payload), { rollbackOnError: true })
  }

  return { trigger }
}
