import React from 'react'

import type { AutocompleteProps } from '@mui/material/Autocomplete'
import MuiAutocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<
  T extends FieldValues,
  R,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = {
  name: Path<T>
  control: Control<T, object>
} & Omit<AutocompleteProps<R, Multiple, DisableClearable, FreeSolo>, 'name'>

export const Autocomplete = <
  T extends FieldValues,
  R,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  name,
  control,
  ...fieldProps
}: Props<T, R, Multiple, DisableClearable, FreeSolo>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState }) => {
        const isError = Boolean(fieldState.error)

        return (
          <FormControl fullWidth>
            <MuiAutocomplete
              {...field}
              {...fieldProps}
              value={value}
              onChange={(_, data) => {
                onChange(data ? data : null)
              }}
            />
            {isError && <FormHelperText error={isError}>{fieldState.error?.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
