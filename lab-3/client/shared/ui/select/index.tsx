import React from 'react'

import { MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { SelectProps } from '@mui/material/Select'
import MuiSelect from '@mui/material/Select'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type SelectValue = {
  name: string
  value: string | number
}

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T, object>
  values: SelectValue[]
} & Omit<SelectProps, 'name'>

export const Select = <T extends FieldValues>({ name, control, values, ...fieldProps }: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isError = Boolean(fieldState.error)

        return (
          <FormControl>
            <MuiSelect {...field} {...fieldProps} displayEmpty>
              {values.map((value) => (
                <MenuItem key={value.name} value={value.value}>
                  {value.name}
                </MenuItem>
              ))}
            </MuiSelect>

            {isError && <FormHelperText>{fieldState.error?.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
