import type { FC } from 'react'
import React from 'react'

import { FormInput } from '/client/shared/ui/form-input'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { StepControls } from '../../../lib'
import { resolver } from './model'

export const ContactInfoStep: FC<StepControls> = ({ onPrevious, onFinish }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({ resolver })

  const onSubmit = () => {
    if (!onFinish) {
      throw Error('onFinish is not passed')
    }

    onFinish()
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput name={'username'} control={control} label={'Имя пользователя'} />
      </Stack>

      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={onPrevious}>Назад</Button>

        <LoadingButton type={'submit'} loading={isSubmitting}>
          Отправить
        </LoadingButton>
      </Stack>
    </Box>
  )
}
