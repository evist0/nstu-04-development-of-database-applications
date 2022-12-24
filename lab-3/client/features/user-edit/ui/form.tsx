import type { FC } from 'react'
import React from 'react'

import {
  FIELD_NAME_ADDRESS,
  FIELD_NAME_FIO,
  FIELD_NAME_PASSPORT,
  FIELD_NAME_PHONE
} from '/client/features/user-create/ui/form/steps/1_contact-info/model'
import type { UserProfile } from '/client/shared/api'
import { updateUserProfile } from '/client/shared/api'
import { Input } from '/client/shared/ui/input'
import { MaskedInput } from '/client/shared/ui/masked-input'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { RawPayload } from '../model'
import { getDefaultValues, resolver, transformPayload } from '../model'

type Props = {
  userId: string
  profile: Partial<UserProfile>
  onSuccess?: () => Promise<void> | void
}

export const UserEditForm: FC<Props> = ({ userId, profile, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RawPayload>({ defaultValues: getDefaultValues(profile), resolver })

  const onSubmit = async (payload: RawPayload): Promise<void> => {
    const transformedPayload = transformPayload(payload)
    await updateUserProfile({ id: userId, ...transformedPayload })

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
