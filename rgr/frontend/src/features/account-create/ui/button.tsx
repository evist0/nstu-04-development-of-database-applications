import type { FC } from 'react'
import { useState } from 'react'

import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'

import type { Client } from 'shared/api/types'
import { Modal } from 'shared/ui/modal'

import { AccountCreateForm } from './form'

type Props = { client: Client } & Omit<ButtonProps, 'onClick'>

export const AccountCreateButton: FC<Props> = ({ children, client, ...restProps }) => {
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
        <AccountCreateForm client={client} onSuccess={onClose} />
      </Modal>

      <Button onClick={onOpen} {...restProps}>
        {children}
      </Button>
    </>
  )
}
