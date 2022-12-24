import type { FC } from 'react'
import React from 'react'

import { removeTariff } from '/client/shared/api/tariffs'

import DeleteIcon from '@mui/icons-material/Delete'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

type Props = { tariffId: string } & Omit<IconButtonProps, 'onClick' | 'children'>

export const TariffRemoveButton: FC<Props> = ({ tariffId, ...restProps }) => {
  const onClick = async () => {
    await removeTariff(tariffId)
  }

  return (
    <IconButton {...restProps} onClick={onClick} color={'error'}>
      <DeleteIcon />
    </IconButton>
  )
}
