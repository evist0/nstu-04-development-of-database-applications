import type { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { Tariff } from 'shared/api/types'
import { Input } from 'shared/ui/input'

import type { Payload } from '../model/form'
import { FIELD_NAME_ANNUAL, FIELD_NAME_NAME, FIELD_NAME_TERM, getDefaultValues, resolver } from '../model/form'
import { useTariffUpdate } from '../model/use-tariff-update'

type Props = {
  tariff: Tariff
  onSuccess?: () => Promise<void> | void
}

export const TariffEditForm: FC<Props> = ({ tariff, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Payload>({ defaultValues: getDefaultValues(tariff), resolver })

  const { trigger } = useTariffUpdate()

  const onSubmit = async (payload: Payload): Promise<void> => {
    await trigger(tariff.id, payload)

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_NAME} control={control} label={'Название'} />

        <Input
          name={FIELD_NAME_ANNUAL}
          control={control}
          label={'Процентная ставка'}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
        />

        <Input
          name={FIELD_NAME_TERM}
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
