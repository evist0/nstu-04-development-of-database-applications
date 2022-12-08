import type { FC } from 'react'
import React from 'react'

import type { User } from '/client/shared/api'
import { signUp } from '/client/shared/api'
import { isTooManyRequestsError } from '/client/shared/lib/error-utils'
import { FormInput } from '/client/shared/ui/form-input'

import LoadingButton from '@mui/lab/LoadingButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import type { SignUpData } from './model'
import {
  defaultValues,
  FIELD_NAME_ADDRESS,
  FIELD_NAME_EMAIL,
  FIELD_NAME_NAME,
  FIELD_NAME_PASSPORT,
  FIELD_NAME_PASSWORD,
  FIELD_NAME_PATRONYMIC,
  FIELD_NAME_PHONE,
  FIELD_NAME_SURNAME,
  FIELD_NAME_USERNAME,
  resolver,
  transformPayload
} from './model'

type Props = {
  onSuccess?: (user: User) => void
}

export const SignUpForm: FC<Props> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpData>({ defaultValues, resolver })

  const onSubmit = async (payload: SignUpData): Promise<void> => {
    try {
      const transformedPayload = transformPayload(payload)

      const user = await signUp(transformedPayload)

      if (onSuccess) {
        onSuccess(user)
      }
    } catch (e: unknown) {
      if (isTooManyRequestsError(e)) {
        // TODO: тостер "Много запросов"
        return
      }

      console.log(e)
    }
  }

  return (
    <Stack width={'100%'} component={'form'} spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput name={FIELD_NAME_USERNAME} control={control} label={'Имя пользователя'} />
        <FormInput name={FIELD_NAME_EMAIL} control={control} label={'Электронная почта'} />
        <FormInput name={FIELD_NAME_PASSWORD} control={control} label={'Пароль'} type={'password'} />
        <FormInput name={FIELD_NAME_SURNAME} control={control} label={'Фамилия'} />
        <FormInput name={FIELD_NAME_NAME} control={control} label={'Имя'} />
        <FormInput name={FIELD_NAME_PATRONYMIC} control={control} label={'Отчество'} />
        <FormInput name={FIELD_NAME_PHONE} control={control} label={'Телефон'} />
        <FormInput name={FIELD_NAME_PASSPORT} control={control} label={'Паспорт'} />
        <FormInput name={FIELD_NAME_ADDRESS} control={control} label={'Адрес'} />
      </Stack>

      <Stack alignItems={'center'} spacing={2}>
        <LoadingButton type={'submit'} variant={'contained'} size={'large'} fullWidth={true} loading={isSubmitting}>
          Зарегистрироваться
        </LoadingButton>

        <Link href="/authentication/sign-in">Войти?</Link>
      </Stack>
    </Stack>
  )
}
