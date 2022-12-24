import type { FC } from 'react'
import React from 'react'

import { createTariff } from '/client/shared/api/tariffs'
import { Input } from '/client/shared/ui/input'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { Payload } from '../model'
import { defaultValues, FIELD_NAME_ANNUAL, FIELD_NAME_NAME, FIELD_NAME_TERM, resolver } from '../model'

type Props = {
  onSuccess?: () => Promise<void> | void
}

export const TariffCreateForm: FC<Props> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Payload>({ defaultValues, resolver })

  const onSubmit = async (payload: Payload): Promise<void> => {
    await createTariff(payload)

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_NAME} autoComplete={'off'} control={control} label={'Название'} />

        <Input
          name={FIELD_NAME_ANNUAL}
          autoComplete={'off'}
          control={control}
          label={'Процентная ставка'}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
        />

        <Input
          name={FIELD_NAME_TERM}
          autoComplete={'off'}
          control={control}
          label={'Длительность'}
          InputProps={{
            endAdornment: <InputAdornment position="end">м.</InputAdornment>
          }}
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
