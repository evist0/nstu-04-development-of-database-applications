import type { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import { useTariffs } from 'entities/tariffs'
import type { Client, Tariff } from 'shared/api/types'
import { Autocomplete } from 'shared/ui/autocomplete'

import type { RawPayload } from '../model/form'
import { defaultValues, FIELD_NAME_TARIFF, resolver, transformPayload } from '../model/form'
import { useAccountCreate } from '../model/use-account-create'

type Props = {
  client: Client
  onSuccess?: () => Promise<void> | void
}

export const AccountCreateForm: FC<Props> = ({ client, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RawPayload>({ defaultValues, resolver })

  const { trigger } = useAccountCreate()

  const { data, isLoading } = useTariffs()
  const getTariffOptionLabel = (tariff?: Tariff) => (tariff ? tariff.name : '')
  const isTariffEqual = (option: Tariff, value: Tariff) => option.id === value.id

  const onSubmit = async (payload: RawPayload): Promise<void> => {
    const { tariffId } = transformPayload(payload)

    await trigger({ clientId: client.id, tariffId })

    if (onSuccess) {
      onSuccess()
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography>
          {client.surname} {client.name} {client.patronymic} — {client.passport}
        </Typography>

        <Autocomplete
          name={FIELD_NAME_TARIFF}
          control={control}
          renderInput={(params) => <TextField {...params} label={'Тариф'} />}
          isOptionEqualToValue={isTariffEqual}
          getOptionLabel={getTariffOptionLabel}
          options={data?.tariffs as Tariff[]}
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
