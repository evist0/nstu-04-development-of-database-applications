import useSWR from 'swr'

import type { GetClientsResult } from 'shared/api/clients'
import { fetcher } from 'shared/api/fetcher'

export const useClients = () => useSWR<GetClientsResult>('/clients', fetcher)
