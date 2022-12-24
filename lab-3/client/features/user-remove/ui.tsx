import type { FC } from 'react'
import React from 'react'

import { removeUser } from '/client/shared/api'

import DeleteIcon from '@mui/icons-material/Delete'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

type Props = { userId: string } & Omit<IconButtonProps, 'onClick' | 'children'>

export const UserRemoveButton: FC<Props> = ({ userId, ...restProps }) => {
  const onClick = async () => {
    await removeUser(userId)
  }

  return (
    <IconButton {...restProps} onClick={onClick} color={'error'}>
      <DeleteIcon />
    </IconButton>
  )
}
