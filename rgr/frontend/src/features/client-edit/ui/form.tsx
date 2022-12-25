import type { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { Client } from 'shared/api/types'
import { Input } from 'shared/ui/input'
import { MaskedInput } from 'shared/ui/masked-input'

import type { RawPayload } from '../model/form'
import {
  FIELD_NAME_ADDRESS,
  FIELD_NAME_FIO,
  FIELD_NAME_PASSPORT,
  FIELD_NAME_PHONE,
  getDefaultValues,
  resolver,
  transformPayload
} from '../model/form'
import { useClientUpdate } from '../model/use-client-update'

type Props = {
  client: Client
  onSuccess?: () => Promise<void> | void
}

export const ClientEditForm: FC<Props> = ({ client, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RawPayload>({ defaultValues: getDefaultValues(client), resolver })

  const { trigger } = useClientUpdate()

  const onSubmit = async (payload: RawPayload): Promise<void> => {
    const transformedPayload = transformPayload(payload)

    await trigger(client.id, transformedPayload)

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_FIO} control={control} label={'Фамилия, имя, отчество'} />

        <MaskedInput
          type={'phone'}
          name={FIELD_NAME_PHONE}
          control={control}
          mask={'+7 (000) 000-00-00'}
          label={'Контактный телефон'}
        />

        <MaskedInput
          name={FIELD_NAME_PASSPORT}
          control={control}
          mask={'#### ######'}
          definitions={{
            '#': /\d/
          }}
          label={'Паспорт'}
        />

        <Input name={FIELD_NAME_ADDRESS} control={control} label={'Адрес'} />
      </Stack>

      <Stack direction={'row-reverse'} justifyContent={'space-between'}>
        <LoadingButton type={'submit'} loading={isSubmitting}>
          Отправить
        </LoadingButton>
      </Stack>
    </Box>
  )
}
