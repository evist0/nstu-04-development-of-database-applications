import type { FC } from 'react'
import React, { useState } from 'react'

import { Modal } from '/client/shared/ui/modal'

import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'

import { TariffCreateForm } from './form'

type Props = Omit<ButtonProps, 'onClick'>

export const TariffCreateButton: FC<Props> = ({ children, ...restProps }) => {
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
        <TariffCreateForm onSuccess={onClose} />
      </Modal>

      <Button onClick={onOpen} {...restProps}>
        {children}
      </Button>
    </>
  )
}
