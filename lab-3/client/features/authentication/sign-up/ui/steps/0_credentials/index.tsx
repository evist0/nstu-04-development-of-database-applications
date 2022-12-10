import type { FC } from 'react'
import React from 'react'

import { Input } from '/client/shared/ui/input'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { StepControls } from '../../../lib'
import { useFormData } from '../../../lib'
import type { RawPayload } from './model'
import {
  FIELD_NAME_EMAIL,
  FIELD_NAME_PASSWORD,
  FIELD_NAME_PASSWORD_REPEAT,
  FIELD_NAME_USERNAME,
  getDefaultValues,
  resolver,
  transformPayload
} from './model'

export const CredentialsStep: FC<StepControls> = ({ onNext }) => {
  const { values, setValues } = useFormData()

  const { control, handleSubmit } = useForm<RawPayload>({ resolver, defaultValues: getDefaultValues(values) })

  const onSubmit = (values: RawPayload) => {
    if (!onNext) {
      throw Error('onNext is not passed')
    }

    const transformedValues = transformPayload(values)
    setValues(transformedValues)

    onNext()
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_USERNAME} control={control} label={'Имя пользователя'} />
        <Input name={FIELD_NAME_EMAIL} control={control} label={'Электронная почта'} type={'email'} />
        <Input name={FIELD_NAME_PASSWORD} control={control} label={'Пароль'} type={'password'} />
        <Input name={FIELD_NAME_PASSWORD_REPEAT} control={control} label={'Повторите пароль'} type={'password'} />
      </Stack>

      <Stack direction={'row-reverse'} justifyContent={'space-between'}>
        <Button type={'submit'}>Вперед</Button>
      </Stack>
    </Box>
  )
}
