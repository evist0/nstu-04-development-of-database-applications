import type { FC } from 'react'
import React from 'react'

import type { User } from '/client/shared/api'
import { createUser } from '/client/shared/api'

import Box from '@mui/material/Box'
import MuiStep from '@mui/material/Step'
import MuiStepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import type { Step } from './lib'
import { useSteps, withFormDataProvider } from './lib'
import { schema, STEPS } from './model'

type Props = {
  onSuccess?: (user: User) => Promise<void> | void
}

const CreateUserFormBase: FC<Props> = ({ onSuccess }) => {
  const onFinish = async (formData: Record<string, unknown>) => {
    try {
      const payload = await schema.validate(formData)
      const user = await createUser(payload)

      if (onSuccess) {
        onSuccess(user)
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

export const CreateUserForm: FC<Props> = withFormDataProvider(CreateUserFormBase)
