import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'

import { Modal } from '/client/shared/ui/modal'

import Button from '@mui/material/Button'

import { CreateUserForm } from './form'

type Props = {
  children: ReactNode
}

export const UserCreateButton: FC<Props> = ({ children }) => {
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
        <CreateUserForm onSuccess={onClose} />
      </Modal>

      <Button onClick={onOpen}>{children}</Button>
    </>
  )
}
