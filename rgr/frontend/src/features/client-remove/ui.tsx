import type { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import { useClientRemove } from './model'

type Props = { clientId: string } & Omit<IconButtonProps, 'onClick' | 'children'>

export const ClientRemoveButton: FC<Props> = ({ clientId, ...restProps }) => {
  const { trigger } = useClientRemove()

  const onClick = async () => {
    await trigger(clientId)
  }

  return (
    <IconButton {...restProps} onClick={onClick} color={'error'}>
      <DeleteIcon />
    </IconButton>
  )
}
