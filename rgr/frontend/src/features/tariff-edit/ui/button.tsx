import type { FC } from 'react'
import { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import type { Tariff } from 'shared/api/types'
import { Modal } from 'shared/ui/modal'

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
