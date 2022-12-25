import useSWR from 'swr'

import { fetcher } from 'shared/api/fetcher'
import type { Client } from 'shared/api/types'

export const useClient = (clientId?: string) => useSWR<Client>(clientId ? `/clients/${clientId}` : null, fetcher)
