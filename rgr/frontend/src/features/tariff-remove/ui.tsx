import type { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import { useRemoveTariff } from './model'

type Props = { tariffId: string } & Omit<IconButtonProps, 'onClick' | 'children'>

export const TariffRemoveButton: FC<Props> = ({ tariffId, ...restProps }) => {
  const { trigger } = useRemoveTariff()

  const onClick = async () => {
    await trigger(tariffId)
  }

  return (
    <IconButton {...restProps} onClick={onClick} color={'error'}>
      <DeleteIcon />
    </IconButton>
  )
}
