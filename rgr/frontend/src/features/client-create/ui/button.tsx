import type { FC, ReactNode } from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'

import { Modal } from 'shared/ui/modal'

import { CreateClientForm } from './form'

type Props = {
  children: ReactNode
}

export const ClientCreateButton: FC<Props> = ({ children }) => {
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
        <CreateClientForm onSuccess={onClose} />
      </Modal>

      <Button onClick={onOpen}>{children}</Button>
    </>
  )
}
