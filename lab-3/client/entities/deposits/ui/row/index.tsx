import type { FC } from 'react'
import React from 'react'

import type { Deposit } from '/client/shared/api'

import { TariffsCollection } from '/imports/entities/tariffs'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTracker } from 'meteor/react-meteor-data'

type Props = {
  deposit: Deposit
}

export const DepositRow: FC<Props> = ({ deposit }) => {
  const { dueTo, createdAt } = deposit

  const tariff = useTracker(() => TariffsCollection.findOne({ _id: deposit.tariffId }))

  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <Typography fontWeight={'500'}>{tariff?.name}</Typography>

      <Typography>
        {createdAt.toISOString()} — {dueTo.toISOString()}
      </Typography>
    </Stack>
  )
}
