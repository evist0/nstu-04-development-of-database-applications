import type { FC, ReactNode } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Tariff } from 'shared/api/types'

type Props = {
  tariff: Tariff
  actions?: ReactNode
}

export const TariffRow: FC<Props> = ({ tariff, actions }) => {
  const { name, term, annual } = tariff

  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <Typography fontWeight={'500'}>{name} </Typography>

      <Typography>{annual} %</Typography>
      <Typography>{term} м.</Typography>

      {actions}
    </Stack>
  )
}
