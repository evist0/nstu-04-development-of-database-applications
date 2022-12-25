import type { FC } from 'react'
import { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import type { Client } from 'shared/api/types'
import { Modal } from 'shared/ui/modal'

import { ClientEditForm } from './form'

type Props = { client: Client } & Omit<IconButtonProps, 'onClick' | 'children'>

export const ClientEditButton: FC<Props> = ({ client, ...restProps }) => {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ClientEditForm client={client} onSuccess={onClose} />
      </Modal>

      <IconButton onClick={onOpen} {...restProps}>
        <EditIcon />
      </IconButton>
    </>
  )
}
