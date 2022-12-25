import type { FC, ReactNode } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ClientDetailsPopup } from 'entities/clients'
import type { Client } from 'shared/api/types'

type Props = {
  client: Client
  actions?: ReactNode
  modalContent?: (client: Client) => ReactNode
}
export const ClientRow: FC<Props> = ({ client, actions, modalContent }) => {
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <ClientDetailsPopup clientId={client.id} modalContent={modalContent}>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography fontWeight={500}>
            {client.surname} {client.name} {client.patronymic}
          </Typography>
        </Stack>
      </ClientDetailsPopup>
      {actions}
    </Stack>
  )
}
