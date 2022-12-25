import type { FC } from 'react'
import { useState } from 'react'

import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'

import { Modal } from 'shared/ui/modal'

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
