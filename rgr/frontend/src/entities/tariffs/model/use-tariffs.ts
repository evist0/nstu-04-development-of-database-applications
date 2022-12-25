import useSWR from 'swr'

import { fetcher } from 'shared/api/fetcher'
import type { GetTariffsResult } from 'shared/api/types'

export const useTariffs = () => useSWR<GetTariffsResult>('/tariffs', fetcher)
