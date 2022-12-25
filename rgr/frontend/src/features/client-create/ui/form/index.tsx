import type { FC } from 'react'

import Box from '@mui/material/Box'
import MuiStep from '@mui/material/Step'
import MuiStepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import type { Client } from 'shared/api/types'

import { useClientCreate } from '../../model/use-client-create'
import type { Step } from './lib'
import { useSteps, withFormDataProvider } from './lib'
import { schema, STEPS } from './model'

type Props = {
  onSuccess?: (user?: Client) => Promise<void> | void
}

const CreateClientFormBase: FC<Props> = ({ onSuccess }) => {
  const { trigger } = useClientCreate()

  const onFinish = async (formData: Record<string, unknown>) => {
    try {
      const payload = await schema.validate(formData)

      await trigger(payload)

      if (onSuccess) {
        onSuccess()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const { step, currentContent } = useSteps(STEPS, onFinish)

  const getStepLabels = (steps: Step[]) =>
    steps.map(({ label }) => (
      <MuiStep key={label}>
        <MuiStepLabel>{label}</MuiStepLabel>
      </MuiStep>
    ))

  return (
    <Box width={'100%'}>
      <Stepper activeStep={step}>{getStepLabels(STEPS)}</Stepper>
      <Box mt={4}>{currentContent}</Box>
    </Box>
  )
}

export const CreateClientForm: FC<Props> = withFormDataProvider(CreateClientFormBase)
