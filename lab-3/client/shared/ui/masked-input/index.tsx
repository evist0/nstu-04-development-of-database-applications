import type { ComponentProps } from 'react'
import React from 'react'

import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { IMask } from 'react-imask'
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
      render={({ field: { ref, onChange, ...field }, fieldState }) => {
        const isError = Boolean(fieldState.error)

        // Browser autocomplete fix
        // React Hook Form can't properly hand field value change without onChange invoke, but imask suppress this call
        const onAccept = (value: string) => {
          const event = {
            target: {
              value
            }
          }

          onChange(event)
        }

        return (
          <MaskedStyledInput
            {...fieldProps}
            {...field}
            onChange={onChange}
            onAccept={onAccept}
            inputRef={ref}
            error={isError}
            helperText={isError ? fieldState.error?.message : ' '}
          />
        )
      }}
    />
  )
}
