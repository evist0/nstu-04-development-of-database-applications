import type { FC } from 'react'
import React, { useState } from 'react'

import type { Tariff } from '/client/shared/api'
import { Modal } from '/client/shared/ui/modal'

import EditIcon from '@mui/icons-material/Edit'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import { TariffEditForm } from './form'

type Props = { tariff: Tariff } & Omit<IconButtonProps, 'onClick' | 'children'>

export const TariffEditButton: FC<Props> = ({ tariff, ...restProps }) => {
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
        <TariffEditForm tariff={tariff} onSuccess={onClose} />
      </Modal>

      <IconButton onClick={onOpen} {...restProps}>
        <EditIcon />
      </IconButton>
    </>
  )
}
