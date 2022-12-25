import type { FC, ReactNode } from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Client } from 'shared/api/types'
import { Modal } from 'shared/ui/modal'

import { useClient } from '../../model/use-client'

type Props = {
  clientId: string
  modalContent?: (client: Client) => ReactNode
  children: ReactNode
}

export const ClientDetailsPopup: FC<Props> = ({ clientId, modalContent, children }) => {
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useClient(open ? clientId : undefined)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const fio = `${data?.surname} ${data?.name} ${data?.patronymic}`

  return (
    <>
      {isLoading && (
        <Modal open={open} onClose={onClose}>
          Loading...
        </Modal>
      )}

      {!isLoading && (
        <Modal open={open} onClose={onClose}>
          <Typography variant="h6" component="h2">
            {fio.length > 2 ? fio : '<ФИО отсутствует>'}
          </Typography>

          <Box mt={2}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography fontWeight={500}>Паспорт:</Typography>
              <Typography>{data?.passport}</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography fontWeight={500}>Телефон:</Typography>
              <Typography>{data?.phone}</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography fontWeight={500}>Адрес:</Typography>
              <Typography>{data?.address}</Typography>
            </Stack>

            {data && modalContent && modalContent(data)}
          </Box>
        </Modal>
      )}

      <Box onClick={onOpen} sx={{ cursor: 'pointer' }}>
        {children}
      </Box>
    </>
  )
}
