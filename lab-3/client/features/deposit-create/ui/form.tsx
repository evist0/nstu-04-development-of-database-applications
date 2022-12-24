import type { FC } from 'react'
import React from 'react'

import { useTariffs } from '/client/entities/tariffs'
import type { Tariff, User } from '/client/shared/api'
import { createDeposit } from '/client/shared/api/deposit'
import { Autocomplete } from '/client/shared/ui/autocomplete'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import type { RawPayload } from '../model'
import { defaultValues, FIELD_NAME_TARIFF, resolver, transformPayload } from '../model'

type Props = {
  user: User
  onSuccess?: () => Promise<void> | void
}

export const DepositCreateForm: FC<Props> = ({ user, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RawPayload>({ defaultValues, resolver })

  const tariffs = useTariffs()
  const getTariffOptionLabel = (tariff?: Tariff) => (tariff ? tariff.name : '')
  const isTariffEqual = (option: Tariff, value: Tariff) => option._id === value._id

  const onSubmit = async (payload: RawPayload): Promise<void> => {
    const { tariffId } = transformPayload(payload)
    await createDeposit({ userId: user._id, tariffId })

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography>
          {user.profile?.surname} {user.profile?.name} {user.profile?.patronymic} — {user.profile?.passport}
        </Typography>

        <Autocomplete
          name={FIELD_NAME_TARIFF}
          control={control}
          renderInput={(params) => <TextField {...params} label={'Тариф'} />}
          isOptionEqualToValue={isTariffEqual}
          getOptionLabel={getTariffOptionLabel}
          options={tariffs}
        />
      </Stack>

      <Stack direction={'row-reverse'} justifyContent={'space-between'}>
        <LoadingButton type={'submit'} loading={isSubmitting}>
          Отправить
        </LoadingButton>
      </Stack>
    </Box>
  )
}
