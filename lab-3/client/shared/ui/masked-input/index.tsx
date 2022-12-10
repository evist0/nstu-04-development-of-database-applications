import type { ComponentProps } from 'react'
import React from 'react'

import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { IMaskMixin } from 'react-imask'

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T, object>
} & Omit<TextFieldProps, 'name'> &
  ComponentProps<typeof MaskedStyledInput>

const MaskedStyledInput = IMaskMixin<
  IMask.AnyMaskedOptions, // Mask options
  false, // Unmask
  string, // Value type
  HTMLInputElement, // Wrapped element type
  TextFieldProps // Custom props
>(TextField)

export const MaskedInput = <T extends FieldValues>({ name, control, ...fieldProps }: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const isError = Boolean(fieldState.error)

        return (
          <MaskedStyledInput
            {...fieldProps}
            {...field}
            inputRef={ref}
            error={isError}
            helperText={isError ? fieldState.error?.message : ' '}
          />
        )
      }}
    />
  )
}
