import type { FC } from 'react'
import React, { useState } from 'react'

import type { User } from '/client/shared/api'
import { Modal } from '/client/shared/ui/modal'

import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'

import { DepositCreateForm } from './form'

type Props = { user: User } & Omit<ButtonProps, 'onClick'>

export const DepositCreateButton: FC<Props> = ({ children, user, ...restProps }) => {
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
        <DepositCreateForm user={user} onSuccess={onClose} />
      </Modal>

      <Button onClick={onOpen} {...restProps}>
        {children}
      </Button>
    </>
  )
}
