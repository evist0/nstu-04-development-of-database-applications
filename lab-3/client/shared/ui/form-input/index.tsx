import React from 'react'

import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T, object>
} & Omit<TextFieldProps, 'name'>

export const FormInput = <T extends FieldValues>({ name, control, ...fieldProps }: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isError = Boolean(fieldState.error)

        return (
          <TextField
            {...fieldProps}
            {...field}
            error={isError}
            helperText={isError ? fieldState.error?.message : ' '}
          />
        )
      }}
    />
  )
}
