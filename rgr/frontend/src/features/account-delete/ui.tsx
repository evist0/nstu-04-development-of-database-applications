import type { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import { useRemoveAccount } from './model'

type Props = { clientId: string; accountId: string } & Omit<IconButtonProps, 'onClick' | 'children'>

export const AccountRemoveButton: FC<Props> = ({ clientId, accountId, ...restProps }) => {
  const { trigger } = useRemoveAccount()

  const onClick = async () => {
    await trigger(clientId, { accountId })
  }

  return (
    <IconButton {...restProps} onClick={onClick} color={'error'}>
      <DeleteIcon />
    </IconButton>
  )
}
