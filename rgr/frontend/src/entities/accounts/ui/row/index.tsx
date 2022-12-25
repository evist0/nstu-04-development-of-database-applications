import type { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Account } from 'shared/api/types'

type Props = {
  account: Account
  actions?: ReactNode
}

export const AccountRow: FC<Props> = ({ account, actions }) => {
  const { dueTo, createdAt } = account

  const createdAtDate = new Date(createdAt)
  const dueToDate = new Date(dueTo)

  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <Typography fontWeight={'500'}>{account.tariff.name}</Typography>

      <Typography>
        {createdAtDate.getDay()}.{createdAtDate.getMonth()}.{createdAtDate.getUTCFullYear()} — {dueToDate.getDay()}.
        {dueToDate.getMonth()}.{dueToDate.getUTCFullYear()}
      </Typography>

      <Box ml={'auto'}>{actions}</Box>
    </Stack>
  )
}
