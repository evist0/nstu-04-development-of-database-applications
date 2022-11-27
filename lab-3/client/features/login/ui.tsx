import React from 'react'
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Link, Stack } from '@mui/material';
import { FormInput } from '/client/shared/ui/form-input';
import { isTooManyRequestsError } from '/client/shared/lib/error-utils';

import { defaultValues, resolver, LoginData, login, FIELD_NAME_USERNAME, FIELD_NAME_PASSWORD } from './model'

export const LoginForm = () => {
  const {control, handleSubmit, formState: {isSubmitting}, setError} = useForm<LoginData>({
    defaultValues,
    resolver
  });

  const onSubmit = async ({username, password}: LoginData): Promise<void> => {
    try {
      await login(username, password);
    } catch (e: unknown) {
      if (isTooManyRequestsError(e)) {
        // TODO: тостер "Много запросов"
        console.log('Много запросов')
        return;
      }

      setError(FIELD_NAME_USERNAME, {message: 'Неправильный логин или пароль'})
    }
  }

  return <Stack width={'100%'} component={'form'} spacing={2} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2}>
      <FormInput name={FIELD_NAME_USERNAME} control={control} label={'Имя пользователя'}/>
      <FormInput name={FIELD_NAME_PASSWORD} control={control} label={'Пароль'} type={'password'}/>
    </Stack>

    <Stack alignItems={'center'} spacing={2}>
      <LoadingButton
        type={'submit'}
        variant={'contained'}
        size={'large'}
        fullWidth={true}
        loading={isSubmitting}>
        Войти
      </LoadingButton>

      <Link href="#">Забыли пароль?</Link>
    </Stack>
  </Stack>
}