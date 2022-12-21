import type { FC } from 'react'
import React from 'react'

import type { User } from '/client/shared/api'
import { signIn } from '/client/shared/api'
import { isTooManyRequestsError } from '/client/shared/lib/error-utils'
import { Input } from '/client/shared/ui/input'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { SignInData } from './model'
import { defaultValues, FIELD_NAME_PASSWORD, FIELD_NAME_USERNAME, resolver } from './model'

type Props = {
  onSuccess?: (user: User) => void
}

export const SignInForm: FC<Props> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = useForm<SignInData>({ defaultValues, resolver })

  const onSubmit = async ({ username, password }: SignInData): Promise<void> => {
    try {
      const user = await signIn(username, password)

      if (onSuccess) {
        onSuccess(user)
      }
    } catch (e: unknown) {
      if (isTooManyRequestsError(e)) {
        console.error('Too many requests!')
        return
      }

      setError(FIELD_NAME_USERNAME, {
        message: 'Неправильный логин или пароль'
      })
    }
  }

  return (
    <Stack width={'100%'} component={'form'} spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_USERNAME} control={control} label={'Имя пользователя'} />
        <Input name={FIELD_NAME_PASSWORD} control={control} label={'Пароль'} type={'password'} />
      </Stack>

      <Stack alignItems={'center'} spacing={2}>
        <LoadingButton type={'submit'} variant={'contained'} size={'large'} fullWidth={true} loading={isSubmitting}>
          Войти
        </LoadingButton>
      </Stack>
    </Stack>
  )
}
