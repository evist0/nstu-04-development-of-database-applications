import type { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import { Input } from 'shared/ui/input'
import { MaskedInput } from 'shared/ui/masked-input'

import type { StepControls } from '../../lib'
import { useFormData } from '../../lib'
import type { RawPayload } from './model'
import {
  FIELD_NAME_ADDRESS,
  FIELD_NAME_FIO,
  FIELD_NAME_PASSPORT,
  FIELD_NAME_PHONE,
  getDefaultValues,
  resolver,
  transformPayload
} from './model'

export const ContactInfoStep: FC<StepControls> = ({ onPrevious, onFinish }) => {
  const { values, setValues } = useFormData()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RawPayload>({ resolver, defaultValues: getDefaultValues(values) })

  const onSubmit = async (stepValues: RawPayload) => {
    if (!onFinish) {
      throw Error('onFinish is not passed')
    }

    const transformedStepValues = transformPayload(stepValues)
    const newValues = setValues(transformedStepValues)

    onFinish(newValues)
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name={FIELD_NAME_FIO} control={control} label={'Фамилия, имя, отчество'} />

        <MaskedInput
          name={FIELD_NAME_PHONE}
          control={control}
          mask={'+7 (000) 000-00-00'}
          label={'Контактный телефон'}
        />

        <MaskedInput
          name={FIELD_NAME_PASSPORT}
          control={control}
          mask={'#### ######'}
          definitions={{
            '#': /\d/
          }}
          label={'Паспорт'}
        />

        <Input name={FIELD_NAME_ADDRESS} control={control} label={'Адрес'} />
      </Stack>

      <Stack direction={'row-reverse'}>
        <LoadingButton type={'submit'} loading={isSubmitting}>
          Отправить
        </LoadingButton>
      </Stack>
    </Box>
  )
}
